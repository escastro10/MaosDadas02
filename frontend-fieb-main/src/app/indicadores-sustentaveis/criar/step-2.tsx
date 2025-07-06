'use client'
import { getAreaBySlug } from "@/api/area/get-area-by-slug";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Step2({ setStep, selectedArea }: any) {



    const { data: categories } = useQuery({
        queryKey: ['areas', selectedArea],
        queryFn: () => getAreaBySlug(selectedArea),
    })


    function handlePreviousStep() {
        setStep((prevStep: any) => prevStep - 1);
    }

    function handleNextStep() {

        setStep((prevStep: any) => prevStep + 1);
    }

    return (
        <div className="mt-12 p-6 bg-[#fff] rounded-lg drop-shadow-sm">
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label>Categorias</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none">
                        {categories?.categories.map((category: any) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex mt-5 justify-between w-full">
                <div className="w-full"></div>
                <div className="w-[200px] mr-2">
                    <Button variant="secondary" className="mt-10" onClick={handlePreviousStep}>Voltar</Button>
                </div>
                <div className="w-[200px]">
                    <Button className="mt-10" onClick={handleNextStep}>Próximo Passo</Button>
                </div>
            </div>
        </div>
    )
}
