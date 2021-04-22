import { CityUnion } from "./city";

export type Beer = {
  id: number,
  name: string,
  tagline: string,
  image_url: string,
  fav?: boolean,
  city?: CityUnion;
  drunk?: boolean;
}

// export type CustomBeer = Pick<Beer, 'id' | 'name' | 'image_url'> & {
//   review: string;
//   city: CityUnion;
//   drunk?: boolean;
// }
