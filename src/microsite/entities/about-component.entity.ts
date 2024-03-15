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

  @Column({ type: 'boolean' })
  is_active: boolean;

  @Column({ type: 'varchar' })
  bandage: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image_1: Image;

  @OneToOne(() => Image)
  @JoinColumn()
  image_2: Image;
}
