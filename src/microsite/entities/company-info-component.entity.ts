import { Image } from "src/projects/entity/image.entity";
import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('company_info_component')
export class CompanyInfoComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'integer', default: 1 })
  type: number;
  @Column({ type: 'boolean', default: true })
  is_active: boolean;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @OneToMany(() => Image, image => image.company_info_component)
  cards: Image[];
}