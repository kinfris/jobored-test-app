import styles from './customButton.module.scss';
import { Props } from './types';

export function CustomButton({ content, callback, fullwidth = false }: Props) {
  return (
    <button
      className={`${styles.button} ${fullwidth && styles.fullwidth}`}
      onClick={callback}
    >
      {content}
    </button>
  );
}
