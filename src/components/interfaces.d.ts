import React from "react";

export interface IQuickTableProps {
  columns: IQuickTableColumn[];
  data: any[];

  globalSearchable?: boolean
  counter?: boolean;

  searchPlaceholderText?: string;

  tableClassName?: string;
  thClassName?: string;
  tdClassName?: string;

  style?: IQuickTableStyle;
}

export interface IQuickTableColumn {
  title: string;
  acessor: string;
  sorteable?: boolean;
  filterable?: boolean;
  render?: (string) => JSX.Element;
}

export interface IFilterByField {
  acessor: string;
  value: string;
}

export interface IQuickTableStyle {
  all?: React.CSSProperties;
  searchText?: React.CSSProperties;
  counter?: React.CSSProperties;
  table?: React.CSSProperties;
  th?: React.CSSProperties;
  td?: React.CSSProperties;
  filterSelectOutline?: React.CSSProperties;
  filterSelect?: React.CSSProperties;
}