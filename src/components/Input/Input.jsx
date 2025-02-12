import styles from "./Input.module.css";

const Input = ({
  size = "lg",
  placeholder = "",
  type = "text",
  register,
  name,
  ...props
}) => {
  const sizeClass = styles[`input_${size}`];

  return (
    <input
      className={`${sizeClass} ${styles.input}`}
      placeholder={placeholder}
      type={type}
      {...(register ? register(name) : {})}
      {...props}
    />
  );
};

export default Input;
