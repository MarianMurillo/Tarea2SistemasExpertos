import React from "react";
import { useForm } from "react-hook-form";

let jsonDataR= require('../DataRedes/ProbabilidadReliability.json'); // arreglo de datos del excel
let jsonDataL= require('../DataRedes/ProbabilidadLinks.json'); // arreglo de datos del excel
let jsonDataCa= require('../DataRedes/ProbabilidadCapacity.json'); // arreglo de datos del excel
let jsonDataCo= require('../DataRedes/ProbabilidadCost.json'); // arreglo de datos del excel
let jsonDataRedes= require('../DataRedes/ProbabilidadRedes.json'); // arreglo de datos del excel

function ClasificaRed() {
  const {register, handleSubmit , setValue}=useForm();
  const onSubmit = (datos) =>{
    
    // variables
    let valorRA='';
    let valorRB='';
    let valorLA = '';
    let valorLB = '';
    let valorCAA = '';
    let valorCAB = '';
    let valorCOA = '';
    let valorCOB = '';
    var i=0;
    // recorriendo los datos del excel
    // variable datos es el objeto con las opciones que ingresó el usuario
    //confiabilidad 
    
    for(i=0; i<jsonDataR.length;i++){
      
      if(jsonDataR[i]["Reliability (R)"]=== datos.confRed){
          const valueR = jsonDataR[i];
           valorRA = valueR.A;
           valorRB = valueR.B;
      }
     
    }
    //Numero links 
    for(i=0; i<jsonDataL.length;i++){
      
      if(jsonDataL[i]["Number of links (L)"]=== datos.enlaces){
          const valueL = jsonDataL[i];
           valorLA = valueL.A;
           valorLB = valueL.B;
      }
     
    }
    // Capacidad
    for(i=0; i<jsonDataCa.length;i++){
      
      if(jsonDataCa[i]["Capacity (Ca)"]=== datos.capacidad){
          const valueCA = jsonDataCa[i];
           valorCAA = valueCA.A;
           valorCAB = valueCA.B;
      }
     
    }
    // costo 
    for(i=0; i<jsonDataCo.length;i++){
      
      if(jsonDataCo[i]["Costo (Co)"]=== datos.costo){
          const valueCO = jsonDataCo[i];
           valorCOA = valueCO.A;
           valorCOB = valueCO.B;
      }
     
    }
    // calculo de probabilidades
    const probabilidadA = valorRA*valorLA*valorCAA*valorCOA*jsonDataRedes[0].A;
    const probabilidadB = valorRB*valorLB*valorCAB*valorCOB*jsonDataRedes[0].B;

    
    // retorno 
    
    if(probabilidadA>probabilidadB){
      setValue('resultado', 'Clase A');
    } else {
      setValue('resultado', 'Clase B');
    }

   
  }
  return (
    //formulario 
    <div className="page-heading">
      <form onSubmit={handleSubmit(onSubmit)}>
        <center><h1>Clasificación de redes</h1></center>
        <center><label>Seleccione de la red ...</label></center>
        <label>*Confiabilidad :</label>
        <select {...register('confRed')}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br></br>
       <label>*Número de enlaces : </label>
        <select {...register('enlaces')}>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
        <br></br>
        <label>*Capacidad :</label>
        <select {...register('capacidad')}>
          <option value="Low">Baja</option>
          <option value="Medium">Media</option>
          <option value="High">Alta</option>
        </select>
        <br></br>
        <label>*Costo :</label>
        <select {...register('costo')}>
          <option value="Low">Bajo</option>
          <option value="Medium">Medio</option>
          <option value="High">Alto</option>
        </select>
        <br></br>
        <br></br>
        <center><button> Calcular </button></center>
        <br></br>
        <label>Resultado</label>
        <textarea placeholder="Resultado encontrado"  readOnly {...register('resultado')}></textarea>
      </form>
    </div>
  );
}

export default ClasificaRed;