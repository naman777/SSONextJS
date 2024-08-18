"use server"
import prisma from '@/db';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/app/api/services/otpMail/route"; 

export async function signup(name:string,email:string,password:string) {

    const otp = crypto.randomInt(100000, 999999).toString(); 

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const find = await prisma.user.findUnique({
        where: { email },
    });

    if(find){
        return "email already exists";
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword, 
            otp,
            otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) 
        },
    });

    const mail = await sendVerificationEmail(email, otp);
    if(mail){
        return "mail sent"
    }    
}
