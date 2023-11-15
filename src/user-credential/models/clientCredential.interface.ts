export interface ClientCredential {
  clientName: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  facebook?: {
    tokenId: string;
    pageId: string;
  };
  instagram?: string;
  recapcha?: ReCaptchaKeys;
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

export interface ReCaptchaKeys {
  key: string;
  secretKey: string;
} 
