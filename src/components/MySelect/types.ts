export interface CatalogsType {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}

export interface OptionType {
  label: string;
  isHidden?: boolean;
  key?: number;
}

export interface PropsType {
  name: string;
  value: OptionType;
  callback: (name: string, value: string | number) => void;
}
