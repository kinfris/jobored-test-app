export interface PropsType {
  vacancy: {
    id: number;
    profession: string;
    payment_from: number;
    currency: string;
    schedule: string;
    location: string;
  };
  callback?: () => void;
}
