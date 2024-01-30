import { RolesTypes } from "src/auth/decorators/roles.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar'  })
  userName: string;
  @Column({ type: 'varchar' })
  clientName: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ enum: RolesTypes, default: RolesTypes.CUSTOMER })
  role: RolesTypes;
}
