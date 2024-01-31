import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('email_keys')
export class EmailKeys {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  host: number;
  @Column({ type: 'varchar' })
  user: string;
  @Column({ type: 'int' })
  port: number;
  @Column({ type: 'varchar' })
  email: string;
}
