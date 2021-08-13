import { useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

const Modal = ({
  isOpen,
  setOpen,
  children,
}: {
  children: JSX.Element[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const closeModal = (e: any) => {
      if (e.code == "27" || e.target.classList.contains("modal-backdrop")) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeModal);
    window.addEventListener("click", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
      window.removeEventListener("click", closeModal);
    };
  }, []);

  return isOpen ? (
    <div className="modal-backdrop px-5 flex justify-center items-center h-screen w-screen fixed top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-80">
      <motion.div
        className="w-full sm:w-3/4 md:w-1/2 bg-white rounded-3xl relative p-12"
        initial={{ scale: 0.7, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, duration: 1 }}
      >
        <a href="#!" onClick={() => setOpen(false)}>
          <XIcon className="text-gray-700 h-10 w-10 absolute right-1 top-1 p-3 bg-gray-300 rounded-full hover:bg-gray-400" />
        </a>
        {children}
      </motion.div>
    </div>
  ) : null;
};

export default Modal;
