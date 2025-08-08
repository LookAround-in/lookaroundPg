"use client";
import { Property } from "@/interfaces/property";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, Edit, Trash2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { reviewFormSchema } from "@/schemas/property.schema";
import type { Review } from "@/interfaces/property";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const createReview = async (data: {
  userId: string;
  pgDataId: string;
  comment: string;
  rating: number;
}) => {
  const response = await fetch("/api/v1/reviews", {
    method: "POST",
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
const updateReview = async (data: {
  reviewId: string;
  userId: string;
  comment: string;
  rating: number;
}) => {
  const response = await fetch(`/api/v1/reviews`, {
    method: "PUT",
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

export default function Review({
  property,
  refetchProperty,
}: {
  property: Property;
  refetchProperty: () => void;
}) {
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

  React.useEffect(() => {
    if (!editingReview) {
      form.reset({
        comment: "",
        rating: 0,
      });
    }
  }, [editingReview, form]);

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      setIsSubmitting(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      refetchProperty();
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: `Failed to create review: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  const updateReviewMutation = useMutation({
    mutationFn: updateReview,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data) => {
      setEditingReview(null);
      form.reset();
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      refetchProperty();
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: `Failed to update review: ${error.message}`,
        variant: "destructive",
      });
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

  async function onSubmit(data: z.infer<typeof reviewFormSchema>) {
    try {
      if (editingReview) {
        await updateReviewMutation.mutateAsync({
          reviewId: editingReview.id,
          userId: user.id,
          rating: data.rating,
          comment: data.comment,
        });
      } else {
        await createReviewMutation.mutateAsync({
          userId: user.id,
          pgDataId: property.id,
          rating: data.rating,
          comment: data.comment,
        });
      }
      setEditingReview(null);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: `Failed to submit review: ${error}`,
        variant: "destructive",
      });
    }
  }

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
                    {property.updatedAt.split("T")[0]}
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
      {user ? (
        <Form {...form}>
          <p className="text-lg font-semibold">
            {editingReview ? "Edit Review" : "Add a Review"}
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Comment</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <Textarea
                        placeholder="Tell us a little bit about your experience"
                        className="resize-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Select Rating</FormLabel>
                  </div>
                  <div className="flex flex-row gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FormField
                        key={star}
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem
                            key={star}
                            className="flex flex-row items-center gap-2"
                          >
                            <FormControl>
                              <label htmlFor={`rating-${star}`}>
                                <Star
                                  id={`rating-${star}`}
                                  className={`h-6 w-6 cursor-pointer transition-colors ${
                                    form.getValues("rating") >= star
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                  onClick={() => form.setValue("rating", star)}
                                  data-testid={`star-${star}`}
                                />
                              </label>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-gradient-cool hover:opacity-90">
              {editingReview ? "Update Review" : "Submit"}
            </Button>
          </form>
        </Form>
      ): (
        <div>
          <p className="text-lg font-thin">Please <Link href="/login" className="text-primary">login</Link> to leave a review.</p>
        </div>
      )}
    </div>
  );
}
