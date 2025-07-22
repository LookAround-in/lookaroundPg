"use client";
import React, {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { PgFormSchema } from "@/schemas/property.schema";
import {
  PropertyType,
  FurnishingType,
  MoveInStatus,
  SharingType,
  FurnitureType,
  AmenityType,
} from "@/interfaces/pg";
import { Button } from "@/components/ui/button";
import formatText from "@/utils/formatText";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type PgFormType = z.infer<typeof PgFormSchema>

const createProperty = async (formData: FormData) => {
  const response = await fetch('/api/v1/pg', {
    method: 'POST',
    body: formData, // Send FormData directly
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create property: ${response.status} ${errorText}`);
  }

  return response.json();
};

function AddPropertyForm() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPropertyMutation = useMutation({
    mutationFn: createProperty,
    onSuccess: (data) => {
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      setTimeout(() => {
        router.push('/admin/properties');
      }, 2000);
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
    },
  })

  const propertyForm = useForm<PgFormType>({
    resolver: zodResolver(PgFormSchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: PropertyType.COLIVE,
      foodIncluded: false,
      furnishing: FurnishingType.FURNISHED,
      address: "",
      latitude: 0.0,
      longitude: 0.0,
      furnitures: [],
      amenities: [],
      sharingTypes: [],
      pgRules: "",
      moveInStatus: MoveInStatus.IMMEDIATE,
      virtualTourUrl: "",
      images: [],
      rating: 0.0,
      reviews: [],
    },
  });

  //to be used only with array of objects
  const {
    fields: sharingTypeFields,
    append: appendSharingType,
    remove: removeSharingType,
  } = useFieldArray({
    control: propertyForm.control,
    name: "sharingTypes",
  });;

  const reviewFields = propertyForm.watch("reviews") || [];
  const appendReview = (value: string = "") => {
    propertyForm.setValue("reviews", [...reviewFields, value]);
  };
  const removeReview = (index: number) => {
    const updated = [...reviewFields];
    updated.splice(index, 1);
    propertyForm.setValue("reviews", updated);
  };

  const addSharingType = () => {
    appendSharingType({
      type: SharingType.SINGLE,
      description: "",
      price: 0.0,
      pricePerMonth: 0.0,
      deposit: 0.0,
      refundableAmount: 0.0,
      availability: 0.0,
    });
  };

  const addReview = () => {
    appendReview("");
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const files = event.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    setSelectedImages(prev => [...prev, ...newFiles])
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviews(prev => [...prev, e.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  function onPropertyFormSubmit(data: z.infer<typeof PgFormSchema>) {
    console.log("Property Form Data:", data);
    const formData = new FormData();
    
    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    formData.append("propertyType", data.propertyType || "");
    formData.append("foodIncluded", data.foodIncluded ? "true" : "false");
    formData.append("furnishing", data.furnishing || "");
    formData.append("address", data.address || "");
    formData.append("latitude", data.latitude?.toString() || "0");
    formData.append("longitude", data.longitude?.toString() || "0");
    formData.append("pgRules", data.pgRules || "");
    formData.append("moveInStatus", data.moveInStatus || "");
    formData.append("virtualTourUrl", data.virtualTourUrl || "");
    formData.append("rating", data.rating?.toString() || "0");
    // Add array fields as JSON strings
    formData.append("furnitures", JSON.stringify(data.furnitures || []));
    formData.append("amenities", JSON.stringify(data.amenities || []));
    formData.append("reviews", JSON.stringify(data.reviews || []));
    const transformedSharingTypes = data.sharingTypes.map(sharingType => ({
        ...sharingType,
        price: typeof sharingType.price === 'string' ? parseFloat(sharingType.price) || 0 : sharingType.price,
        pricePerMonth: typeof sharingType.pricePerMonth === 'string' ? parseFloat(sharingType.pricePerMonth) || 0 : sharingType.pricePerMonth,
        deposit: typeof sharingType.deposit === 'string' ? parseFloat(sharingType.deposit) || 0 : sharingType.deposit,
        refundableAmount: typeof sharingType.refundableAmount === 'string' ? parseFloat(sharingType.refundableAmount) || 0 : sharingType.refundableAmount,
        availability: typeof sharingType.availability === 'string' ? parseInt(sharingType.availability) || 0 : sharingType.availability,
      }));
    formData.append("sharingTypes", JSON.stringify(transformedSharingTypes));

    selectedImages.forEach((file) => {
        formData.append("images", file);
      });
    console.log("Final form data before submission", formData);
    createPropertyMutation.mutate(formData);
  }
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 border-2 border-pink-600 shadow-lg rounded-lg m-6">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <Form {...propertyForm}>
        <form
          onSubmit={propertyForm.handleSubmit(onPropertyFormSubmit)}
          className="space-y-8"
        >
          <FormField
            control={propertyForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Premium Boys PG in Koramangala"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A brief description of the property"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PropertyType</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(PropertyType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {formatText(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of property you are listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="foodIncluded"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg bg-pink-100 border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Food Included</FormLabel>
                  <FormDescription>
                    Toggle if food is included in the rent.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="furnishing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Furnishing</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Furnishing Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(FurnishingType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {formatText(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of furnishing for your property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Premium Boys PG in Koramangala"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Latitude</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Premium Boys PG in Koramangala"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's latitude.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Longitude</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Premium Boys PG in Koramangala"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's longitude.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Furnitures Multiselect */}
          <FormField
            control={propertyForm.control}
            name="furnitures"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Select Furnitures</FormLabel>
                  <FormDescription>
                    Select the furnitures available in the property.
                  </FormDescription>
                </div>
                {Object.values(FurnitureType).map((furniture) => (
                  <FormField
                    key={furniture}
                    control={propertyForm.control}
                    name="furnitures"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={furniture}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(furniture)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, furniture])
                                  : field.onChange(
                                      field.value.filter(
                                        (item) => item !== furniture
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {formatText(furniture)}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Select Amenities</FormLabel>
                  <FormDescription>
                    Select the amenities available in the property.
                  </FormDescription>
                </div>
                {Object.values(AmenityType).map((amenity) => (
                  <FormField
                    key={amenity}
                    control={propertyForm.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={amenity}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(amenity)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, amenity])
                                  : field.onChange(
                                      field.value.filter(
                                        (item) => item !== amenity
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {formatText(amenity)}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />

          <FormField
            control={propertyForm.control}
            name="pgRules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Rules</FormLabel>
                <FormControl>
                  <Input placeholder="No smoking, No pets, etc." {...field} />
                </FormControl>
                <FormDescription>
                  This is your property's rules.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="moveInStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Move-In Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Move-In Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(MoveInStatus).map((type) => (
                      <SelectItem key={type} value={type}>
                        {formatText(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the move-in status for your property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="virtualTourUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Virtual Tour URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/virtual-tour"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's virtual tour URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyForm.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Rating</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rate this property from 1 to 5"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's rating.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel className="text-lg font-semibold">
                  Property Reviews
                </FormLabel>
                <FormDescription>
                  Add text reviews from previous tenants or guests
                </FormDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addReview}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Review
              </Button>
            </div>
            {reviewFields.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                No reviews added yet. Click "Add Review" to get started.
              </div>
            )}

            {reviewFields.map((field, index) => (
              <div key={field} className="flex gap-2 items-start">
                <FormField
                  control={propertyForm.control}
                  name={`reviews.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="sr-only">
                        Review {index + 1}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Review ${
                            index + 1
                          }: "Great place to stay! Clean rooms and friendly staff..."`}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="default"
                  onClick={() => removeReview(index)}
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Sharing Type form */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel className="text-lg font-semibold">
                  Sharing Types
                </FormLabel>
                <FormDescription>
                  Add different sharing options with pricing details.
                </FormDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSharingType}
                className="flex items-center gap-2 hover:bg-primary hover:text-white"
              >
                <Plus className="h-4 w-4" />
                Add Sharing Type
              </Button>
            </div>

            {sharingTypeFields.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                No sharing types added yet. Click "Add Sharing Type" to get
                started.
              </div>
            )}

            {sharingTypeFields.map((field, index) => (
              <Card key={field.id} className="border-pink-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Sharing Type #{index + 1}
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSharingType(index)}
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sharing Type Selection */}
                  <FormField
                    control={propertyForm.control}
                    name={`sharingTypes.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sharing Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Sharing Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(SharingType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {formatText(type)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the type of sharing (Single, Double, Triple,
                          etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={propertyForm.control}
                    name={`sharingTypes.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Spacious single room with attached bathroom"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe this sharing type option
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pricing Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={propertyForm.control}
                      name={`sharingTypes.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price (₹)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="15000"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Base price for this sharing type
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={propertyForm.control}
                      name={`sharingTypes.${index}.pricePerMonth`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent (₹)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12000"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Monthly rental amount
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={propertyForm.control}
                      name={`sharingTypes.${index}.deposit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit (₹)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="25000"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Security deposit amount
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={propertyForm.control}
                      name={`sharingTypes.${index}.refundableAmount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Refundable Amount (₹)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="20000"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Amount refundable on checkout
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Availability */}
                  <FormField
                    control={propertyForm.control}
                    name={`sharingTypes.${index}.availability`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Slots</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="3"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Number of available slots for this sharing type
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Summary Card */}
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Summary
                    </h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>
                        Type:{" "}
                        {formatText(
                          propertyForm.watch(`sharingTypes.${index}.type`)
                        ) || "Not selected"}
                      </div>
                      <div>
                        Monthly Rent: ₹
                        {propertyForm.watch(
                          `sharingTypes.${index}.pricePerMonth`
                        ) || 0}
                      </div>
                      <div>
                        Deposit: ₹
                        {propertyForm.watch(`sharingTypes.${index}.deposit`) ||
                          0}
                      </div>
                      <div>
                        Available:{" "}
                        {propertyForm.watch(
                          `sharingTypes.${index}.availability`
                        ) || 0}{" "}
                        slots
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel className="text-lg font-semibold">
                  Property Images
                </FormLabel>
                <FormDescription>
                  Upload multiple images of your property.
                </FormDescription>
              </div>
              <div className="relative">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="flex items-center gap-2"
                  disabled={isSubmitting}
                ><Upload className="h-4 w-4" />
                  Select Images
                </Button>
              </div>
            </div>
             {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {selectedImages[index]?.name?.slice(0, 15)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
            {imagePreviews.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2 text-sm text-gray-600">
                  No images selected yet
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Click "Select Images" to add property photos
                </div>
              </div>
            )}
            {/* Upload Status */}
            {selectedImages.length > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-800">
                  <strong>{selectedImages.length}</strong> image(s) selected
                </div>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Property...' : 'Submit Property'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddPropertyForm;
