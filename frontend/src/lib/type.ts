export interface Restaurant {
  _id: string
  name: string
  image: string
  logo: string
  rating: number
  reviews: number
  category: string
  description: string
  price: string
  cuisines: string[]
  location: string
  phone: string
  hours: string
  menu: Array<{
    name: string
    price: string
  }>
}

export interface DiscoveryRestaurant {
  _id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  cuisine: string[];
  address: {
    country: string;
    suburb: string;
    postcode: string;
    streetname: string;
    addressLine1: string;
    addressLine2?: string;
  };
  addressDisplay: string;
  phone: string;
  hours: string;
  tags: string[];
}

export interface Badge {
  _id: string;
  icon: string;
  title: string;
}

export interface Review {
  _id: string;
  restaurant: string; // restaurant._id
  user: string; // user._id
  rating: number;
  content?: string;
  date: Date;
}

export interface UserProfile {
  _id: string;
  username: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  xp: number;
  badges: Badge[];
}