// Function to get an item from localStorage
export const getItemFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue; // Return defaultValue if item doesn't exist
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
    return defaultValue; // Return defaultValue on error
  }
};

// Function to set an item in localStorage
export const setItemIntoLocalStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
};

// Function to remove an item from localStorage
export const removeItemFromLocalStorage = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key “${key}”:`, error);
  }
};
