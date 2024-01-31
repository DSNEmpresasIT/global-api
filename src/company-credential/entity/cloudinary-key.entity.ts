import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cloudinary_keys')
export class CloudinaryKeys {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  cloud_name: string;
  @Column({ type: 'varchar', nullable: true })
  api_key: string;
  @Column({ type: 'varchar', nullable: true })
  api_secret: string;
}
