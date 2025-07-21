"use client";
import React, { ReactNode, useEffect } from 'react'
import { authClient } from 'lib/auth-client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const { toast } = useToast();
    const router = useRouter();
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    // Handle authentication redirect and toast in useEffect
    useEffect(() => {
        if (!isPending && !session && !error) {
            toast({
                title: "Authentication required",
                description: "Please login to access this page.",
                variant: "destructive",
            });
            router.push('/login');
        }
    }, [session, isPending, error, toast, router]);

    // Handle error state
    useEffect(() => {
        if (error) {
            toast({
                title: "Authentication error",
                description: "There was an error with your session. Please try logging in again.",
                variant: "destructive",
            });
        }
    }, [error, toast]);

    // Show loading state
    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Authentication Error</p>
                    <p className="text-gray-600 mt-2">{error.message}</p>
                    <button 
                        onClick={() => router.push('/login')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated
    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    // Render children only if authenticated
    return (
        <div>{children}</div>
    );
}

export default AuthLayout;