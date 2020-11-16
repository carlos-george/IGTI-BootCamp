import React, { useEffect, useState } from 'react';
import FormField from '../components/FormField';

import '../styles/pages/composto.css';

interface ParcelaCalculada {
    parcela: number;
    montante: string;
    valorRenda: string;
    taxaAcumulada: string;
}

function Composto() {

    const [principal, setPrincipal] = useState('');
    const [taxa, setTaxa] = useState('');
    const [prazo, setPrazo] = useState('');
    // const [parcelas, setParcelas] = useState<number[]>([]);
    const [parcelasCalculadas, setParcelasCalculadas] = useState<ParcelaCalculada[]>([])

    useEffect(() => {
        const parcelas = [...Array(Number(prazo))].map((n, index) => 1 + index);
        // setParcelas([...parcelas]);
        const pecrJutos = Number(taxa) / 100;

        console.log('Juros: ', pecrJutos);

        //Com as variáveis criadas e definidas, tá na hora da gente definer o montante, usando as variáveis acima
        let taxaAcumulada = 0;

        const parcelasCalculadas = parcelas.map(parcela => {

            const montante = Number(principal) * Math.pow((1 + pecrJutos), parcela);
            console.log(`Montante: `, montante);
            const valorRenda = montante - Number(principal);
            console.log('Valor Renda: ', valorRenda);
            taxaAcumulada = taxaAcumulada + Number(pecrJutos);

            console.log('Taxa: ', taxaAcumulada);

            return {
                parcela,
                montante: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(montante),
                valorRenda: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(valorRenda),
                taxaAcumulada: new Intl.NumberFormat('pt-BR', {
                    style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2
                }).format(taxaAcumulada)
            };
        });
        console.log(parcelasCalculadas);
        setParcelasCalculadas(parcelasCalculadas);
    }, [principal, taxa, prazo]);

    return (
        <div id="page-composto">
            <div className="container-wrapper">
                <header>
                    <h1>
                        React - Juros Composto
                    </h1>
                </header>
                <div className="field-blocks">
                    <FormField
                        label="Capital inicial"
                        type="number"
                        name="principal"
                        value={principal}
                        onChange={setPrincipal}
                        isDisabled={false}
                        step={100}
                    />
                    <FormField
                        label="Taxa de juros mensal"
                        type="number"
                        name="taxa"
                        value={taxa}
                        onChange={setTaxa}
                        isDisabled={false}
                        min={-12}
                        max={12}
                        step={0.1}
                    />
                    <FormField
                        label="Período (meses)"
                        type="number"
                        name="prazo"
                        value={prazo}
                        onChange={setPrazo}
                        isDisabled={false}
                        min={0}
                        max={36}
                        step={1}
                    />
                </div>
                <div className="result">
                    {parcelasCalculadas.map((parcela, index) => {
                        return (
                            <div key={index} className="parcela-block">
                                <span>{parcela.parcela}</span>
                                <div className="parcela-values">
                                    <p>{parcela.montante}</p>
                                    <p>{parcela.valorRenda}</p>
                                    <p>{parcela.taxaAcumulada}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Composto;