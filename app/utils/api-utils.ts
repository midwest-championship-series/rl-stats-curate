export const constructPopulateEndpoint = (basePath, populateFields) => {
    const populateParams = populateFields.map(field => `populate=${field}`).join('&');
    return `${basePath}?${populateParams}`;
  }