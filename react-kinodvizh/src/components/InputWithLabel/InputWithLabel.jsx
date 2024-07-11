import './InputWithLabel.css';

function InputWithLabel({ref, label, type, placeholder, onChange, className, value})
{
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input ref={ref} value={value} className={className} id={label} type={type}  placeholder={placeholder} onChange={onChange}/>
        </>
    );
}

export default InputWithLabel;