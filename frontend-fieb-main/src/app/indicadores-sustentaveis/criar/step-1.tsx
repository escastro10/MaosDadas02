'use client'
import { getAreasByPeriod } from "@/api/area/get-areas";
import { getPeriods } from "@/api/periods/get-periods";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

export default function Step1({ setStep }: any) {
    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const { data: periods } = useQuery({
        queryKey: ["periods"],
        queryFn: getPeriods
    });

    const { data: areas } = useQuery({
        queryKey: ['areas', selectedPeriod],
        queryFn: () => getAreasByPeriod({ periodId: selectedPeriod as string })
    })

    async function handleSelectPeriod(value: string) {
        setSelectedPeriod(value);
    }

    async function handleSelectArea(value: string) {
        setSelectedArea(value);
    }

    function handleNextStep() {
        if (!selectedPeriod || !selectedArea) {
            toast.warning('Selecione um Período e uma Área para continuar');
            return;
        }
        setStep((prevStep: any) => prevStep + 1);
    }

    return (
        <div className="mt-12 p-6 bg-[#fff] rounded-lg drop-shadow-sm">
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label>Período</label>
                    <Select onValueChange={handleSelectPeriod}>
                        <SelectTrigger className="">
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
                </div>

                <div className="space-y-2">
                    <label>Áreas</label>
                    <Select onValueChange={handleSelectArea}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Selecione um Período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Áreas</SelectLabel>
                                {areas && areas.map((area) => (
                                    <SelectItem key={area.id} value={area.id}>
                                        {area.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex mt-5 justify-between w-full">
                <div className="w-full"></div>
                <div className="w-[200px]">
                    <Button className="mt-10" onClick={handleNextStep}>Próximo Passo</Button>
                </div>
            </div>
        </div>
    )
}
