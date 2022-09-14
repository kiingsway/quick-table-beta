import React from 'react';
import './App.css';
import QuickTable, { IQuickTableColumnDefinition } from './components/QuickTable';
import fluxos from './data/fluxos.json'
import pessoas from './data/pessoas.json'

function App() {

  const data1 = fluxos as any[];
  const dataColumns1: IQuickTableColumnDefinition[] = [
    { title: 'Título', acessor: 'properties.displayName' },
    { title: 'Status', acessor: 'properties.state' },
    { title: 'Modificado', acessor: 'properties.lastModifiedTime' },
    { title: 'Criado', acessor: 'properties.createdTime' },
  ]

  const data2 = pessoas as any[];
  const dataColumns2: IQuickTableColumnDefinition[] = [
    { title: 'nome', acessor: 'nome' },
    { title: 'idade', acessor: 'idade' },
    { title: 'cpf', acessor: 'cpf' },
    { title: 'rg', acessor: 'rg' },
    { title: 'data_nasc', acessor: 'data_nasc' },
    { title: 'sexo', acessor: 'sexo' },
    { title: 'signo', acessor: 'signo' },
    { title: 'endereco', acessor: 'endereco' },
    { title: 'numero', acessor: 'numero' },
    { title: 'peso', acessor: 'peso' },
    { title: 'tipo_sanguineo', acessor: 'tipo_sanguineo' },
  ]


  return (
    <QuickTable
      columns={dataColumns2}
      data={data2}


    />
  );
}

export default App;
