import type { Cat, User, AdoptionRequest } from '@/types';

export const mockUsers: User[] = [
  { id: 'user1', name: 'Alice Wonderland', email: 'alice@example.com', avatarUrl: 'https://picsum.photos/seed/alice/100/100' },
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com', avatarUrl: 'https://picsum.photos/seed/bob/100/100' },
  { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://picsum.photos/seed/charlie/100/100' },
];

export let mockCats: Cat[] = [
  {
    id: 'cat1',
    name: 'Whiskers',
    images: ['https://picsum.photos/seed/cat1_1/600/400', 'https://picsum.photos/seed/cat1_2/600/400'],
    age: 2,
    breed: 'Siamese',
    gender: 'Male',
    story: 'Whiskers is a playful and affectionate cat looking for a loving home. He enjoys chasing laser pointers and napping in sunny spots.',
    healthCondition: 'Excellent, vaccinated and neutered.',
    behavior: 'Friendly, active, loves cuddles.',
    location: 'New York, NY',
    postedBy: 'user1',
    postedDate: new Date('2024-06-15T10:00:00Z').toISOString(),
    adoptionStatus: 'available',
  },
  {
    id: 'cat2',
    name: 'Mittens',
    images: ['https://picsum.photos/seed/cat2_1/600/400', 'https://picsum.photos/seed/cat2_2/600/400'],
    age: 5,
    breed: 'Persian',
    gender: 'Female',
    story: 'Mittens is a calm and gentle soul who loves quiet afternoons and soft blankets. She is a bit shy at first but warms up quickly.',
    healthCondition: 'Good, requires regular grooming.',
    behavior: 'Calm, shy, affectionate once comfortable.',
    location: 'San Francisco, CA',
    postedBy: 'user2',
    postedDate: new Date('2024-07-01T14:30:00Z').toISOString(),
    adoptionStatus: 'available',
  },
  {
    id: 'cat3',
    name: 'Shadow',
    images: ['https://picsum.photos/seed/cat3_1/600/400'],
    age: 1,
    breed: 'Bombay',
    gender: 'Male',
    story: 'Shadow is an energetic kitten full of curiosity. He loves exploring and playing with toys. He gets along well with other cats.',
    healthCondition: 'Excellent, vaccinated.',
    behavior: 'Energetic, curious, playful.',
    location: 'Chicago, IL',
    postedBy: 'user1',
    postedDate: new Date('2024-07-10T09:00:00Z').toISOString(),
    adoptionStatus: 'pending',
  },
  {
    id: 'cat4',
    name: 'Luna',
    images: ['https://picsum.photos/seed/cat4_1/600/400', 'https://picsum.photos/seed/cat4_2/600/400', 'https://picsum.photos/seed/cat4_3/600/400'],
    age: 3,
    breed: 'Maine Coon',
    gender: 'Female',
    story: 'Luna is a majestic and friendly cat with a beautiful fluffy coat. She enjoys being petted and is very social.',
    healthCondition: 'Very good, spayed.',
    behavior: 'Social, friendly, vocal.',
    location: 'Austin, TX',
    postedBy: 'user3',
    postedDate: new Date('2024-05-20T12:00:00Z').toISOString(),
    adoptionStatus: 'adopted',
  },
  {
    id: 'cat5',
    name: 'Oliver',
    images: ['https://picsum.photos/seed/cat5_1/600/400'],
    age: 0.5, // 6 months
    breed: 'Tabby Mix',
    gender: 'Male',
    story: 'Oliver is a sweet and adventurous kitten. He was found as a stray and is now looking for his forever family.',
    healthCondition: 'Good, dewormed and first vaccinations.',
    behavior: 'Sweet, adventurous, loves to play.',
    location: 'Boston, MA',
    postedBy: 'user2',
    postedDate: new Date('2024-07-20T16:00:00Z').toISOString(),
    adoptionStatus: 'available',
  }
];

export let mockAdoptionRequests: AdoptionRequest[] = [
  {
    id: 'req1',
    catId: 'cat3', // Shadow
    requesterId: 'user2', // Bob
    ownerId: 'user1', // Alice
    message: 'I have a big house and experience with Bombay cats. Shadow would be very happy here!',
    status: 'pending',
    requestDate: new Date('2024-07-12T10:00:00Z').toISOString(),
  },
  {
    id: 'req2',
    catId: 'cat4', // Luna
    requesterId: 'user1', // Alice
    ownerId: 'user3', // Charlie
    message: 'Luna is beautiful! I would love to give her a home.',
    status: 'accepted',
    requestDate: new Date('2024-05-22T11:00:00Z').toISOString(),
  },
];

// --- Data Access Functions (Simulated) ---

export const getCats = async (filters?: { age?: number; breed?: string; gender?: string; location?: string }): Promise<Cat[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  let filteredCats = mockCats;
  if (filters) {
    if (filters.age) {
      filteredCats = filteredCats.filter(cat => cat.age === filters.age);
    }
    if (filters.breed) {
      filteredCats = filteredCats.filter(cat => cat.breed.toLowerCase().includes(filters.breed!.toLowerCase()));
    }
    if (filters.gender) {
      filteredCats = filteredCats.filter(cat => cat.gender === filters.gender);
    }
    if (filters.location) {
      filteredCats = filteredCats.filter(cat => cat.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
  }
  return filteredCats.filter(cat => cat.adoptionStatus === 'available' || cat.adoptionStatus === 'pending');
};

export const getCatById = async (id: string): Promise<Cat | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCats.find(cat => cat.id === id);
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockUsers.find(user => user.id === id);
};

export const addCat = async (catData: Omit<Cat, 'id' | 'postedDate' | 'adoptionStatus'>): Promise<Cat> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newCat: Cat = {
    ...catData,
    id: `cat${mockCats.length + 1}`,
    postedDate: new Date().toISOString(),
    adoptionStatus: 'available',
  };
  mockCats.push(newCat);
  return newCat;
};

export const updateCat = async (catId: string, updates: Partial<Cat>): Promise<Cat | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const catIndex = mockCats.findIndex(cat => cat.id === catId);
  if (catIndex !== -1) {
    mockCats[catIndex] = { ...mockCats[catIndex], ...updates };
    return mockCats[catIndex];
  }
  return undefined;
};

