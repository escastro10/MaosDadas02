'use client'
import { getAreasByPeriod } from "@/api/area/get-areas";
import { getPeriods } from "@/api/periods/get-periods";
import TitleSection from "@/components/title-section";
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
import AppLayout from "@/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Check } from "phosphor-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {

    const router = useRouter()

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

    async function handleNext() {
        if (!selectedArea) {
            return toast.warning("Selecione uma área para prosseguir");
        }

        // Check if the selected area has categories registered
        const hasCategories = areas?.some(area => area.id === selectedArea && area.categories.length > 0);

        if (!hasCategories) {
            return toast.error("A área selecionada não possui categorias cadastradas");
        }

        // Proceed to the next step
        router.push(`/indicadores-sustentaveis/criar/${selectedArea}`);
    }

    return (
        <AppLayout>
            <TitleSection title="Novo Indicador Sustentável"
                description="Preencha os campos abaixo para criar um novo indicador sustentável"
            />

            <div className="flex items-center gap-12 my-8">
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg p-1 rounded-full bg-blue-500 size-10 items-center justify-center flex">1</span>
                    <span className="text-blue-400 font-semibold">Selecione o Período e a Área</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg p-1 rounded-full bg-gray-500 size-10 items-center justify-center flex">2</span>
                    <span className="text-[#333] font-semibold">Selecione a Categoria</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg p-1 rounded-full bg-gray-500 size-10 items-center justify-center flex">
                        <Check size={20} weight="duotone" />
                    </span>
                    <span className="text-[#333] font-semibold">Finalize o Cadastro</span>
                </div>

            </div>

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
                        <Button className="mt-10" onClick={handleNext} >Avançar</Button>
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

