import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReCaptchaKey } from "./recaptcha-key.entity";
import { EmailKeys } from "./email-keys.entity";
import { CloudinaryKeys } from "./cloudinary-key.entity";

@Entity('company_keys')
export class CompanyKeys {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  company_id: number;
  @Column({ type: 'varchar', nullable: true })
  supabaseUrl: string;
  @Column({ type: 'varchar', nullable: true })
  instagram_key: string;
  @OneToOne(() => ReCaptchaKey, { nullable: true })
  @JoinTable()
  recaptcha_keys: ReCaptchaKey;
  @OneToOne(() => EmailKeys, { nullable: true })
  @JoinTable()
  email_keys: EmailKeys;
  @OneToOne(() => CloudinaryKeys, { nullable: true })
  @JoinTable()
  cloudinary_keys: CloudinaryKeys;
}