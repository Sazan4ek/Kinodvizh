import './InputWithLabel.css';

function InputWithLabel({ref, label, type = 'text', placeholder, onChange, className, value, error, min})
{
    return (
        <div className='d-flex flex-column gap-2'>
            <label htmlFor={label}>{label}</label>
            <input 
                ref={ref} 
                value={value ?? ''} 
                className={className} 
                id={label} 
                type={type} 
                min={type === 'number' ? min : ''} 
                placeholder={placeholder} 
                onChange={onChange}
            />
            {error && (
                <div className='alert alert-danger'>
                    {error}
                </div>
            )}
        </div>
    );
}

export default InputWithLabel;