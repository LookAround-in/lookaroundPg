"use client";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  PropertyType,
  FurnishingType,
  MoveInStatus,
  SharingType,
  FurnitureType,
  AmenityType,
  FacilityIconsType,
} from "@/interfaces/pg";
import { Button } from "@/components/ui/button";
import formatText from "@/utils/format";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Upload, X, Image as ImageIcon , Check, ChevronsUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Property } from "@/interfaces/property";
interface EditFormType {
  title: string;
  hostId: string;
  description: string;
  propertyType: PropertyType;
  foodIncluded: boolean;
  furnishing: FurnishingType;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  furnitures: FurnitureType[];
  amenities: AmenityType[];
  nearbyFacilities: Array<{
    title: string;
    icon: string;
    distance: string;
  }>;
  sharingTypes: Array<{
    type: SharingType;
    description: string;
    pricePerMonth: number;
    deposit: number;
    refundableAmount: number;
    availability: number;
  }>;
  pgRules: string;
  moveInStatus: MoveInStatus;
  virtualTourUrl: string;
  images?: string[];
  existingImages?: string[];
}

const updateProperty = async (formData: FormData, pgId: string) => {
  const response = await fetch(`/api/v1/pg/${pgId}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to create property: ${response.status} ${errorText}`
    );
  }

  return response.json();
};