export const deleteCat = async (catId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const initialLength = mockCats.length;
  mockCats = mockCats.filter(cat => cat.id !== catId);
  return mockCats.length < initialLength;
};


export const getAdoptionRequestsByRequester = async (requesterId: string): Promise<AdoptionRequest[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAdoptionRequests.filter(req => req.requesterId === requesterId);
};

export const getAdoptionRequestsForOwner = async (ownerId: string): Promise<AdoptionRequest[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAdoptionRequests.filter(req => req.ownerId === ownerId);
};

export const addAdoptionRequest = async (requestData: Omit<AdoptionRequest, 'id' | 'requestDate' | 'status'>): Promise<AdoptionRequest> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newRequest: AdoptionRequest = {
    ...requestData,
    id: `req${mockAdoptionRequests.length + 1}`,
    requestDate: new Date().toISOString(),
    status: 'pending',
  };
  mockAdoptionRequests.push(newRequest);

  // If this is for a cat that was previously 'available', mark it as 'pending'
  const cat = mockCats.find(c => c.id === requestData.catId);
  if (cat && cat.adoptionStatus === 'available') {
    cat.adoptionStatus = 'pending';
  }
  
  return newRequest;
};

export const updateAdoptionRequestStatus = async (requestId: string, status: 'accepted' | 'rejected'): Promise<AdoptionRequest | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const requestIndex = mockAdoptionRequests.findIndex(req => req.id === requestId);
  if (requestIndex !== -1) {
    mockAdoptionRequests[requestIndex].status = status;
    const updatedRequest = mockAdoptionRequests[requestIndex];

    // If accepted, update cat status to 'adopted' and reject other pending requests for the same cat
    if (status === 'accepted') {
      const cat = mockCats.find(c => c.id === updatedRequest.catId);
      if (cat) {
        cat.adoptionStatus = 'adopted';
        mockAdoptionRequests.forEach(req => {
          if (req.catId === updatedRequest.catId && req.id !== updatedRequest.id && req.status === 'pending') {
            req.status = 'rejected';
          }
        });
      }
    }
    // If rejected, and no other 'accepted' or 'pending' requests exist for this cat, set cat status to 'available'
    else if (status === 'rejected') {
        const cat = mockCats.find(c => c.id === updatedRequest.catId);
        if (cat) {
            const otherPendingOrAcceptedRequests = mockAdoptionRequests.some(
                req => req.catId === cat.id && (req.status === 'pending' || req.status === 'accepted')
            );
            if (!otherPendingOrAcceptedRequests) {
                cat.adoptionStatus = 'available';
            }
        }
    }
    return updatedRequest;
  }
  return undefined;
};
