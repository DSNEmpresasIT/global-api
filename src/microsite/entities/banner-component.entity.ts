import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from 'src/projects/entity/image.entity';

@Entity('BannerComponent')
export class BannerComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  video_link: string;

  @OneToMany(() => Image, (image) => image.BannerComponent)
  images: Image[];
}
