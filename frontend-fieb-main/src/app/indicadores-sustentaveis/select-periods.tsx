'use client'
import { getPeriods } from "@/api/periods/get-periods";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";



export function SelectPeriods() {

    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);


    const { data: periods } = useQuery({
        queryKey: ["periods"],
        queryFn: getPeriods
    });

    async function handleSelectPeriod(value: string) {
        setSelectedPeriod(value);
    }

    return (
        <Select onValueChange={handleSelectPeriod}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione um Período" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Períodos</SelectLabel>
                    {periods && periods.map((period) => (
                        <SelectItem key={period.id} value={period.id}>
                            {period.year}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
