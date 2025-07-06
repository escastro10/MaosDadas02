'use client'

import { getIndicadorById } from "@/api/indicadores/get-by-id"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AppLayout from "@/layouts/AppLayout"
import { useQuery } from "@tanstack/react-query"
import { FocusIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { MathOperations } from "phosphor-react"


export default function Page() {

    const { indicadorId } = useParams()

    const { data: indicador } = useQuery({
        queryKey: ['indicador', indicadorId],
        queryFn: () => getIndicadorById(indicadorId as string)
    })

    const dados = {
        registrado: indicador?.value,
        meta: 1400
    };

    // Função para calcular a porcentagem cumprida
    const calcularPorcentagemCumprida = (registrado, meta) => {
        if (meta === 0) {
            // Caso a meta seja 0, não é possível calcular a porcentagem corretamente
            return registrado > 0 ? 100 : 0;
        }

        // Calcular a porcentagem cumprida
        const porcentagemCumprida = (registrado / meta) * 100;

        // Garantir que a porcentagem não exceda 100%
        return Math.min(porcentagemCumprida, 100).toFixed(2);
    };

    const porcentagemCumprida = calcularPorcentagemCumprida(dados.registrado, dados.meta);




    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Dados da Autoavaliação</CardTitle>
                    <CardDescription>Autoavaliacão do Indicador <strong>{indicador?.pergunta}</strong></CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                        <FocusIcon />
                        <p className="text-gray-500">Meta</p>
                        <span className="text-blue-700 font-bold">{dados.meta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MathOperations size={24} />
                        <p className="text-gray-500">Dado registrado</p>
                        <span className="text-blue-700 font-bold">{indicador?.value}</span>
                    </div>


                    <p className="text-green-600">{porcentagemCumprida}% da meta concluída.</p>


                </CardContent>
            </Card>

            <div className="my-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-72">Definir Nova Meta</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Defina uma nova meta</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-2">
                            <label>Nova Meta</label>
                            <input type="number" className="w-full border outline-none rounded-lg p-2 focus:border-blue-500" />
                            <Button>Confirmar</Button>
                        </div>
                    </DialogContent>

                </Dialog>
            </div>
        </AppLayout>
    )
}
