export interface IQuickTableProps {
  columns: IQuickTableColumn[];
  data: any[];

  globalSearchable?: boolean
  counter?: boolean;

  searchPlaceholderText?: string;

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

export interface IFilterByField {
  acessor: string;
  value: string;
}