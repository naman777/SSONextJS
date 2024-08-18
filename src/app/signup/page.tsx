import SignupForm from "@/ui/InputBox";

export default function SignupPage() {
    const handleFormSubmit = (formData:{
        name: string;
        email: string;
        password: string;
    }) => {
        
    };

    return (
        <div>
            <SignupForm onSubmit={handleFormSubmit} />
        </div>
    );
}
