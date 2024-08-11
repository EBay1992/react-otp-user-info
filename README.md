# React Application with OTP and User Info Forms (Portal Challenge)

## Disclaimer

As mentioned previously, I encountered some issues using the actual provided API.
Troubleshooting that issue consumed a significant portion of my time, and eventually, I decided to use mock data as a Plan B.
Since I assume that the main purpose of this challenge might be about programming style or problem-solving in general, I aimed to mock data to create the main functionality of the app as closely as possible to real client-server communication.

## Overview

This project is a React application that includes user authentication features such as OTP (One-Time Password) verification and user information collection. The application is built using React, TypeScript, and Zod for validation. In general, I tried to follow best practices for component structure and organization as much as possible.
The project also uses Prettier for code formatting and ESLint for linting and enforcing code style.

It's worth noting that in this trivial application, I avoided using dependencies such as global state management, as they may be unnecessary overhead.
The form validation could be done manually, but since sooner or later every project would need these features, I have included them in this case to showcase how they can be integrated into the application structure.

Features

- User Authentication: Users can log in using their mobile numbers and receive an OTP (since it depends on mock data it always would be `12345`) for verification.

- User Info Collection: After OTP verification, users can enter their first and last names.

- Form Validation: Zod is used for validating input fields to ensure correct data entry.
- Reusable Components: The application uses a general Input component (as an example of component library) that possibly could expand to handle different input types and displays error messages.
- Code Formatting: Prettier is used for consistent code formatting throughout the project.
- Linting: ESLint is used for linting and enforcing code style.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Components](#components)
- [Styling](#styling)
- [Performance Optimization](#performance-optimization)
- [Environment Variables](#environment-variables)

## Installation

To get started with this project, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/EBay1992/react-otp-user-info.git
cd react-otp-user-info
npm install
```

## Usage

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the development server and open the application in your default web browser.

## Features

- **User Authentication**: Users can log in using their mobile numbers and receive an OTP for verification (opt is always `12345`).
- **User Info Collection**: After OTP verification, users can enter their first and last names.
- **Form Validation**: Uses Zod for validating input fields to ensure correct data entry.
- **Reusable Components**: The application uses a general `Input` component that handles different input types and displays error messages.

## Folder Structure

The project follows a modular structure based on feature folders:

```
src
├── App.css
├── App.tsx
├── api
│   ├── Admin.types.ts
│   ├── Login.types.ts
│   └── mockApi.ts
├── assets
│   └── react.svg
├── components
│   ├── ErrorBoundary.tsx
│   ├── header
│   │   └── Header.tsx
│   ├── input
│   │   ├── Input.module.css
│   │   └── Input.tsx
│   └── navigation
│       ├── Navigation.module.css
│       └── Navigation.tsx
├── context
│   └── AuthContext.tsx
├── features
│   ├── admin
│   │   ├── Admin.tsx
│   │   └── index.tsx
│   └── login
│       ├── Login.tsx
│       ├── LoginForm.tsx
│       ├── OtpForm.tsx
│       ├── UserInfoForm.tsx
│       └── index.tsx
├── hooks
│   └── useAuth.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Components

### Input Component

The `Input` component is a reusable input field that supports various types of inputs (text, email, password, etc.) and includes label and error message functionality.

It's just as an example and could be expanded throughout the application's lifetime.

```typescript
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  type?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  control,
  placeholder,
  type = 'text',
  label,
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              className={styles.input}
              {...field}
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default Input;
```

### Forms

The application includes forms for OTP entry and user information collection, utilizing the `Input` component for input fields.

## Styling

The project uses CSS Modules for styling components. Each component can have its own CSS file, ensuring styles are scoped and do not conflict with other components.

## Performance Optimization

To ensure optimal performance, the application utilizes `useCallback` to memoize functions that are passed as props to child components. This prevents unnecessary re-renders by ensuring that functions are only recreated when their dependencies change.

For example, in the `Login` component, the `handleRequestOtp`, `handleConfirmOtp`, and `handleCreateUser` functions are wrapped in `useCallback`:

```typescript
const handleRequestOtp = useCallback(async (contact: string) => {
  // Logic for requesting OTP
}, []);

const handleConfirmOtp = useCallback(
  async (enteredOtp: string) => {
    // Logic for confirming OTP
  },
  [contact, login, setAccessToken]
);

const handleCreateUser = useCallback(
  async (firstName: string, lastName: string) => {
    // Logic for creating a new user
  },
  [contact, register]
);
```

By using `useCallback`, we ensure that these functions maintain referential equality across renders, which helps to optimize performance and reduce unnecessary re-renders in child components.

## Environment Variables

This project uses environment variables for configuration. To set up your local environment, create a `.env` file in the root of the project based on the provided `.env.example` file.

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the values in the `.env` file as needed for your local development environment.
