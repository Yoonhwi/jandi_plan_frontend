import styles from "./Button.module.css";

/**
 * @typedef {Object} ButtonProps
 * @property {"sm" | "md" | "lg"} [size]
 * @property {"solid" |"outline" | "ghost" | "none"}[variant]
 * @property {React.ReactNode} children
 */

/**
 * @typedef {ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} CombinedButtonProps
 */

/**
 *
 * @param {CombinedButtonProps} props
 * @returns {JSX.Element}
 */
const Button = ({ size = "md", variant = "solid", children, ...props }) => {
  const sizeClass = styles[`btn_${size}`];
  const variantClass = styles[`btn_${variant}`];

  return (
    <button className={`${sizeClass} ${variantClass} ${styles.btn}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
