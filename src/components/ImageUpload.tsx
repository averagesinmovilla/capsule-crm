"use client";

import axios, {AxiosProgressEvent, CancelTokenSource} from "axios";
import {
    AudioWaveform,
    File,
    FileImage,
    FolderArchive,
    UploadCloud,
    Video,
    X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressBar from "@/components/ui/progress";
import { toast } from '@/hooks/use-toast';
import {
    AudioColor,
    FileTypes,
    FileUploadProgress,
    ImageColor, OtherColor,
    PdfColor,
    Props, uploadedFileType,
    VideoColor
} from "@/types/image-upload.types";

export default function ImageUpload({ fileUploaderService, maxFiles = 1, accept = 'image/png, image/jpeg', resourceId, onUploadedFiles, fileKey }: Props) {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

    const getFileIconAndColor = (file: File) => {
        if (file.type.includes(FileTypes.Image)) {
            return {
                icon: <FileImage size={40} className={ImageColor.fillColor} />,
                color: ImageColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Pdf)) {
            return {
                icon: <File size={40} className={PdfColor.fillColor} />,
                color: PdfColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Audio)) {
            return {
                icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
                color: AudioColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Video)) {
            return {
                icon: <Video size={40} className={VideoColor.fillColor} />,
                color: VideoColor.bgColor,
            };
        }

        return {
            icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
            color: OtherColor.bgColor,
        };
    };

    // feel free to mode all these functions to separate utils
    // here is just for simplicity
    const onUploadProgress = (
        progressEvent: AxiosProgressEvent,
        file: File,
        cancelSource: CancelTokenSource
    ) => {
        const progress = Math.round(
            (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
        );

        if (progress === 100) {
            setUploadedFiles((prevUploadedFiles) => {
                return [...prevUploadedFiles, file];
            });

            setFilesToUpload((prevUploadProgress) => {
                return prevUploadProgress.filter((item) => item.File !== file);
            });

            return;
        }

        setFilesToUpload((prevUploadProgress) => {
            return prevUploadProgress.map((item) => {
                if (item.File.name === file.name) {
                    return {
                        ...item,
                        progress,
                        source: cancelSource,
                    };
                } else {
                    return item;
                }
            });
        });
    };

    const uploadImageToCloudinary = async (
        formData: FormData,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
        cancelSource: CancelTokenSource
    ) => {
        return fileUploaderService.upload(
            formData,
            {
                onUploadProgress,
                cancelToken: cancelSource.token,
            },
            resourceId
        );
    };

    const removeFile = (file: File) => {
        setFilesToUpload((prev) => prev.filter((item) => item.File !== file));
        setUploadedFiles((prev) => prev.filter((item) => item !== file));
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setFilesToUpload((prevUploadProgress) => {
            return [
                ...prevUploadProgress,
                ...acceptedFiles.map((file) => {
                    return {
                        progress: 0,
                        File: file,
                        source: null,
                    };
                }),
            ];
        });

        // cloudinary upload

        const fileUploadBatch = acceptedFiles.map((file) => {
          const formData = new FormData();
          formData.append(fileKey ?? "image", file);

          const cancelSource = axios.CancelToken.source();
          return uploadImageToCloudinary(
            formData,
            (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
            cancelSource
          );
        });

        try {
          const res: uploadedFileType[] = await Promise.all(fileUploadBatch);

          if (onUploadedFiles) {
            onUploadedFiles(res)
          }
        } catch (error) {
          console.error("Error uploading files: ", error);
        }
    }, []);

    const onDropAccepted: DropzoneOptions['onDropAccepted'] = useCallback(() => {
        toast({ description : 'Files Uploaded Successfully.' });
    }, []);

    const onDropRejected: DropzoneOptions['onDropRejected'] = useCallback((fileRejections: FileRejection[], event: DropEvent) => {
        const messages = fileRejections.flatMap(file =>
            file.errors.map((error, index) => <p key={`${file.file.path}-${index}`}>{error.message}</p>)
        );

        toast({ description: messages, variant: "destructive" });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles,
        maxSize: 2 * 1024 * 1024,
        onDropRejected,
        onDrop,
        onDropAccepted,
    });

    return (
        <div>
            <div>
                <label
                    {...getRootProps()}
                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                    <div className=" text-center">
                        <div className=" border p-2 rounded-md max-w-min mx-auto">
                            <UploadCloud size={20} />
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Drag files</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click to upload files &#40;files should be under 2 MB &#41;
                        </p>
                    </div>
                </label>

                <Input
                    {...getInputProps()}
                    id="dropzone-file"
                    accept={accept}
                    type="file"
                    className="hidden"
                />
            </div>

            {filesToUpload.length > 0 && (
                <div>
                    <ScrollArea className="h-40">
                        <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                            Files to upload
                        </p>
                        <div className="space-y-2 pr-3">
                            {filesToUpload.map((fileUploadProgress) => {
                                return (
                                    <div
                                        key={fileUploadProgress.File.lastModified}
                                        className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                                    >
                                        <div className="flex items-center flex-1 p-2">
                                            <div className="text-white">
                                                {getFileIconAndColor(fileUploadProgress.File).icon}
                                            </div>

                                            <div className="w-full ml-2 space-y-1">
                                                <div className="text-sm flex justify-between">
                                                    <p className="text-muted-foreground ">
                                                        {fileUploadProgress.File.name.slice(0, 25)}
                                                    </p>
                                                    <span className="text-xs">
                                                        {fileUploadProgress.progress}%
                                                    </span>
                                                </div>
                                                <ProgressBar
                                                    progress={fileUploadProgress.progress}
                                                    className={
                                                        getFileIconAndColor(fileUploadProgress.File).color
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (fileUploadProgress.source)
                                                    fileUploadProgress.source.cancel("Upload cancelled");
                                                removeFile(fileUploadProgress.File);
                                            }}
                                            className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <div>
                    <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                        Uploaded Files
                    </p>
                    <div className="space-y-2 pr-3">
                        {uploadedFiles.map((file) => {
                            return (
                                <div
                                    key={file.lastModified}
                                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                                >
                                    <div className="flex items-center flex-1 p-2">
                                        <div className="text-white">
                                            {getFileIconAndColor(file).icon}
                                        </div>
                                        <div className="w-full ml-2 space-y-1">
                                            <div className="text-sm flex justify-between">
                                                <p className="text-muted-foreground ">
                                                    {file.name.slice(0, 25)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file)}
                                        className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
