import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schema/Project.schema';
import { CompanyCredential, CompanyCredentialSchema } from 'src/company-credential/schemas/ClientCredential.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: Project.name,
          schema: ProjectSchema
        },
        {
          name: CompanyCredential.name,
          schema: CompanyCredentialSchema
        }
      ])
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})

export class ProjectsModule {}
