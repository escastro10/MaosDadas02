'use client'
import { getPeriods } from "@/api/periods/get-periods";
import TitleSection from "@/components/title-section";
import AppLayout from "@/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export default function Page() {

    const { data: periods } = useQuery({
        queryKey: ["periods"],
        queryFn: getPeriods
    });

    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false)


    async function handleSelectPeriod(value: string) {
        setSelectedPeriod(value);
    }

    return (
        <AppLayout>
            <div className="flex gap-2">
                <Link className="p-2 rounded-full border mr-4 size-12 bg-[#fff] duration-300 hover:shadow-xl flex items-center justify-center" href={`/gerenciar-metadados`}>
                    <ChevronLeft size={24} className="cursor-pointer text-blue-500" />
                </Link>
                <div>
                    <TitleSection title="Nova Área" description="Cadastre uma nova área para o sistema." />
                </div>
            </div>

            <div className="mt-12 w-[800px]">
                <p className="mb-2 text-lg">Selecione o Período que deseja cadastrar a área.</p>
                <div className="flex items-center gap-2">
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

                    <div className="w-[300px]">
                        {selectedPeriod?.length >= 0 ? (
                            <Link onClick={() => setIsLoading(true)} href={`/nova-area/${selectedPeriod}`}>
                                <Button isLoading={isLoading}>Avançar</Button>
                            </Link>
                        ) : (
                            <Button disabled>Avançar</Button>
                        )}
                    </div>
                </div>

            </div>
        </AppLayout>
    )
}
