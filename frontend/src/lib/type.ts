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

