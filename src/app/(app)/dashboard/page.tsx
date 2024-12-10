import { Overview } from "@/app/(app)/dashboard/components/overview";
import { RecentSales } from "@/app/(app)/dashboard/components/recentSales";
import { task } from '@/components/shared/data-table/data/tasks';
import { taskSchema } from '@/components/shared/data-table/data/schema';
import { z } from 'zod';
import * as React from 'react';
import {PropertyStatus} from "@/app/(app)/dashboard/components/PropertyStatus";
import {PropertyTypes} from "@/app/(app)/dashboard/components/PropertyTypes";
import {ContactContactMedium} from "@/app/(app)/dashboard/components/ContactContactMedium";

export const metadata = {
    title: 'Dashboard',
}

function getTasks() {
    return z.array(taskSchema).parse(task)
}

const Dashboard = () => {
    return (
        <div className="w-full gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
                <div className='flex flex-col gap-10 justify-center items-center'>
                    <div >
                        <div className="text-2xl font-bold text-center mb-5">Properties</div>
                        <div className="flex gap-5">
                            <PropertyStatus/>
                            <PropertyTypes/>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-center mb-5">Contacts</div>
                        <div className="flex">
                            <ContactContactMedium/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
