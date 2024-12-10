'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Contact } from "@/types/contact.types";

interface TabContactProps {
    contact: Contact;
}

const TabContact: React.FC<TabContactProps> = ({ contact }) => {
    const renderField = (label: string, value: string | number | null | undefined) => (
        <p className="mr-20">
            <span className="font-semibold">{label == "" ? "" : label+":"}</span> {value || '-'}
        </p>
    );

    return (
        <div className="flex p-5">
            <Tabs defaultValue="data" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="data">Personal Information</TabsTrigger>
                    <TabsTrigger value="relations">Relationships</TabsTrigger>
                </TabsList>
                <TabsContent value="data">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Contact details and personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                            <div className="grid grid-cols-1 gap-4">
                                {/* Contact Details */}
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold">Contact Details</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 min-h-[80px]">
                                        {renderField('Email', contact.email)}
                                        {renderField('Alternate Email', contact.alternate_email)}
                                        {renderField('Phone', contact.phone)}
                                        {renderField('Mobile', contact.mobile)}
                                        {renderField('Preferred Contact Method', contact.contact_medium)}
                                        {renderField('Language', contact.language)}
                                    </div>

                                </div>

                                {/* Personal Information */}
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold">Personal Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 min-h-[80px]">
                                        {renderField('NIF', contact.nif)}
                                        {renderField('Date of Birth', contact.birthday)}
                                        {renderField('Gender', contact.gender)}
                                    </div>

                                </div>

                                {/* Profession */}
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold">Profession</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 min-h-[80px]">
                                        {renderField('Profession', contact.profession)}
                                        {renderField('Company', contact.company)}
                                    </div>

                                </div>

                                {/* Notes */}
                                <div className="p-4 bg-white rounded shadow">
                                <h3 className="font-bold">Notes</h3>
                                    <div className="flex flex-wrap min-h-[80px] p-5">
                                        {renderField('', contact.notes)}
                                    </div>
                                </div>

                                {/* GDPR */}
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold">RGPD</h3>
                                    <div className="flex flex-wrap min-h-[200px] p-5">
                                        {renderField('', contact.rgpd)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="relations">
                    <Card>
                        <CardHeader>
                            <CardTitle>Relationships</CardTitle>
                            <CardDescription>People and entities related to this contact.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                            <div className="p-4 bg-white rounded shadow">
                                <span>Related to: Project A</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Contact: John Doe</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Company: Tech Solutions</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TabContact;
