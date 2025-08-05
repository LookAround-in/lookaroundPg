"use client";
import { Property } from "@/interfaces/property";
import React from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import type { Review, User } from "@/interfaces/property";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

interface ReviewFormProps {
  property: Property;
  refetchProperty: () => void;
  editingReview: Review | null;
  setEditingReview: React.Dispatch<React.SetStateAction<Review | null>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  form: ReturnType<typeof useForm<z.infer<typeof reviewFormSchema>>>;
}

export default function ReviewForm({ property, refetchProperty, editingReview, setEditingReview, isSubmitting, setIsSubmitting ,form}: ReviewFormProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
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
          <p className="text-lg font-thin">Please <a href="/login" className="text-primary">login</a> to leave a review.</p>
        </div>
      )}
    </div>
  );
}