const getAllHosts = async () => {
  const response = await fetch(`/api/v1/host`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch hosts: ${response.status} ${errorText}`);
  }
  return response.json();
};

function EditPropertyForm({ property }: { property: Property | null }) {
  const [formIsReady, setFormIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(property?.images || []);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: hostsData } = useQuery({
    queryKey: ["hosts"],
    queryFn: getAllHosts,
  });
  const hosts = hostsData?.data || [];

  const updatePropertyMutation = useMutation({
    mutationFn: (data: FormData) => updateProperty(data, property?.id),
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data) => {
      setIsSubmitting(false);
      propertyForm.reset();
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      setTimeout(() => {
        router.push("/admin/properties");
      }, 2000);
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: `Failed to create property: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
      const newFiles = Array.from(files);
      setSelectedImages((prev) => [...prev, ...newFiles]);
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImagePreviews((prev) => [...prev, e.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
      event.target.value = "";
    };
  
  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const propertyForm = useForm<EditFormType>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      hostId: "",
      description: "",
      propertyType: PropertyType.COLIVE,
      foodIncluded: false,
      furnishing: FurnishingType.FURNISHED,
      address: "",
      latitude: 0,
      longitude: 0,
      city: "",
      furnitures: [],
      amenities: [],
      nearbyFacilities: [],
      sharingTypes: [],
      pgRules: "",
      moveInStatus: MoveInStatus.IMMEDIATE,
      virtualTourUrl: "",
      images: [],
      existingImages: [],
    },
  });

  // Reset form when property data changes
  useEffect(() => {
    if (property) {
      const formData = {
        title: property.title || "",
        hostId: property.hostId || "",
        description: property.description || "",
        propertyType: property.propertyType as PropertyType || PropertyType.COLIVE,
        foodIncluded: property.foodIncluded || false,
        furnishing: property.furnishing as FurnishingType || FurnishingType.FURNISHED,
        address: property.address || "",
        latitude: property.latitude || 0,
        longitude: property.longitude || 0,
        city: property.city || "",
        furnitures: property.furnitures?.map(f => f.type as FurnitureType) || [],
        amenities: property.amenities?.map(a => a.type as AmenityType) || [],
        nearbyFacilities: property.nearbyFacilities || [],
        sharingTypes: property.sharingTypes?.map(st => ({
          type: st.type as SharingType,
          description: st.description || "",
          pricePerMonth: Number(st.pricePerMonth) || 0,
          deposit: Number(st.deposit) || 0,
          refundableAmount: Number(st.refundableAmount) || 0,
          availability: Number(st.availability) || 1,
        })) || [],
        pgRules: property.pgRules || "",
        moveInStatus: (property.moveInStatus as MoveInStatus) || MoveInStatus.IMMEDIATE,
        virtualTourUrl: property.virtualTourUrl || "",
      };

      console.log("Form data being set:", formData);
      propertyForm.reset(formData);
      setTimeout(() => {
        propertyForm.setValue("hostId", formData.hostId);
        propertyForm.setValue("propertyType", formData.propertyType);
        propertyForm.setValue("furnishing", formData.furnishing);
        propertyForm.setValue("moveInStatus", formData.moveInStatus);  
      }, 200);
      setExistingImages(property.images || []);
      setFormIsReady(true);
    }
  }, [property, propertyForm]);

  const {
    fields: sharingTypeFields,
    append: appendSharingType,
    remove: removeSharingType,
  } = useFieldArray({
    control: propertyForm.control,
    name: "sharingTypes",
  });

  const addSharingType = () => {
    appendSharingType({
      type: SharingType.SINGLE,
      description: "",
      pricePerMonth: 0,
      deposit: 0,
      refundableAmount: 0,
      availability: 1,
    });
  };

  const {fields: nearbyFacilitiesFields, append: appendNearbyFacility, remove: removeNearbyFacility} = useFieldArray({
    control: propertyForm.control,
    name: "nearbyFacilities"
  })

  const addNearbyFacility = () => {
    appendNearbyFacility({
      title: "",
      icon: "",
      distance: "",
    })
  }

  const onSubmit = async (data: EditFormType) => {
    try {
      const currentValues = propertyForm.getValues();
      console.log("Current form values:", currentValues);
      const safeData = {
        ...data,
        hostId: data.hostId || currentValues.hostId || "",
        propertyType: data.propertyType || currentValues.propertyType || PropertyType.COLIVE,
        furnishing: data.furnishing || currentValues.furnishing || FurnishingType.FURNISHED,
        moveInStatus: data.moveInStatus || currentValues.moveInStatus || MoveInStatus.IMMEDIATE,
        images: data.images || currentValues.images || [],
        sharingTypes: (data.sharingTypes || currentValues.sharingTypes || []).map(st => ({
          type: st.type || SharingType.SINGLE,
          description: st.description || "",
          pricePerMonth: Number(st.pricePerMonth) || 0,
          deposit: Number(st.deposit) || 0,
          refundableAmount: Number(st.refundableAmount) || 0,
          availability: Number(st.availability) || 1,
        })),
        latitude: Number(data.latitude) || Number(currentValues.latitude),
        longitude: Number(data.longitude) || Number(currentValues.longitude),
        city : data.city || currentValues.city || "",
      };
      
      console.log("Safe data being sent:", safeData);
      const formData = new FormData();
      // Add basic form fields - using validated data from React Hook Form
      formData.append("title", safeData.title);
      formData.append("hostId", safeData.hostId);
      formData.append("description", safeData.description);
      formData.append("propertyType", safeData.propertyType);
      formData.append("foodIncluded", safeData.foodIncluded.toString());
      formData.append("furnishing", safeData.furnishing);
      formData.append("address", safeData.address);
      formData.append("latitude", safeData.latitude.toString());
      formData.append("longitude", safeData.longitude.toString());
      formData.append("city", safeData.city);
      formData.append("pgRules", safeData.pgRules || "");
      formData.append("moveInStatus", safeData.moveInStatus);
      if (safeData.virtualTourUrl && safeData.virtualTourUrl.trim() !== "") {
         formData.append("virtualTourUrl", safeData.virtualTourUrl.trim());
      }
      // Add array fields as JSON strings
      formData.append("nearbyFacilities", JSON.stringify(safeData.nearbyFacilities || []));
      formData.append("furnitures", JSON.stringify(safeData.furnitures));
      formData.append("amenities", JSON.stringify(safeData.amenities));
      formData.append("sharingTypes", JSON.stringify(safeData.sharingTypes));
      formData.append("existingImages", JSON.stringify(existingImages || []));
      // Add images
      selectedImages.forEach((file) => {
        formData.append("images", file);
      });
      
      await updatePropertyMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: `Failed to prepare form data: ${error}`,
        variant: "destructive",
      });
    }
  };

  const watchedPropertyType = propertyForm.watch("propertyType");
  const watchedFurnishing = propertyForm.watch("furnishing");
  const watchedMoveInStatus = propertyForm.watch("moveInStatus");

  if (!formIsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <img src="/logo.png" alt="Loading" className="animate-spin sm:h-24 sm:w-24 h-16 w-16 animate-bounce" />
          <p className="text-gray-900 font-thin text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 border-2 border-pink-600 shadow-lg rounded-lg m-2 sm:m-6">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <Form {...propertyForm}>
        <form
          onSubmit={propertyForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={propertyForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Premium Boys PG in Koramangala"
                    {...field}
                    value={field.value || ""}
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
            name="hostId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                    <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >{
                      field.value ? 
                        hosts.find(
                          (host) => host.id === field.value
                        )?.user?.name
                       : "Select Host"
                    }
                    <ChevronsUpDown className="opacity-50"/>
                    </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Host found.</CommandEmpty>
                      <CommandGroup>
                        {hosts.map((host) => (
                          <CommandItem
                            value={host?.user?.name}
                            key={host.id}
                            onSelect={() => {
                              propertyForm.setValue("hostId", host.id)
                            }}
                          >
                            {formatText(host?.user?.name)} ({formatText(host?.contactNumber)})
                            <Check
                              className={cn(
                                "ml-auto",
                                host.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the host of the property.
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
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A brief description of the property"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Property Type Select - Add proper default handling */}
          <FormField
            control={propertyForm.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type *</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    propertyForm.setValue("propertyType", value as PropertyType);
                  }}
                  value={watchedPropertyType || PropertyType.COLIVE}
                >
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
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Furnishing Select - Fix this one specifically */}
          <FormField
            control={propertyForm.control}
            name="furnishing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Furnishing *</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    propertyForm.setValue("furnishing", value as FurnishingType);
                  }}
                  value={watchedFurnishing || FurnishingType.FURNISHED}
                >
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={propertyForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Address *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main Street, Koramangala, Bangalore"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Enter the complete address of your property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={propertyForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <Select
                  onValueChange={(value)=>{
                    field.onChange(value);
                    propertyForm.setValue("city", value as string);
                  }}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Bangalore", "Hyderabad", "Chennai"].map((type) => (
                      <SelectItem key={type} value={type}>
                        {formatText(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the city where your property is located.
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
                    placeholder="12.9716"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's latitude coordinate.
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
                    placeholder="77.5946"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  This is your property's longitude coordinate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                checked={
                                  Array.isArray(field.value) && field.value.includes(furniture)
                                }
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  return checked
                                    ? field.onChange([
                                        ...currentValue,
                                        furniture,
                                      ])
                                    : field.onChange(
                                        currentValue.filter(
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
                </div>
                <FormMessage />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                checked={
                                  Array.isArray(field.value) && field.value.includes(amenity)
                                }
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValue, amenity])
                                    : field.onChange(
                                        currentValue.filter(
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
                </div>
                <FormMessage />
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
                  <Input
                    placeholder="No smoking, No pets, etc."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Enter any specific rules for your property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Move-In Status Select */}
          <FormField
            control={propertyForm.control}
            name="moveInStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Move-In Status *</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    propertyForm.setValue("moveInStatus", value as MoveInStatus);
                  }}
                  value={watchedMoveInStatus || MoveInStatus.IMMEDIATE}
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
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Add a virtual tour URL for your property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel className="text-lg font-semibold">
                  Nearby Facilities *
                </FormLabel>
                <FormDescription>
                  Add different nearby facilities with details.
                </FormDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addNearbyFacility}
                className="flex items-center gap-2 hover:bg-primary hover:text-white"
              >
                <Plus className="h-4 w-4" />
                Add Nearby Facility
              </Button>
            </div>

            {nearbyFacilitiesFields.map((field, index) => (
              <Card key={field.id} className="border-pink-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Nearby Facility #{index + 1} *
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNearbyFacility(index)}
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={propertyForm.control}
                      name={`nearbyFacilities.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facility Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Gym, Pool, etc."
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Name of the nearby facility
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={propertyForm.control}
                      name={`nearbyFacilities.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facility Icon</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Facility Icon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(FacilityIconsType).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type} {formatText(Object.keys(FacilityIconsType).find(key => FacilityIconsType[key] === type) || "")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Icon representing the nearby facility
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={propertyForm.control}
                      name={`nearbyFacilities.${index}.distance`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Distance (km) *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="2"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Distance to the facility in kilometers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sharing Types section with improved validation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel className="text-lg font-semibold">
                  Sharing Types *
                </FormLabel>
                <FormDescription>
                  Add different sharing options with pricing details. At least
                  one is required.
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
              <div className="text-center py-4 text-red-500 text-sm border-2 border-dashed border-red-300 rounded-lg">
                No sharing types added yet. Click "Add Sharing Type" to get
                started. At least one is required.
              </div>
            )}

            {sharingTypeFields.map((field, index) => (
              <Card key={field.id} className="border-pink-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Sharing Type #{index + 1} *
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
                  <FormField
                    control={propertyForm.control}
                    name={`sharingTypes.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sharing Type *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value || SharingType.SINGLE}
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

                  <FormField
                    control={propertyForm.control}
                    name={`sharingTypes.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Spacious single room with attached bathroom"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe this sharing type option
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={propertyForm.control}
                      name={`sharingTypes.${index}.pricePerMonth`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent (₹) *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12000"
                              {...field}
                              value={field.value || ""}
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
                          <FormLabel>Security Deposit (₹) *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="25000"
                              {...field}
                              value={field.value || ""}
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
                          <FormLabel>Refundable Amount (₹) *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="20000"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Amount refundable on checkout
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={propertyForm.control}
                      name={`sharingTypes.${index}.availability`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Slots *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="3"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Number of available slots for this sharing type
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Summary Card - same as before */}
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Summary
                    </h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>
                        Type:{" "}
                        {
                          propertyForm.watch(`sharingTypes.${index}.type`)
                         || "Not selected"}
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

          {/* For existing images with option to remove the images that are already there */}
          <div className="space-y-4">
            {existingImages.length > 0 && (
              <>
              <p className="text-xl">Existing Images, use the <strong>remove</strong> button to delete any unwanted images.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {existingImages.map((image, index) => (
                   <div key={index} className="relative group">
                     <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                       <img
                         src={image}
                         alt={`Existing Image ${index + 1}`}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <Button
                       type="button"
                       variant="destructive"
                       size="sm"
                       onClick={() => removeExistingImage(index)}
                       className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <X className="h-3 w-3" />
                     </Button>
                     
                   </div>
                 ))}
              </div>
              </>
            )}
          </div>

           {/* Images section - same as before but with required indication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel className="text-lg font-semibold">
                  Property Images *
                </FormLabel>
                <FormDescription>
                  Upload upto 10 images of your property. At least one image is
                  required.
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
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="flex items-center gap-2 hover:bg-primary hover:text-white"
                  disabled={isSubmitting}
                >
                  <Upload className="h-4 w-4" />
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
              <div className="text-center py-8 border-2 border-dashed border-red-300 rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-red-400" />
                <div className="mt-2 text-sm text-red-600">
                  No images selected yet - Required
                </div>
                <div className="mt-1 text-xs text-red-500">
                  Click "Select Images" to add property photos
                </div>
              </div>
            )}

            {selectedImages.length > 0 && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm text-green-800">
                  ✓ <strong>{selectedImages.length}</strong> image(s) selected
                </div>
              </div>
            )}
          </div>

          {/* Submit Button Section */}
          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || updatePropertyMutation.isPending}
            >
              {isSubmitting || updatePropertyMutation.isPending
                ? "Updating Property..."
                : "Update Property"}
            </Button>
            {updatePropertyMutation.isError && (
              <div className="text-center p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">
                Error:{" "}
                {updatePropertyMutation.error?.message ||
                  "Something went wrong"}
              </div>
            )}
            {updatePropertyMutation.isSuccess && (
              <div className="text-center p-3 bg-green-100 text-green-700 border border-green-300 rounded-md">
                Property updated successfully! Redirecting...
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EditPropertyForm;