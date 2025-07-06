'use client'
import { addMessage } from "@/api/analisescriticas/add-message"
import { findAutoavaliacaoByIndicador } from "@/api/analisescriticas/find-by-indicador-id"
import { getAreaBySlug } from "@/api/area/get-area-by-slug"
import { getTurnoversAcumulados } from "@/api/indicadores/get-turnovers-acumulados"
import { getTurnoversMedios } from "@/api/indicadores/get-turnovers-medios"
import { listIndicadoresByCategoryId } from "@/api/indicadores/list-by-category-id"
import { UpdateValue } from "@/api/indicadores/update-value"
import { getPeriods } from "@/api/periods/get-periods"
import { getUserDetails } from "@/api/users/get-user-details"
import UpdateQualitativoDialog from "@/components/modals/UpdateQualitativoModal"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import AppLayout from "@/layouts/AppLayout"
import { api } from "@/lib/axios"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ChatsTeardrop, Eye } from "phosphor-react"
import { ChangeEvent, useState } from "react"
import { BsOpencollective } from "react-icons/bs"
import { Tooltip } from "react-tooltip"
import { toast } from "sonner"
import ModalAutoAvaliacao from "../../modal-autoavaliacao"


type Qualitativo = {
    id: string,
    qualitativo?: string,
    pergunta?: string
}

