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

const HostLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //TODO : Replace with actual login logic once backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Welcome back, Host!",
        description: "You have been successfully logged in to your dashboard.",
      });
      router.push('/host/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image src='/logo.png' width={32} height={32} alt='LookaroundPG' className="w-full h-full object-contain"/>
            </div>
            <span className="font-bold text-xl text-primary">LookaroundPG</span>
          </Link>
          <div className="bg-gradient-cool text-white p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold">Host Portal</h2>
            <p className="text-sm opacity-90">Manage your properties and guests</p>
          </div>
        </div>

        <Card className="animate-scaleIn">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Host Login
            </CardTitle>
            <CardDescription className="text-center">
              Access your host dashboard to manage properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Host Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your host email"
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
                className="w-full bg-gradient-cool hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in to Dashboard'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New host?{' '}
                <Link href="/partner" className="font-medium text-primary hover:text-primary/80">
                  Partner with us
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostLogin;
