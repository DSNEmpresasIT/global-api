import { BadRequestException, Injectable } from '@nestjs/common';
import { ConnectionDto, MailDto, sendEmail } from 'src/libs/mailer-client';
import { SendEmailDto } from './dto/mailer.dto';
import { ClientCredential } from 'src/client-credential/models/clientCredential.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MailerService {
  constructor(
    @InjectModel(ClientCredential.name)
    private clientCredentialModule: Model<ClientCredential>
  ){}
  async sendEmailToJauregui(body: SendEmailDto) {
    const connection: ConnectionDto = {
      host: process.env.HOST_JAUREGUI,
      port: +process.env.PORT_JAUREGUI,
      user: process.env.USER_JAUREGUI,
      pass: process.env.PASS_JAUREGUI,
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
      `,
    };

    await sendEmail(connection, mail);
    return {
      message: 'Mail enviado exitósamente',
      date: new Date().toDateString(),
    };
  }

  async sendEmail(clientId: string, body: SendEmailDto) {
    const clientCredentail = await this.clientCredentialModule.findOne({ clientId }).select('email')
    if (!clientCredentail?.email) return new BadRequestException('Client credential not found') 
    const clientEmail = clientCredentail.email;
    
    const connection: ConnectionDto = {
      host: clientEmail.host,
      port: +clientEmail.port,
      user: clientEmail.user,
      pass: clientEmail.password,
    };

    const mail: MailDto = {
      from: body.from,
      to: clientEmail.email,
      subject: body.subject,
      html: `
        <div>
          <b>Cliente: ${body.fullName}</b>
          <br/>
          <br/>
          <b>Mensaje: </b> <br/>
          <p>${body.message}</p>
        </div>
      `,
    };

    await sendEmail(connection, mail);
    return {
      message: 'Mail enviado exitósamente',
      date: new Date().toDateString(),
    };
  }
}
