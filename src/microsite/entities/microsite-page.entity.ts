import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BannerComponent } from "./banner-component.entity";
import { AboutComponent } from "./about-component.entity";
import { CompanyInfoComponent } from "./company-info-component.entity";
import { CarouselComponent } from "./carousel-component.entity";

@Entity('microsite_page')
export class MicrositePage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "varchar", unique: true})
  company: string

  @OneToOne(()=> BannerComponent, { nullable: true})
  @JoinColumn()
  banner: BannerComponent;

  @OneToOne(()=> AboutComponent, { nullable: true})
  @JoinColumn()
  about: AboutComponent;

  @OneToOne(() => CompanyInfoComponent, { nullable: true })
  company_info: CompanyInfoComponent;

  @OneToOne(() => CarouselComponent, { nullable: true })
  carousel: CarouselComponent;
}
