import { Controller, Get, Param, Query } from '@nestjs/common';
import { SocialmediaService } from './socialmedia.service';

@Controller('socialmedia')
export class SocialmediaController {
  private readonly service: SocialmediaService = new SocialmediaService();

  @Get('/facebook')
  async getAllFacebookPost() {
    return this.service.getAllFacebookPost();
  }

  @Get("/facebook/:postId")
  async getFacebook(@Param() param) {
    const postId = param.postId
    return this.service.getFacebookPostDetail(postId);
  }
}
