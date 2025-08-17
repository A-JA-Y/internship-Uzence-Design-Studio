import React, { useState } from 'react';


interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    disabled?: boolean;
    invalid?: boolean;
    variant?: 'filled' | 'outlined' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const InputField: React.FC<InputFieldProps> = ({
    value: propValue = '',
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    variant = 'outlined',
    size = 'md',
}) => {
    const [value, setValue] = useState(propValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className={`input-field ${variant} ${size} ${invalid ? 'invalid' : ''} ${disabled ? 'disabled' : ''}`} >
            {label && <label className="input-label" >{label}</label>}
            <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            className="input-element"
            
            />
            {helperText && !invalid && <p className="helper-text" >{helperText}</p>}
            {invalid && errorMessage && <p className="error-message" >{errorMessage}</p>}
        </div>
    );
};

export default InputField;
