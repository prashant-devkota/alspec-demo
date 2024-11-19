export const generatePatchDocument = (property: any, newValue: any) => {
    return [{ op: 'replace', path: `/${property}`, value: newValue }];
  };
  
  const usePatchDocument = () => {
    return generatePatchDocument;
  };
  
  export default usePatchDocument;
  