"use client"

import { GeneralizedPieChart } from "@/app/(app)/dashboard/components/GeneralizedPieChart";
import * as React from "react";
import {ContactService} from "@/services/contact.service";
import {SkeletonCard} from "@/components/SkeletonCard";

export function ContactContactMedium() {
    const [data, setData] = React.useState<Record<string, number> | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const contactService = new ContactService();
                const contactServiceRes = await contactService.statsContactMedium();
                setData(contactServiceRes.data);
            } catch (error) {
                console.error("Error fetching contact contact_medium data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Solo se ejecuta una vez, al montar el componente

    if (loading) {
        return <SkeletonCard/>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <GeneralizedPieChart
            data={data}
            keyName="contact_medium"
            valueName="count"
            chartTitle="Contact Stats"
            chartDescription="Distribution by contact medium"
        />
    );
}
