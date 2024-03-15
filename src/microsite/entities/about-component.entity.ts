import { Image } from 'src/projects/entity/image.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('AboutComponent')
export class AboutComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'varchar' })
  badge: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => Image, { nullable: true})
  @JoinColumn()
  image_1: Image;

  @OneToOne(() => Image, { nullable: true})
  @JoinColumn()
  image_2: Image;
}
