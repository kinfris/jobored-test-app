export type PropsType = {
  title: string;
  name: string;
  value: string | number;
  callback: (name: string, value: string | number) => void;
};
