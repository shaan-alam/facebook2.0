export interface ModalProps {
  children: JSX.Element[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
