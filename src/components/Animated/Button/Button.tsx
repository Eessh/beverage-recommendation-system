import {motion} from "framer-motion";

interface IProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  overrideDefaultStyles?: boolean,
  classes?: string,
  children: React.ReactNode | React.ReactNode[]
};

const Button: React.FC<IProps> = ({onClick, overrideDefaultStyles, classes, children}) => {
  const defaultClasses = "flex flex-row items-center px-4 py-2 rounded-lg text-gray-600 bg-gray-200 outline-none focus:outline-none";
  const defaultHoverScale = 1.025;
  const defaultTapScale = 0.9;
  
  return(
    <motion.button
      className={overrideDefaultStyles ? classes : defaultClasses}
      whileHover={{ scale: defaultHoverScale }}
      whileTap={{ scale: defaultTapScale }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
};

export default Button;