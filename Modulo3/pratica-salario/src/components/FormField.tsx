import React from 'react';

import '../styles/components/formField.css';

interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    isDisabled: boolean
    style?: {};
    onChange: any;
    min?: number;
    max?: number;
    step?: number;
}

function FormField(fieldProps: FormFieldProps) {

    const fieldId = `id_${fieldProps.name}`;

    return (
        <div className="input-block">
            <input id={fieldId}
                type={fieldProps.type}
                value={fieldProps.value}
                onChange={event => fieldProps.onChange(event.target.value)}
                disabled={fieldProps.isDisabled}
                style={fieldProps.style}
                min={fieldProps.min}
                max={fieldProps.max}
                step={fieldProps.step}
            />
            <label htmlFor={fieldId}>{fieldProps.label}</label>
        </div>
    );
}

export default FormField;