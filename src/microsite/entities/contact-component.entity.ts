import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contact_component')
export class ContactComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar" })
  google_map_src: string;
}
