import styles from "./Input.module.css";

const Input =({ size = "lg", placeholder= "입력하세요", type="text", children, ...props }) => {

    const sizeClass = styles[`input_${size}`];

    return(
        <input className={`${sizeClass} ${styles.input}`} placeholder={placeholder} type={type} {...props} />
    );
};

export default Input;