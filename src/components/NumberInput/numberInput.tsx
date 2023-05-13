import styles from './numberInput.module.scss';
import { ChangeEvent, useState } from 'react';
import { ButtonUpIcon } from '@/components/icons/buttonUpIcon';
import { ButtonDownIcon } from '@/components/icons/buttonDownIcon';
import { PropsType } from './types';

export const NumberInput = ({ title, name, value, callback }: PropsType) => {
  const [isActive, setIsActive] = useState(false);

  const onInputFocus = () => {
    setIsActive(true);
  };

  const onInputBlur = () => {
    setIsActive(false);
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regexOnlyNumbers = /\D/;
    if (!regexOnlyNumbers.test(value)) {
      callback(name, +value);
    }
  };

  const increment = () => {
    callback(name, +value + 1);
  };
  const decrement = () => {
    if (+value > 0) {
      callback(name, +value - 1);
    }
  };

  return (
    <div className={`${styles.wrapper} ${isActive && styles.wrapper_active}`}>
      <input
        className={styles.input}
        placeholder={title}
        onClick={onInputFocus}
        onBlur={onInputBlur}
        value={value}
        onChange={onChangeHandler}
        data-elem={name === 'От' ? 'salary-from-input' : 'salary-to-input'}
      />
      <div className={styles.buttons_wrapper}>
        <div onClick={increment} className={styles.arrow}>
          <ButtonUpIcon />
        </div>
        <div onClick={decrement} className={styles.arrow}>
          <ButtonDownIcon />
        </div>
      </div>
    </div>
  );
};
