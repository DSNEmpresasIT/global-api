import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schema/Project.schema';
import { ClientCredential, ClientCredentialSchema } from 'src/client-credential/schemas/ClientCredential.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: Project.name,
          schema: ProjectSchema
        },
        {
          name: ClientCredential.name,
          schema: ClientCredentialSchema
        }
      ])
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})

export class ProjectsModule {}
