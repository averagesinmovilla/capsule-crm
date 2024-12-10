import {File} from "lucide-react";
import {AxiosRequestConfig, CancelTokenSource} from "axios";

export interface FileUploadProgress {
    progress: number;
    File: File;
    source: CancelTokenSource | null;
}

export enum FileTypes {
    Image = "image",
    Pdf = "pdf",
    Audio = "audio",
    Video = "video",
    Other = "other",
}

export const ImageColor = {
    bgColor: "bg-purple-600",
    fillColor: "fill-purple-600",
};

export const PdfColor = {
    bgColor: "bg-blue-400",
    fillColor: "fill-blue-400",
};

export const AudioColor = {
    bgColor: "bg-yellow-400",
    fillColor: "fill-yellow-400",
};

export const VideoColor = {
    bgColor: "bg-green-400",
    fillColor: "fill-green-400",
};

export const OtherColor = {
    bgColor: "bg-gray-400",
    fillColor: "fill-gray-400",
};

export interface FileUploaderServiceType {
    upload: (formData: FormData, config: AxiosRequestConfig, id?: number | string ) => Promise<any>;
}

export type uploadedFileType = {
    status: number,
    data: {
        image_name: string
    }
}

export interface Props {
    maxFiles?: number;
    fileUploaderService: FileUploaderServiceType,
    resourceId?: number | string,
    onUploadedFiles?: ([]: uploadedFileType[]) => void,
    fileKey?: string
    accept?: string
}