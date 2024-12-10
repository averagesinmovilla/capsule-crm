import { HttpService } from '@/services/http.service';
import { ConfigService } from '@/services/config.service';
import { ApiParamsType } from '@/types/api-params.type';
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {FileUploaderResponseType} from "@/types/file-uploader.type";

export class ImportPropertyService {
    public async upload(
        body: FormData,
        config?: AxiosRequestConfig,
        id?: number | string,
    ): Promise<AxiosResponse<FileUploaderResponseType>> {
        return HttpService
            .getInstance()
            .post<FileUploaderResponseType>(`${ConfigService.apiUrl}/import`, body, config)
    }
}
