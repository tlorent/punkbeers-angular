import { CityUnion } from './city';

export type Beer = {
  id: string;
  key: string;
  name: string;
  tagline: string;
  image_url: string;
  fav?: boolean;
  city?: CityUnion;
};
