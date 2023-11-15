export interface UserCredential {
  clientId: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  facebook?: {
    tokenId: string;
    pageId: string;
  };
  instagram?: string;
  recapchap?: {
    key: string;
    secretKey: string;
  };
  email?: {
    host: string;
    user: string;
    password: string;
    port: string;
    emailJs: {
      publicKey: string;
      service: string;
      contactTemplate: string;
    };
  };
}
