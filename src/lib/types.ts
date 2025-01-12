export type Locations = {
  id?: number;
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  temperature?: number;
  condition?: string;
  nickname: string;
  notes: string;
};

export type Weather = {
  id: number;
  locationId: number;
  temperature: number;
  condition: string;
  createdAt: string;
};
