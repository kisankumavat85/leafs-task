import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center h-16 border w-full px-8">
        <h2 className="text-3xl">TweetX</h2>
      </header>
      {children}
    </div>
  );
};

export default AuthLayout;
