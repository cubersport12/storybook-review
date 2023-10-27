import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const SmallStyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '&': {
    minHeight: '100px'
  },
  '.MuiDataGrid-virtualScroller': {
    flexGrow: 1
  },
  '.MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: 'transparent'
  },
  '& .Mui-selected': {
    backgroundColor: `${theme.palette.primary.light} !important`
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d'
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    'borderBottom': `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    '&:not(last-child)': {
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`
    }
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0
  }
}));
