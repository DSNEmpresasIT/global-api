import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './schema/Content.schema';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectType } from './entity/project_types.entity';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Content.name,
        schema: ContentSchema
      }
    ]),
    TypeOrmModule.forFeature([ProjectType]), 
    CompanyModule,
  ],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [CmsService]
})

export class CmsModule {}
