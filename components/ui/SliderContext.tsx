'use client'
import React, { createContext, useContext, useState } from 'react';

const SliderContext = createContext<{ value: number; setValue: (value: number) => void } | undefined>(undefined);

export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState({ daytime: 12 * 60, month: 5 }); // Default to 12:00

  return (
    <SliderContext.Provider value={{ value, setValue }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('useSlider must be used within a SliderProvider');
  }
  return context;
};