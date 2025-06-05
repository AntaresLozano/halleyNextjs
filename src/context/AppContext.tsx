'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  image: { url: string };
  service_items: Array<{
    id: string;
    name: string;
  }>;
}

interface AppContextType {
  heroData: any;
  aboutUsData: any;
  serviceSectionData: any;
  servicesData: Service[];
  blogsData: any;
  messageSectionData: any;
  allServiceItemsData: any;
  setHeroData: (data: any) => void;
  setAboutUsData: (data: any) => void;
  setServiceSectionData: (data: any) => void;
  setServicesData: (data: Service[]) => void;
  setBlogsData: (data: any) => void;
  setMessageSectionData: (data: any) => void;
  setAllServiceItemsData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [heroData, setHeroData] = React.useState<any>(null);
  const [aboutUsData, setAboutUsData] = React.useState<any>(null);
  const [serviceSectionData, setServiceSectionData] = React.useState<any>(null);
  const [servicesData, setServicesData] = React.useState<Service[]>([]);
  const [blogsData, setBlogsData] = React.useState<any>(null);
  const [messageSectionData, setMessageSectionData] = React.useState<any>(null);
  const [allServiceItemsData, setAllServiceItemsData] = React.useState<any>(null);

  return (
    <AppContext.Provider
      value={{
        heroData,
        aboutUsData,
        serviceSectionData,
        servicesData,
        blogsData,
        messageSectionData,
        allServiceItemsData,
        setHeroData,
        setAboutUsData,
        setServiceSectionData,
        setServicesData,
        setBlogsData,
        setMessageSectionData,
        setAllServiceItemsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 