export interface MyInfo {
  name: string;
  country: {
    name: string;
    code: string;
    flag: string;
  };

  team: {
    name: string;
    code?: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
    venue?: {
      name: string;
      address: string;
      city: string;
      capacity: number;
      surface: string;
      image: string;
    };
  };
}
