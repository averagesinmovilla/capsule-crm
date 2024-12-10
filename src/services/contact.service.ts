import { HttpService } from '@/services/http.service';
import { ConfigService } from '@/services/config.service';
import {ApiResponseContact, ApiResponseContactStatus, Contact} from '@/types/contact.types';
import { PaginatedResponse } from '@/types/pagination.types';
import { ApiParamsType } from '@/types/api-params.type';
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {FileUploaderResponseType} from "@/types/file-uploader.type";
import axios from "@/lib/axios";

export type ApiParamsContactType = ApiParamsType & {
    [key: string]: string | number | boolean;
};

export class ContactService {
    public async getContacts(aOptions: ApiParamsContactType): Promise<PaginatedResponse<Contact>> {
        let params = {};

        if (Object.keys(aOptions).length) {
            params = Object.assign(params, aOptions);
        }

        const { data } = await HttpService.getInstance().get<PaginatedResponse<Contact>>(`${ConfigService.apiUrl}/contacts`, { params })

        return data;
    }

    public async getContact(id: number): Promise<Contact> {
        const { data } = await HttpService.getInstance().get<Contact>(`${ConfigService.apiUrl}/contacts/${id}`)

        return data;
    }

    public async delete(id: number): Promise<ApiResponseContactStatus> {
        const { data } = await HttpService.getInstance().delete<ApiResponseContactStatus>(`${ConfigService.apiUrl}/contacts/${id}`)

        return data;
    }

    public async save(contact: Omit<Contact, "id">): Promise<ApiResponseContact> {
        const { data } = await HttpService.getInstance().post<ApiResponseContact>(`${ConfigService.apiUrl}/contacts`, contact)

        return data;
    }

    public async update (id: number, datos: Contact): Promise<ApiResponseContact> {
        const { data } = await HttpService.getInstance().patch<ApiResponseContact>(`${ConfigService.apiUrl}/contacts/${id}`, datos);
        return data;
    }

    public async upload(
        body: FormData,
        config?: AxiosRequestConfig,
        id?: number | string,
    ): Promise<AxiosResponse<FileUploaderResponseType>> {
        return HttpService
            .getInstance()
            .post<FileUploaderResponseType>(`${ConfigService.apiUrl}/images/contact/${id}`, body, config)
    }

    public async statsContactMedium(): Promise<AxiosResponse<any>> {
        return HttpService
            .getInstance()
            .get<FileUploaderResponseType>(`${ConfigService.apiUrl}/contacts/stats/contact-medium`)
    }
}
