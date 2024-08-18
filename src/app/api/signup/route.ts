import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';
import crypto from 'crypto';
import { sendVerificationEmail } from "@/app/api/services/otpMail/route"; 

export async function post(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, password } = req.body;

    const otp = crypto.randomInt(100000, 999999).toString(); 

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            otp,
            otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) 
        },
    });

    
    await sendVerificationEmail(email, otp);

    res.json({ message: 'User created. Please verify your email.' });
}
