import React from "react";
import { useForm } from "react-hook-form";
import { promedioValidator } from "../validators";
let jsonData= require('../DataEstiloRecintoPromedio/ProbabilidadSexos.json');// arreglo con lod datos del excel
let jsonDataE= require('../DataEstiloRecintoPromedio/ProbabilidadSexoEstilo.json');// arreglo con lod datos del excel
let jsonDataP= require('../DataEstiloRecintoPromedio/ProbabilidadSexoPromedio.json');// arreglo con lod datos del excel
let jsonDataR= require('../DataEstiloRecintoPromedio/ProbabilidadSexoRecinto.json');// arreglo con lod datos del excel

function AdivinaSexo() {
  const {register,formState:{ errors }, handleSubmit , setValue }=useForm();
  const onSubmit = (datos) =>{
    var i=0;
    let EstiloF='';
    let EstiloM='';

    let PromedioF='';
    let PromedioM='';

    let RecintoF='';
    let RecintoM='';


    // valores de estilo 
    for(i=0; i<jsonDataE.length;i++){
      
      if(jsonDataE[i].Estilo=== datos.estilo){
          const valueS = jsonDataE[i];
           EstiloF = valueS.F;
           EstiloM = valueS.M
           
      }
     
    }
    // valores promedio 
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

    for(i=0; i<jsonDataP.length;i++){
      
      if(jsonDataP[i].Promedio=== promedio){
          const valueP = jsonDataP[i];
           PromedioF = valueP.F;
           PromedioM= valueP.M
           
      }
     
    }

    // valores Recinto 
    for(i=0; i<jsonDataR.length;i++){
      
      if(jsonDataR[i].Recinto=== datos.recinto){
          const valueR = jsonDataR[i];
           RecintoF = valueR.F;
           RecintoM = valueR.M
           
      }
     
    }

    // Probabilidad 
     const probabilidadF = EstiloF*RecintoF*PromedioF*jsonData[0].F;
     const probabilidadM = EstiloM*RecintoM*PromedioM*jsonData[0].M;

     //Retorno 
     if(probabilidadF>probabilidadM){
      setValue('resultado', 'F');
     } else {
      setValue('resultado', 'M');
     }
     

  }
  return (
    // formulario al usuario
    <div className="page-heading">
      <form onSubmit={handleSubmit(onSubmit)}>
        <center><h1>Adivina Sexo</h1></center>
        <label>Estilo</label>
        <select {...register('estilo')}>
          <option value="DIVERGENTE">Divergente</option>
          <option value="CONVERGENTE">Convergente</option>
          <option value="ASIMILADOR">Asimilador</option>
          <option value="ACOMODADOR">Acomodador</option>
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
        
        <label>Recinto</label>
        <select {...register('recinto')}>
          <option value="Paraíso">Paraíso</option>
          <option value="Turrialba">Turrialba</option>
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

export default AdivinaSexo;