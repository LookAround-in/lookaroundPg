"use client";
import React from "react";
import Image from "next/image";
import { Button } from "components/ui/button";
import { Badge } from "components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Progress } from "components/ui/progress";
import {
  User,
  Star,
  Phone,
  Mail,
  MapPin,
  Home,
  Calendar,
  TrendingUp,
  Shield,
  Award,
  MessageSquareDot,
} from "lucide-react";
import { Property } from "@/interfaces/property";
import { formatRating } from "@/utils/format";

interface HostStatsProps {
  hostProperties: Property[];
  hostStats: {
    totalProperties: number;
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    responseTime: string;
    yearsHosting: number;
    occupancyRate: number;
    repeatGuests: number;
    isHostVerified: boolean;
  };
}

export default function HostStats({ hostProperties, hostStats }: HostStatsProps) {
  
  return (
  <>
    <Card className="lg:col-span-2 gradient-border">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-6">
                {/* Host Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-cool rounded-full flex items-center justify-center flex-shrink-0 p-1">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      {hostProperties.length > 0 &&
                      hostProperties[0].Host.user ? (
                        <Image
                          placeholder="blur"
                          blurDataURL="/blurImg.png"
                          src={
                            hostProperties[0].Host.user.image ||
                            `https://ui-avatars.com/api/?name=${hostProperties[0].Host.user.name}&background=random&color=fff`
                          }
                          alt={hostProperties[0].Host.user.name}
                          width={32}
                          height={32}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-gradient-cool" />
                      )}
                    </div>
                  </div>
                  {hostStats.isHostVerified && (
                    <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white border-2 border-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  )}
                </div>

                {/* Host Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-charcoal mb-2 tracking-tight">
                        {hostProperties.length > 0 ? (
                          hostProperties[0].Host.user.name
                        ) : (
                          "Unknown Host"
                        )}
                      </h1>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge
                          variant="outline"
                          className="border-gray-600 bg-gradient-cool text-white font-medium"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Superhost
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-900"
                        >
                          Property Host
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          <span className="font-medium">
                            {hostStats.totalProperties} Properties
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Bangalore, Karnataka</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{hostStats.yearsHosting} years hosting</span>
                        </div>
                      </div>
                    </div>

                    {hostProperties.length > 0 && (
                      <div className="flex items-center space-x-2 mt-4 sm:mt-0 bg-yellow-50 px-3 py-2 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold">
                          {formatRating(hostStats.averageRating)}
                          </span>
                          <span className="text-gray-600 text-sm">
                            ({hostStats.totalReviews} reviews)
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a href={`tel:${hostProperties[0]?.Host.contactNumber}`}>
                      <Button className="bg-gradient-cool text-white hover:opacity-90 font-medium">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Host
                      </Button>
                    </a>
                    <a href={`mailto:${hostProperties[0]?.Host?.user?.email}`}>
                      <Button variant="outline" className="font-medium">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${hostProperties[0]?.Host?.contactNumber.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-green-500 text-white hover:bg-green-600 border-green-500 font-medium">
                        <MessageSquareDot className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gradient-cool flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Host Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Response Rate
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {hostStats.responseRate}%
                  </span>
                </div>
                <Progress value={hostStats.responseRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Occupancy Rate
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {hostStats.occupancyRate}%
                  </span>
                </div>
                <Progress value={hostStats.occupancyRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Repeat Guests
                  </span>
                  <span className="text-sm font-bold text-purple-600">
                    {hostStats.repeatGuests}%
                  </span>
                </div>
                <Progress value={hostStats.repeatGuests} className="h-2" />
              </div>
              <div className="pt-2 border-t :border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Response Time
                  </span>
                  <span className="text-sm font-bold text-gradient-cool">
                    {hostStats.responseTime}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
    );
}
