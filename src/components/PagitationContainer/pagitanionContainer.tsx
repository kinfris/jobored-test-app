import Pagination from '@mui/material/Pagination';
import styles from './paginationContainer.module.scss';
import * as React from 'react';
import { PropsType } from './types';

export function PaginationContainer({ page, count, callback }: PropsType) {
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
        count={Math.ceil(count / 4)}
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
}
