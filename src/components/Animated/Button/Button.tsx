import {motion} from "framer-motion";

interface IProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  overrideDefaultStyles?: boolean,
  classes?: string,
  scaleOnHover?: number,
  scaleOnTap?: number,
  children: React.ReactNode | React.ReactNode[]
};

const Button: React.FC<IProps> = ({onClick, overrideDefaultStyles, classes, scaleOnHover, scaleOnTap, children}) => {
  const defaultClasses = "flex flex-row items-center h-12 px-2 rounded-lg text-gray-600 hover:bg-gray-100 outline-none focus:outline-none";
  const defaultHoverScale = 1.025;
  const defaultTapScale = 0.9;
  
  return(
    <motion.button
      className={overrideDefaultStyles ? classes : defaultClasses}
      whileHover={{ scale: overrideDefaultStyles ? scaleOnHover : defaultHoverScale }}
      whileTap={{ scale: overrideDefaultStyles ? scaleOnTap : defaultTapScale }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
};

export default Button;