'use client'

import { getAreaById } from "@/api/area/get-area-by-id"
import { createCategory } from "@/api/category/create"
import TitleSection from "@/components/title-section"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/AppLayout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BiCategory } from "react-icons/bi"
import { toast } from "sonner"
import { z } from "zod"




const schema = z.object({
    name: z.string().min(1, 'Você precisa informar o nome da categoria.')
})

type FormData = z.infer<typeof schema>

export default function Page() {

    const { areaId } = useParams()

    const router = useRouter()


    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })


    const { mutateAsync: newCategory } = useMutation({
        mutationFn: createCategory
    })

    const handleCategory = async (data: FormData) => {
        try {

            const category = await newCategory({ areaId: areaId.toString(), name: data.name })

            toast.success('Categoria registrada com sucesso!')

            return router.push(`/nova-categoria/sucesso/${category?.id}`)

        } catch (err) {
            toast.error('Erro ao cadastrar categoria.')

        }
    }


    const { data } = useQuery({
        queryKey: ['area', areaId],
        queryFn: () => getAreaById({ areaId: areaId as string })
    })




    return (
        <AppLayout>



            <TitleSection title="Nova Categoria" />
            <span>Cadastrando uma nova categoria para a área <strong className="text-blue-600">{data?.name} - {data?.period?.year}</strong></span>

            <div className="mt-12 w-full">
                <div className="flex items-end gap-2 w-full">
                    <div className="flex flex-col space-y-1 w-full">
                        <label className="font-semibold">Nome da Categoria</label>
                        <div className="flex items-center">
                            <div className="size-11 border-r-transparent flex items-center justify-center bg-[#fff] border">
                                <BiCategory fontSize={20} />
                            </div>
                            <input {...register('name')} placeholder="Ex.: Consumo de Água SFIEB" className="w-full border border-l-transparent p-2  focus:border-blue-600 duration-300 outline-none size-11" />
                        </div>

                        {
                            errors?.name && <span className="text-sm text-red-500">{errors.name.message}</span>
                        }
                    </div>

                </div>
                <Button className="mt-4" isLoading={isSubmitting} onClick={handleSubmit(handleCategory)}>Cadastrar</Button>
            </div>
        </AppLayout>
    )
}
