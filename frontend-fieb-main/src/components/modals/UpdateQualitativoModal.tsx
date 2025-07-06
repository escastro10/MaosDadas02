import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

const UpdateQualitativoDialog = ({ onClick, indicador, handleUpdateQualitativo, openChange, open }) => {
    const [loading, setLoading] = useState(false);
    const [selectedQualitativo, setSelectedQualitativo] = useState({
        id: '',
        qualitativo: '',
        pergunta: ''
    });

    // Update local state whenever the indicador prop changes
    useEffect(() => {
        if (indicador) {
            setSelectedQualitativo({
                id: indicador.id,
                qualitativo: indicador.qualitativo,
                pergunta: indicador.pergunta
            });
        }
    }, [indicador]);

    const handleClick = async () => {
        setLoading(true);
        try {
            await api.put(`/indicador/update-qualitativo/${selectedQualitativo.id}`, {
                qualitativo: selectedQualitativo.qualitativo
            });
            toast.success('Valor atualizado com sucesso!');
            handleUpdateQualitativo(selectedQualitativo.qualitativo, selectedQualitativo.id);
            openChange(false);
        } catch (error) {
            console.error(error);
            toast.error('Erro ao atualizar valor!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog onOpenChange={openChange} open={open}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Valor</DialogTitle>
                    <DialogDescription>
                        Você estará editando o valor de <strong>{selectedQualitativo.pergunta}</strong>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <div className="space-y-1">
                        <label>Qualitativo</label>
                        <Textarea
                            className="h-56 resize-none"
                            value={selectedQualitativo.qualitativo}
                            onChange={(e) => setSelectedQualitativo({ ...selectedQualitativo, qualitativo: e.target.value })}
                        />
                    </div>

                    <Button isLoading={loading} onClick={handleClick}>
                        Atualizar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateQualitativoDialog;
