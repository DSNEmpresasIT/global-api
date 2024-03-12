import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity('image')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  cloudinary_id: string;
  @Column({ type: 'varchar' })
  url: string;
  @ManyToOne(() => Project, project => project.images)
  @JoinTable()
  project: Project;
}
