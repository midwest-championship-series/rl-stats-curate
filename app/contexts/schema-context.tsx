import React, { createContext, useContext, ReactNode } from 'react';
import { useSchemas } from '@/app/hooks/use-schemas';

const SchemaContext = createContext<Record<string, any> | undefined>(undefined);

type SchemaProviderProps = {
  children: ReactNode;
};

export const SchemaProvider: React.FC<SchemaProviderProps> = ({ children }) => {
  const schemas = useSchemas(['players', 'teams']);
  return (
    <SchemaContext.Provider value={schemas}>
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchema = () => {
  const context = useContext(SchemaContext);
  if (context === undefined) {
    throw new Error('useSchema must be used within a SchemaProvider');
  }
  return context;
};