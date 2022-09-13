import React from 'react';
import './App.css';
import QuickTable, { IQuickTableColumnDefinition } from './components/QuickTable';
import fluxos from './data/fluxos.json'

function App() {

  const data1 = fluxos as any[];
  const dataColumns1: IQuickTableColumnDefinition[] = [
    { title: 'Título', acessor: 'properties.displayName' },
    { title: 'Status', acessor: 'properties.state' },
    { title: 'Modificado', acessor: 'properties.lastModifiedTime' },
    { title: 'Criado', acessor: 'properties.createdTime' },
  ]


  return (
    <QuickTable
      columns={dataColumns1}
      data={data1}


    />
  );
}

export default App;
