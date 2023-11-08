import * as nodemailer from 'nodemailer';
import { BadGatewayException, BadRequestException } from '@nestjs/common';

export interface ConnectionDto {
  host: string;
  port: number;
  user: string;
  pass: string;
}

export interface MailDto {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(connection: ConnectionDto, mail: MailDto) {
  const { host, port, user, pass } = connection;
  const { from, to, subject, html } = mail;
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass
      }
    })

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html
    })

    return undefined;
  } catch (error) {
    throw new BadGatewayException('sendEmail -client error', error.message);
  }
}
