import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contact_component')
export class ContactComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'number', default: 1 })
  type: number;
  @Column({ type: "boolean", default: true })
  is_active: boolean;
  @Column({ type: "varchar" })
  google_map_src: string;
}
