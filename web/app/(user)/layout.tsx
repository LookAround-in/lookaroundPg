"use client";
import React, { ReactNode } from 'react'
import { authClient } from 'lib/auth-client';
import { useRouter } from 'next/navigation';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    if (!session) router.push('/login');
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div>{children}</div>
    )
}

export default AuthLayout