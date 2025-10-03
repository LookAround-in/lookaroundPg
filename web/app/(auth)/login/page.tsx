"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { useToast } from "hooks/use-toast";
import Image from "next/image";
import { authClient } from "lib/auth-client";
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/"
      },
      {
        onRequest: (ctx) => {
          //show loading
          toast({
            title: "Signing In!",
            description: "Your account is being accessed, please wait...",
          });
        },
        onSuccess: (ctx) => {
          //hide loading
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in.",
          });
          setIsLoading(false);
        },
        onError: (ctx) => {
          //hide loading
          setIsLoading(false);
          toast({
            title: "Login failed",
            description: `Login error: ${ctx.error.message}. Please check your credentials and try again.`,
            variant: "destructive",
          });
        },
      }
    );
  };

  // const handleGoogleSignIn = async () => {
  //   setIsLoading(true);
  //   try {
  //     await authClient.signIn.social({
  //       provider: "google",
  //       callbackURL: "/"
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Google sign-in failed",
  //       description: "Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-2"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/logo.png"
                width={32}
                height={32}
                alt="LookaroundPG"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-2xl text-primary">LookAroundPG</span>
          </Link>
          <p className="font-thin">Welcome back to your home away from home</p>
        </div>

        <Card className="animate-scaleIn">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 relative">
                <Label htmlFor="email">Email</Label>
                <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow-xl pl-12"
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow-xl pl-12"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              {/* <Button
                className="w-full"
                disabled={isLoading}
                onClick={handleGoogleSignIn}
              >
                {isLoading ? 'Signing in With Google...' : 'Sign in With Google'}
              </Button> */}
            </form>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-sm text-gray-600 whitespace-nowrap">Or Register With</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className="flex items-center justify-center my-4 gap-8">
              <Link href="/signup">
                <img src="google.png" alt="Google login button" height={32} width={32} />
              </Link>
              <Link href="/signup">
                <img src="apple-logo.png" alt="Apple login button" height={32} width={32} />
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
