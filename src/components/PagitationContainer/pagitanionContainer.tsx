import Pagination from '@mui/material/Pagination';
import styles from './paginationContainer.module.scss';
import * as React from 'react';
import { PropsType } from './types';
import { itemsPerPage } from './constants';

export const PaginationContainer = ({ page, count, callback }: PropsType) => {
  const onChangePageHandler = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    callback(page);
  };

  return (
    <>
      <Pagination
        page={page}
        onChange={onChangePageHandler}
        count={Math.ceil(count / itemsPerPage)}
        shape="rounded"
        className={styles.pagination}
        sx={{
          '& .Mui-selected': {
            backgroundColor: '#5E96FC !important',
            color: '#FFFFFF',
            height: '30px',
          },
          '& .MuiPaginationItem-ellipsis': {
            marginTop: '5px',
          },
        }}
      />
    </>
  );
};
