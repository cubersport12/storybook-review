import { SmallStyledDataGrid } from '@shared/themes';
import { DataGridProps, GridColDef } from '@mui/x-data-grid';

export const AppDataGrid = (props: DataGridProps) => {
  return (
    <SmallStyledDataGrid
      autoPageSize={true}
      rowHeight={36}
      localeText={{
        noRowsLabel: 'Нет данныx'
      }}
      {...props}
    />
  );
};
