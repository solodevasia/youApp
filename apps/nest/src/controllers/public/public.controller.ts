import { Controller, Get } from '@nestjs/common';
import { Zodiac } from '@youApp/types/zodiac';

@Controller('public')
export default class PublicController {
  @Get('/zodiac')
  zodiac() {
    return Object.values(Zodiac).filter((item) => typeof item !== 'number');
  }
}
