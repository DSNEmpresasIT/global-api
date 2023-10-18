import { Controller, Get, Param } from '@nestjs/common';
import { SocialmediaService } from './socialmedia.service';

@Controller('socialmedia')
export class SocialmediaController {
  private readonly service: SocialmediaService = new SocialmediaService();

  @Get('/facebook')
  async getAllFacebookPost() {
    return this.service.getAllFacebookPost();
  }

  @Get('/facebook/:postId')
  async getFacebook(@Param() param) {
    const postId = param.postId;
    return this.service.getFacebookPostDetail(postId);
  }

  @Get('/instagram')
  async getInstagran() {
    return this.service.getInstagramPhotos();
  }

  @Get('/instagram/lastReel')
  async getLastInstagramReel() {
    return this.service.getLastInstagramReel();
  }

  @Get('/instagram/videos')
  async getInstagramVideos() {
    return this.service.getInstagramVideos();
  }
}
