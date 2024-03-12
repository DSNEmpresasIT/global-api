import { Company } from "src/company/entity/company.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image.entity";
import { ProjectType } from "src/cms/entity/project_types.entity";

@Entity('project')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Company, company => company.projects)
  company: Company;
  @Column({ type: 'boolean', default: true })
  active: boolean;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'varchar', nullable: true })
  project_client: string;
  @Column({ type: 'varchar', nullable: true })
  project_date: string;
  @OneToMany(() => Image, image => image.project, { nullable: true })
  images: Image[];
  @ManyToOne(() => ProjectType, project_type => project_type.projects)
  project_type: ProjectType;
}
