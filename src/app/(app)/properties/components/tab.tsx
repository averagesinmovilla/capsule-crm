'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Property } from "@/types/property.types"
import PropertyDetails from "@/app/(app)/properties/components/propertyDetails";
import LocationDetails from "@/app/(app)/properties/components/locationDetails";
import React from "react";
import dynamic from 'next/dynamic';
import ClientPropertyDetails from "@/app/(app)/properties/components/clientPropertyDetails";
import {IoDownloadOutline, IoEyeOutline} from "react-icons/io5";


//Esto es útil para componentes que dependen de objetos o propiedades disponibles solo en el navegador, como window o document, que no existen en el entorno de servidor.
//porl o que con la siguiente intruccion le decimos que cargue el componente mapa de forma dinamica y le indicamos con el ssr false que no lo haga en el lado del servidor.
const MapDetails = dynamic(() => import('./map/mapDetails'), {
    ssr: false
});

interface TabPropertyProps {
    property: Property
}

const TabProperty: React.FC<TabPropertyProps> = ({ property }) => {
    const renderField = (label: string, value: string | number | null | undefined) => (
        <p className="mr-20"><span className="font-semibold">{label}:</span> {value || '-'}</p>
    );

    return (
        <div className='flex hidden'>
            <Tabs defaultValue="task" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="task">Tasks</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                    <TabsTrigger value="relations">Relations</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="task" className="overflow-y-auto max-h-[300px]">
                    <Card className="overflow-auto">
                        <CardContent className="space-y-4 h-auto overflow-auto text-sm">
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline />
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 1: Llamar al cliente</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Tarea 3: Programar reunió</span>
                                <IoEyeOutline className="cursor-pointer"/>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="actions">
                    <Card>
                        <CardContent className="space-y-4 h-auto overflow-auto text-sm">
                            <div className="p-4 border-b-2">
                                <span>Enviado correo el 01/06/2024</span>
                            </div>
                            <div className="p-4 border-b-2">
                                <span>Realizada llamada el 03/06/2024</span>
                            </div>
                            <div className="p-4 border-b-2">
                                <span>Programada visita el 05/06/2024</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="relations">
                    <Card>
                        <CardContent className="space-y-4 h-auto overflow-auto text-sm">
                        <div className="p-4 border-b-2">
                                <span>Relacionado con: Proyecto A</span>
                            </div>
                            <div className="p-4 border-b-2">
                                <span>Contacto: Juan Pérez</span>
                            </div>
                            <div className="p-4 border-b-2">
                                <span>Empresa: Tech Solutions</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="documents">
                    <Card>
                        <CardContent className="space-y-4 h-auto overflow-auto text-sm">
                        <div className="p-4 border-b-2 flex justify-between">
                                <span>Contrato firmado</span>
                                <IoDownloadOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Presupuesto enviado</span>
                                <IoDownloadOutline className="cursor-pointer"/>
                            </div>
                            <div className="p-4 border-b-2 flex justify-between">
                                <span>Informe de seguimient</span>
                                <IoDownloadOutline className="cursor-pointer"/>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TabProperty
