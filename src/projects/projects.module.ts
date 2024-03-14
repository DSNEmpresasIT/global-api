import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schema/Project.schema';
import { CompanyCredential, CompanyCredentialSchema } from 'src/company-credential/schemas/ClientCredential.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project as ProjectEntity } from './entity/project.entity';
import { Company } from 'src/company/entity/company.entity';
import { CompanyKeys } from 'src/company-credential/entity/company-credential.entity';
import { Image } from './entity/image.entity';
import { CmsModule } from 'src/cms/cms.module';
import { CompanyCredentialModule } from 'src/company-credential/company-credential.module';


@Module({
    imports: [
      CmsModule,
      CompanyCredentialModule,
      MongooseModule.forFeature([
        {
          name: Project.name,
          schema: ProjectSchema
        },
        {
          name: CompanyCredential.name,
          schema: CompanyCredentialSchema
        }
      ]),
      TypeOrmModule.forFeature([ProjectEntity, Company, CompanyKeys, Image])
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})

export class ProjectsModule {}
