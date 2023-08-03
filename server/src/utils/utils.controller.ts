import { Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { map, tap } from 'rxjs';

@Controller('utils')
export class UtilsController {
    constructor(private utilsService: UtilsService) {}


    @Get("weather")
    getWeather() {
        return this.utilsService.getWeather().pipe(map((result) => {
            return result.data
        }))
    }
}
