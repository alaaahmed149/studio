
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string; // URL to user's avatar image
}

export interface Cat {
  id: string;
  name: string;
  images: string[]; // Array of image URLs
  age: number; // in years
  breed: string;
  gender: 'Male' | 'Female' | 'Unknown';
  story: string;
  healthCondition: string;
  behavior: string;
  location: string;
  postedBy: string; // User ID of the owner
  postedDate: string; // ISO date string
  adoptionStatus: 'available' | 'pending' | 'adopted';
}

export interface AdoptionRequest {
  id: string;
  catId: string;
  requesterId: string; // User ID of the person requesting adoption
  ownerId: string; // User ID of the cat owner
  message: string; // Predefined questions and answers, or a simple message
  status: 'pending' | 'accepted' | 'rejected';
  requestDate: string; // ISO date string
}

// For forms
export type CatFormData = Omit<Cat, 'id' | 'postedBy' | 'postedDate' | 'adoptionStatus'> & {
  // Allow for temporary image file handling if needed, or expect URLs
  images: (File | string)[];
};

export type AdoptionRequestFormData = {
  message: string;
  // Example predefined questions if any
  q1?: string;
  q2?: string;
};
