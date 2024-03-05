import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { CompanyCredentialModule } from 'src/company-credential/company-credential.module';
import { CompanyKeys } from 'src/company-credential/entity/company-credential.entity';

@Module({
  imports: [
    CompanyCredentialModule,
    TypeOrmModule.forFeature([Company, CompanyKeys])
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
