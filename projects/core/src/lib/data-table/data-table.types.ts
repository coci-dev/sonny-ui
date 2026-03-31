export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  visible?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface DataTablePaginationConfig {
  pageSize: number;
  pageSizeOptions: number[];
}

export interface DataTableLabels {
  rowsPerPage?: string;
  rowsSelected?: (selected: number, total: number) => string;
  totalRows?: (total: number) => string;
}
