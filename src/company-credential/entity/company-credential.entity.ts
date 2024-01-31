import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReCaptchaKey } from "./recaptcha-key.entity";
import { EmailKeys } from "./email-keys.entity";
import { CloudinaryKeys } from "./cloudinary-key.entity";
import { Company } from "src/company/entity/company.entity";

@Entity('company_keys')
export class CompanyKeys {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  company_id: number;
  @OneToOne(() => Company, company => company.keys)
  @JoinColumn()
  company: Company;
  @Column({ type: 'varchar', nullable: true })
  supabaseUrl: string;
  @Column({ type: 'varchar', nullable: true })
  instagram_key: string;
  @OneToOne(() => ReCaptchaKey, { nullable: true })
  @JoinColumn()
  recaptcha_keys: ReCaptchaKey;
  @OneToOne(() => EmailKeys, { nullable: true })
  @JoinColumn()
  email_keys: EmailKeys;
  @OneToOne(() => CloudinaryKeys, { nullable: true })
  @JoinColumn()
  cloudinary_keys: CloudinaryKeys;
}