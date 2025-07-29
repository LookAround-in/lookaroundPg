'use client;'
import React, { createContext, useContext, ReactNode } from 'react';

interface PropertyContextType {
  propertyId?: string;
}

const PropertyContext = createContext<PropertyContextType>({});

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
  propertyId?: string;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children, propertyId }) => {
  return (
    <PropertyContext.Provider value={{ propertyId }}>
      {children}
    </PropertyContext.Provider>
  );
}; 