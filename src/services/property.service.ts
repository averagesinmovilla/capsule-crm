import { HttpService } from '@/services/http.service';
import { ConfigService } from '@/services/config.service';
import { PaginatedResponse } from '@/types/pagination.types';
import { ApiParamsType } from '@/types/api-params.type';
import {ApiResponseProperty, ApiResponsePropertyStatus, Property} from '@/types/property.types';
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {FileUploaderResponseType} from "@/types/file-uploader.type";
import axios from "@/lib/axios";
import {ApiResponseContact, Contact} from "@/types/contact.types";

export type ApiParamsPropertyType = ApiParamsType & {
    [key: string]: string | number | boolean;
};

export class PropertyService {
    public async getProperties(aOptions: ApiParamsPropertyType): Promise<PaginatedResponse<Property>> {
        let params = {};

        if (Object.keys(aOptions).length) {
            params = Object.assign(params, aOptions);
        }

        const { data } = await HttpService.getInstance().get<PaginatedResponse<Property>>(`${ConfigService.apiUrl}/properties`, { params })

        return data;
    }

    public async getProperty(id: number): Promise<Property> {
        const { data } = await HttpService.getInstance().get<Property>(`${ConfigService.apiUrl}/properties/${id}?includes=image`)

        return data;
    }

    public async save(property: Omit<Property, "id">): Promise<ApiResponseProperty> {
        const { data } = await HttpService.getInstance().post<ApiResponseProperty>(`${ConfigService.apiUrl}/properties`, property);
        return data;
    };

    public async update(id: number, datos: Property): Promise<ApiResponseProperty> {
        const { data } = await HttpService.getInstance().patch<ApiResponseProperty>(`${ConfigService.apiUrl}/properties/${id}`, datos);
        return data;
    };

    public async delete(id: number): Promise<ApiResponsePropertyStatus> {
        const { data } = await HttpService.getInstance().delete<ApiResponsePropertyStatus>(`${ConfigService.apiUrl}/properties/${id}`)

        return data;
    }

    public async upload(
        body: FormData,
        config?: AxiosRequestConfig,
        id?: number | string,
    ): Promise<AxiosResponse<FileUploaderResponseType>> {
        return HttpService
            .getInstance()
            .post<FileUploaderResponseType>(`${ConfigService.apiUrl}/images/property/${id}`, body, config)
    }

    public async statsStatus(): Promise<AxiosResponse<any>> {
        return HttpService
            .getInstance()
            .get<FileUploaderResponseType>(`${ConfigService.apiUrl}/properties/stats/status`)
    }

    public async statsTypes(): Promise<AxiosResponse<any>> {
        return HttpService
            .getInstance()
            .get<FileUploaderResponseType>(`${ConfigService.apiUrl}/properties/stats/types`)
    }
}
