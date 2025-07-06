'use client'

import { IconName, IconSelector } from "@/components/icon-selector"
import TitleSection from "@/components/title-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CodeSnippet from "@/components/ui/snippet"
import AppLayout from "@/layouts/AppLayout"
import { api } from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from 'react'
import { toast } from "sonner"

export default function Page() {
    const { periodId } = useParams()
    const [selectedIcon, setSelectedIcon] = useState<IconName>("FlowerLotus")
    const [areaName, setAreaName] = useState("")
    const [slug, setSlug] = useState("")

    const [loading, setLoading] = useState(false)

    const { data: period, isLoading } = useQuery({
        queryKey: ['period', periodId],
        queryFn: async () => {
            const { data } = await api.get(`/period/${periodId}`)
            return data
        }
    })

    const handleIconSelect = (iconName: IconName) => {
        setSelectedIcon(iconName)
    }

    const handleAreaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAreaName = e.target.value
        setAreaName(newAreaName)

        // Gerar o slug automaticamente
        const newSlug = newAreaName
            .toLowerCase()
            .replace(/[áàãâä]/g, 'a')
            .replace(/[éèêë]/g, 'e')
            .replace(/[íìîï]/g, 'i')
            .replace(/[óòõôö]/g, 'o')
            .replace(/[úùûü]/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/ñ/g, 'n')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim()

        setSlug(newSlug)
    }

    const { mutateAsync: createArea, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await api.post('/area', {
                name: areaName,
                iconName: selectedIcon,
                periodId,
                slug
            })

            return data;
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await createArea()
            setLoading(true)
            return window.location.href = `/nova-area/sucesso/${response?.id}`
        } catch (error) {
            // Adicione aqui a lógica para lidar com erros
            console.error("Erro ao criar área:", error)
            toast.error("Erro ao criar área, tente novamente!")
        }
    }

    if (isLoading) return (
        <AppLayout>
            <TitleSection title="Nova Área" description="Carregando..." />
        </AppLayout>
    )

    return (
        <AppLayout>
            <div className="flex items-center gap-3">
                <Link className="p-2 rounded-full border mr-4 size-12 bg-[#fff] duration-300 hover:shadow-xl flex items-center justify-center" href={`/nova-area`}>
                    <ChevronLeft size={24} className="cursor-pointer text-blue-500" />
                </Link>
                <TitleSection title="Nova Área" description={`Você está cadastrando uma nova área para o período de ${period?.year}`} />
            </div>

            <form onSubmit={handleSubmit} className="mt-12 mb-20">
                <div className="space-y-2">
                    <label className="font-medium text-lg">Nome da Área</label>
                    <Input
                        placeholder="Digite o nome da área"
                        value={areaName}
                        onChange={handleAreaNameChange}
                    />
                </div>

                <div className="mt-4 flex flex-col">
                    <label className=" text-gray-900 text-lg font-medium">Endereço de Acesso (Pré-visualização)</label>
                    <span className="text-sm text-gray-500 mb-2">Este é o link que irá ficar após a criação da Área.</span>
                    <CodeSnippet code={`https://frontend-vercel.app/${period?.year}/${slug}`} />
                </div>

                <div className="mt-7 flex flex-col gap-3">
                    <label className="font-medium text-lg">Escolha um Ícone para a área</label>
                    <IconSelector selectedIcon={selectedIcon} onSelectIcon={handleIconSelect} />
                </div>

                <div className="mt-8 pb-12">
                    <Button isLoading={loading} type="submit">Cadastrar Nova Área</Button>
                </div>
            </form>
        </AppLayout>
    )
}
