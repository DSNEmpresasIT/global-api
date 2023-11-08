import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SocialmediaService {
  private readonly FACEBOOK_BASE_URL: string = 'https://graph.facebook.com';
  private readonly INSTAGRAM_BASE_URL: string =
    'https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=';
  private readonly FACEBOOK_LONG_TOKEN: string = process.env.FACEBOOK_TOKEN;
  private readonly FACEBOOK_PAGE_ID: string = process.env.FACEBOOK_PAGE_ID;
  private readonly INSTAGRAM_TOKEN: string = process.env.INSTAGRAM_TOKEN;

  private async getFacebookShortToken() {
    const data = await axios.get(
      `${this.FACEBOOK_BASE_URL}/${this.FACEBOOK_PAGE_ID}?fields=access_token&access_token=${this.FACEBOOK_LONG_TOKEN}`,
    );

    return data.data.access_token;
  }

  async getAllFacebookPost(limit: number = 100) {
    try {
      const token = await this.getFacebookShortToken();
      const data = await axios(
        `${this.FACEBOOK_BASE_URL}/${this.FACEBOOK_PAGE_ID}/feed?access_token=${token}&fields=attachments,created_time,icon,comments{from{name, id, picture}, id , message, created_time, attachment}&limit=${limit}`,
      ); // &limit=number next_page

      return data.data;
    } catch (error) {
      throw new BadRequestException(
        'getAllFacebookPost error: ',
        error.message,
      );
    }
  }

  async getFacebookPostDetail(postId: number) {
    try {
      const posts = await this.getAllFacebookPost();
      const post = posts.data.filter((post) => post.id === postId);

      if (!post.length) throw new BadRequestException('Post not found');

      return post[0];
    } catch (error) {
      throw new BadRequestException(
        'getFacebookPostDetail error: ',
        error.message,
      );
    }
  }

  async getInstagramPhotos() {
    try {
      const dataFetch = await fetch(
        this.INSTAGRAM_BASE_URL + this.INSTAGRAM_TOKEN,
      );
      const { data } = await dataFetch.json();

      return data.filter((post: any) => post.media_type === 'IMAGE');
    } catch (error) {
      throw new BadRequestException(
        'getInstagramPhotos error: ',
        error.message,
      );
    }
  }

  async getLastInstagramReel() {
    try {
      const dataFetch = await fetch(
        this.INSTAGRAM_BASE_URL + this.INSTAGRAM_TOKEN,
      );
      const data = (await dataFetch.json()).data;

      return data.filter((post: any) => post.media_type === 'VIDEO')[0];
    } catch (error) {
      throw new BadRequestException(
        'getLastInstagramReel error: ',
        error.message,
      );
    }
  }

  async getInstagramVideos() {
    try {
      const dataFetch = await fetch(
        this.INSTAGRAM_BASE_URL + this.INSTAGRAM_TOKEN,
      );
      const data = (await dataFetch.json()).data;

      return data.filter((post: any) => post.media_type === 'VIDEO');
    } catch (error) {
      throw new BadRequestException(
        'getInstagramVideos error: ',
        error.message,
      );
    }
  }
}
