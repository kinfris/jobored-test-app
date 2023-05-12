import Select, { StylesConfig } from 'react-select';
import { useEffect, useState } from 'react';
import { VacancyService } from '@/Http/vacancies';
import { defaultOptions } from '@/components/MySelect/constants';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly isHidden?: boolean;
}

const selectStyles: StylesConfig<SelectOption, true> = {
  // @ts-ignore
  control: (styles, state) => {
    return {
      ...styles,
      borderRadius: '8px',
      '&:hover': {
        border: '1px solid #5E96FC',
      },
      border: state.isFocused ? '1px solid #5E96FC' : '1px solid #D5D6DC',
      boxShadow: state.isFocused && 'none',
    };
  },
  singleValue: (styles, { data }) => {
    if (!data.value) {
      return {
        ...styles,
        color: '#ACADB9',
        fontSize: 14,
      };
    }
    return { ...styles, fontSize: 14 };
  },
  // @ts-ignore
  option: (styles, { data, isSelected }) => {
    if (!data.value) {
      return {
        display: 'none',
      };
    }
    return {
      ...styles,
      fontSize: 14,
      backgroundColor: isSelected && '#5E96FC',
      borderRadius: isSelected && '8px',
      '&:hover': {
        backgroundColor: '#DEECFF',
        borderRadius: '8px',
      },
      '&:active': {
        backgroundColor: '#5E96FC',
        borderRadius: '8px',
        color: '#FFFFFF',
        fontWeight: 500,
      },
    };
  },
  // @ts-ignore
  dropdownIndicator: (styles, state) => {
    return {
      ...styles,
      transitionProperty: 'transform',
      color: state.isFocused ? '#5E96FC' : '#ACADB9',
      transform: state.isFocused && 'rotate(180deg)',
      '&:hover': {
        color: state.isFocused ? '#5E96FC' : '#ACADB9',
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      borderRadius: '8px',
      padding: '4px',
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      '::-webkit-scrollbar': {
        width: '4px',
      },
      '::-webkit-scrollbar-track': {
        background: '#FFFFFF',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#ACADB9',
        borderRadius: '20px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#ACADB9',
      },
    };
  },
};

type PropsType = {
  name: string;
  value: { value: string; label: string; isHidden?: boolean; key?: number };
  callback: (name: string, value: string | number) => void;
};
const defaultMappedCatalogues = defaultOptions.map(
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

export function CustomSelect({ name, value, callback }: PropsType) {
  const [options, setOptions] = useState<
    Array<{ value: string; label: string; key: number }>
  >(defaultMappedCatalogues);

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

  return (
    <div data-elem="industry-select">
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={value}
        isSearchable={false}
        name="department"
        options={options}
        onChange={onChangeHandler}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={selectStyles}
      />
    </div>
  );
}
