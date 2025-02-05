import styles from "./Input.module.css";

const Input =({ size = "sm", placeholder= "입력하세요", children, ...props }) => {

    const sizeClass = styles[`input_${size}`];

    return(
        <input className={`${sizeClass} ${styles.input}`} placeholder={placeholder}{...props} />
    );
};

export default Input;