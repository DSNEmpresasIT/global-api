import { CompanyKeys } from "src/company-credential/entity/company-credential.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  company_name: string;
  @OneToMany(() => User, user => user.company, { nullable: true })
  @JoinTable()
  users: User[];
  @OneToOne(() => CompanyKeys, keys => keys.company , { nullable: true })
  @JoinColumn()
  keys: CompanyKeys;
}
