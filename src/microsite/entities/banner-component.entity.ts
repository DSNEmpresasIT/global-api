import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from 'src/projects/entity/image.entity';

@Entity('banner_component')
export class BannerComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'boolean', default: true })
  is_active: boolean;
  @Column({ type: 'integer', default: 1 })
  type: number;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'text', nullable: true })
  video_link: string;
  @OneToMany(() => Image, (image) => image.banner_component, { nullable: true})
  images: Image[];
}
