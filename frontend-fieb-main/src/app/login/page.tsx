'use client'
import { useAuth, useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Teko } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { At, Lock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const signInSchema = z.object({
    email: z.string().email('Insira um email válido'),
    password: z.string().min(1, 'Insira sua senha'),
})

type SignInData = z.infer<typeof signInSchema>

const teko = Teko({ subsets: ['latin'], weight: ['400'] })


export default function Page() {

    const { isSignedIn } = useAuth()
    const { signIn } = useSignIn()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInData>({
        resolver: zodResolver(signInSchema)
    })

    const router = useRouter()

    if (isSignedIn) {
        return (
            <>
                {router.push('/')}
            </>
        )
    }

    const handleSignIn = async (data: SignInData) => {
        try {

            await signIn?.create({
                identifier: data.email,
                password: data.password
            })

            toast.success('Login efetuado com sucesso!', {
                description: 'Estamos te redirecionando...',
            })

            window.location.replace('/')


        } catch (errors: any) {
            toast.error('Erro ao efetuar login.', {
                description: errors.errors[0]?.code === 'form_identifier_not_found' && 'Conta inexistente' || errors.errors[0]?.code === 'form_password_incorrect' && 'Email ou senha incorretos',
            })
        }
    }

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2 ">
                <img src="/bg-login.png" className="h-screen object-cover w-full" alt="" />
            </div>

            <div className="w-full h-screen bg-blue-700 flex flex-col px-16 py-16">
                <div className="flex flex-col items-center mt-20">
                    <div className="flex flex-col items-center">
                        <Image src="/logo.png" width={215} height={215} alt="Logo" quality={100} />

                        <p className={`${teko.className} text-zinc-100 text-2xl ml-3`}>Sistema de Indicadores Sustentáveis</p>

                    </div>

                    <div className="space-y-3 w-full mt-12">
                        <div className="w-full flex items-center gap-2 h-14 rounded-lg bg-blue-600 px-4">
                            <At size={24} className="text-blue-400" />
                            <input {...register('email')} type="text" placeholder="Seu email" className="w-full bg-transparent outline-none text-blue-100 placeholder:text-blue-400" />
                        </div>
                        <div className="w-full flex items-center gap-2 h-14 rounded-lg bg-blue-600 px-4">
                            <Lock size={24} className="text-blue-400" />
                            <input {...register('password')} type="password" placeholder="Sua senha" className="w-full bg-transparent outline-none text-blue-100 placeholder:text-blue-400" />
                        </div>
                        <button disabled={isSubmitting} onClick={handleSubmit(handleSignIn)} className="w-full h-14 disabled:opacity-40 disabled:cursor-not-allowed bg-white rounded-lg text-blue-600 font-bold hover:bg-blue-800 duration-300 hover:text-white">Entrar</button>
                    </div>

                    <div className="mt-9 flex flex-col items-center text-white">
                        <p>Esqueceu a senha?</p>
                        <p className="text-lg font-bold">Recupere agora mesmo</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
