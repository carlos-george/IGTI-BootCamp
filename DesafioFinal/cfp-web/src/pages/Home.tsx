import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

import "../styles/home.css";
import api from '../service/api';

interface PeriodView {
    value: string;
    desc: string;
}

interface TransactionView {
    _id: string;
    description: string;
    value: number;
    category: string;
    year: number;
    month: number;
    day: number;
    yearMonth: string;
    yearMonthDay: string;
    type: string;
}

function Home() {
    const [length, setLength] = useState(0);
    const [receita, setReceita] = useState('');
    const [despesa, setDespesa] = useState('');
    const [saldo, setSaldo] = useState('');
    const [isSaldoPositivo, setIsSaldoPositivo] = useState(true);
    const [transactions, setTransactions] = useState<TransactionView[]>([])
    const [period, setPeriod] = useState('');
    const [filter, setFilter] = useState('');
    const [periods, setPeriods] = useState<PeriodView[]>([]);

    useEffect(() => {
        const data = new Date();
        let dataStart = new Date(+data.getFullYear() - 1, 0, 1);
        const dataStop = new Date(+data.getFullYear() + 1, 11, 31);
        let listPeriods = []
        const monthAbrevNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        while (dataStart <= dataStop) {
            const value = `${dataStart.getFullYear()}-${String(dataStart.getMonth() + 1).padStart(2, '0')}`;
            const desc = `${monthAbrevNames[dataStart.getMonth()]}/${dataStart.getFullYear()}`;
            listPeriods.push({
                value,
                desc
            });
            dataStart.setMonth(dataStart.getMonth() + 1);
        }
        const valueDataNow = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;

        setPeriod(valueDataNow);
        setPeriods([...listPeriods]);
        handleChangePeriod(valueDataNow);
    }, []);

    useEffect(() => {
        if (filter) {
            api.get(`/transactions?period=${period}`).then(res => {
                const { length, receita, despesa, saldo, transactions } = res.data;
                setLength(length);
                setReceita(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(receita));
                setDespesa(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(despesa));
                setSaldo(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(saldo));
                setIsSaldoPositivo(saldo > 0);
                setTransactions(transactions.filter((item: TransactionView) => {
                    if (item.description.includes(filter)) return item;
                }));
                // const saldoFilter = transactions.filter((item: TransactionView) => {
                //     if (item.description.includes(filter)) return item;
                // }).map((item: TransactionView) => item.value).reduce((a, b) => a + b);
                // console.log('Saldo Total: ', saldoFilter);
            });
        } else {
            handleChangePeriod(period);
        }
    }, [filter])

    function handleChangePeriod(value: string) {
        setPeriod(value);
        api.get(`/transactions?period=${value}`).then(res => {
            const { length, receita, despesa, saldo, transactions } = res.data;
            setLength(length);
            setReceita(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(receita));
            setDespesa(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(despesa));
            setSaldo(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(saldo));
            setIsSaldoPositivo(saldo > 0);
            setTransactions(transactions);
        });
    }

    function handleDeleteTransac(id: string) {
        api.delete(`/transactions/${id}`).then(res => {
            const { message } = res.data;
            alert(message);
            const filter = transactions.filter(item => item._id !== id)
            setTransactions(filter);
        });

    }

    return (
        <div id="container">
            <header>
                <h1>BootCamp Full Stack- Desafio Final</h1>
                <h2>Controle Financeiro Pessoal</h2>
            </header>
            <main>
                <div className="transac-period">
                    <div className="period-select">
                        <select value={period} onChange={event => handleChangePeriod(event.target.value)}>
                            {periods.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.desc}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="month-transactions">
                    <div className="transactions">
                        Lançamentos:
                        <span>{length}</span>
                    </div>
                    <div className="transac-receita">
                        Receitas:
                        <span>R$ {receita}</span>
                    </div>
                    <div className="transac-despesa">
                        Despesas:
                        <span>R$ {despesa}</span>
                    </div>
                    <div className="transac-receita">
                        Saldo:
                        <span style={{ color: isSaldoPositivo ? '#00c86f' : '#eb5151' }}>R$ {saldo}</span>
                    </div>

                </div>
                <div className="filter-container">
                    <button>
                        <FiPlus size={20} />
                        <span>Novo lançamento</span>
                    </button>
                    <input type="text" placeholder="Filtro" value={filter} onChange={event => setFilter(event.target.value)} />
                </div>
                <div className="list-transactions">
                    {transactions.map(item => {
                        return (
                            <div key={item._id} className="card-transac" style={{ background: item.type === '+' ? '#00c86f' : '#fc8a8a' }}>
                                <div className="transc-day">
                                    <span>{item.day}</span>
                                </div>
                                <div className="transc-desc">
                                    <h4>{item.category}</h4>
                                    <span>{item.description}</span>
                                </div>
                                <div className="transac-value">
                                    <span>R$ {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(item.value)}</span>
                                </div>
                                <div className="transac-actions">
                                    <FiEdit size={20} color="#37474f" />
                                    <FiTrash2 size={20} color="#37474f" onClick={() => handleDeleteTransac(item._id)} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Home;
