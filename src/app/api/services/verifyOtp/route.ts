import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';

export async function post(req: NextApiRequest, res: NextApiResponse) {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || user.otp !== otp || user.otpExpiresAt! < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await prisma.user.update({
        where: { email },
        data: {
            otp: null, 
            otpExpiresAt: null,
            emailVerified: true, 
        },
    });

    res.json({ message: 'Email verified successfully' });
}
