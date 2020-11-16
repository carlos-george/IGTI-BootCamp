import React, { useState } from 'react';
import FormField from '../components/FormField';
import ProgressBar from '../components/ProgressBar';

import '../styles/pages/landing.css';
import { calculateSalaryFrom } from '../utils/salary';

function Landing() {

    const [salario, setSalario] = useState('');

    const [baseINSS, setBaseINSS] = useState('');
    const [discountINSS, setDiscountINSS] = useState('');
    const [baseIRPF, setBaseIRPF] = useState('');
    const [discountIRPF, setDiscountIRPF] = useState('');
    const [netSalary, setNetSalary] = useState('');
    const [percDiscountInss, setPercDiscountInss] = useState(100);
    const [percDiscountIrpf, setPercDiscountIrpf] = useState(100);
    const [percNetSalary, setPercNetSalary] = useState(100);

    function calculate(value: string) {

        setSalario(value);

        const valueNumber = Number(value);

        // console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(valueNumber));

        const {
            baseINSS,
            discountINSS,
            baseIRPF,
            discountIRPF,
            netSalary,
        } = calculateSalaryFrom(Number(valueNumber));

        const percInssFormated = `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((discountINSS / baseINSS) * 100)}%`;
        const percIrpfFormated = `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((discountIRPF / baseINSS) * 100)}%`;
        const percNetSalaryFormated = `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((netSalary / baseINSS) * 100)}%`;

        setPercDiscountInss((discountINSS / baseINSS) * 100);
        setPercDiscountIrpf((discountIRPF / baseINSS) * 100);
        setPercNetSalary((netSalary / baseINSS) * 100);

        setBaseINSS(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(baseINSS));
        setDiscountINSS(`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(discountINSS)} (${percInssFormated})`);
        setBaseIRPF(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(baseIRPF));
        setDiscountIRPF(`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(discountIRPF)} (${percIrpfFormated})`);
        setNetSalary(`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(netSalary)} (${percNetSalaryFormated})`);

    }

    return (
        <div id="page-content">
            <div className="page-container">
                <header>
                    <h1>
                        React Salário
                </h1>
                </header>
                <main>

                    <FormField
                        label="Salário bruto"
                        type="number"
                        name="salario"
                        value={salario}
                        onChange={calculate}
                        isDisabled={false}
                    />

                    <div className="result-content">

                        <FormField
                            label="Base INSS"
                            type="text"
                            name="baseInss"
                            value={baseINSS}
                            onChange={() => { }}
                            isDisabled={true}
                        />

                        <FormField
                            label="Desconto INSS"
                            type="text"
                            name="discountINSS"
                            value={discountINSS}
                            onChange={() => { }}
                            isDisabled={true}
                            style={{ color: '#e67e22' }}
                        />

                        <FormField
                            label="Base IRPF"
                            type="text"
                            name="baseIRPF"
                            value={baseIRPF}
                            onChange={() => { }}
                            isDisabled={true}
                        />

                        <FormField
                            label="Desconto IRPF"
                            type="text"
                            name="discountIRPF"
                            value={discountIRPF}
                            onChange={() => { }}
                            isDisabled={true}
                            style={{ color: '#c0392b' }}
                        />
                    </div>

                    <FormField
                        label="Salário líquido<"
                        type="text"
                        name="netSalary"
                        value={netSalary}
                        onChange={() => { }}
                        isDisabled={true}
                        style={{ color: '#16a085' }}
                    />

                    <ProgressBar
                        percDiscountInss={percDiscountInss}
                        percDiscountIrpf={percDiscountIrpf}
                        percNetSalary={percNetSalary}
                    />

                </main>
            </div>
        </div>
    );
}

export default Landing;