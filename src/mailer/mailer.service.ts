import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { ConnectionDto, MailDto, sendEmail } from 'src/libs/mailer-client';
import { SendEmailDto } from './dto/mailer.dto';

@Injectable()
export class MailerService {
  async sendEmail(body: SendEmailDto) {
    const connection: ConnectionDto = {
      host: process.env.HOST_JAUREGUI,
      port: +process.env.PORT_JAUREGUI,
      user: process.env.USER_JAUREGUI,
      pass: process.env.PASS_JAUREGUI
    };

    const mail: MailDto = {
      from: body.from,
      to: process.env.TO_JAUREGUI,
      subject: body.subject,
      html: `
        <div>
          <b>Cliente: ${body.fullName}</b>
          <br/>
          <br/>
          <b>Mensaje: </b> <br/>
          <p>${body.message}</p>
        </div>
      `
    }

    await sendEmail(connection, mail);
    return {
      message: 'Mail enviado exitósamente',
      date: new Date().toDateString()
    };
  }
}
