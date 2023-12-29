import { Body, Controller, Param, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/mailer.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('api/mailer')
export class MailerController {
  constructor(private readonly service: MailerService) {}

  @Post('send-email')
  async sendEmail(@Body() body: SendEmailDto) {
    return await this.service.sendEmailToJauregui(body);
  }

  @Post(':clientName/send-email')
  async sendEmalToClient(@Body() body: SendEmailDto, @Param() param) {
    return await this.service.sendEmail(param.clientName, body)
  }
}
