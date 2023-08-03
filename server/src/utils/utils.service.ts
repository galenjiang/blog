import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Injectable()
export class UtilsService {
    constructor(private readonly httpService: HttpService) {}

    getProvice(): Observable<AxiosResponse<any, any>> {
        return this.httpService.get<any>('https://weather.cma.cn/api/dict/province')
    }

    getCity(cityId: string): Observable<AxiosResponse<any, any>> {
        return this.httpService.get<any>(`https://weather.cma.cn/api/dict/province/${cityId}`)
    }

    getWeather(): Observable<AxiosResponse<any, any>> {
        return this.httpService.get<any>('https://weather.cma.cn/api/now/58367')
    }
}
