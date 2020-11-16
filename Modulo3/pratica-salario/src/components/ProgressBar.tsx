import React from 'react';

import '../styles/components/progressBar.css';

interface ProgressBarProps {
    percDiscountInss: number;
    percDiscountIrpf: number
    percNetSalary: number
}

function ProgressBar(props: ProgressBarProps) {
    return (
        <div className="content-colors">
            <div style={{ width: `${props.percDiscountInss}%`, height: '40px', background: '#e67e22' }}></div>
            <div style={{ width: `${props.percDiscountIrpf}%`, height: '40px', background: '#c0392b' }}></div>
            <div style={{ width: `${props.percNetSalary}%`, height: '40px', background: '#16a085' }}></div>
        </div>

    );
}

export default ProgressBar;