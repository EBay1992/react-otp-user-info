import { normalizePhoneNumber } from "@utils/transformation";
import { UserData } from "./Admin.types";
import { OtpResponse, ApiError, TokenResponse } from "./Login.types";
import { getItemFromLocalStorage, setItemIntoLocalStorage } from '@utils/storage/localStorage';
import { LOCAL_STORAGE_KEY } from "@utils/constants";

// Function to initialize mock user data
const initializeMockUsersData = (): UserData[] => {
  const storedUsers = getItemFromLocalStorage<UserData[]>(LOCAL_STORAGE_KEY, []);

  if (storedUsers.length >= 1) {
    return storedUsers;
  } else {
    const initialUsers: UserData[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: "Doe",
        contact: '+989120000000',
        token: "mockToken1"
      }
    ];
    setItemIntoLocalStorage(LOCAL_STORAGE_KEY, initialUsers);
    return initialUsers;
  }
};

// Initialize users data
const mockUsersData = initializeMockUsersData();

// Check if the user exists based on the contact number
export const checkUser = (contact: string): Promise<UserData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsersData.find((u) => normalizePhoneNumber(u.contact) === normalizePhoneNumber(contact));
      resolve(user || null);
    }, 1000);
  });
};

// Request an OTP for the user
export const requestOtp = (contact: string): Promise<OtpResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userExists = mockUsersData.some((u) => normalizePhoneNumber(u.contact) === normalizePhoneNumber(contact));
      if (userExists) {
        resolve({ message: 'OTP sent successfully' });
      } else {
        reject({ message: 'User not found', status: 404 } as ApiError);
      }
    }, 1000);
  });
};

// Confirm the OTP and return a token if successful
export const confirmOtp = (contact: string, value: string): Promise<TokenResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsersData.find((u) => normalizePhoneNumber(u.contact) === normalizePhoneNumber(contact));
      if (value === '12345' && user) { // Simulating OTP verification
        resolve({ token: user.token });
      } else {
        reject({ message: 'Invalid OTP', status: 400 } as ApiError);
      }
    }, 1000);
  });
};

// Get user data based on the access token
export const getUserData = (accessToken: string): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsersData.find((u) => u.token === accessToken);
      if (user) {
        resolve(user);
      } else {
        reject({ message: 'Unauthorized', status: 401 } as ApiError);
      }
    }, 1000);
  });
};

// Create a new user and add to the mock user data
export const createUser = (contact: string, firstName: string, lastName: string): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = mockUsersData.find((u) => normalizePhoneNumber(u.contact) === normalizePhoneNumber(contact));
      if (existingUser) {
        reject({ message: 'User already exists', status: 409 } as ApiError);
      } else {
        const newUser: UserData = {
          id: mockUsersData.length + 1,
          firstName,
          lastName,
          contact: normalizePhoneNumber(contact),
          token: `mockToken${mockUsersData.length + 1}`
        };
        mockUsersData.push(newUser);
        setItemIntoLocalStorage(LOCAL_STORAGE_KEY, mockUsersData); // Update local storage with new user
        resolve(newUser);
      }
    }, 1000);
  });
};
