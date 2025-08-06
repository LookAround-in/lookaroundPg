"use client";
import { Property } from "@/interfaces/property";
import React from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Edit, Trash2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { reviewFormSchema } from "@/schemas/property.schema";
import type { Review } from "@/interfaces/property";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";

const ReviewForm = dynamic(() => import("../forms/review-form"), {
  ssr: false,
});

const deleteReview = async (data: { reviewId: string; userId: string }) => {
  const response = await fetch(`/api/v1/reviews`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to create property: ${response.status} ${errorText}`
    );
  }

  return response.json();
};

interface ReviewProps {
  property: Property;
  refetchProperty: () => void;
}

export default function Review({
  property,
  refetchProperty,
}: ReviewProps) {
  const [showAllReviews, setShowAllReviews] = React.useState(false);
  const [editingReview, setEditingReview] = React.useState<Review | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const reviewsToShow = showAllReviews
    ? property.reviews
    : property.reviews.slice(0, 3) || [];
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    mode: "onSubmit",
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onMutate: async () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      refetchProperty();
    },
    onError: (error: Error) => {
      console.error("Delete mutation error:", error);
      toast({
        title: "Error",
        description: `Failed to delete review: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  function handleEdit(review) {
    setEditingReview(review);
    form.reset({
      comment: review.comment,
      rating: review.rating,
    });
  }
  async function handleDelete(review) {
    await deleteReviewMutation.mutateAsync({
      reviewId: review.id,
      userId: user.id,
    });
  }

  return (
    <div className="space-y-6">
      {reviewsToShow.map((review, index) =>
        review.id === editingReview?.id ? (
          <div
            key={index}
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
        ) : (
          <div
            key={index}
            className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
          >
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
                  <span className="text-sm text-gray-500">
                    {property?.updatedAt.toString().slice(0, 10)}
                  </span>
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
                  {user && user.id === review.user.id && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => handleEdit(review)}
                      >
                        <Edit className="h-1 w-1" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDelete(review)}
                        disabled={deleteReviewMutation.isPending}
                      >
                        <Trash2 className="h-1 w-1" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          </div>
        )
      )}
      {property.reviews.length > 3 && (
        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? "Show Less" : "View All Reviews"}
        </Button>
      )}
      {/* Add/Edit Review Form */}
        <ReviewForm
          property={property}
          refetchProperty={refetchProperty}
          editingReview={editingReview}
          setEditingReview={setEditingReview}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          form={form}
        />
    </div>
  );
}
