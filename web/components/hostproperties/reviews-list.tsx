"use client";
import React from "react";
import Image from "next/image";
import { Button } from "components/ui/button";
import {
  Star,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const fetchHostPropertyReviews = async (hostId: string) => {
  const response = await fetch(`/api/v1/reviews/getAllReviews/${hostId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export default function HostPropertyReviews ({ hostId }: { hostId: string }) {
  const hostPropertyReviewsData = useQuery({
    queryKey: ["hostPropertyReviews", hostId],
    queryFn: () => fetchHostPropertyReviews(hostId as string),
    enabled: !!hostId,
  });

  const reviews = hostPropertyReviewsData.data?.data || [];
  return (
    <div>
      {hostPropertyReviewsData.isLoading && (
        <div
            className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0 animate-pulse"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
      )}
      {!hostPropertyReviewsData.isLoading && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-200 last:border-b-0 p-6 shadow-md rounded-lg mb-2 last:mb-0"
                  >
                    <div className="flex flex-row items-center justify-between mb-2">
                      <p className="text-gray-900 text-xl">{review?.pgData?.title}</p>
                      <Button variant="link">
                        <Link href={`/property/${review?.pgData?.id}`}>View Details</Link>
                      </Button>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Image
                        placeholder="blur"
                        blurDataURL="/blurImg.png"
                        src={
                          review.user.image ||
                          `https://ui-avatars.com/api/?name=${review.user.name}&background=random`
                        }
                        alt={review.user.name}
                        width={32}
                        height={32}
                        className="w-10 h-10 rounded-full bg-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{review.user.name}</h4>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))): (
                  <div className="text-center py-12">
                    <p className="text-gray-600">
                      No reviews available for this host yet.
                    </p>
                  </div>
                )}
      </div>
  );
}