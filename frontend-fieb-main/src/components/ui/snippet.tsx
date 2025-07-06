import { CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const CodeSnippet = ({ code }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            toast.success('Código copiado para a área de transferência.');
        } catch (err) {
            console.error('Falha ao copiar texto: ', err);
        }
    };

    return (
        <div className="code-snippet w-[600px]">
            <pre className='flex items-center rounded-lg justify-between p-2 bg-blue-100 text-blue-800'>
                <code className='font-thin'>{code}</code>
                <button type='button' onClick={copyToClipboard}>
                    <CopyIcon size={16} />
                </button>
            </pre>

        </div>
    );
};

export default CodeSnippet;
