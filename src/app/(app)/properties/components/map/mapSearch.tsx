import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import {IoReloadSharp} from "react-icons/io5";
import {toast, useToast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";


interface MapSearchProps {
    onLocationSelected: (latitude: number, longitude: number) => void;
    search?: string;
}

const MapSearch: React.FC<MapSearchProps> = ({ onLocationSelected, search }) => {
    const { toast } = useToast();
    const [query, setQuery] = useState('');
    const [buttonLoader, setButtonLoader] = useState('');
    const handleSearch = async () => {
        if (!query) return;
        try {
            setButtonLoader('load');
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`
            );

            const data = await response.json();

            if (data.length > 0) {
                onLocationSelected(parseFloat(data[0].lat), parseFloat(data[0].lon));
                search = "";
                setQuery("");
            } else {
                toast({
                    variant: "destructive",
                    title: "No results found",
                    description: "Change street, number or city",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "No results found",
                description: "Error fetching location:"+ error,
            });
            setButtonLoader('');
        }

        setButtonLoader('');
    };

    // Efecto para ejecutar el update del campo search cuando este cambia
    useEffect(() => {
        if (search == "desactivate") {
            setQuery("");
        } else if (search) {
            setQuery(search);
        }
    }, [search]);


    if(query != "") {
        return (
            <div className="h-full w-full flex items-center justify-center absolute z-10 bg-zinc-200 opacity-80">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter city or street"
                    className="mr-5 hidden"
                />
                {buttonLoader === "load" ? (
                    <Button type="button" className="m-2">
                        <Loader2 className="animate-spin" />
                    </Button>
                ) : (
                    <Button type="button" className="m-2" onClick={handleSearch}>
                        <IoReloadSharp />
                    </Button>
                )}
            </div>
        );
    }
};

export default MapSearch;
