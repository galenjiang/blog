import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    getCat() {
        return "miao"
    }

    @Post()
    updateCat() {
        return "miao miao"
    }
}
