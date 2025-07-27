"use client";
import { Property } from "@/interfaces/property";
import React from "react";
import { Star } from "lucide-react";

export default function Review(property: Property) {
  return (
    <div>
      {property.reviews.map((review, index) => (
        <div
          key={index}
          className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
        >
          <div className="flex items-start space-x-4">
            <img
              src={review.user.image || "/placeholder.svg"}
              alt={review.user.name}
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{review.user.name}</h4>
                <span className="text-sm text-gray-500">
                  {property.updatedAt.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < property.avgRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
