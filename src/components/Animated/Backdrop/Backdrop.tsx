import { motion } from "framer-motion";

interface IProps {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
  overrideDefaultStyles?: boolean,
  classes?: string,
  children: React.ReactNode | React.ReactNode[]
};

const Backdrop: React.FC<IProps> = ({onClick, overrideDefaultStyles, classes, children}) => {
  const defaultClasses = "Backdrop flex flex-row items-center justify-center absolute top-0 left-0 w-screen h-screen z-50";
  
  return(
    <motion.div
      className={overrideDefaultStyles ? classes : defaultClasses}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;