// src/components/SignupForm.tsx
"use client"

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signup } from '@/app/api/actions/signup';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await signup(name, email, password);
    if (res === "email already exists") {
      alert("Email already exists");
      router.push("/login");
    } else {
      alert("User created. Please verify your email.");
    router.push(`/verifyemail?email=${email}`);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <section className="bg-gray-900 text-gray-300 w-full max-w-md p-8 rounded-xl shadow-lg">
        
        <div className="p-2 space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
