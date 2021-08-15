import Loader from "../../assets/svg/loader.svg";
import { ButtonProps } from "./types";

const Button = ({
  type,
  className,
  onClick,
  disabled,
  isLoading,
  text,
  variant,
}: ButtonProps) => {
  const initialPrimayButtonClasses =
    "flex items-center justify-center outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white hover:bg-blue-600";
  const initialSecondaryButtonClasses =
    "flex justify-center items-center focus:ring-4 focus:ring-gray-400 bg-gray-200 hover:bg-gray-300 w-full rounded-lg outline-none";

  return (
    <button
      disabled={disabled}
      type={type}
      className={`${
        variant == "primary"
          ? initialPrimayButtonClasses
          : initialSecondaryButtonClasses
      } ${className}`}
      onClick={onClick}
    >
      {isLoading ? <img src={Loader} /> : text}
    </button>
  );
};

export default Button;
