import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/mailer.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('mailer')
export class MailerController {
  private readonly service: MailerService = new MailerService();
  constructor(private readonly jwtService: JwtService) {}

  // @UseGuards(JwtGuard)
  @Post('send-email')
  async sendEmail(@Body() body: SendEmailDto) {
    return await this.service.sendEmail(body);
  }
}
