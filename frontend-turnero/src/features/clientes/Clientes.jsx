import React, { useState } from 'react';
import { Table, Input } from 'antd';
import 'antd/dist/antd.css';

const Clientes = ({ clientes }) => {
  const [searchText, setSearchText] = useState('');

  const filteredClients = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
    },
    {
      title: 'Última Visita',
      dataIndex: 'ultimaVisita',
      key: 'ultimaVisita',
    },
  ];

  return (
    <div>
      <Input
        placeholder="Buscar cliente"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredClients} />
    </div>
  );
};

export default Clientes;