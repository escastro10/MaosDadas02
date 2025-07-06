'use client'
import { getAreaById } from "@/api/area/get-area-by-id";
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
import { useParams, useRouter } from "next/navigation";
import { Check } from "phosphor-react";
import { useState } from "react";

export default function Page() {

    const router = useRouter()

    const { areaId } = useParams()

    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);



    const { data: area } = useQuery({
        queryKey: ['area', areaId],
        queryFn: () => getAreaById({ areaId: areaId as string })
    })

    const handleSelectedCategory = (value: string) => {
        setSelectedCategory(value)
    }

    return (
        <AppLayout>
            <TitleSection title="Novo Indicador Sustentável"
                description="Preencha os campos abaixo para criar um novo indicador sustentável"
            />

            <div className="flex items-center gap-12 my-8">
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg p-1 rounded-full bg-gray-500 size-10 items-center justify-center flex">1</span>
                    <span className="text-[#333] font-semibold">Selecione o Período e a Área</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg p-1 rounded-full bg-blue-500 size-10 items-center justify-center flex">2</span>
                    <span className="text-blue-400 font-semibold">Selecione a Categoria</span>
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
                        <label>Categoria</label>
                        <Select onValueChange={handleSelectedCategory}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Selecione uma Categoria para o Indicador" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categorias</SelectLabel>
                                    {
                                        area && area?.categories.map(category => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex mt-5 justify-between w-full">
                    <div className="w-full"></div>
                    <div className="w-[200px] mr-2">
                        <Button variant="secondary" onClick={() => router.back()} className="mt-10">Voltar</Button>
                    </div>
                    <div className="w-[200px]">
                        <Button className="mt-10" onClick={() => router.push(`/indicadores-sustentaveis/criar/${areaId}/${selectedCategory}`)}>Avançar</Button>
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

