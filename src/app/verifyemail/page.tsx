"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OtpInput from "@/components/OtpInput";
import verifyotp from '../api/actions/verifyotp';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill('')); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      router.push('/signup'); 
    }
  }, [email, router]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const otpString = otp.join('');
    try {
      const result = await verifyotp(email as string, otpString); 
      if (result === 'Email verified successfully') {
        alert('Email verified successfully!');
        router.push('/login'); 
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <section className="bg-gray-900 text-gray-300 w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Verify Your Email
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <OtpInput value={otp} onChange={handleOtpChange} />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white ${isLoading ? 'bg-gray-600' : 'bg-primary-600'} hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </section>
    </div>
  );
}
