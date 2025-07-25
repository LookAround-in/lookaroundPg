'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { useToast } from 'hooks/use-toast';
import Image from 'next/image';
import { authClient } from 'lib/auth-client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: `/`
    }, {
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
        router.push('/');
      },
      onError: (ctx) => {
        //hide loading
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    })
  }

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
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/logo.png"
                width={32}
                height={32}
                alt="LookaroundPG"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-xl text-primary">LookaroundPG</span>
          </Link>
        </div>

        <Card className="animate-scaleIn">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              {/* <Button
                className="w-full"
                disabled={isLoading}
                onClick={handleGoogleSignIn}
              >
                {isLoading ? 'Signing in With Google...' : 'Sign in With Google'}
              </Button> */}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
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