export default function Page() {

    const router = useRouter()

    const { period, slug } = useParams()


    const [message, setMessage] = useState('')


    const [qualitativoModal, setQualitativoModal] = useState(false);
    const [selectedQualitativo, setSelectedQualitativo] = useState<Qualitativo | null>(null);

    const calculateTurnoverMedio = (admitidos: number, desligados: number, efetivoMedio: number) => {
        const turnoverMedio = (((admitidos + desligados) / 2) / 12 * 100) / efetivoMedio;
        return turnoverMedio
    }

    const calculateTurnoverAcumulado = (admitidos: number, desligados: number, efetivoMedio: number) => {
        const turnoverAcumulado = (((admitidos + desligados) / 2) * 100) / efetivoMedio;
        return turnoverAcumulado
    }

    const calcularPorcentagem = (indicador: any) => {
        const total = indicadores?.reduce((total, indicador) => {
            return total + indicador?.value
        }, 0)

        return (indicador.value / total) * 100
    }

    const handleQualitativoModal = (indicador) => {
        setSelectedQualitativo({
            id: indicador.id,
            qualitativo: indicador.qualitativo,
            pergunta: indicador.pergunta
        });
        setQualitativoModal(true);
    };

    const handleBooleanUpdate = async (value: string, indicadorId: string) => {
        try {

            const { data } = await api.put(`/indicador/update-booleano/${indicadorId}`, {
                value
            })

            console.log(data)
            toast.success('Valor atualizado com sucesso!')
            refetch()
        } catch (error) {
            console.error(error)
            toast.error('Erro ao atualizar valor!')
        }
    }

    const { data, error } = useQuery({
        queryKey: ['area', { slug, period }],
        queryFn: () => getAreaBySlug({ slug: String(slug), period: Number(period) }),
    })

    const [selectedCategory, setSelectedCategory] = useState(data?.categories[0])


    const [admitidosId, setAdmitidosId] = useState('')
    const [desligadosId, setDesligadosId] = useState('')

    const [value, setValue] = useState(null)

    const { data: indicadores, error: errorIndicadores, refetch, isLoading } = useQuery({
        queryKey: ['indicadores', selectedCategory?.id],
        queryFn: () => listIndicadoresByCategoryId(selectedCategory?.id),
        enabled: !!selectedCategory?.id, // Habilita a query apenas se a categoria estiver selecionada
        refetchInterval: 700,
    });

    const [selectedIndicador, setSelectedIndicador] = useState<any>(indicadores?.[0])

    const { data: turnoversMedios, error: errorTurnoversMedios } = useQuery({
        queryKey: ['turnovers-medios', selectedCategory?.id],
        queryFn: () => getTurnoversMedios(selectedCategory?.id as string)
    })

    const { data: turnoversAcumulados } = useQuery({
        queryKey: ['turnovers-acumulados', selectedCategory?.id],
        queryFn: () => getTurnoversAcumulados(selectedCategory?.id as string)
    })

    const { mutateAsync: updateValue } = useMutation({
        mutationFn: UpdateValue
    })

    console.log(turnoversAcumulados)

    const { data: analiseCritica, error: errorAnaliseCritica } = useQuery({
        queryKey: ['analiseCritica', { indicadorId: selectedIndicador?.id }],
        queryFn: () => findAutoavaliacaoByIndicador(selectedIndicador?.id as string)
    })

    const { mutateAsync: newMessage } = useMutation({
        mutationFn: addMessage
    })

    const { user } = useUser()


    const { data: userDetail } = useQuery({
        queryKey: ['user-detail', user?.emailAddresses[0]?.emailAddress],
        queryFn: () => getUserDetails(user?.emailAddresses[0]?.emailAddress)
    })

    console.log(indicadores)

    const handleUpdateValue = async (value: number) => {
        try {

            await updateValue({
                id: selectedIndicador?.id as string,
                value: Number(value)
            })

            toast.success('Valor atualizado com sucesso!')
            refetch()

        } catch {

        }
    }


    const handleUpdateQualitativo = async (qualitativo: string, indicadorId: string) => {
        try {
            await api.put(`/indicador/update-qualitativo/${indicadorId}`, {
                qualitativo
            })

            setQualitativoModal(false)

            toast.success('Valor atualizado com sucesso!')
            refetch()

        } catch (err) {
            console.error(err)
            toast.error('Erro ao atualizar valor!')
        }

    }






    const handleAddMessage = async () => {
        try {
            await newMessage({
                analiseCriticaId: selectedIndicador?.analises_criticas?.id,
                message,
                userId: userDetail?.id
            })


            toast.success('Mensagem enviada com sucesso!')
            setMessage('')
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }


    const handleSelectCategory = async (category: any) => {
        setSelectedCategory(category)
        setSelectedIndicador(null)
        setAdmitidosId('')
        setDesligadosId('')
        setValue(null)
        setSelectedQualitativo(null)
        refetch()
    }


    const { data: periods } = useQuery({
        queryKey: ['periods'],
        queryFn: getPeriods
    })



    return (
        <AppLayout>
            <section className="grid grid-cols-8 gap-8">
                <div className="col-span-2 space-y-1 bg-[#fff] rounded-xl py-4">
                    <h1 className="text-lg text-blue-900 border-b font-bold px-3 py-1 mb-2.5">Categorias</h1>
                    {data && data?.categories.map((category) => (
                        <div key={category?.id} onClick={() => handleSelectCategory(category)} className={clsx('flex p-2 border-l-8 border-l-transparent transition-all duration-700 items-center gap-2 text-lg  cursor-pointer', {
                            'text-blue-600': selectedCategory?.id === category.id,
                            'font-bold': selectedCategory?.id === category.id,
                            'text-gray-300': selectedCategory?.id !== category.id,
                            'bg-gray-100': selectedCategory?.id === category.id,
                            'border-l-blue-600': selectedCategory?.id === category.id,

                        })}>

                            {category.name}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col col-span-6 bg-[#fff] p-6 rounded-xl h-full">

                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">{data?.name}</h1>
                        <div className="flex items-center gap-2">
                            Período de

                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="flex items-center gap-2 p-2 bg-zinc-100 rounded-full cursor-pointer hover:bg-zinc-200">
                                        <span className="text-blue-500">{period}</span>
                                        <BsOpencollective className="text-blue-700" size={18} />
                                    </div>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Selecione o Período</DialogTitle>
                                    </DialogHeader>

                                    <div className="grid grid-cols-4 gap-3">
                                        {periods?.map((period: any) => (
                                            <Link href={`/indicadores-sustentaveis/${period.year}/${slug}`} className="border rounded p-2 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-none cursor-pointer" key={period.id}>
                                                {period.year}
                                            </Link>
                                        ))}
                                    </div>


                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>


                    <div className="gap-3 mt-3 grid grid-cols-10 w-full">
                        {selectedCategory && selectedCategory.codes.map((code) => {
                            return (
                                <div key={code?.id} className="p-2 rounded-full flex items-center justify-center font-semibold bg-blue-500 text-white">
                                    {code.code.name}
                                </div>
                            )
                        })}
                    </div>

                    <p className="mt-6 text-lg text-blue-500">{selectedCategory?.name}</p>



                    <div className="flex flex-col gap-2 w-full bg-blue-100 p-6 rounded-xl mt-2.5">


                        {
                            isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Skeleton key={index} className="w-full bg-blue-200 h-12 rounded" />
                                ))
                            ) :
                                indicadores && indicadores.length >= 1 && indicadores.map((indicador) => (
                                    <div key={indicador?.id} className="flex items-center justify-between gap-3">

                                        <div className={clsx("flex items-center justify-between overflow-hidden rounded-lg bg-blue-200 w-full", {
                                            'bg-red-400': indicador?.type === 'totalizador',
                                            'bg-yellow-300': indicador?.type === 'turnover_medio',
                                            'bg-purple-300': indicador?.type === 'turnover_acumulado',
                                            'bg-green-200': indicador?.type === 'qualitativo',
                                            'bg-pink-200': indicador?.type === 'percentual',
                                            'bg-rose-200': indicador?.type === 'subtracao',
                                            'bg-emerald-300': indicador?.type === 'adicao',
                                            'bg-violet-200': indicador?.type === 'media'

                                        })}>
                                            <div className="flex items-center justify-between w-full">
                                                <p data-tooltip-id="indicador-pergunta" data-tooltip-content={indicador.pergunta} id='indicador-pergunta' className={clsx("ml-3 cursor-pointer truncate text-blue-700 font-medium", {
                                                    'text-white': indicador?.type === 'totalizador',
                                                    'font-bold': indicador?.type === 'totalizador',
                                                    'text-yellow-900': indicador?.type === 'turnover_medio',
                                                    'text-purple-900': indicador?.type === 'turnover_acumulado',
                                                    'text-green-900': indicador?.type === 'qualitativo',
                                                    'text-pink-900': indicador?.type === 'percentual',
                                                    'text-emerald-900': indicador?.type === 'adicao',
                                                    'text-rose-900': indicador?.type === 'subtracao',
                                                    'text-violet-900': indicador?.type === 'media'

                                                })}>{indicador.pergunta}</p>
                                                <Tooltip id='indicador-pergunta' />
                                                {indicador?.type === 'quantitativo' && (
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <span onClick={() => setSelectedIndicador({ id: indicador?.id, value: indicador?.value, pergunta: indicador?.pergunta })} className="px-6 min-w-[200px] cursor-pointer hover:bg-blue-900  duration-200  hover:text-lg max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white font-lg outline-none">{indicador.value}</span>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Editar Valor</DialogTitle>
                                                                <DialogDescription>Você estará editando o valor de <strong>{selectedIndicador?.pergunta}</strong></DialogDescription>
                                                            </DialogHeader>

                                                            <div className="flex flex-col gap-2">
                                                                <label>Valor</label>
                                                                <input defaultValue={+selectedIndicador?.value} value={value} onChange={(e: any) => setValue(e.target.value)} className="px-3 py-2 w-full rounded-lg outline-none bg-zinc-100 text-blue-500" />
                                                                <Button onClick={() => handleUpdateValue(value)}>Atualizar</Button>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}

                                                {indicador?.type === 'totalizador' && (
                                                    <span className="px-6 min-w-[200px] hover:bg-red-950 cursor-not-allowed  duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-red-900 text-white font-lg outline-none">
                                                        {indicador?.operations?.reduce((total, operation) => {
                                                            return total + operation?.campos?.reduce((sum, campo) => {
                                                                return sum + campo?.indicador?.value;
                                                            }, 0);
                                                        }, 0)}
                                                    </span>
                                                )}

                                                {indicador?.type === 'adicao' && (
                                                    <span className="px-6 min-w-[200px] hover:bg-emerald-950 cursor-not-allowed  duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-emerald-900 text-white font-lg outline-none">
                                                        {indicador?.operations?.reduce((total, operation) => {
                                                            return total + operation?.campos?.reduce((sum, campo) => {
                                                                return sum + campo?.indicador?.value;
                                                            }, 0);
                                                        }, 0)}
                                                    </span>
                                                )}

                                                {indicador?.type === 'percentual' && (
                                                    <span className="px-6 min-w-[200px] hover:bg-pink-950 cursor-not-allowed duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-pink-900 text-white font-lg outline-none">
                                                        {(() => {
                                                            // Supondo que você quer calcular o percentual do primeiro valor em relação ao segundo
                                                            const valores = indicador?.operations?.flatMap(operation =>
                                                                operation?.campos?.map(campo => campo?.indicador?.value)
                                                            );

                                                            if (valores.length < 2) return 'Dados insuficientes';

                                                            const [valor1, valor2] = valores;

                                                            // Calcula o percentual do primeiro valor em relação ao segundo
                                                            const percentual = (valor1 / valor2) * 100;

                                                            return `${percentual.toFixed(2)}%`; // Formata o percentual com duas casas decimais
                                                        })()}
                                                    </span>
                                                )}

                                                {indicador?.type === 'booleano' && (
                                                    <div className="relative inline-block min-w-[200px] max-w-[200px]">
                                                        <select
                                                            defaultValue={indicador?.question}
                                                            onChange={(e: any) => handleBooleanUpdate(e.target.value, indicador?.id)}
                                                            className="px-6 w-full h-12 font-medium flex items-center justify-center rounded-xl bg-blue-900 text-white text-lg outline-none appearance-none hover:bg-blue-950 duration-200"
                                                        >
                                                            <option value="true">Sim</option>
                                                            <option value="false">Não</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                                                            <ChevronDown size={16} />
                                                        </div>
                                                    </div>
                                                )}




                                                {indicador?.type === 'subtracao' && (
                                                    <span className="px-6 min-w-[200px] hover:bg-pink-950 cursor-not-allowed  duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-pink-900 text-white font-lg outline-none">
                                                        {
                                                            indicador?.operations?.reduce((total, operation) => {
                                                                if (operation?.campos?.length > 0) {
                                                                    // Inicia com o primeiro valor
                                                                    let subtracao = operation.campos[0].indicador.value;

                                                                    // Subtrai os valores subsequentes
                                                                    for (let i = 1; i < operation.campos.length; i++) {
                                                                        subtracao -= operation.campos[i].indicador.value;
                                                                    }

                                                                    // Acumula o resultado na totalização geral
                                                                    return total + subtracao;
                                                                }
                                                                return total;
                                                            }, 0)
                                                        }
                                                    </span>
                                                )}

                                                {indicador?.type === 'media' && (
                                                    <span className="px-6 min-w-[200px] hover:bg-violet-950 cursor-not-allowed duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-violet-900 text-white font-lg outline-none">
                                                        {(() => {
                                                            const { totalSoma, totalCount } = indicador?.operations?.reduce(
                                                                ({ totalSoma, totalCount }, operation) => {
                                                                    const { soma, count } = operation?.campos?.reduce(
                                                                        ({ soma, count }, campo) => {
                                                                            return {
                                                                                soma: soma + campo?.indicador?.value,
                                                                                count: count + 1
                                                                            };
                                                                        },
                                                                        { soma: 0, count: 0 }
                                                                    );

                                                                    return {
                                                                        totalSoma: totalSoma + soma,
                                                                        totalCount: totalCount + count
                                                                    };
                                                                },
                                                                { totalSoma: 0, totalCount: 0 }
                                                            );

                                                            const media = totalCount > 0 ? totalSoma / totalCount : 0;
                                                            return media.toFixed(2); // Formata a média com duas casas decimais
                                                        })()}
                                                    </span>
                                                )}



                                                {indicador.type === 'qualitativo' && (
                                                    <button
                                                        onClick={() => handleQualitativoModal(indicador)}
                                                        className="px-6 min-w-[200px] cursor-pointer hover:bg-green-900 duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-green-600 text-white"
                                                    >
                                                        <Eye className="mr-1.5" size={20} /> Abrir/Editar
                                                    </button>
                                                )}

                                                {
                                                    indicador?.type === 'turnover_medio' && (
                                                        <span className="px-6 min-w-[200px] hover:bg-yellow-950 cursor-not-allowed  duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-yellow-900 text-white font-lg outline-none">
                                                            {
                                                                turnoversMedios && turnoversMedios.map((turnoverMedio) => {

                                                                    const admtidos = indicadores.find((indicador) => indicador.id === turnoverMedio.admitidos) as any
                                                                    const desligados = indicadores.find((indicador) => indicador.id === turnoverMedio.desligados) as any
                                                                    const efetivoMedio = indicadores.find((indicador) => indicador.id === turnoverMedio.efetivoMedio) as any

                                                                    if (turnoverMedio.indicadorId === indicador.id) {
                                                                        return calculateTurnoverMedio(admtidos.value, desligados.value, efetivoMedio.value).toFixed(2)
                                                                    }

                                                                })
                                                            }%
                                                        </span>
                                                    )
                                                }

                                                {
                                                    indicador?.type === 'turnover_acumulado' && (
                                                        <span className="px-6 min-w-[200px] hover:bg-purple-900 cursor-not-allowed  duration-200 max-w-[200px] overflow-hidden font-medium h-12 flex items-center justify-center rounded-xl bg-purple-800 text-white font-lg outline-none">
                                                            {
                                                                turnoversAcumulados && turnoversAcumulados.map((turnoverAcumulado) => {

                                                                    const admtidos = indicadores.find((indicador) => indicador.id === turnoverAcumulado.admitidos) as any
                                                                    const desligados = indicadores.find((indicador) => indicador.id === turnoverAcumulado.desligados) as any
                                                                    const efetivoMedio = indicadores.find((indicador) => indicador.id === turnoverAcumulado.efetivoMedio) as any

                                                                    if (turnoverAcumulado.indicadorId === indicador.id) {
                                                                        return calculateTurnoverAcumulado(admtidos.value, desligados.value, efetivoMedio.value).toFixed(2)
                                                                    }

                                                                })
                                                            }%
                                                        </span>
                                                    )
                                                }





                                            </div>
                                        </div>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div>
                                                    {indicador?.analises_criticas?.messages?.length > 0 && (
                                                        <div className="size-5 rounded-full bg-red-500 absolute ml-16 flex items-center justify-center">
                                                            <span className="text-white font-semibold">{indicador?.analises_criticas?.messages && indicador?.analises_criticas?.messages.length}</span>
                                                        </div>
                                                    )}
                                                    <div onClick={() => setSelectedIndicador({ id: indicador?.id })} className="transition-colors cursor-pointer hover:bg-amber-500 px-7 flex items-center justify-center h-12 rounded-full bg-amber-300 text-amber-900">
                                                        <ChatsTeardrop size={24} weight="duotone" />
                                                    </div>
                                                </div>

                                            </DialogTrigger>

                                            <ModalAutoAvaliacao indicador={indicador} messages={analiseCritica?.messages} />
                                        </Dialog>

                                    </div>

                                ))
                        }

                        {
                            errorIndicadores && (
                                <div className="w-full flex items-center justify-center gap-2">
                                    <p>Erro ao carregar indicadores</p>
                                    <Button onClick={refetch}>Tentar novamente</Button>
                                </div>
                            )
                        }

                        {
                            !isLoading && !indicadores && (
                                <div className="w-full flex items-center justify-center gap-2">
                                    <p>Nenhum indicador encontrado</p>
                                </div>
                            )
                        }





                    </div>

                    <div className="mt-6 w-full flex justify-end">
                        <div className="flex items-center gap-1">
                            <div className=" w-[200px]">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="flex items-center justify-center gap-2 text-blue-500">
                                            <ChatsTeardrop size={20} weight="duotone" />
                                            Enviar Análise Crítica
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="ml-6 mr-6">
                                        <DialogHeader>
                                            <DialogTitle>Enviar uma Análise Crítica</DialogTitle>
                                        </DialogHeader>

                                        <div className="flex flex-col gap-2 mt-4 max-w-lg">

                                            <p>Selecione um Indicador</p>
                                            <select
                                                value={selectedIndicador?.id}
                                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedIndicador({ id: e.target.value })}
                                                className="p-2 rounded-full outline-none bg-zinc-200 text-blue-500"
                                            >
                                                {indicadores?.map((indicador) => (
                                                    <option key={indicador.id} value={indicador.id}>
                                                        {indicador.pergunta}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>

                                        <p>Mensagem</p>
                                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="p-2 rounded-lg outline-none bg-zinc-200 text-blue-500 h-32"></textarea>

                                        <button className="bg-blue-500 w-full h-12 rounded-lg text-white text-lg hover:bg-blue-600 duration-300" onClick={handleAddMessage}>Enviar</button>
                                    </DialogContent>
                                </Dialog>

                            </div>


                        </div>

                    </div>

                </div>


            </section>

            {selectedQualitativo && (
                <UpdateQualitativoDialog
                    open={qualitativoModal}
                    onClick={() => setQualitativoModal(true)}
                    openChange={setQualitativoModal}
                    indicador={selectedQualitativo}
                    handleUpdateQualitativo={handleUpdateQualitativo}
                />
            )}
        </AppLayout >
    )
}
