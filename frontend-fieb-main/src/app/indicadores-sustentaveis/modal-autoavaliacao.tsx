import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChartBar, MagnifyingGlass } from "phosphor-react";

type ModalAutoAvaliacaoProps = {
    indicador: {
        id: string;
        pergunta: string
    }
    messages: {
        id: string;
        message: string;
        createdAt: string;
        user: {
            id: string;
            name: string;
            email: string
        },
    }[]
}


const ModalAutoAvaliacao = ({ indicador, messages }: ModalAutoAvaliacaoProps) => {
    return (

        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                    <MagnifyingGlass size={44} weight="fill" className="text-blue-500 p-2 bg-zinc-100 rounded-lg border" />
                    Análise Crítica
                </DialogTitle>
                <DialogDescription className="flex items-center gap-3 p-2 rounded bg-zinc-200 text-zinc-700 font-semibold">
                    <ChartBar size={24} className="text-zinc-900" />

                    {indicador?.pergunta}
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 divide-y">
                {messages && messages.length > 0 ? messages.map((message) => (
                    <div key={message.id} className="flex flex-col w-full py-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1">
                                <img src={'https://lh3.googleusercontent.com/a/ACg8ocIZGFOn2HzoQyOD_psiOxd2e71ZSjIdpUMm_1a-WrWiG9yPWjMX=s288-c-no'} className="size-10 rounded-full bg-zinc-200">
                                </img>
                                <div className="flex flex-col">
                                    <h1 className="font-semibold">{message.user.name}</h1>
                                    <span className="text-sm text-gray-500 -mt-1.5">{message.user.email}</span>
                                </div>


                            </div>

                            <div className="text-sm capitalize text-blue-500">
                                <strong>{new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                                    weekday: 'long',
                                }).split(',')[0]}</strong>, {' '}
                                {new Date(message.createdAt).toLocaleDateString('pt-BR', {
                                    calendar: 'gregory',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </div>

                        </div>

                        <div className="mt-3 p-2 bg-zinc-100 rounded-lg text-sm">
                            {message.message}
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center w-full mt-4">
                        <img src="/empty-messages.svg" className="size-44" alt="" />
                        <span className="text-gray-500 mt-4">Nenhuma mensagem encontrada</span>
                    </div>
                )}

            </div>

        </DialogContent>

    );
}

export default ModalAutoAvaliacao;