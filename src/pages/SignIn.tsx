
import React from 'react';
import SignIn from '@/components/auth/SignIn';

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <a href="/">
          <img 
            src="/lovable-uploads/e6dee00a-5d92-435b-a385-666bdf0a083b.png" 
            alt="AfroConnect Logo" 
            className="h-12 w-auto mx-auto bg-white rounded-md p-1 shadow-sm"
          />
        </a>
        <h1 className="text-xl font-bold text-[#355E3B] mt-2">AfroConnect</h1>
      </div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
