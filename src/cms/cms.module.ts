import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './schema/Content.schema';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Content.name,
        schema: ContentSchema
      }
    ])
  ],
  controllers: [CmsController],
  providers: [CmsService]
})

export class CmsModule {}
