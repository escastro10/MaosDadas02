'use client'
import { createPeriod } from '@/api/period/create'
import { getPeriods } from '@/api/periods/get-periods'
import TitleSection from '@/components/title-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AppLayout from '@/layouts/AppLayout'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { AlertCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Page() {


    const [selectedPeriod, setSelectedPeriod] = useState('')

    const [year, setYear] = useState()

    const [loading, setLoading] = useState(false)

    const { data: periods } = useQuery({
        queryKey: ['periods'],
        queryFn: getPeriods
    })

    const { mutateAsync: newPeriod } = useMutation({
        mutationFn: createPeriod
    })

    const handleSelectPeriod = (periodId: string) => {
        setSelectedPeriod(periodId)
    }

    const handleNewPeriod = async () => {
        setLoading(true)
        try {

            await newPeriod({ year: Number(year), cloneFromPeriodId: selectedPeriod })

            setTimeout(() => {
                window.location.replace('/gerenciar-metadados')
            }, 1000)



        } catch {

            toast.error('Houve um erro ao cadastrar este periodo.')

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AppLayout>
            <TitleSection title='Novo Periodo' description='Cadastre um novo período para inserção de dados no sistema.' />



            <div className='flex flex-col gap-3 mt-12 max-w-2xl'>


                <div className="flex gap-2">
                    <AlertCircleIcon className='text-blue-600' />
                    <div className='mb-3'>
                        <h1 className='text-lg font-semibold'>Selecione um ano para replicar para o novo período</h1>
                        <span className='text-base text-zinc-500'>Você irá selecionar um período para copiar todos os dados existentes para o novo período cadastrado.</span>
                    </div>
                </div>



                <div className='grid grid-cols-6 gap-4'>
                    {periods && periods.map((period: any) => (
                        <div key={period.id} onClick={() => handleSelectPeriod(period.id)} className={clsx('border border-zinc-400/60 w-full p-1.5 rounded flex items-center justify-center cursor-pointer duration-300 hover:scale-95', {

                            'bg-blue-500': selectedPeriod === period.id,
                            'hover:bg-blue-600': selectedPeriod === period.id,
                            'text-white': selectedPeriod === period.id,
                            'text-zinc-500': selectedPeriod !== period.id,
                            'hover:bg-zinc-200': selectedPeriod !== period.id,




                        })}>
                            {period.year}
                        </div>
                    ))}
                </div>




                <div className='space-y-4 mt-6'>
                    <div className="space-y-2">
                        <label>Ano</label>
                        <Input onChange={(e: any) => setYear(e.target.value)} value={year} className='w-[300px]' type='number' placeholder='Ex.: 2024' />
                    </div>
                </div>

                <div className='w-[300px]'>
                    <Button isLoading={loading} onClick={handleNewPeriod}>Cadastrar</Button>
                </div>

            </div>
        </AppLayout>
    )
}
