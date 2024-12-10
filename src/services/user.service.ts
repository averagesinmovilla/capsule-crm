import { HttpService } from '@/services/http.service';
import { ConfigService } from '@/services/config.service';
import { Property } from '@/types/property.types';
import { FileUploaderResponseType } from '@/types/file-uploader.type';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {UserType} from "@/types/user.type";

export class UserService {
    public async patch(id: number, data: Partial<UserType>){
        return HttpService.getInstance().patch(`${ConfigService.apiUrl}/user/${id}`, data)
    }

    public async upload(
        body: FormData,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<FileUploaderResponseType>> {
        return HttpService
            .getInstance()
            .post<FileUploaderResponseType>(`${ConfigService.apiUrl}/images/user`, body, config)
    }
}
