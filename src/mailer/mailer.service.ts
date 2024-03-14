import { BadRequestException, Injectable } from '@nestjs/common';
import { ConnectionDto, MailDto, sendEmail } from 'src/libs/mailer-client';
import { SendEmailDto } from './dto/mailer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyKeys } from 'src/company-credential/entity/company-credential.entity';

@Injectable()
export class MailerService {
  constructor(
    @InjectModel(CompanyKeys.name)
    private CompanyCredentialModule: Model<CompanyKeys>,
  ) {}
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

  async sendEmail(companyId: string, body: SendEmailDto) {
    try {
      const companyKeys = await this.CompanyCredentialModule.findOne({
        where: { companyId },
        relations: ['email_keys'],
      });

      if (!companyKeys || !companyKeys.email_keys) {
        throw new BadRequestException(
          'Client credentials not found or email keys not set',
        );
      }

      const emailKeys = companyKeys.email_keys;

      const connection: ConnectionDto = {
        host: emailKeys.host,
        port: emailKeys.port,
        user: emailKeys.user,
        pass: emailKeys.password,
      };

      const mail: MailDto = {
        from: body.from,
        to: emailKeys.email,
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
        message: 'Mail sent successfully',
        date: new Date().toDateString(),
      };
    } catch (error) {
      throw new BadRequestException('Error sending email: ', error.message);
    }
  }
}
