export interface ClientCredential {
  clientName: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  facebook?: Facebook;
  instagram?: string;
  recapcha?: ReCaptchaKeys;
  email?: Email;
}

export interface Facebook {
  tokenId: string;
  pageId: string;
}

export interface ReCaptchaKeys {
  key: string;
  secretKey: string;
}

export interface Email {
  host: string;
  user: string;
  password: string;
  port: string;
  emailJS?: EmailJs;
}

export interface EmailJs {
  publicKey: string;
  service: string;
  contactTemplate: string;
}
