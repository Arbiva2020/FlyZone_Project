export const camelCaseToWords = (camelCaseString)  => {
    // Split the camelCase string into an array of words
    const words = camelCaseString.split(/(?=[A-Z])/);
  
    // Capitalize the first letter of each word and join them with spaces
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }