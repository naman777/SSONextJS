import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/app/api/services/otpMail/route"; 

export async function post(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, password } = req.body;

    const otp = crypto.randomInt(100000, 999999).toString(); 

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword, 
            otp,
            otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) 
        },
    });

    await sendVerificationEmail(email, otp);

    res.json({ message: 'User created. Please verify your email.' });
}
