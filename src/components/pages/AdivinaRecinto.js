import React from "react";
import { useForm } from "react-hook-form";
import { promedioValidator } from "../validators";

let jsonData= require('../DataEstiloRecintoPromedio/ProbabilidadRecintosTotal.json'); // arreglo con los datos del excel
let jsonDataP= require('../DataEstiloRecintoPromedio/ProbabilidadRecintoPromedio.json'); // arreglo con los datos del excel
let jsonDataE= require('../DataEstiloRecintoPromedio/ProbabilidadRecintoEstilo.json'); // arreglo con los datos del excel
let jsonDataS= require('../DataEstiloRecintoPromedio/ProbabilidadRecintoSexo.json'); // arreglo con los datos del excel



function AdivinaRecinto() {
  const {register,formState:{ errors }, handleSubmit , setValue}=useForm();
  const onSubmit = (datos) =>{
   
    
    var i=0;
    let EstiloT='';
    let EstiloP='';

    let PromedioT='';
    let PromedioP='';

    let SexoT='';
    let SexoP='';
    
     // recorrer datos 
     // promedio 
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
          PromedioT = valueP.Turrialba;
          PromedioP= valueP.Paraiso;
           
      }
     
    }

    // ESTILO 
    for(i=0; i<jsonDataE.length;i++){
      
      if(jsonDataE[i].Estilo=== datos.estilo){
          const valueS = jsonDataE[i];
           EstiloT = valueS.Turrialba;
           EstiloP = valueS.Paraiso;
           
      }
     
    }

    //SEXO 
    for(i=0; i<jsonDataS.length;i++){
      
      if(jsonDataS[i].Sexo=== datos.sexo){
          const valueSE = jsonDataS[i];
           SexoT = valueSE.Turrialba;
           SexoP = valueSE.Paraiso;
           
      }
     
    }

    // Probabilidades 
    const probabilidadT = PromedioT*EstiloT*SexoT*jsonData[0].Turrialba;
    const probabilidadp = PromedioP*EstiloP*SexoP*jsonData[0].Paraiso;

    //Retorno 
    if(probabilidadT>probabilidadp){
      setValue('resultado', 'Turrialba');
     } else {
      setValue('resultado', 'Paraíso');
     }
     

  }

  return (
    <div className="page-heading">
      <form onSubmit={handleSubmit(onSubmit)}>
        <center><h1>Adivina Recinto</h1></center>
        <label>Promedio</label>
        <input class="form-input" type="text" {...register('promedio',{
          required:true,
          validate: promedioValidator
        })}></input>
        <br></br>
        <br></br>
        {errors.promedio?.type === 'required' && <p>El promedio es requerido</p>}
        {errors.promedio && <p>El promedio debe estar entre 0 y 10</p>}
        <label>Estilo</label>
        <select {...register('estilo')}>
          <option value="DIVERGENTE">Divergente</option>
          <option value="CONVERGENTE">Convergente</option>
          <option value="ASIMILADOR">Asimilador</option>
          <option value="ACOMODADOR">Acomodador</option>
        </select>
        <br></br>
        <br></br>
        <label>Sexo</label>
        <select {...register('sexo')}>
          <option value="F">F</option>
          <option value="M">M</option>
        </select>
        <br></br>
        <br></br>
        <center><button onclick="calcular()"> Calcular </button></center>
        <br></br>
        <br></br>
        <label>Resultado</label>
        <textarea placeholder="Resultado encontrado"  readOnly {...register('resultado')}></textarea>
      </form>
    </div>
  );
}

export default AdivinaRecinto;