import { Company } from "src/company/entity/company.entity";
import { Project } from "src/projects/entity/project.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('project_type')
export class ProjectType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar'})
  label: string;
  @Column({ type: 'varchar' })
  value: string;
  @OneToMany(() => Project, project => project.project_type, { nullable: true })
  projects: Project[];
  @ManyToOne(() => Company, company => company.project_types)
  company: Company;
}