export const determineDefaultDisplayField = (fieldSchema, allSchemas) => {
    if (!fieldSchema.populate) return null;
  
    const targetSchema = allSchemas[fieldSchema.populate];
    if (!targetSchema) return null;
  
    const defaultDisplayKey = Object.keys(targetSchema).find(
      key => targetSchema[key].default_display_text
    );
  
    return defaultDisplayKey;
  }

export const getPopulateFields = (schema: any) => {
    return Object.values<any>(schema)
        .filter(field => field.populate)
        .map(field => field.populate);
}