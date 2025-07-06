'use client'
import TitleSection from '@/components/title-section'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/AppLayout'
import { At, IdentificationCard, Lock } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { LuImagePlus } from "react-icons/lu"
import { PiUserCirclePlusDuotone } from "react-icons/pi"

import { Switch } from '@/components/ui/switch'
import { api } from '@/lib/axios'
import { storage } from '@/lib/firebase'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const schema = z.object({
    name: z.string().min(1, 'Você precisa informar o nome do usuário.'),
    lastname: z.string().min(1, 'Você precisa informar o sobrenome do usuário.'),
    email: z.string().email('Você deve inserir um e-mail válido.').min(1, 'Você precisa informar o e-mail do usuário.'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
})

type FormData = z.infer<typeof schema>

interface ImageItemProps {
    previewUrl: string;
    url: string;
}

export default function Page() {

    const router = useRouter()

    const [image, setImage] = useState<ImageItemProps | null>(null)

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [isAdmin, setIsAdmin] = useState(false)



    const { signUp } = useSignUp()

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === "image/jpeg" || image.type === "image/png") {
                await handleUpload(image);
            } else {
                toast.error("Envie imagens no formato JPEG/PNG");
                return;
            }
        }
    }

    const handleChangeIsAdmin = (value: any) => {
        setIsAdmin(value)
        console.log(value)
    }

    async function handleUpload(image: File) {
        try {
            const uuid = crypto.randomUUID()
            const storageRef = ref(storage, `users/${uuid}`)



            uploadBytes(storageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    const imagemItem = {
                        previewUrl: URL.createObjectURL(image),
                        url: downloadUrl
                    }
                    setImage(imagemItem)
                })
            })
        } catch (err) {
            console.error(err)
        }

    }

    const onSubmit = async (data: FormData) => {
        try {
            await api.post('/user', {
                firstName: data.name,
                lastName: data.lastname,
                email: data.email,
                photo: image?.url,
                isAdmin: isAdmin,
                password: data.password
            })
            toast.success('Usuário criado com sucesso.')
            router.push('/gerenciar-permissoes')


        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AppLayout>
            <TitleSection
                title='Novo Usuário'
                description='Preencha os campos abaixo para criar um novo usuário.'
            />

            <form onSubmit={handleSubmit(onSubmit)} className='mt-12 grid grid-cols-4 gap-2 p-12 bg-[#fff] rounded-xl'>
                <div className='flex flex-col gap-2'>
                    <div className='p-4 rounded-lg bg-white flex items-center gap-2'>
                        <IdentificationCard className='text-gray-500' size={24} />
                        <input
                            type='text'
                            placeholder='Nome'
                            className='w-full bg-transparent outline-none'
                            {...register('name')}
                        />
                    </div>
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='p-4 rounded-lg bg-white flex items-center gap-2'>
                        <IdentificationCard className='text-gray-500' size={24} />
                        <input
                            type='text'
                            placeholder='Sobrenome'
                            className='w-full bg-transparent outline-none'
                            {...register('lastname')}
                        />
                    </div>
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>



                <div className='flex flex-col gap-2'>
                    <div className='p-4 rounded-lg bg-white flex items-center gap-2'>
                        <At className='text-gray-500' size={24} />
                        <input
                            type='text'
                            placeholder='E-mail'
                            className='w-full bg-transparent outline-none'
                            {...register('email')}
                        />
                    </div>
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='p-4 rounded-lg bg-white flex items-center gap-2'>
                        <Lock className='text-gray-500' size={24} />
                        <input
                            type='password'
                            placeholder='Senha'
                            className='w-full bg-transparent outline-none'
                            {...register('password')}
                        />
                    </div>
                    {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                </div>



                <div className='flex flex-col col-span-2 mt-8'>
                    <label htmlFor='uploadImg'>Foto de Perfil do Usuário</label>
                    {image ? (
                        <>
                            <label htmlFor='uploadImg' className='size-32 mt-2 cursor-pointer overflow-hidden object-cover rounded-xl flex items-center justify-center bg-gray-200'>
                                <LuImagePlus size={32} className='text-gray-200/30 hover:text-gray-200 hover:scale-125 transition-all absolute' />
                                <img src={image.previewUrl} className='w-full h-full object-cover' alt="" />
                            </label>
                            <input
                                type="file"
                                id='uploadImg'
                                className='hidden'
                                onChange={handleFile}
                            />
                        </>

                    ) : (
                        <>
                            <label htmlFor='uploadImg' className='size-32 mt-2 cursor-pointer object-cover rounded-xl flex items-center justify-center bg-gray-200'>
                                <LuImagePlus size={32} className='text-gray-400 hover:scale-125 transition-all' />
                            </label>
                            <input
                                type="file"
                                id='uploadImg'
                                className='hidden'
                                onChange={handleFile}
                            />
                        </>
                    )}

                    <div className='mt-12 flex items-center gap-2'>
                        <Switch id='isAdmin' onCheckedChange={handleChangeIsAdmin} checked={isAdmin} />
                        <label htmlFor='isAdmin'>Cadastrar conta como <strong>Administrador.</strong></label>

                    </div>
                </div>

                <div className='col-span-3 w-[300px] flex justify-end mt-8'>
                    <Button isLoading={isSubmitting}>
                        <PiUserCirclePlusDuotone size={24} />
                        Criar Usuário
                    </Button>
                </div>
            </form>

        </AppLayout>
    )
}
