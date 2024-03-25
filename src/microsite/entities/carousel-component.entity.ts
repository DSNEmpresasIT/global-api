import { Image } from "src/projects/entity/image.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('carousel_component')
export class CarouselComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'number', default: 1 })
  type: number;
  @Column({ type: 'boolean', default: true })
  is_active: boolean;
  @OneToMany(() => Image, image => image.carousel_component)
  images: Image[];
}
