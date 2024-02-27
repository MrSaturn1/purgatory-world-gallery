export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  artist: string;
  price: number;
  description?: string; // Optional
  biography: string;
  artistUrl: string;
}
