import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SocialmediaService {
  private readonly FACEBOOK_BASE_URL:string = 'https://graph.facebook.com';
  private readonly FACEBOOK_LONG_TOKEN: string = process.env.FACEBOOK_TOKEN;
  private readonly FACEBOOK_PAGE_ID: string = process.env.FACEBOOK_PAGE_ID;
  
  private async getFacebookShortToken() {
    const data = await axios.get(`${this.FACEBOOK_BASE_URL}/${this.FACEBOOK_PAGE_ID}?fields=access_token&access_token=${this.FACEBOOK_LONG_TOKEN}`)

    return data.data.access_token;
  }
  
  async getAllFacebookPost(limit: number = 100) {
    try {
      const token = await this.getFacebookShortToken();
      const data = await axios(`${this.FACEBOOK_BASE_URL}/${this.FACEBOOK_PAGE_ID}/feed?access_token=${token}&fields=attachments,created_time,icon,comments{from{name, id, picture}, id , message, created_time, attachment}&limit=${limit}`); // &limit=number next_page 

      return data.data;
    } catch (error) {
      throw new BadRequestException('getAllFacebookPost error: ', error.message);
    }
  }

  async getFacebookPostDetail(postId: number) {
    try {
      const posts = await this.getAllFacebookPost();
      const post = posts.data.filter(post => post.id === postId);

      if (!post.length) throw new BadRequestException('Post not found')

      return post[0];
    } catch (error) {
      throw new BadRequestException('getFacebookPostDetail error: ', error.message);
    }
  }
}
