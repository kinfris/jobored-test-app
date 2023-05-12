import styles from './searchInput.module.scss';
import { ChangeEvent, useState } from 'react';
import { CustomButton } from '@/components/CustomButton/customButton';
import { SearchIcon } from '@/components/icons/searchIcon';
import { PropsType } from './types';

export function InputSearch({ value, onChange, callback }: PropsType) {
  const [isActive, setIsActive] = useState(false);
  const onInputFocus = () => {
    setIsActive(true);
  };

  const onInputBlur = () => {
    setIsActive(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onSearchHandle = () => {
    callback();
  };

  return (
    <div className={`${styles.wrapper} ${isActive && styles.wrapper_active}`}>
      <div className={styles.input_container}>
        <SearchIcon />
        <input
          className={styles.input}
          placeholder="Введите название вакансии"
          onClick={onInputFocus}
          onBlur={onInputBlur}
          value={value}
          onChange={onChangeHandler}
          data-elem="search-input"
        />
      </div>
      <CustomButton
        content="Поиск"
        callback={onSearchHandle}
        data-elem="search-button"
      />
    </div>
  );
}
