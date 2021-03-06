export const BusinessDocFetchAttributes = [
  "grubhub",
  "website",
  "phone-number",
  "pickup",
  "delivery",
  "seamless",
  "_archived",
  "door-dash",
  "postmates",
  "uber-eats",
  "facebook-page",
  "gift-card-link",
  "instagram-profile",
  "twitter-profile",
  "online-order-link",
  "order-groceries-link",
  "online-store-link",
  "donations-link",
  "name",
  "story",
  "special-instructions",
  "slug",
  "updated-on",
  "published-on",
  "image-blurhash",
  "location",
  "category",
  "header_image",
];

export type BusinessDoc = {
  grubhub: boolean;
  website?: string | null;
  "phone-number"?: string | null;
  pickup: boolean;
  delivery: boolean;
  seamless: boolean;
  _archived: boolean;
  "door-dash": boolean;
  postmates: boolean;
  "uber-eats": boolean;
  "facebook-page"?: string | null;
  "gift-card-link"?: string | null;
  "instagram-profile"?: string | null;
  "twitter-profile"?: string | null;
  "online-order-link"?: string | null;
  "order-groceries-link"?: string | null;
  "online-store-link"?: string | null;
  "donations-link"?: string | null;
  name?: string | null;
  story?: string | null;
  "special-instructions"?: string | null;
  slug: string;
  "updated-on": string;
  "published-on": string;
  "image-blurhash": string | null;
  location?: string | null;
  category?: string[] | null;
  header_image?: string | null;
};
