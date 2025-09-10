/**
 * @description Defines the structure for a User object, aligning with the backend data model.
 * This interface is used throughout the application for type safety.
 */
export interface User {
  id: string; // UUID
  companyId: string; // UUID of the parent company
  email: string;
  role: 'employee' | 'admin' | 'super_admin';
  profileData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    deliveryAddress?: {
      street: string;
      city: string;
      zipCode: string;
      country: string;
    };
  };
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @description Represents the authentication state, including the user and their token.
 */
export interface AuthState {
  user: User | null;
  token: string | null;
}
