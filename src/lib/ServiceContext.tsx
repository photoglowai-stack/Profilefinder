import { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceType } from './content';
import { getServiceColors } from './serviceColors';

interface ServiceContextType {
  selectedService: ServiceType;
  setSelectedService: (service: ServiceType) => void;
  colors: ReturnType<typeof getServiceColors>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<ServiceType>('dating');
  const colors = getServiceColors(selectedService);

  return (
    <ServiceContext.Provider value={{ selectedService, setSelectedService, colors }}>
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
