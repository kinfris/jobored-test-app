import styles from './customButton.module.scss';
import { Props } from './types';

export const CustomButton = ({
  content,
  callback,
  fullwidth = false,
  dataElem = false,
}: Props) => {
  return (
    <button
      className={`${styles.button} ${fullwidth && styles.fullwidth}`}
      onClick={callback}
      data-elem={dataElem && 'search-button'}
    >
      {content}
    </button>
  );
};
