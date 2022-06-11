import React from "react";
import { useForm } from "react-hook-form";
import { promedioValidator } from "../validators";

let jsonData= require('../DataEstiloRecintoPromedio/ProbabilidadEstilos.json');// arreglo con los datos del excel
let jsonDataR= require('../DataEstiloRecintoPromedio/ProbabilidadRecinto.json');// arreglo con los datos del excel
let jsonP= require('../DataEstiloRecintoPromedio/ProbabilidadPromedio.json');// arreglo con los datos del excel
let jsonS= require('../DataEstiloRecintoPromedio/ProbabilidadSexo.json');// arreglo con los datos del excel

function AdivinaEstilo() {
  const {register,formState:{ errors }, handleSubmit , setValue }=useForm();
  const onSubmit = (datos) =>{
   
    var i=0;

    let RecintoD='';
    let RecintoCo='';
    let RecintoA='';
    let RecintoAsi='';

    let PromedioD='';
    let PromedioCo='';
    let PromedioA='';
    let PromedioAsi='';

    let SexoD='';
    let SexoCo='';
    let SexoA='';
    let SexoAsi='';


    // recorriendo los datos 
    // recinto 
    for(i=0; i<jsonDataR.length;i++){
      
      if(jsonDataR[i].Recinto=== datos.recinto){
          const valueR = jsonDataR[i];
           RecintoD = valueR.DIVERGENTE;
           RecintoCo = valueR.CONVERGENTE;
           RecintoA = valueR.ACOMODADOR;
           RecintoAsi= valueR.ASIMILADOR;
      }
     
    }
    
    // sexo 
    for(i=0; i<jsonS.length;i++){
      
      if(jsonS[i].Sexo=== datos.sexo){
          const valueS = jsonS[i];
           SexoD = valueS.DIVERGENTE;
           SexoCo = valueS.CONVERGENTE;
           SexoA = valueS.ACOMODADOR;
           SexoAsi= valueS.ASIMILADOR;
      }
     
    }
   
    // rangos para el promedio 
    let promedio ='';
    if(datos.promedio <5){
      promedio="3";
    }else if (datos.promedio>=5 && datos.promedio<=6){
      promedio="3";
    }else if (datos.promedio>=7 && datos.promedio<=8){
      promedio="4";
    }else if (datos.promedio>=9 && datos.promedio<=10){
      promedio="5";
    }

    for(i=0; i<jsonP.length;i++){
      
      if(jsonP[i].Promedio === promedio){
          const valueP = jsonP[i];
           PromedioD= valueP.DIVERGENTE;
           PromedioCo= valueP.CONVERGENTE;
           PromedioA= valueP.ACOMODADOR;
           PromedioAsi= valueP.ASIMILADOR;
      }
     
    }
  
    
    // obtener promedios 
    
    // probabilidades 
    const probabilidadD = RecintoD*PromedioD*SexoD*jsonData[0].DIVERGENTE;
    const probabilidadCo = RecintoCo*PromedioCo*SexoCo*jsonData[0].CONVERGENTE;
    const probabilidadA = RecintoA*PromedioA*SexoA*jsonData[0].ACOMODADOR;
    const probabilidadAsi = RecintoAsi*PromedioAsi*SexoAsi*jsonData[0].ASIMILADOR;

    // retorno 
   if(probabilidadD>probabilidadCo && probabilidadD>probabilidadA && probabilidadD>probabilidadAsi ){
    setValue('resultado', 'Divergente');
   } else if(probabilidadCo>probabilidadD && probabilidadCo>probabilidadA && probabilidadCo>probabilidadAsi ){
    setValue('resultado', 'Convergente');
   } if(probabilidadA>probabilidadCo && probabilidadA>probabilidadD && probabilidadA>probabilidadAsi ){
    setValue('resultado', 'Acomodador');
   } if(probabilidadAsi>probabilidadCo && probabilidadAsi>probabilidadA && probabilidadAsi>probabilidadD ){
    setValue('resultado', 'Asimilador');
   } 
   
    
  }

  return (
    // formulario 
    <div className="page-heading">
      <form onSubmit={handleSubmit(onSubmit)}>
        <center><h1>Adivina Estilo</h1></center>
        <label>Recinto</label>
        <select {...register('recinto')}>
          <option value="Paraíso">Paraíso</option>
          <option value="Turrialba">Turrialba</option>
        </select>
        <br></br>
        <br></br>
        <label>Promedio</label>
        <input class="form-input" type="text" {...register('promedio',{
          required:true,
          validate: promedioValidator
        })}></input>
        <br></br>
        <br></br>
        {errors.promedio?.type === 'required' && <p>El promedio es requerido</p>}
        {errors.promedio && <p>El promedio debe estar entre 0 y 10</p>}
        
        <label>Sexo</label>
        <select {...register('sexo')}>
          <option value="F">F</option>
          <option value="M">M</option>
        </select>
        <br></br>
        <br></br>
        <center><button> Calcular </button></center>
        <br></br>
        <br></br>
        <label>Resultado</label>
        <textarea placeholder="Resultado encontrado"  readOnly {...register('resultado')}></textarea>
      </form>
    </div>
  );
}

export default AdivinaEstilo;