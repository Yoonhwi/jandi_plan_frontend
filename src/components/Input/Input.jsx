import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      size = "lg",
      placeholder = "",
      type = "text",
      register,
      name = "",
      ...props
    },
    ref
  ) => {
    const sizeClass = styles[`input_${size}`];

    return (
      <input
        ref={ref}
        className={`${sizeClass} ${styles.input}`}
        placeholder={placeholder}
        type={type}
        {...(register ? register(name) : {})}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
