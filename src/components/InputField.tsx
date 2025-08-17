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
        <div className={`input-field ${variant} ${size} ${invalid ? 'invalid' : ''} ${disabled ? 'disabled ' : ''} p-5 w-full   flex flex-col  `} >
            <div className='mx-auto'>

            {label && <label className="input-label px-2 text-lg" >{label}:</label>}
            <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            className={`input-element border-2 border-zinc-600 sm:px-8 px-2 sm:py-2 py-1 w-full rounded-full ${disabled ? 'cursor-not-allowed bg-slate-400 bg-opacity-20' : '' }`}
            
            />
            {helperText && !invalid && <p className="helper-text text-sm text-red-500 translate-x-4" >{helperText}</p>}
            {invalid && errorMessage && <p className="error-message text-sm translate-x-4" >{errorMessage}</p>}
            </div>
        </div>
    );
};

export default InputField;
