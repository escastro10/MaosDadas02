'use client'
import { getAreasByPeriod } from '@/api/area/get-areas'
import { getCategoriesByArea } from '@/api/category/get-by-area-id'
import { getIndicadorById } from '@/api/indicadores/get-by-id'
import { addOperationItem } from '@/api/operations/addItem'
import { catchOperationId } from '@/api/operations/catch-id'
import { createOperation } from '@/api/operations/createOperation'
import { removeOperationItem } from '@/api/operations/remove'
import { getPeriods } from '@/api/periods/get-periods'
import TitleSection from '@/components/title-section'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import AppLayout from '@/layouts/AppLayout'
import { api } from '@/lib/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { ChevronLeft, EyeOff, PencilIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ChatDots, Eye, PlusCircle, Trash, Warning, XCircle } from 'phosphor-react'
import { useState } from 'react'
import { MdDangerous } from 'react-icons/md'
import { toast } from 'sonner'

export default function Home() {

    const router = useRouter()
    const { indicadorId } = useParams()

    const { data: indicador, refetch } = useQuery({
        queryKey: ['indicador', indicadorId],
        queryFn: () => getIndicadorById(indicadorId as string)
    })

    const [selectedPeriod, setSelectedPeriod] = useState(null)
    const [category, setSelectedCategory] = useState(null)
    const [selectedIndicador, setSelectedIndicador] = useState(null)
    const [selectedArea, setSelectedArea] = useState(null)

    const [indicadorName, setIndicadorName] = useState(indicador?.pergunta)

    const [qualitativo, setQualitativo] = useState(indicador?.qualitativo)


    const handleSelectPeriod = (value: string) => {
        setSelectedPeriod(value)
        console.log(`Periodo é ${value}`)
    }

    const handleSelectedArea = (value: string) => {
        setSelectedArea(value)
    }

    const handleSelectedCategory = (value: string) => {
        setSelectedCategory(value)
    }

    const handleSelectedIndicador = (value: string) => {
        setSelectedIndicador(value)
    }

    const { mutateAsync: newOperation } = useMutation({
        mutationFn: createOperation
    })

    const { data: periods } = useQuery({
        queryKey: ['periods'],
        queryFn: getPeriods
    })

    const { data: areas } = useQuery({
        queryKey: ['areas', selectedPeriod],
        queryFn: () => getAreasByPeriod({ periodId: selectedPeriod })
    })

    const { data: categories } = useQuery({
        queryKey: ['categories', selectedArea],
        queryFn: () => getCategoriesByArea(selectedArea)
    })

    const { data: indicadores } = useQuery({
        queryKey: ['indicador', category as string],
        queryFn: async () => {
            const response = await api.get(`/indicadores/${category}`)
            return response.data
        }
    })


    const [deleteWord, setDeleteWord] = useState('')


    const { data: operationId } = useQuery({
        queryKey: ['operationId', indicadorId],
        queryFn: () => catchOperationId(indicadorId)
    })

    const { mutateAsync: addItem } = useMutation({
        mutationFn: addOperationItem
    })

    console.log(indicador?.operation)

    async function addItemToOperation() {
        try {
            await addItem({ indicadorId: selectedIndicador, operationId: operationId?.id })
            refetch()

            toast.success('Valor registrado com sucesso!', {
                description: 'Você pode adicionar mais valores, lembre-se de adicionar ao menos 2.',
            })
            return router.refresh()
        }
        catch (error) {
            console.log(error)
            toast.error('Erro ao adicionar')
        }
    }

    async function handleCreateOperation() {
        try {
            await newOperation({ indicadorId, type: indicador?.type })
            toast.success('Operação criada com sucesso', {
                description: 'Agora você pode começar a registrar os valores da operação',
            })

            refetch()

        }
        catch (error) {
            console.log(error)
            toast.error('Erro ao criar operação')
        }
    }

    const { mutateAsync: deleteOperationItem } = useMutation({
        mutationFn: removeOperationItem
    })


    const { mutateAsync: deleteIndicador } = useMutation({
        mutationFn: async (id: string) => {
            await api.delete('/indicador', {
                data: { id: indicadorId }
            })
        }
    })

    async function handleDeleteIndicador(id: string) {
        try {

            await deleteIndicador(id as string)
            router.back()
            toast.success('Indicador excluído com sucesso!')

        } catch (err) {
            toast.error('Erro ao excluir indicador.')
            console.log(err)

        }
    }

    async function handleDeleteOperation(id: string) {
        try {

            await deleteOperationItem(id)
            toast.success('Campo removido com sucesso!')
            refetch()

        } catch {
            toast.error('Erro ao remover campo.')

        }
    }

    async function handleUpdateQualitativo(indicadorId: string, qualitativo: string) {
        try {
            await api.put(`/indicador/update-qualitativo/${indicadorId}`, { qualitativo })
            toast.success('Valor qualitativo atualizado com sucesso!')
            refetch()
        } catch {
            toast.error('Erro ao atualizar valor qualitativo.')
        }
    }

    async function updateIndicadorName(id: string, pergunta: string) {
        try {
            await api.put(`/indicador/${id}/name`, { pergunta })
            toast.success('Nome do indicador alterado com sucesso!')
            refetch()
        } catch {
            toast.error('Erro ao alterar nome do indicador.')
        }
    }

    async function handleVisibility(id: string, visibility: boolean) {
        try {

            await api.put(`/indicador/${id}/visibility`, {
                visibility
            })

            refetch()
            toast.success('Visibilidade alterada!')

        } catch {
            toast.error('Erro ao alterar visibilidade.')
        }
    }

    return (
        <AppLayout>
            <div className="flex gap-2">
                <div onClick={() => router.back()} className="p-2 rounded-full border mr-4 size-12 bg-[#fff] duration-300 hover:shadow-xl flex items-center justify-center">
                    <ChevronLeft size={24} className="cursor-pointer text-blue-500" />
                </div>
                <div>
                    <TitleSection title="Editar Indicador" description={indicador?.pergunta} />
                </div>
            </div>


            <div className='mt-12'>
                <div className="max-w-3xl grid grid-cols-2 gap-3">
                    <div className="flex flex-col space-y-2">
                        <label className='font-semibold'>Nome do Indicador</label>
                        <div className="flex items-center gap-1">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className='size-9 bg-blue-500 rounded-full flex items-center justify-center'>
                                        <PencilIcon size={16} className='text-white' />
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Editar Nome do Indicador</DialogTitle>
                                    </DialogHeader>

                                    <div className='space-y-2'>
                                        <label>Nome do Indicador</label>
                                        <Input value={indicadorName} onChange={(e) => setIndicadorName(e.target.value)} defaultValue={indicador?.pergunta} />
                                        <Button onClick={() => updateIndicadorName(indicador?.id, indicadorName)}>Alterar</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <span className='text-lg font-bold text-blue-500 truncate max-w-xs'>{indicador?.pergunta}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className='font-semibold'>Tipo do Indicador</label>
                        <input defaultValue={indicador?.type} disabled className='w-full uppercase text-blue-500 bg-[#fff] border rounded-lg h-9 px-3 outline-none focus:border-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed' />
                    </div>
                </div>

                <div className='mt-12'>


                    <h1 className='font-medium mb-0.5'>Visibilidade do Indicador</h1>

                    <div className="flex items-center gap-2">

                        <div className={clsx('rounded-full size-12 flex items-center justify-center text-white hover:opacity-70 cursor-pointer transition-all', {
                            'bg-emerald-500': indicador?.isHide === false,
                            'bg-rose-500': indicador?.isHide === true
                        })}>

                            {indicador?.isHide === false && (
                                <Eye onClick={() => handleVisibility(indicador?.id, true)} size={24} />
                            )}

                            {indicador?.isHide === true && (
                                <EyeOff size={24} onClick={() => handleVisibility(indicador?.id, false)} />
                            )}

                        </div>

                        <span className={clsx('py-1.5 px-6 rounded-full font-bold', {
                            'bg-emerald-200': indicador?.isHide === false,
                            'bg-rose-200': indicador?.isHide === true,
                            'text-emerald-900': indicador?.isHide === false,
                            'text-rose-900': indicador?.isHide === true
                        })}>

                            {
                                indicador?.isHide === false ? 'Visível' : 'Oculto'
                            }

                        </span>

                    </div>




                </div>


                {
                    indicador?.type === 'adicao' && (
                        <div className='mt-12'>
                            <h1 className='font-medium'>Operação do Indicador - <span className='uppercase'>{indicador?.type}</span></h1>

                            {
                                indicador?.operations.length <= 0 && (
                                    <AlertDialog>

                                        <AlertDialogTrigger asChild>
                                            <div className='mt-4 flex items-center cursor-pointer gap-2 hover:bg-emerald-800 duration-300 bg-emerald-600 w-[200px] rounded-lg h-10 px-2'>
                                                <PlusCircle size={24} className='text-emerald-300' />
                                                <span className='text-white'>Adicionar Operação</span>
                                            </div>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Adicionar Operação</AlertDialogTitle>
                                            </AlertDialogHeader>

                                            <div>
                                                <h1 className='text-lg'>Tem certeza que deseja começar a registrar os valores da operação?</h1>
                                            </div>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary' className='w-[150px]'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button onClick={handleCreateOperation} className='w-[190px]'>Sim, Confirmar</Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )
                            }

                            {

                                indicador?.operations.length >= 1 && (
                                    <div className='mt-4'>
                                        <h1 className='text-lg'>Valores da Operação</h1>
                                        <div className='mt-2 flex flex-col gap-2'>

                                            {indicador?.operations.length <= 0 ? (
                                                <div className='space-y-2'>
                                                    <span className='text-gray-500'>Nenhum valor registrado - Adicione ao menos 2 valores</span>
                                                </div>
                                            ) : (
                                                <div className='space-y-1 mt-5'>
                                                    <span className='text-gray-500'>Valores Registrados</span>
                                                    <div className='grid grid-cols-1 max-w-xs gap-2'>
                                                        {
                                                            indicador?.operations?.map((operation) => (
                                                                operation?.campos?.map((campo) => (
                                                                    <div key={campo.id}>
                                                                        <div className='h-10 pl-2 flex items-center justify-between'>
                                                                            <span className='text-sm font-semibold'>{campo.indicador.pergunta} </span>

                                                                            <div className="flex items-center gap-4">
                                                                                <span className='text-gray-600 text-sm'>{campo.indicador.value}</span>


                                                                                <XCircle onClick={() => handleDeleteOperation(campo?.id)} weight='duotone' size={20} className='text-red-500 cursor-pointer hover:text-rose-800' />
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )}

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className='w-[200px]'>
                                                        <Button>Adicionar Valor</Button>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label>Selecione um Período</label>
                                                            <Select onValueChange={handleSelectPeriod}>
                                                                <SelectTrigger className="w-full">
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
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Área</label>
                                                                <Select onValueChange={handleSelectedArea}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Área" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Áreas</SelectLabel>
                                                                            {areas && areas?.map((area) => (
                                                                                <SelectItem key={area.id} value={area.id}>
                                                                                    {area.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}

                                                        {selectedArea && (
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Categoria</label>
                                                                <Select onValueChange={handleSelectedCategory}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Categoria" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Categorias</SelectLabel>
                                                                            {
                                                                                areas?.map((area) => (
                                                                                    area.categories.map((category) => (
                                                                                        <SelectItem key={category.id} value={category.id}>
                                                                                            {category.name}
                                                                                        </SelectItem>
                                                                                    ))
                                                                                ))
                                                                            }
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                        )}


                                                        {category && (
                                                            <div className="space-y-2">
                                                                <label>Selecione o Indicador</label>
                                                                <Select onValueChange={handleSelectedIndicador}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione um Indicador" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Indicadores</SelectLabel>
                                                                            {indicadores && indicadores.map((indicador) => (
                                                                                <SelectItem key={indicador.id} value={indicador.id}>
                                                                                    {indicador.pergunta}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}




                                                        <Button onClick={addItemToOperation}>Adicionar</Button>

                                                        <DialogClose asChild>
                                                            <Button variant='secondary'>Cancelar</Button>
                                                        </DialogClose>


                                                    </div>
                                                </DialogContent>
                                            </Dialog>



                                        </div>
                                    </div>
                                )

                            }
                        </div>
                    )
                }

                {
                    indicador?.type === 'percentual' && (
                        <div className='mt-12'>
                            <h1 className='font-medium'>Operação do Indicador - <span className='uppercase'>{indicador?.type}</span></h1>

                            {
                                indicador?.operations.length <= 0 && (
                                    <AlertDialog>

                                        <AlertDialogTrigger asChild>
                                            <div className='mt-4 flex items-center cursor-pointer gap-2 hover:bg-emerald-800 duration-300 bg-emerald-600 w-[200px] rounded-lg h-10 px-2'>
                                                <PlusCircle size={24} className='text-emerald-300' />
                                                <span className='text-white'>Adicionar Operação</span>
                                            </div>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Adicionar Operação</AlertDialogTitle>
                                            </AlertDialogHeader>

                                            <div>
                                                <h1 className='text-lg'>Tem certeza que deseja começar a registrar os valores da operação?</h1>
                                            </div>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary' className='w-[150px]'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button onClick={handleCreateOperation} className='w-[190px]'>Sim, Confirmar</Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )
                            }

                            {

                                indicador?.operations.length >= 1 && (
                                    <div className='mt-4'>
                                        <h1 className='text-lg'>Valores da Operação</h1>
                                        <div className='mt-2 flex flex-col gap-2'>

                                            {indicador?.operations.length <= 0 ? (
                                                <div className='space-y-2'>
                                                    <span className='text-gray-500'>Nenhum valor registrado - Adicione ao menos 2 valores</span>
                                                </div>
                                            ) : (
                                                <div className='space-y-1 mt-5'>
                                                    <span className='text-gray-500'>Valores Registrados</span>
                                                    <div className='grid grid-cols-1 max-w-xs gap-2'>
                                                        {
                                                            indicador?.operations?.map((operation) => (
                                                                operation?.campos?.map((campo) => (
                                                                    <div key={campo.id}>
                                                                        <div className='h-10 pl-2 flex items-center justify-between'>
                                                                            <span className='text-sm font-semibold'>{campo.indicador.pergunta} </span>

                                                                            <div className="flex items-center gap-4">
                                                                                <span className='text-gray-600 text-sm'>{campo.indicador.value}</span>


                                                                                <XCircle onClick={() => handleDeleteOperation(campo?.id)} weight='duotone' size={20} className='text-red-500 cursor-pointer hover:text-rose-800' />
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )}

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className='w-[200px]'>
                                                        <Button>Adicionar Valor</Button>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label>Selecione um Período</label>
                                                            <Select onValueChange={handleSelectPeriod}>
                                                                <SelectTrigger className="w-full">
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
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Área</label>
                                                                <Select onValueChange={handleSelectedArea}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Área" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Áreas</SelectLabel>
                                                                            {areas && areas?.map((area) => (
                                                                                <SelectItem key={area.id} value={area.id}>
                                                                                    {area.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}

                                                        {selectedArea && (
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Categoria</label>
                                                                <Select onValueChange={handleSelectedCategory}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Categoria" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Categorias</SelectLabel>
                                                                            {
                                                                                areas?.map((area) => (
                                                                                    area.categories.map((category) => (
                                                                                        <SelectItem key={category.id} value={category.id}>
                                                                                            {category.name}
                                                                                        </SelectItem>
                                                                                    ))
                                                                                ))
                                                                            }
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                        )}


                                                        {category && (
                                                            <div className="space-y-2">
                                                                <label>Selecione o Indicador</label>
                                                                <Select onValueChange={handleSelectedIndicador}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione um Indicador" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Indicadores</SelectLabel>
                                                                            {indicadores && indicadores.map((indicador) => (
                                                                                <SelectItem key={indicador.id} value={indicador.id}>
                                                                                    {indicador.pergunta}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}




                                                        <Button onClick={addItemToOperation}>Adicionar</Button>

                                                        <DialogClose asChild>
                                                            <Button variant='secondary'>Cancelar</Button>
                                                        </DialogClose>


                                                    </div>
                                                </DialogContent>
                                            </Dialog>



                                        </div>
                                    </div>
                                )

                            }
                        </div>
                    )
                }

                {
                    indicador?.type === 'quantitativo' && (
                        <div className='mt-12'>
                            <h1 className='font-medium'>Operação do Indicador - <span className='uppercase'>{indicador?.type}</span></h1>

                            {
                                indicador?.operations.length <= 0 && (
                                    <AlertDialog>

                                        <AlertDialogTrigger asChild>
                                            <div className='mt-4 flex items-center cursor-pointer gap-2 hover:bg-emerald-800 duration-300 bg-emerald-600 w-[200px] rounded-lg h-10 px-2'>
                                                <PlusCircle size={24} className='text-emerald-300' />
                                                <span className='text-white'>Adicionar Operação</span>
                                            </div>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Adicionar Operação</AlertDialogTitle>
                                            </AlertDialogHeader>

                                            <div>
                                                <h1 className='text-lg'>Tem certeza que deseja começar a registrar os valores da operação?</h1>
                                            </div>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary' className='w-[150px]'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button onClick={handleCreateOperation} className='w-[190px]'>Sim, Confirmar</Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )
                            }

                            {

                                indicador?.operations.length >= 1 && (
                                    <div className='mt-4'>
                                        <h1 className='text-lg'>Valores da Operação</h1>
                                        <div className='mt-2 flex flex-col gap-2'>

                                            {indicador?.operations.length <= 0 ? (
                                                <div className='space-y-2'>
                                                    <span className='text-gray-500'>Nenhum valor registrado - Adicione ao menos 2 valores</span>
                                                </div>
                                            ) : (
                                                <div className='space-y-1 mt-5'>
                                                    <span className='text-gray-500'>Valores Registrados</span>
                                                    <div className='grid grid-cols-1 max-w-xs gap-2'>
                                                        {
                                                            indicador?.operations?.map((operation) => (
                                                                operation?.campos?.map((campo) => (
                                                                    <div key={campo.id}>
                                                                        <div className='h-10 pl-2 flex items-center justify-between'>
                                                                            <span className='text-sm font-semibold'>{campo.indicador.pergunta} </span>

                                                                            <div className="flex items-center gap-4">
                                                                                <span className='text-gray-600 text-sm'>{campo.indicador.value}</span>


                                                                                <XCircle onClick={() => handleDeleteOperation(campo?.id)} weight='duotone' size={20} className='text-red-500 cursor-pointer hover:text-rose-800' />
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )}

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className='w-[200px]'>
                                                        <Button>Adicionar Valor</Button>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label>Selecione um Período</label>
                                                            <Select onValueChange={handleSelectPeriod}>
                                                                <SelectTrigger className="w-full">
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
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Área</label>
                                                                <Select onValueChange={handleSelectedArea}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Área" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Áreas</SelectLabel>
                                                                            {areas && areas?.map((area) => (
                                                                                <SelectItem key={area.id} value={area.id}>
                                                                                    {area.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}

                                                        {selectedArea && (
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Categoria</label>
                                                                <Select onValueChange={handleSelectedCategory}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Categoria" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Categorias</SelectLabel>
                                                                            {
                                                                                areas?.map((area) => (
                                                                                    area.categories.map((category) => (
                                                                                        <SelectItem key={category.id} value={category.id}>
                                                                                            {category.name}
                                                                                        </SelectItem>
                                                                                    ))
                                                                                ))
                                                                            }
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                        )}


                                                        {category && (
                                                            <div className="space-y-2">
                                                                <label>Selecione o Indicador</label>
                                                                <Select onValueChange={handleSelectedIndicador}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione um Indicador" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Indicadores</SelectLabel>
                                                                            {indicadores && indicadores.map((indicador) => (
                                                                                <SelectItem key={indicador.id} value={indicador.id}>
                                                                                    {indicador.pergunta}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}




                                                        <Button onClick={addItemToOperation}>Adicionar</Button>

                                                        <DialogClose asChild>
                                                            <Button variant='secondary'>Cancelar</Button>
                                                        </DialogClose>


                                                    </div>
                                                </DialogContent>
                                            </Dialog>



                                        </div>
                                    </div>
                                )

                            }
                        </div>
                    )
                }



                {
                    indicador?.type === 'totalizador' && (
                        <div className='mt-12'>
                            <h1 className='font-medium'>Operação do Indicador - <span className='uppercase'>{indicador?.type}</span></h1>

                            {
                                indicador?.operations.length <= 0 && (
                                    <AlertDialog>

                                        <AlertDialogTrigger asChild>
                                            <div className='mt-4 flex items-center cursor-pointer gap-2 hover:bg-emerald-800 duration-300 bg-emerald-600 w-[200px] rounded-lg h-10 px-2'>
                                                <PlusCircle size={24} className='text-emerald-300' />
                                                <span className='text-white'>Adicionar Operação</span>
                                            </div>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Adicionar Operação</AlertDialogTitle>
                                            </AlertDialogHeader>

                                            <div>
                                                <h1 className='text-lg'>Tem certeza que deseja começar a registrar os valores da operação?</h1>
                                            </div>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary' className='w-[150px]'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button onClick={handleCreateOperation} className='w-[190px]'>Sim, Confirmar</Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>


                                    </AlertDialog>

                                )
                            }



                            {

                                indicador?.operations.length >= 1 && (
                                    <div className='mt-4'>
                                        <h1 className='text-lg'>Valores da Operação</h1>
                                        <div className='mt-2 flex flex-col gap-2'>

                                            {indicador?.operations.length <= 0 ? (
                                                <div className='space-y-2'>
                                                    <span className='text-gray-500'>Nenhum valor registrado - Adicione ao menos 2 valores</span>
                                                </div>
                                            ) : (
                                                <div className='space-y-1 mt-5'>
                                                    <span className='text-gray-500'>Valores Registrados</span>
                                                    <div className='grid grid-cols-1 max-w-xs gap-2'>
                                                        {
                                                            indicador?.operations?.map((operation) => (
                                                                operation?.campos?.map((campo) => (
                                                                    <div key={campo.id}>
                                                                        <div className='h-10 pl-2 flex items-center justify-between'>
                                                                            <span className='text-sm font-semibold'>{campo.indicador.pergunta} </span>

                                                                            <div className="flex items-center gap-4">
                                                                                <span className='text-gray-600 text-sm'>{campo.indicador.value}</span>


                                                                                <XCircle onClick={() => handleDeleteOperation(campo?.id)} weight='duotone' size={20} className='text-red-500 cursor-pointer hover:text-rose-800' />
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )}

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className='w-[200px]'>
                                                        <Button>Adicionar Valor</Button>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label>Selecione um Período</label>
                                                            <Select onValueChange={handleSelectPeriod}>
                                                                <SelectTrigger className="w-full">
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
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Área</label>
                                                                <Select onValueChange={handleSelectedArea}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Área" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Áreas</SelectLabel>
                                                                            {areas && areas?.map((area) => (
                                                                                <SelectItem key={area.id} value={area.id}>
                                                                                    {area.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}

                                                        {selectedArea && (
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Categoria</label>
                                                                <Select onValueChange={handleSelectedCategory}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Categoria" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Categorias</SelectLabel>
                                                                            {
                                                                                areas?.map((area) => (
                                                                                    area.categories.map((category) => (
                                                                                        <SelectItem key={category.id} value={category.id}>
                                                                                            {category.name}
                                                                                        </SelectItem>
                                                                                    ))
                                                                                ))
                                                                            }
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                        )}


                                                        {category && (
                                                            <div className="space-y-2">
                                                                <label>Selecione o Indicador</label>
                                                                <Select onValueChange={handleSelectedIndicador}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione um Indicador" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Indicadores</SelectLabel>
                                                                            {indicadores && indicadores.map((indicador) => (
                                                                                <SelectItem key={indicador.id} value={indicador.id}>
                                                                                    {indicador.pergunta}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}




                                                        <Button onClick={addItemToOperation}>Adicionar</Button>

                                                        <DialogClose asChild>
                                                            <Button variant='secondary'>Cancelar</Button>
                                                        </DialogClose>


                                                    </div>
                                                </DialogContent>
                                            </Dialog>



                                        </div>
                                    </div>
                                )

                            }


                        </div>
                    )
                }


                {
                    indicador?.type === 'subtracao' && (
                        <div className='mt-12'>
                            <h1 className='font-medium'>Operação do Indicador - <span className='uppercase'>{indicador?.type}</span></h1>

                            {
                                indicador?.operations.length <= 0 && (
                                    <AlertDialog>

                                        <AlertDialogTrigger asChild>
                                            <div className='mt-4 flex items-center cursor-pointer gap-2 hover:bg-emerald-800 duration-300 bg-emerald-600 w-[200px] rounded-lg h-10 px-2'>
                                                <PlusCircle size={24} className='text-emerald-300' />
                                                <span className='text-white'>Adicionar Operação</span>
                                            </div>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Adicionar Operação</AlertDialogTitle>
                                            </AlertDialogHeader>

                                            <div>
                                                <h1 className='text-lg'>Tem certeza que deseja começar a registrar os valores da operação?</h1>
                                            </div>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary' className='w-[150px]'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button onClick={handleCreateOperation} className='w-[190px]'>Sim, Confirmar</Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>


                                    </AlertDialog>

                                )
                            }



                            {

                                indicador?.operations.length >= 1 && (
                                    <div className='mt-4'>
                                        <h1 className='text-lg'>Valores da Operação</h1>
                                        <div className='mt-2 flex flex-col gap-2'>

                                            {indicador?.operations.length <= 0 ? (
                                                <div className='space-y-2'>
                                                    <span className='text-gray-500'>Nenhum valor registrado - Adicione ao menos 2 valores</span>
                                                </div>
                                            ) : (
                                                <div className='space-y-1 mt-5'>
                                                    <span className='text-gray-500'>Valores Registrados</span>
                                                    <div className='grid grid-cols-1 max-w-xs gap-2'>
                                                        {
                                                            indicador?.operations?.map((operation) => (
                                                                operation?.campos?.map((campo) => (
                                                                    <div key={campo.id}>
                                                                        <div className='h-10 pl-2 flex items-center justify-between'>
                                                                            <span className='text-sm font-semibold'>{campo.indicador.pergunta} </span>

                                                                            <div className="flex items-center gap-4">
                                                                                <span className='text-gray-600 text-sm'>{campo.indicador.value}</span>


                                                                                <XCircle onClick={() => handleDeleteOperation(campo?.id)} weight='duotone' size={20} className='text-red-500 cursor-pointer hover:text-rose-800' />
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )}

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className='w-[200px]'>
                                                        <Button>Adicionar Valor</Button>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label>Selecione um Período</label>
                                                            <Select onValueChange={handleSelectPeriod}>
                                                                <SelectTrigger className="w-full">
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
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Área</label>
                                                                <Select onValueChange={handleSelectedArea}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Área" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Áreas</SelectLabel>
                                                                            {areas && areas?.map((area) => (
                                                                                <SelectItem key={area.id} value={area.id}>
                                                                                    {area.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}

                                                        {selectedArea && (
                                                            <div className="space-y-2">
                                                                <label>Selecione uma Categoria</label>
                                                                <Select onValueChange={handleSelectedCategory}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione uma Categoria" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Categorias</SelectLabel>
                                                                            {
                                                                                areas?.map((area) => (
                                                                                    area.categories.map((category) => (
                                                                                        <SelectItem key={category.id} value={category.id}>
                                                                                            {category.name}
                                                                                        </SelectItem>
                                                                                    ))
                                                                                ))
                                                                            }
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                        )}


                                                        {category && (
                                                            <div className="space-y-2">
                                                                <label>Selecione o Indicador</label>
                                                                <Select onValueChange={handleSelectedIndicador}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecione um Indicador" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Indicadores</SelectLabel>
                                                                            {indicadores && indicadores.map((indicador) => (
                                                                                <SelectItem key={indicador.id} value={indicador.id}>
                                                                                    {indicador.pergunta}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}




                                                        <Button onClick={addItemToOperation}>Adicionar</Button>

                                                        <DialogClose asChild>
                                                            <Button variant='secondary'>Cancelar</Button>
                                                        </DialogClose>


                                                    </div>
                                                </DialogContent>
                                            </Dialog>



                                        </div>
                                    </div>
                                )

                            }


                        </div>
                    )
                }



                {
                    indicador?.type === 'qualitativo' && (
                        <div className='flex flex-col mt-6 space-y-1'>

                            <p>Valor do Indicador</p>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-200">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className='size-9 rounded-full bg-blue-600 flex items-center justify-center'>
                                            <ChatDots size={16} className='text-blue-100' />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Editar Valor Qualitativo</DialogTitle>
                                        </DialogHeader>
                                        <div className='flex flex-col gap-2'>
                                            <label>Valor Qualitativo</label>
                                            <Input value={qualitativo} defaultValue={indicador?.qualitativo} onChange={(e) => setQualitativo(e.target.value)} />
                                            <Button onClick={() => handleUpdateQualitativo(indicador?.id, qualitativo)}>Alterar</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <span className='font-medium  text-lg'>
                                    {indicador?.qualitativo}
                                </span>
                            </div>


                        </div>
                    )
                }


                <div className="mt-24 p-6 border">
                    <div className="flex items-center gap-2">
                        <Warning size={24} className='text-red-600' />
                        <h1 className='text-lg text-red-600 font-bold'>Zona Perigosa</h1>
                    </div>

                    <span className='text-zinc-600'>Você poderá excluir o indicador caso tenha cadastrado errado ou para testes.</span>

                    <div className='w-[250px] mt-4'>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button className='' variant='danger'>
                                    <Trash fontSize={24} />
                                    Excluir Indicador
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>


                                <div>
                                    <h1 className='text-lg font-semibold'>Tem certeza que deseja excluir este indicador?</h1>

                                    <div className="space-y-2 mt-4">
                                        <label htmlFor="">Digite a palavra excluir para habilitar o botão de exclusão.</label>
                                        <Input placeholder='Digite a palavra excluir' onChange={(e) => setDeleteWord(e.target.value)} value={deleteWord} />
                                    </div>
                                </div>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant='secondary'>Cancelar</Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button variant='danger' disabled={deleteWord !== 'excluir'} onClick={() => handleDeleteIndicador(indicadorId as string)}>Sim, excluir</Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>




                        </AlertDialog>

                    </div>
                </div>


            </div>



        </AppLayout>
    )
}
