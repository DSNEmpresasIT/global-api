import { Image } from "src/projects/entity/image.entity";
import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('carousel-component')
export class CarouselComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Image, image => image.carousel_component)
  images: Image[];
}
