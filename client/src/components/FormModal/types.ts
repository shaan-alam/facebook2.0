export interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<string>>;
  currentID: string;
}

export interface PostType {
  file?: any;
  title: string;
  description: string;
  tags: string[];
  imgURL?: string;
  creator: string
}
