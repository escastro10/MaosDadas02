'use client'
import { getAreasByPeriod } from "@/api/area/get-areas";
import { getPeriods } from "@/api/periods/get-periods";
import AreaItem from "@/components/area-item";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import AppLayout from "@/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function Page() {

    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);


    const { data: periods } = useQuery({
        queryKey: ["periods"],
        queryFn: getPeriods
    });

    const { data: areas, isLoading: areaLoading } = useQuery({
        queryKey: ["areas", selectedPeriod],
        queryFn: () => getAreasByPeriod({ periodId: selectedPeriod }),
    })

    async function handleSelectPeriod(value: string) {
        setSelectedPeriod(value);
    }



    return (
        <AppLayout>
            <div>
                <h1 className="text-xl font-bold">Indicadores Sustentáveis</h1>
                <span className="text-base font-medium text-gray-500">Todas categorias de indicadores do Sistema.</span>
            </div>

            <div className="my-5 w-[300px]">
                <span className="text-base font-semibold">Selecione o Período</span>
                <Select onValueChange={handleSelectPeriod}>
                    <SelectTrigger className="w-[300px]">
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

            {
                selectedPeriod === null ? (
                    <div className="flex flex-col items-center gap-2">
                        <img src="/period-null.svg" className="size-96" alt="" />
                        <span className="text-lg font-medium text-gray-500">Selecione um período para visualizar os indicadores.</span>
                    </div>
                ) : (
                    <div className="mt-12 grid md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-5">

                        {
                            areas && areas.map((area) => (
                                <AreaItem key={area?.id} data={area} />
                            ))
                        }

                        {
                            areas && areas.length === 0 && (
                                <div className="col-span-6 flex flex-col items-center gap-2">
                                    <img src="/area-empty.svg" className="size-96" alt="" />
                                    <span className="text-lg font-medium text-gray-500">Nenhuma área encontrada para o período selecionado.</span>
                                </div>
                            )
                        }

                        {
                            areaLoading && (
                                Array.from({ length: 20 }).map((_, index) => (
                                    <Skeleton key={index} className="h-36" />

                                ))

                            )
                        }



                    </div>

                )
            }



        </AppLayout>
    )
}
