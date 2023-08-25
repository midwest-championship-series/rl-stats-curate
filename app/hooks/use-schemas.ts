import { useState, useEffect } from 'react';
import api from '../services/rl-stats';

export function useSchemas(modelsToFetch: string[]) {
  const [schemas, setSchemas] = useState<Record<string, any>>({});

  useEffect(() => {
    async function fetchAndCacheSchema() {
      const schemaPromises = modelsToFetch.map(model => api.get(`${model}/_schema`));

      try {
        const fetchedSchemasArray = await Promise.all(schemaPromises);
        
        const schemaObject = modelsToFetch.reduce((acc, modelName, index) => {
          acc[modelName] = fetchedSchemasArray[index];
          return acc;
        }, {});
        
        setSchemas(schemaObject);
      } catch (error) {
        console.error("Error fetching schemas:", error);
      }
    }
  
    fetchAndCacheSchema();
  }, []);

  return schemas;
}