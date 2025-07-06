// src/components/TabComponent.js
import { useState } from 'react';

const categories = [
    { id: 1, name: 'CONSUMO DE ÁGUA E ENERGIA' },
    { id: 2, name: 'CONTROLE DA EMISSÃO DE GEE (GASES DE EFEITO ESTUFA)' },
    { id: 3, name: 'GERAÇÃO DE RESÍDUOS SÓLIDOS' }
];

const indicators = [
    { id: 1, name: 'CONSUMO DE ÁGUA SFIEB (10^3 M³)' },
    { id: 2, name: 'CONSUMO DE ENERGIA SFIEB (10^6 KWH)' },
    { id: 3, name: 'CONSUMO DE ÁGUA FIEB (10^3 M³)' },
    { id: 4, name: 'CONSUMO DE ENERGIA FIEB (10^6 KWH)' },
    { id: 5, name: 'CONSUMO DE ÁGUA SESI (10^3 M³)' }
];

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState('categories');

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex">
            <div className="w-1/2">
                <div className="border-b-2">
                    <button
                        className={`px-4 py-2 ${activeTab === 'categories' ? 'border-b-2 border-gray-800' : ''}`}
                        onClick={() => handleTabClick('categories')}
                    >
                        CATEGORIAS
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'indicators' ? 'border-b-2 border-gray-800' : ''}`}
                        onClick={() => handleTabClick('indicators')}
                    >
                        INDICADORES
                    </button>
                </div>
                <div className="p-4">
                    {activeTab === 'categories' && (
                        <ul>
                            {categories.map((category) => (
                                <li key={category.id} className="my-2">{category.name}</li>
                            ))}
                        </ul>
                    )}
                    {activeTab === 'indicators' && (
                        <ul>
                            {indicators.map((indicator) => (
                                <li key={indicator.id} className="my-2">{indicator.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="w-1/2">
                <div className="border-b-2">
                    <span className="px-4 py-2">INDICADORES</span>
                </div>
                <div className="p-4">
                    <ul>
                        {indicators.map((indicator) => (
                            <li key={indicator.id} className="my-2">{indicator.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex items-center p-4">
                <button className="mr-4">CARREGAR MAIS</button>
                <button className="border p-2">EDITAR</button>
            </div>
        </div>
    );
};

export default TabComponent;
