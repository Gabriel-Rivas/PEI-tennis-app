import React from 'react'
import { Table, Button } from 'react-bootstrap';

const EntrenadorList = props => {

  const {entrenadores, borrarEntrenador, editarEntrenador} = props;

  const orderByName = (entrenadores) => {
    return entrenadores.sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  const listaEntrenadores = orderByName(entrenadores).map((entrenador) => {

    const {id, nombre} = entrenador;

    return (
        <tr key={id}>
          <td>{id}</td>
          <td>{nombre}</td>
          <td>
            <Button variant="success" className="mr-2" onClick={()=>editarEntrenador(true,entrenador)}> Editar </Button>
            <Button variant="danger" onClick={()=>borrarEntrenador(id)}>Eliminar</Button>
          </td>
        </tr>
      )
    });
  
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {listaEntrenadores}
        </tbody>
      </Table>
    );
  
  }
  
  export default EntrenadorList;