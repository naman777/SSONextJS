"use client"

import SignupForm from "@/components/Signup";
import { useRouter } from "next/navigation";
export default function SignupPage() {
    const router = useRouter();
    function navigate() {
        router.push("/login");    
    }

    return (
        <div>
            <h1 className="text-white bg-black">Create Your Account</h1>
            <SignupForm navigate={navigate}/>
        </div>
    );
}
