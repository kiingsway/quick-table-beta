export interface IQuickTableProps {
  columns: IQuickTableColumn[];
  data: any[];

  globalSearchable?: boolean
  searchPlaceholder?: string;
  
  tableClassName?: string;
  thClassName?: string;
  tdClassName?: string;
}

export interface IQuickTableColumn {
  title: string;
  acessor: string;
  sorteable?: boolean;
  filterable?: boolean;
}