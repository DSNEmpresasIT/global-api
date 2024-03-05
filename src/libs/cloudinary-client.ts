import { v2 as cloudinary } from 'cloudinary';
import { Cloudinary } from 'src/company-credential/models/CompanyCredential.interface';
import { BadGatewayException, BadRequestException } from '@nestjs/common';


export const uploadImage = async (
    { cloud_name, api_key, api_secret }: Cloudinary, 
    file: string
  ) => {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret
  })

  try {
    const imageData = await cloudinary.uploader.upload(file);

    return { 
      url: imageData.url, 
      id: imageData.public_id 
    };
  } catch (error) {
    console.log(error)
    throw new BadGatewayException(`Error in cloudinary-client uploadImage: `, error)
  }
}
