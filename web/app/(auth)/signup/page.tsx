"use client";
import React, { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
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
import { Lock, Mail, Phone, User } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { refetch } = authClient.useSession();

  // Phone number validation
  const validatePhone = (phoneNumber: string) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be exactly 10 digits",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        phone: phone, // Allow phone to be optional
        callbackURL: "/",
        role: "user",
      },
      {
        onRequest: (ctx) => {
          toast({
            title: "Creating Account!",
            description: "Your Account is being created, please wait...",
          });
        },
        onSuccess: async (ctx) => {
          toast({
            title: "Account Created!",
            description: "Your Account has been created successfully.",
          });
          setIsLoading(false);
          await authClient.getSession({
            query: { disableCookieCache: true },
          });
          refetch();
          redirect("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast({
            title: "Account Creation Failed!",
            description: `Account creation error : ${ctx.error.message}. Please try again.`,
          });
        },
      }
    );
  };

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
          <p className="font-thin">Create your account to find your perfect stay</p>
        </div>

        <Card className="animate-scaleIn">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create your account
            </CardTitle>
            <CardDescription className="text-center">
              Join thousands of users finding their perfect PG
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 relative">
                <Label htmlFor="name">Full Name</Label>
                <User className="absolute left-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="shadow-xl pl-12"
                />
              </div>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Phone className="absolute left-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="shadow-xl pl-12"
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password" className="">
                  Password
                </Label>
                <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow-xl pl-12"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
