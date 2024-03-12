import { BaseEntity, Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReCaptchaKey } from "./recaptcha-key.entity";
import { EmailKeys } from "./email-keys.entity";
import { CloudinaryKeys } from "./cloudinary-key.entity";
import { Company } from "src/company/entity/company.entity";

@Entity('company_keys')
export class CompanyKeys extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  supabaseUrl: string;
  @Column({ type: 'varchar', nullable: true })
  supabaseKey: string;
  @OneToOne(() => Company, company => company.keys)
  company: Company;
  @Column({ type: 'varchar', nullable: true })
  instagram_key: string;
  @OneToOne(() => ReCaptchaKey, { cascade: true })
  @JoinColumn()
  recaptcha_keys: ReCaptchaKey;
  @OneToOne(() => EmailKeys, { cascade: true })
  @JoinColumn()
  email_keys: EmailKeys;
  @OneToOne(() => CloudinaryKeys, { cascade: true, nullable: true })
  @JoinColumn()
  cloudinary_keys: CloudinaryKeys;
}