import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { BannerComponent } from "src/microsite/entities/banner-component.entity";

@Entity('image')
export class Image extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: 'true' })
  active: boolean;

  @Column({ type: 'varchar', default: null })
  title: string;

  @Column({ type: 'text', default: null })
  description: string;

  @Column({ type: 'varchar' })
  cloudinary_id: string;

  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Project, project => project.images)
  @JoinTable()
  project: Project;

  @ManyToOne(() => BannerComponent, (banner) => banner.images)
  BannerComponent: BannerComponent
}
