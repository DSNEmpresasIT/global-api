import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BannerComponent } from "./banner-component.entity";
import { AboutComponent } from "./about-component.entity";

@Entity('MicrositePage')
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


}