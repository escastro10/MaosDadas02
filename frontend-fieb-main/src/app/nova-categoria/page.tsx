'use client'
import { getPeriods } from '@/api/periods/get-periods';
import TitleSection from '@/components/title-section';
import AppLayout from '@/layouts/AppLayout';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getAreasByPeriod } from '@/api/area/get-areas';
import AreaCategory from '@/components/area-category';
import { Button } from '@/components/ui/button';
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

    const { data: periods, refetch } = useQuery({
        queryKey: ['periods'],
        queryFn: getPeriods
    })


    const [selectedPeriod, setSelectedPeriod] = useState(null);

    const { data: areas } = useQuery({
        queryKey: ['areas', selectedPeriod as string],
        queryFn: () => getAreasByPeriod({ periodId: selectedPeriod })
    })

    const [selectedArea, setSelectedArea] = useState(null);


    async function handleSelectPeriod(value: string) {
        setSelectedPeriod(value);
    }




    return (
        <AppLayout>
            <TitleSection
                title='Nova Categoria'
                description='Preencha os campos abaixo para cadastrar uma nova categoria.'
            />

            <div className='mt-12'>
                <h1>Selecione o Periodo que deseja cadastrar</h1>
                <Select onValueChange={handleSelectPeriod}>
                    <SelectTrigger className="w-[280px]">
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

            {selectedPeriod && (
                <div className='mt-6'>

                    {areas?.length > 0 && (<h1 className='text-lg font-bold text-[#333]'>Agora, informe em qual área deseja cadastrar</h1>
                    )}

                    <div className='grid grid-cols-9 gap-6 mt-5'>

                        {areas && areas?.length > 0 ? areas.map((area) => (
                            <AreaCategory key={area.id} onClick={() => setSelectedArea(area.id)} data={area} selected={selectedArea} />
                        )) : (
                            <div className='w-full'>
                                <h1 className='text-lg text-gray-500'>Nenhuma área encontrada para este período.</h1>
                            </div>
                        )}

                    </div>

                    {
                        areas?.length > 0 && selectedArea && (
                            <div className='mt-12'>
                                <h1 className='font-semibold text-lg'>Agora, nomeie a categoria</h1>

                                <div className="flex flex-col mt-2.5">
                                    <label className='text-sm font-semibold'>Nome da Categoria</label>
                                    <input className='w-[400px] h-10 px-3 rounded-lg border outline-none' />
                                </div>

                                <div className='w-[200px]'>
                                    <Button className='mt-6' onClick={() => console.log('Cadastrar')}>Cadastrar</Button>

                                </div>
                            </div>
                        )
                    }

                </div>
            )}

        </AppLayout>
    )
}
