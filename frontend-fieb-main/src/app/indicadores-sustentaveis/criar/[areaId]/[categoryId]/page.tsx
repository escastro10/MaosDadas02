'use client'
import { getAreaById } from "@/api/area/get-area-by-id";
import { getAreasByPeriod } from "@/api/area/get-areas";
import { getAutoAvaliacaoAreas } from "@/api/autoavaliacao/get-all";
import { getCategoryById } from "@/api/category/get-category-by-id";
import { createIndicador } from "@/api/indicadores/create";
import { getIndicadorById } from "@/api/indicadores/get-by-id";
import { createTurnoverAcumulado, createTurnoverMedio } from "@/api/indicadores/turnover";
import { getPeriods } from "@/api/periods/get-periods";
import colors from "@/app/tokens/colors";
import TitleSection from "@/components/title-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/layouts/AppLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { Earth } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChartPie, Check, Graph, HashStraight, MathOperations, MinusCircle, Percent, PlusCircle, TextT, TrendUp } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiSubtractDuotone } from "react-icons/pi";
import { toast } from "sonner";
import { z } from "zod";


const schema = z.object({
    pergunta: z.string().min(6, 'Sua pergunta deve conter no mínimo 6 caracteres'),
})

type Form = z.infer<typeof schema>


export default function Page() {

    const router = useRouter()

    const { areaId, categoryId } = useParams()

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) })

    const [selectedPeriod, setSelectedPeriod] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [admitidos, setAdmitidos] = useState("")
    const [desligados, setDesligados] = useState("")
    const [efetivoMedio, setEfetivoMedio] = useState("")

    const [admitidosAcumulado, setAdmitidosAcumulado] = useState("")
    const [desligadosAcumulado, setDesligadosAcumulado] = useState("")
    const [efetivoMedioAcumulado, setEfetivoMedioAcumulado] = useState("")

    const [priority, setPriority] = useState(false)
    const [hasUpload, setHasUpload] = useState(false)

    const { data: av_areas } = useQuery({
        queryKey: ['autoavaliacao-areas'],
        queryFn: getAutoAvaliacaoAreas
    })

    const [type, setType] = useState('quantitativo')


    const { data: area } = useQuery({
        queryKey: ['area', areaId],
        queryFn: () => getAreaById({ areaId: areaId as string })
    })

    const { data: indicadores } = useQuery({
        queryKey: ['indicador', categoryId],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3001/indicadores/${categoryId}`)
            return response.data
        }
    })

    const { data: periods } = useQuery({
        queryKey: ['periods'],
        queryFn: getPeriods
    })

    const { data: areas } = useQuery({
        queryKey: ['areas', selectedPeriod?.id],
        queryFn: () => getAreasByPeriod({ periodId: selectedPeriod?.id }),
        refetchInterval: 1000,
        enabled: !!selectedPeriod?.id // Só executa a query quando selectedPeriod?.id existir
    })


    const [ResultadoTM, setResultadoTM] = useState(null)
    const [ResultadoTA, setResultadoTA] = useState(null)

    const handleSelectedCategory = (value: string) => {
        setSelectedCategory(value)
    }

    const handleSelectPeriod = (value: string) => {
        setSelectedPeriod({ id: value })
        console.log(value)
    }

    const handlePriority = (value: boolean) => {
        setPriority(value)
    }

    const handleSelectedAdmitidos = (value: string) => {
        setAdmitidos(value)
    }

    const handleSelectedDesligados = (value: string) => {
        setDesligados(value)
    }

    const handleSelectedEfetivo = (value: string) => {
        setEfetivoMedio(value)
    }

    const handleSelectedAdmitidosAcumulado = (value: string) => {
        setAdmitidosAcumulado(value)
    }

    const handleSelectedDesligadosAcumulado = (value: string) => {
        setDesligadosAcumulado(value)
    }

    const handleSelectedEfetivoAcumulado = (value: string) => {
        setEfetivoMedioAcumulado(value)
    }

    const { mutateAsync: newIndicador } = useMutation({
        mutationFn: createIndicador
    })

    const { data: category } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(categoryId as string)
    })

    const { mutateAsync: newTurnoverMedio } = useMutation({
        mutationFn: createTurnoverMedio
    })

    const { mutateAsync: newTurnoverAcumulado } = useMutation({
        mutationFn: createTurnoverAcumulado
    })

    const { data: indicadorAdmitidoAcumulado } = useQuery({
        queryKey: ['indicador', admitidosAcumulado],
        queryFn: () => getIndicadorById(admitidosAcumulado)
    })

    const { data: indicadorDesligadoAcumulado } = useQuery({
        queryKey: ['indicador', desligadosAcumulado],
        queryFn: () => getIndicadorById(desligadosAcumulado)
    })

    const { data: indicadorEfetivoAcumulado } = useQuery({
        queryKey: ['indicador', efetivoMedioAcumulado],
        queryFn: () => getIndicadorById(efetivoMedioAcumulado)
    })

    const { data: indicadorAdmitido } = useQuery({
        queryKey: ['indicador', admitidos],
        queryFn: () => getIndicadorById(admitidos)
    })

    const { data: indicadorDesligado } = useQuery({
        queryKey: ['indicador', desligados],
        queryFn: () => getIndicadorById(desligados)
    })

    const { data: indicadorEfetivo } = useQuery({
        queryKey: ['indicador', efetivoMedio],
        queryFn: () => getIndicadorById(efetivoMedio)
    })

    async function handleCreateIndicador(data: Form) {
        try {

            if (type === 'turnover_medio' || type === 'turnover_acumulado') {
                const response = await newIndicador({
                    pergunta: data.pergunta,
                    type,
                    isPriority: priority,
                    categoryId: categoryId as string,
                    hasUpload,
                    draft: false,
                })


                if (type === 'turnover_medio') {
                    const dados = await newTurnoverMedio({ admitidos, desligados, efetivoMedio, indicadorId: response.id })
                    toast.success('Turnover Médio criado com sucesso!');
                    console.log(dados)
                    return router.push(`/indicadores-sustentaveis/editar/${categoryId}`)
                }

                if (type === 'turnover_acumulado') {
                    await newTurnoverAcumulado({ admitidos: admitidosAcumulado, desligados: desligadosAcumulado, efetivoMedio: efetivoMedioAcumulado, indicadorId: response.id })
                    toast.success('Turnover Acumulado criado com sucesso!');
                    return router.push(`/indicadores-sustentaveis/editar/${categoryId}`)
                }
                return;
            } else {
                await newIndicador({
                    pergunta: data.pergunta,
                    type,
                    isPriority: priority,
                    categoryId: categoryId as string,
                    hasUpload: false,
                    draft: false
                })

                toast.success('Indicador criado com sucesso!')
                router.push(`/indicadores-sustentaveis/editar/${categoryId}`)

            }


        } catch (error: any) {
            toast.error(error.response.data.error)
        }

    }

    const calculateTurnoverMedio = (admitidos: number, desligados: number, efetivoMedio: number) => {
        const turnoverMedio = (((admitidos + desligados) / 2) / 12 * 100) / efetivoMedio;
        setResultadoTM(turnoverMedio)
    }

    const calculateTurnoverAcumulado = (admitidos: number, desligados: number, efetivoMedio: number) => {
        const turnoverAcumulado = (((admitidos + desligados) / 2) * 100) / efetivoMedio;
        setResultadoTA(turnoverAcumulado)
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
                    <span className="text-white font-bold text-lg p-1 rounded-full bg-gray-500 size-10 items-center justify-center flex">2</span>
                    <span className="text-[#333] font-semibold">Selecione a Categoria</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg p-1 rounded-full bg-blue-500 size-10 items-center justify-center flex">
                        <Check size={20} weight="duotone" />
                    </span>
                    <span className="text-blue-400 font-semibold">Finalize o Cadastro</span>
                </div>

            </div>

            <div className="mt-12 p-6 bg-[#fff] rounded-lg drop-shadow-sm">
                <span>Você está cadastrando um indicador para a área <span className="text-blue-600 font-semibold">{area?.name}</span>, na categoria <strong>{category?.name}</strong> no Período de <span className="text-blue-600 font-semibold">{area?.period?.year}</span></span>
                <div className="grid grid-cols-1 gap-4 mt-9">

                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold">Tipo</label>
                        <span className="text-base text-gray-500 mb-3 -mt-3">Selecione um tipo para o indicador, seja uma operação, valor inteiro, booleano ou texto descritivo.</span>

                        <div className="grid grid-cols-4 gap-5">
                            <div onClick={() => setType('quantitativo')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-300': type === 'quantitativo',
                                'bg-blue-100': type === 'quantitativo'
                            })}>
                                <HashStraight size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Quantitativo</span>
                                <span className="text-zinc-500 text-center text-base">Valor numérico simples</span>
                            </div>

                            <div onClick={() => setType('totalizador')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-300': type === 'totalizador',
                                'bg-blue-100': type === 'totalizador'
                            })}>
                                <PlusCircle size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Totalizador</span>
                                <span className="text-zinc-500 text-center text-base">Soma de Valores Numéricos</span>

                            </div>

                            <div onClick={() => setType('media')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-300': type === 'media',
                                'bg-blue-100': type === 'media'
                            })}>
                                <ChartPie size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Média</span>
                                <span className="text-zinc-500 text-center text-base">Média entre valores numéricos</span>
                            </div>

                            <div onClick={() => setType('booleano')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-700': type === 'booleano',
                                'bg-blue-100': type === 'booleano'
                            })}>
                                <PiSubtractDuotone size={40} color={colors.blue[600]} />
                                <span className="text-blue-500 font-semibold text-lg">Booleano</span>
                                <span className="text-zinc-500 text-center text-base">Valor verdadeiro ou falso</span>
                            </div>

                            <div onClick={() => setType('qualitativo')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-700': type === 'qualitativo',
                                'bg-blue-100': type === 'qualitativo'
                            })}>
                                <TextT size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Qualitativo</span>
                                <span className="text-zinc-500 text-center text-base">Valor descritivo, como texto</span>
                            </div>

                            <div onClick={() => setType('percentual')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-700': type === 'percentual',
                                'bg-blue-100': type === 'percentual'
                            })}>
                                <Percent size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Percentual</span>
                                <span className="text-zinc-500 text-center text-base">Calculo de Porcentagem entre dois valores</span>
                            </div>

                            <div onClick={() => setType('adicao')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-700': type === 'adicao',
                                'bg-blue-100': type === 'adicao'
                            })}>
                                <PlusCircle size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Adição</span>
                                <span className="text-zinc-500 text-center text-base">Soma entre dois ou mais valores</span>
                            </div>

                            <div onClick={() => setType('subtracao')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-700': type === 'subtracao',
                                'bg-blue-100': type === 'subtracao'
                            })}>
                                <MinusCircle size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Subtração</span>
                                <span className="text-zinc-500 text-center text-base">Subtração entre dois ou mais valores</span>
                            </div>

                            <div onClick={() => setType('turnover_medio')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-700': type === 'turnover_medio',
                                'bg-blue-100': type === 'turnover_medio'
                            })}>
                                <MathOperations size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Turnover Médio</span>
                                <span className="text-zinc-500 text-center text-base">Taxa média de rotatividade de funcionários </span>
                            </div>

                            <div onClick={() => setType('turnover_acumulado')} className={clsx("p-3 min-h-36 justify-center rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-blue-100 duration-200 hover:border-blue-200", {
                                'border-blue-700': type === 'turnover_acumulado',
                                'bg-blue-100': type === 'turnover_acumulado'
                            })}>
                                <MathOperations size={40} weight="duotone" className="text-blue-600" />
                                <span className="text-blue-500 font-semibold text-lg">Turnover Acumulado</span>
                                <span className="text-zinc-500 text-center text-base">Somatória da Rotatividade de Funcionários</span>
                            </div>

                        </div>
                    </div>

                    {type === 'turnover_medio' &&
                        <div className="space-y-2">
                            <span>Você selecionou o <strong>Turnover Médio</strong> como operação, informe os campos que deseja selecionar para realizá-la.</span>

                            <div className="flex flex-col items-start gap-6">

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 font-semibold text-emerald-600">
                                            <div className="size-10 hover:bg-emerald-900 transition-all cursor-pointer hover:scale-[1.03] items-center justify-center flex rounded-xl bg-emerald-700">
                                                <MathOperations size={24} weight="duotone" className="text-white" />
                                            </div>

                                            <div className="flex flex-col">
                                                <span>Admitidos</span>
                                                <span className="text-sm font-normal text-gray-500">{indicadorAdmitido?.pergunta}</span>
                                            </div>
                                        </div>


                                    </DialogTrigger>

                                    <DialogContent>
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

                                        <div className="space-y-2">
                                            <label>Selecione uma Área</label>
                                            <Select onValueChange={handleSelectedCategory}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="space-y-2">
                                            <label>Selecione um indicador</label>
                                            <Select onValueChange={handleSelectedAdmitidos}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione um Indicador" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Indicadores</SelectLabel>
                                                        {indicadores && indicadores.map((indicador) => (
                                                            <SelectItem key={indicador.id} value={indicador.id}>
                                                                {indicador?.pergunta}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center gap-2 justify-end">
                                            <DialogClose className="w-full">
                                                <Button variant="primary">Confirmar</Button>
                                            </DialogClose>
                                        </div>


                                    </DialogContent>
                                </Dialog>


                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 font-semibold text-red-600">
                                            <div className="size-10 hover:bg-red-900 transition-all cursor-pointer hover:scale-[1.03] items-center justify-center flex rounded-xl bg-red-700">
                                                <MathOperations size={24} weight="duotone" className="text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span>Desligados</span>
                                                <span className="text-sm font-normal text-gray-500">{indicadorDesligado?.pergunta}</span>
                                            </div>
                                        </div>


                                    </DialogTrigger>

                                    <DialogContent>
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

                                        <div className="space-y-2">
                                            <label>Selecione uma Área</label>
                                            <Select onValueChange={handleSelectedCategory}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="space-y-2">
                                            <label>Selecione um Indicador</label>
                                            <Select onValueChange={handleSelectedDesligados}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="flex items-center gap-2 justify-end">
                                            <DialogClose className="w-full">
                                                <Button variant="primary">Confirmar</Button>
                                            </DialogClose>
                                        </div>


                                    </DialogContent>
                                </Dialog>


                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 font-semibold text-cyan-700">
                                            <div className="size-10 hover:bg-cyan-900 transition-all cursor-pointer hover:scale-[1.03] items-center justify-center flex rounded-xl bg-cyan-700">
                                                <MathOperations size={24} weight="duotone" className="text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span>Efetivo Médio</span>
                                                <span className="text-sm font-normal text-gray-500">{indicadorEfetivo?.pergunta}</span>
                                            </div>
                                        </div>


                                    </DialogTrigger>

                                    <DialogContent>
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

                                        <div className="space-y-2">
                                            <label>Selecione uma Área</label>
                                            <Select onValueChange={handleSelectedCategory}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="space-y-2">
                                            <label>Selecione um Indicador</label>
                                            <Select onValueChange={handleSelectedEfetivo}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="flex items-center gap-2 justify-end">
                                            <DialogClose className="w-full">
                                                <Button variant="primary">Confirmar</Button>
                                            </DialogClose>
                                        </div>

                                    </DialogContent>
                                </Dialog>
                            </div>

                            {admitidos && desligados && efetivoMedio && (
                                <button onClick={() => calculateTurnoverMedio(indicadorAdmitido.value, indicadorDesligado.value, indicadorEfetivo.value)} className="max-w-2xl text-white font-semibold my-3 p-2 rounded-lg bg-emerald-500 text-xs">Gerar Resultado Parcial</button>
                            )}




                            {ResultadoTM > 0 && (
                                <div className="mt-4 flex items-center gap-2">
                                    <h1>Resultado Parcial:</h1>
                                    <span className="text-emerald-500 font-bold">{ResultadoTM.toFixed(2)}%</span>
                                </div>
                            )}



                        </div>
                    }



                    {type === 'turnover_acumulado' &&
                        <div className="space-y-2">
                            <span>Você selecionou o <strong>Turnover Acumulado</strong> como operação, informe os campos que deseja selecionar para realizá-la.</span>

                            <div className="flex flex-col items-start gap-6">

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 font-semibold text-emerald-600">
                                            <div className="size-10 hover:bg-emerald-900 transition-all cursor-pointer hover:scale-[1.03] items-center justify-center flex rounded-xl bg-emerald-700">
                                                <MathOperations size={24} weight="duotone" className="text-white" />
                                            </div>

                                            <div className="flex flex-col">
                                                <span>Admitidos</span>
                                                <span className="text-sm font-normal text-gray-500">{indicadorAdmitidoAcumulado?.pergunta}</span>
                                            </div>
                                        </div>


                                    </DialogTrigger>

                                    <DialogContent>
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

                                        <div className="space-y-2">
                                            <label>Selecione uma Área</label>
                                            <Select onValueChange={handleSelectedCategory}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="space-y-2">
                                            <label>Selecione um indicador</label>
                                            <Select onValueChange={handleSelectedAdmitidosAcumulado}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione um Indicador" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Indicadores</SelectLabel>
                                                        {indicadores && indicadores.map((indicador) => (
                                                            <SelectItem key={indicador.id} value={indicador.id}>
                                                                {indicador?.pergunta}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center gap-2 justify-end">
                                            <DialogClose className="w-full">
                                                <Button variant="primary">Confirmar</Button>
                                            </DialogClose>
                                        </div>


                                    </DialogContent>
                                </Dialog>


                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 font-semibold text-red-600">
                                            <div className="size-10 hover:bg-red-900 transition-all cursor-pointer hover:scale-[1.03] items-center justify-center flex rounded-xl bg-red-700">
                                                <MathOperations size={24} weight="duotone" className="text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span>Desligados</span>
                                                <span className="text-sm font-normal text-gray-500">{indicadorDesligadoAcumulado?.pergunta}</span>
                                            </div>
                                        </div>


                                    </DialogTrigger>

                                    <DialogContent>
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

                                        <div className="space-y-2">
                                            <label>Selecione uma Área</label>
                                            <Select onValueChange={handleSelectedCategory}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="space-y-2">
                                            <label>Selecione um Indicador</label>
                                            <Select onValueChange={handleSelectedDesligadosAcumulado}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="flex items-center gap-2 justify-end">
                                            <DialogClose className="w-full">
                                                <Button variant="primary">Confirmar</Button>
                                            </DialogClose>
                                        </div>


                                    </DialogContent>
                                </Dialog>


                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 font-semibold text-cyan-700">
                                            <div className="size-10 hover:bg-cyan-900 transition-all cursor-pointer hover:scale-[1.03] items-center justify-center flex rounded-xl bg-cyan-700">
                                                <MathOperations size={24} weight="duotone" className="text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span>Efetivo Médio</span>
                                                <span className="text-sm font-normal text-gray-500">{indicadorEfetivoAcumulado?.pergunta}</span>
                                            </div>
                                        </div>


                                    </DialogTrigger>

                                    <DialogContent>
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

                                        <div className="space-y-2">
                                            <label>Selecione uma Área</label>
                                            <Select onValueChange={handleSelectedCategory}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="space-y-2">
                                            <label>Selecione um Indicador</label>
                                            <Select onValueChange={handleSelectedEfetivoAcumulado}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma Área" />
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

                                        <div className="flex items-center gap-2 justify-end">
                                            <DialogClose className="w-full">
                                                <Button variant="primary">Confirmar</Button>
                                            </DialogClose>
                                        </div>

                                    </DialogContent>
                                </Dialog>
                            </div>

                            {admitidosAcumulado && desligadosAcumulado && efetivoMedioAcumulado && (
                                <button onClick={() => calculateTurnoverAcumulado(indicadorAdmitidoAcumulado?.value, indicadorDesligadoAcumulado?.value, indicadorEfetivoAcumulado?.value)} className="max-w-2xl text-white font-semibold my-3 p-2 rounded-lg bg-emerald-500 text-xs">Gerar Resultado Parcial</button>
                            )}




                            {ResultadoTA > 0 && (
                                <div className="mt-4 flex items-center gap-2">
                                    <h1>Resultado Parcial:</h1>
                                    <span className="text-emerald-500 font-bold">{ResultadoTA.toFixed(2)}%</span>
                                </div>
                            )}



                        </div>
                    }



                    <div className="flex flex-col">
                        <label className="text-lg font-semibold">Nomeie o Indicador</label>
                        <span className="text-base text-gray-500 -mt-2 mb-2.5">Informe um nome para o indicador, seja descritivo e objetivo.</span>
                        <input type="text" {...register('pergunta')} className={clsx("w-full border outline-none px-3 h-10 ring-4 ring-transparent focus:ring-blue-50 rounded-lg focus:border-blue-500", {
                            'ring-2': errors.pergunta,
                            'ring-red-100': errors.pergunta,
                            'border-red-500': errors?.pergunta
                        })} />
                        {errors.pergunta && <span className="text-red-500 text-sm mt-1.5">{errors.pergunta.message}</span>}
                    </div>

                    <div className="flex items-center gap-2 mt-2.5">
                        <Switch onCheckedChange={(value) => setHasUpload(value)} />
                        <label htmlFor="isPriority" className={clsx('font-semibold', {
                            'text-emerald-500': hasUpload === true
                        })}>

                            {hasUpload === true ? 'Upload de Arquivos ativado.' : 'Deseja permitir o Upload de Arquivos?'}

                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox onCheckedChange={handlePriority} id="isPriority" />
                        <label htmlFor="isPriority">Este indicador é prioritário?</label>
                    </div>


                    {priority && (
                        <div className="flex flex-col mt-5">
                            <h1 className="text-xl font-semibold">Selecione uma Área de Autoavaliação para o Indicador</h1>
                            <span className="text-gray-500">Este Indicador foi marcado como prioritário, vincule ele a uma área de Autoavaliação.</span>

                            <div className="grid grid-cols-5 gap-4 mt-4">
                                <div className="bg-[#fff] border text-center cursor-pointer hover:bg-emerald-500 hover:text-white transition-all hover:scale-[101%] rounded-2xl gap-2 items-center justify-center h-36 p-4 flex flex-col text-lg font-semibold text-emerald-700">
                                    <Earth className="size-12" />
                                    Ambiente e Cultura
                                </div>
                                <div className="bg-[#fff] border text-center cursor-pointer hover:bg-emerald-500 hover:text-white transition-all hover:scale-[101%] rounded-2xl gap-2 items-center justify-center h-36 p-4 flex flex-col text-lg font-semibold text-emerald-700">
                                    <Graph className="size-12" />
                                    Tecnologia
                                </div>

                                <div className="bg-[#fff] border text-center cursor-pointer hover:bg-emerald-500 hover:text-white transition-all hover:scale-[101%] rounded-2xl gap-2 items-center justify-center h-36 p-4 flex flex-col text-lg font-semibold text-emerald-700">
                                    <TrendUp className="size-12" />
                                    Mercado
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <div className="flex mt-5 justify-between w-full">
                    <div className="w-full"></div>
                    <div className="w-[200px] mr-2">
                        <Button variant="secondary" onClick={() => router.back()} className="mt-10">Voltar</Button>
                    </div>
                    <div className="w-[200px]">
                        <Button isLoading={isSubmitting} onClick={handleSubmit(handleCreateIndicador)} className="mt-10">Cadastrar</Button>
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

