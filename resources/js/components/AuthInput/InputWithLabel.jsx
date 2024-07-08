import './InputWithLabel.css';

function InputWithLabel({label, type, placeholder, onChange, className})
{
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input className={className} id={label} type={type}  placeholder={placeholder} onChange={onChange}/>
        </>
    );
}

export default InputWithLabel;