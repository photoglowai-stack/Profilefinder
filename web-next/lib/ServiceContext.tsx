"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceType } from './content';
import { getServiceColors } from './serviceColors';

interface ServiceContextType {
  selectedService: ServiceType;
  setSelectedService: (service: ServiceType) => void;
  colors: ReturnType<typeof getServiceColors>;
  searchTarget: string;
  setSearchTarget: (name: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<ServiceType>('dating');
  const [searchTarget, setSearchTarget] = useState<string>('');
  const colors = getServiceColors(selectedService);

  return (
    <ServiceContext.Provider value={{ selectedService, setSelectedService, colors, searchTarget, setSearchTarget }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
}
