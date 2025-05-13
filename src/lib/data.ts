
import type { Cat, User, AdoptionRequest } from '@/types';

// Translated user names
export const mockUsers: User[] = [
  { id: 'user1', name: 'أليس بلاد العجائب', email: 'alice@example.com', avatarUrl: 'https://picsum.photos/seed/alice/100/100' },
  { id: 'user2', name: 'بوب البناء', email: 'bob@example.com', avatarUrl: 'https://picsum.photos/seed/bob/100/100' },
  { id: 'user3', name: 'تشارلي براون', email: 'charlie@example.com', avatarUrl: 'https://picsum.photos/seed/charlie/100/100' },
];

// Translated cat data (partial for brevity)
export let mockCats: Cat[] = [
  {
    id: 'cat1',
    name: 'بسبوس', // Whiskers -> Basbous (common Arabic cat name)
    images: ['https://images.unsplash.com/photo-1543852786-1cf6624b9987?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D', 'https://www.toledoblade.com/image/2025/01/15/1140x_a10-7_cTC/CATSxx-OMAG-jpg.jpg'],
    age: 2,
    breed: 'سيامي', // Siamese
    gender: 'Male', // Will be displayed as 'ذكر' by components
    story: 'بسبوس قط لعوب وحنون يبحث عن منزل محب. يستمتع بمطاردة مؤشرات الليزر والقيلولة في الأماكن المشمسة.',
    healthCondition: 'ممتازة، محصن ومعقم.',
    behavior: 'ودود، نشيط، يحب الحضن.',
    location: 'نيويورك، نيويورك',
    postedBy: 'user1',
    postedDate: new Date('2024-06-15T10:00:00Z').toISOString(),
    adoptionStatus: 'available', // Will be displayed as 'متاح'
  },
  {
    id: 'cat2',
    name: 'مشمش', // Mittens -> Mishmish
    images: ['https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fHww', 'https://images.freeimages.com/images/large-previews/089/charming-gray-cat-0410-5700057.jpg?fmt=webp&w=500'],
    age: 5,
    breed: 'فارسي', // Persian
    gender: 'Female',
    story: 'مشمش روح هادئة ولطيفة تحب afternoons الهادئة والبطانيات الناعمة. هي خجولة قليلاً في البداية ولكنها تتأقلم بسرعة.',
    healthCondition: 'جيدة، تتطلب عناية منتظمة بالفرو.',
    behavior: 'هادئة، خجولة، حنونة بمجرد أن تشعر بالراحة.',
    location: 'سان فرانسيسكو، كاليفورنيا',
    postedBy: 'user2',
    postedDate: new Date('2024-07-01T14:30:00Z').toISOString(),
    adoptionStatus: 'available',
  },
  {
    id: 'cat3',
    name: 'شادو', // Shadow
    images: ['https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375'],
    age: 1,
    breed: 'بومباي', // Bombay
    gender: 'Male',
    story: 'شادو قط صغير مليء بالطاقة والفضول. يحب استكشاف ولعب بالألعاب. يتوافق جيدًا مع القطط الأخرى.',
    healthCondition: 'ممتازة، محصن.',
    behavior: 'مليء بالطاقة، فضولي، لعوب.',
    location: 'شيكاغو، إلينوي',
    postedBy: 'user1',
    postedDate: new Date('2024-07-10T09:00:00Z').toISOString(),
    adoptionStatus: 'pending',
  },
  {
    id: 'cat4',
    name: 'لونا', // Luna
    images: ['https://images.freeimages.com/images/large-previews/089/charming-gray-cat-0410-5700057.jpg?fmt=webp&w=500', 'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg'],
    age: 3,
    breed: 'ماين كون', // Maine Coon
    gender: 'Female',
    story: 'لونا قطة مهيبة وودودة ذات فرو جميل ورقيق. تستمتع بالمداعبة وهي اجتماعية للغاية.',
    healthCondition: 'جيدة جداً، معقمة.',
    behavior: 'اجتماعية، ودودة، كثيرة المواء.',
    location: 'أوستن، تكساس',
    postedBy: 'user3',
    postedDate: new Date('2024-05-20T12:00:00Z').toISOString(),
    adoptionStatus: 'adopted',
  },
  {
    id: 'cat5',
    name: 'أوليفر', // Oliver
    images: ['https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg'],
    age: 0.5, 
    breed: 'مزيج تابى', // Tabby Mix
    gender: 'Male',
    story: 'أوليفر قط صغير لطيف ومغامر. تم العثور عليه ضالًا ويبحث الآن عن عائلته الدائمة.',
    healthCondition: 'جيدة، تم تطهيره من الديدان وأخذ التطعيمات الأولى.',
    behavior: 'لطيف، مغامر، يحب اللعب.',
    location: 'بوسطن، ماساتشوستس',
    postedBy: 'user2',
    postedDate: new Date('2024-07-20T16:00:00Z').toISOString(),
    adoptionStatus: 'available',
  }
];

// Translated adoption requests (partial)
export let mockAdoptionRequests: AdoptionRequest[] = [
  {
    id: 'req1',
    catId: 'cat3', 
    requesterId: 'user2', 
    ownerId: 'user1', 
    message: 'لدي منزل كبير وخبرة مع قطط بومباي. سيكون شادو سعيدًا جدًا هنا!',
    status: 'pending',
    requestDate: new Date('2024-07-12T10:00:00Z').toISOString(),
  },
  {
    id: 'req2',
    catId: 'cat4', 
    requesterId: 'user1', 
    ownerId: 'user3', 
    message: 'لونا جميلة! أحب أن أمنحها منزلًا.',
    status: 'accepted',
    requestDate: new Date('2024-05-22T11:00:00Z').toISOString(),
  },
];

// --- Data Access Functions (Simulated) ---

export const getCats = async (filters?: { age?: number; breed?: string; gender?: string; location?: string }): Promise<Cat[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); 
  let filteredCats = mockCats;
  if (filters) {
    if (filters.age) {
      filteredCats = filteredCats.filter(cat => cat.age === filters.age);
    }
    // For breed and location, ensure comparison is robust for Arabic characters if needed (usually fine)
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
     // Ensure new cats also get themed images if needed, or use a default
    images: [`https://picsum.photos/seed/newBuffKitten_${mockCats.length + 1}/600/400`],
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
