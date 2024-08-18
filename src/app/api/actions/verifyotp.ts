"use server";

import prisma from '@/db';

export default async function verifyotp(email: string, otp: string) {

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || user.otp !== otp || user.otpExpiresAt! < new Date()) {
        return  'Invalid or expired OTP' ;
    }

    await prisma.user.update({
        where: { email },
        data: {
            otp: null, 
            otpExpiresAt: null,
            emailVerified: true, 
        },
    });

    return 'Email verified successfully';
}
