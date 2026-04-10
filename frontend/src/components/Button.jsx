import { buttonVariants } from "../utils/schema";

function Button({
  type = "text",
  children,
  onClick,
  variant = buttonVariants.PRIMARY,
  className = "",
  ...props
}) {
  let baseStyle = "px-4 py-2 rounded-lg transition-all duration-200 font-medium";

  let variants = {
    [buttonVariants.PRIMARY]:
      "bg-[var(--primary)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] border border-transparent",

    [buttonVariants.OUTLINE]:
      "bg-transparent text-[var(--btn-outline-text)] border border-[var(--btn-outline-border)] hover:bg-[var(--btn-outline-hover)]",

    [buttonVariants.DANGER]:
      "text-red-500 border border-red-500 hover:bg-red-500 hover:text-white",

    other:
      "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variants[variant]} ${baseStyle}  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
