import React, { useEffect, useState } from 'react';
import API from '../../services/API';
import { Button } from 'react-bootstrap';
import EntrenadorList from '../../components/Entrenador/EntrenadorList';
import EntrenadorModal from '../../components/Entrenador/EntrenadorModal';


 
const Entrenador = props => {

    const [entrenadores,setEntrenadores] = useState([]);
  
    const initialEntrenadorData = { 
      nombre: '',
    }


const [newEntrenadorData,setNewEntrenadorData] = useState(initialEntrenadorData);

  const [showModal,setShowModal] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [validateForm, setValidateForm] = useState(false);
  const [errorMsg,setErrorMsg] = useState('');

  useEffect(() => {
    getEntrenadores();
  },[]);

  const getEntrenadores = async() => {
    try{
      let response = await API.get('/entrenadores');
      setEntrenadores(response);
    }
    catch(error){
      console.log(error);
    }
  }

  const borrarEntrenador = async(id) => {
    if (window.confirm("Estas seguro?")) {
      try{
        await API.remove(`/entrenadores/${id}`);
        getEntrenadores();
      }
      catch(error){
        console.log(error);
      }
    }
  }

  const agregarEntrenador = async() => {
    try{
      await API.save('/entrenadores', newEntrenadorData);
      resetModal();
      getEntrenadores();
    }
    catch(error){
      setErrorMsg(JSON.stringify(error));
    }
  }

  const editarEntrenador = async(id) => {
    try{
      await API.update(`/entrenadores/${id}`,newEntrenadorData);
      resetModal();
      getEntrenadores();
    }
    catch(error){
      setErrorMsg(JSON.stringify(error));
    }
  }


  const handleFormChange = (tipo,value) => {
    if(value === '')
      setValidateForm(true);

    setNewEntrenadorData({...newEntrenadorData, [tipo]:value});
  }  

  const handleFormSubmit = (form, isEdit) => {
    setValidateForm(true);

    if(form.checkValidity())
      isEdit ? editarEntrenador(newEntrenadorData.id) : agregarEntrenador();
  };
 
  const resetModal = () =>{
    setShowModal(false);
    setIsEdit(false);
    setNewEntrenadorData(initialEntrenadorData);
    setValidateForm(false);
    setErrorMsg('');
  }

  const handleOpenModal = (editar = false, entrenadorToEdit = null) =>{
    if(editar)
    {
      setIsEdit(true);
      setNewEntrenadorData(entrenadorToEdit);
    }
    setShowModal(true);
  }

  const handleCloseModal = () =>{
    resetModal();
  }
 
  return (
    <div className="container mt-4">
      <h1>Entrenadores</h1>
      <Button variant="info mb-3" onClick={()=> handleOpenModal()}> Agregar Entrenador </Button> 
      <EntrenadorModal
        show={showModal}
        handleClose={handleCloseModal}
        handleChange={handleFormChange}
        handleSubmit={handleFormSubmit}
        isEdit={isEdit}
        validate={validateForm}
        errorMsg={errorMsg}
        jugador={newEntrenadorData}
      />
      <EntrenadorList
        entrenadores={entrenadores}
        borrarEntrenador={borrarEntrenador}
        editarEntrenador={handleOpenModal}
      />
    </div>
  );


}
export default Entrenador;