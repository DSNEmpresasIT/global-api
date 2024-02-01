import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('recaptcha_key')
export class ReCaptchaKey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', default: '' })
  key: string;
  @Column({ type: 'varchar', default: '' })
  secret_key: string;
}
