import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyKeys } from "./company-credential.entity";

@Entity('cloudinary_keys')
export class CloudinaryKeys extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  cloud_name: string;
  @Column({ type: 'varchar', nullable: true })
  api_key: string;
  @Column({ type: 'varchar', nullable: true })
  api_secret: string;
}
