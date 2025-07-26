import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (propertyId: string) => void;
  removeFromWishlist: (propertyId: string) => void;
  isLoading: boolean;
  isInWishlist: (propertyId: string) => boolean;
}

const getWishListItems = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required to fetch wishlist");
  }
  const response = await fetch(
    `/api/v1/wishList/getWishListByUserId/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }
  return response.json();
};

const addWishListItem = async ({ pgDataId, userId }: { pgDataId: string; userId: string }) => {
  if (!userId || !pgDataId) {
    throw new Error("User ID and Property ID are required");
  }
  const response = await fetch(`/api/v1/wishList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pgDataId, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to wishlist");
  }
  return response.json();
};


const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query to fetch wishlist
  const wishListData = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishListItems(user?.id || ""),
    enabled: !!user?.id,
  });

  // Mutation for adding to wishlist
  const { mutate: addWishListMutation } = useMutation({
    mutationFn: addWishListItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?.id] });
    },
    onError: (error: Error, variables) => {
      // Rollback optimistic update on error
      setWishlist(prev => prev.filter(id => id !== variables.pgDataId));
      console.error("Error adding to wishlist:", error);
    },
  });


  // Update local state when query data changes
  useEffect(() => {
    if (wishListData.data?.success && wishListData.data?.data) {
      const propertyIds = wishListData.data.data.map((item) => item.pgDataId);
      setWishlist(propertyIds);
    }
  }, [wishListData.data]);

  const addToWishlist = (propertyId: string) => {
    if (!user?.id) return;
    
    // Optimistic update
    setWishlist((prev) => [...prev, propertyId]);
    
    // API call
    addWishListMutation({ pgDataId: propertyId, userId: user.id });
  };

  const removeFromWishlist = (propertyId: string) => {
    if (!user?.id) return;
    
    // Optimistic update
    setWishlist(prev => prev.filter(id => id !== propertyId));
    
    // API call
    addWishListMutation({ pgDataId: propertyId, userId: user.id });
  };

  const isInWishlist = (propertyId: string) => {
    return wishlist.includes(propertyId);
  };

  return (
    <WishlistContext.Provider
      value={{ 
        isLoading: wishListData.isLoading, 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
