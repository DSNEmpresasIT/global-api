import { RolesTypes } from "src/auth/decorators/roles.interface";
import { Company } from "src/company/entity/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
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
  @ManyToOne(() => Company, company => company.users)
  company: Company;
}
