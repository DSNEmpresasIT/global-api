import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { BannerComponent } from "src/microsite/entities/banner-component.entity";

@Entity('image')
export class Image extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: 'true' })
  is_active: boolean;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  cloudinary_id: string;

  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Project, project => project.images)
  @JoinTable()
  project: Project;

  @ManyToOne(() => BannerComponent, (banner) => banner.images)
  banner_component: BannerComponent
}
