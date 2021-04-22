export type CityUnion = 'Tokyo' | 'Melbourne' | 'Amsterdam';

export type City = {
  key: string,
  value: CityUnion;
}
