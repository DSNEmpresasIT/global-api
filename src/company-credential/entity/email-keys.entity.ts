import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyKeys } from "./company-credential.entity";

@Entity('email_keys')
export class EmailKeys extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  host: string;
  @Column({ type: 'varchar', nullable: true })
  user: string;
  @Column({ type: 'int', nullable: true })
  port: number;
  @Column({ type: 'varchar', nullable: true })
  email: string;
  @Column({ type: 'varchar', nullable: true })
  password: string;
}
