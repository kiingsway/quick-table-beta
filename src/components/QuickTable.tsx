import React, { useEffect, useState } from 'react'
import { IFilterByField, IQuickTableColumn, IQuickTableProps } from './interfaces';
import { BsChevronDown, BsSortUp, BsSortDownAlt } from 'react-icons/bs'
import uuid from 'react-uuid';
import './QuickTable.css'

export default function QuickTable(props: IQuickTableProps) {

  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<{ prop?: string; order: 'asc' | 'desc' }>({ prop: undefined, order: 'asc' });
  const [fitlersByField, setFilterByField] = useState<IFilterByField[]>([]);

  const propsOrDefault: Partial<IQuickTableProps> = {
    globalSearchable: props.globalSearchable === undefined ? true : props.globalSearchable,
    searchPlaceholderText: props.searchPlaceholderText === undefined ? 'Pesquisar...' : props.searchPlaceholderText,
    counter: props.counter === undefined ? true : props.counter,
  }

  const handlerSetFilterByField = (e: any, acessor: string) => {
    if (e.target.value)
      setFilterByField(prevFilters => [...prevFilters.filter(f => f.acessor !== acessor), { acessor: acessor, value: e.target.value }])
    else
      setFilterByField(prevFilters => [...prevFilters.filter(f => f.acessor !== acessor)])
  }

  const handleSort = (acessor: string) => setSort(prevSort => (
    {
      prop: !prevSort.prop || prevSort.order === 'asc' ? acessor : undefined,
      order: prevSort.prop !== acessor ? 'asc' : (prevSort.order === 'asc' ? 'desc' : 'asc')
    }
  ))

  let tableData = props.data.map(item => {
    let newItem: any = {};
    for (let col of props.columns) newItem[col.acessor] = getPropWithString(item, col.acessor);
    return newItem
  })

  const tableDataOriginal = tableData;

  if (search)
    tableData = tableData
      .filter(item => Object.keys(item)
        .find(col => String(item[col])?.toLowerCase().includes(search.toLowerCase())))

  if (fitlersByField.length)
    for (let filter of fitlersByField)
      tableData = tableData
        .filter(item => filter.value !== '!@null@!' ? String(item[filter.acessor]) === String(filter.value) : (!Boolean(item[filter.acessor]) && item[filter.value] !== 0))

  if (sort.prop)
    tableData = tableData.sort((a, b) => sortByProp(a, b, sort.prop as string, sort.order))

  const OptionFilter = (pr: { column: IQuickTableColumn }) => {

    let tableDataColumnUnique = tableDataOriginal
      .map(item => item[pr.column.acessor]) // Array com os valores da coluna de acessor
      .filter((v, i, a) => a.indexOf(v) === i) // Fazer exclusividade
      .sort((a, b) => ("" + a).localeCompare(b, undefined, { numeric: true })); // Classificar alfabeticamente e numericamente

    // Caso tenha nulo, coloca em primeiro
    tableDataColumnUnique = tableDataColumnUnique.find(val => !val && val !== 0) !== undefined ?
      [null, ...tableDataColumnUnique.filter(val => Boolean(val || val === 0))] : tableDataColumnUnique

    return (
      <select
        title={`Filtrar campo "${pr.column}"`}
        onChange={e => handlerSetFilterByField(e, pr.column.acessor)}
        value={fitlersByField.filter(f => f.acessor === pr.column.acessor)[0]?.value || ''}>
        <option value="">--</option>
        {tableDataColumnUnique.map(opt => <option value={opt || opt === 0 ? opt : '!@null@!'} key={uuid()}>{opt || opt === 0 ? opt : '(vazio)'}</option>)}
      </select>
    )
  }

  return (
    <div className='quick-table-container'>

      <div>

        {
          propsOrDefault.globalSearchable ?
            <input
              type="text"
              value={search}
              placeholder={propsOrDefault.searchPlaceholderText}
              onChange={e => setSearch(e.target.value)}
            /> : <></>
        }

        {
          propsOrDefault.counter ?
            <>{tableData.length} {tableData.length !== tableDataOriginal.length ? `(de ${tableDataOriginal.length})` : ''} itens</>
            : <></>
        }

      </div>


      <table className={props.tableClassName}>
        <thead>
          <tr>
            {props.columns.map(col => {

              return (
                <th
                  key={col.acessor}
                  id={`quick-table-col-${col.acessor}`}
                  className={props.thClassName}
                >
                  <div className='quick-table-column' onClick={col.sorteable !== false ? () => handleSort(col.acessor) : undefined}>
                    <span className='quick-table-column-text'>{col.title}</span>

                    {/* <BsChevronDown className='quick-table-column-dropdownIcon' /> */}

                    {
                      sort.prop === col.acessor ?
                        (
                          sort.order === 'desc' ?
                            <BsSortUp className='quick-table-column-sortIcon' />
                            :
                            <BsSortDownAlt className='quick-table-column-sortIcon' />
                        )
                        : <></>
                    }

                  </div>
                  {col.filterable !== false ? <OptionFilter column={col} /> : <></>}
                </th>
              )
            })}

          </tr>
        </thead>
        <tbody>
          {tableData.map(item => {

            return (
              <tr key={uuid()}>

                {props.columns.map(col => {

                  return (
                    <td
                      className={props.tdClassName}
                      key={uuid()}>
                      {item[col.acessor]}
                    </td>

                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const getPropWithString: any = (obj: any, prop: string) => {

  const sep = '.';
  const propUse = prop.split(sep)[0]
  const propRest = prop.split(sep).slice(1).join(sep)

  return prop.includes(sep) ? getPropWithString(obj[propUse], propRest) : obj[prop]

}

const sortByProp = (a: any, b: any, property: string, order: 'asc' | 'desc') => {
  return order === 'asc' ? ("" + a[property]).localeCompare(b[property], undefined, { numeric: true }) : ("" + b[property]).localeCompare(a[property], undefined, { numeric: true })
}

export interface IQuickTableColumnDefinition extends IQuickTableColumn { }