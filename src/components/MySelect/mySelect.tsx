import { useEffect, useState } from 'react';
import { UnstyledButton, Menu, Group } from '@mantine/core';
import styles from './mySelect.module.scss';
import { ArrowDownIcon } from '@/components/icons/arrowDownIcon';
import { VacancyService } from '@/Http/vacancies';
import { defaultOptions } from './constants';
import { PropsType } from './types';

const defaultMappedCatalogues = defaultOptions.map(
  (catalog: {
    title_rus: string;
    url_rus: string;
    title: string;
    id_parent: number;
    key: number;
  }) => ({
    label: catalog.title_rus,
    key: catalog.key,
  })
);

export const MySelect = ({ name, value, callback }: PropsType) => {
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<Array<{ label: string; key: number }>>(
    defaultMappedCatalogues
  );

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const cataloguesResponse: any = await VacancyService.getCatalogues();
        const mappedCatalogues = cataloguesResponse.data.map(
          (catalog: {
            title_rus: string;
            url_rus: string;
            title: string;
            id_parent: number;
            key: number;
          }) => ({
            value: catalog.title_rus,
            label: catalog.title_rus,
            key: catalog.key,
          })
        );
        setOptions(mappedCatalogues);
      } catch (e) {}
    };
    asyncFunc();
  }, []);

  const onChangeHandler = (value: any) => {
    callback(name, value);
  };

  const items = options.map((item) => (
    <Menu.Item
      onClick={() => onChangeHandler(item)}
      key={item.label}
      className={`${styles.option} ${
        item.label === value.label && styles.active_option
      }`}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
      data-elem="industry-select"
    >
      <Menu.Target>
        <UnstyledButton
          className={`${styles.control} ${opened && styles.opened}`}
        >
          <Group spacing="xs">
            <span
              className={`${styles.label} ${value.isHidden && styles.hidden}`}
            >
              {value.label}
            </span>
          </Group>
          {!opened ? (
            <div className={styles.chevron_icon}>
              <ArrowDownIcon />
            </div>
          ) : (
            <div className={`${styles.chevron_icon} ${styles.reverse}`}>
              <ArrowDownIcon />
            </div>
          )}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={styles.menu}>{items}</Menu.Dropdown>
    </Menu>
  );
};
