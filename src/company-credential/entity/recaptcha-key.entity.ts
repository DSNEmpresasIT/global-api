import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyKeys } from "./company-credential.entity";

@Entity('recaptcha_key')
export class ReCaptchaKey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  key: string;
  @Column({ type: 'varchar', nullable: true })
  secret_key: string;
}
