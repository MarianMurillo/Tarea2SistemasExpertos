import React from "react";
import { useForm } from "react-hook-form";

let jsonDataE= require('../DataProfesores/ProbabilidadA.json'); // arreglo con los datos de excel
let jsonDataG= require('../DataProfesores/ProbabilidadB.json'); // arreglo con los datos de excel
let jsonDataAu= require('../DataProfesores/ProbabilidadC.json'); // arreglo con los datos de excel
let jsonDataV= require('../DataProfesores/ProbabilidadD.json'); // arreglo con los datos de excel
let jsonDataEx= require('../DataProfesores/ProbabilidadE.json'); // arreglo con los datos de excel
let jsonDataH= require('../DataProfesores/ProbabilidadF.json'); // arreglo con los datos de excel
let jsonDataExT= require('../DataProfesores/ProbabilidadG.json'); // arreglo con los datos de excel
let jsonDataExS= require('../DataProfesores/ProbabilidadH.json'); // arreglo con los datos de excel
let jsonDataProfesor= require('../DataProfesores/ProbabilidadClases.json'); // arreglo con los datos de excel
function TipoProfesor() {
  const {register, handleSubmit , setValue }=useForm();
  const onSubmit = (datos) =>{
    //variables
    let EdadA ='';
    let EdadB ='';
    let EdadI ='';

    let GeneroA ='';
    let GeneroB ='';
    let GeneroI ='';

    let AutoeA ='';
    let AutoeB ='';
    let AutoeI ='';

    let VecesA ='';
    let VecesB ='';
    let VecesI ='';

    let ExpA ='';
    let ExpB ='';
    let ExpI ='';

    let HabA ='';
    let HabB ='';
    let HabI ='';

    let ExpWA ='';
    let ExpWB ='';
    let ExpWI ='';

    let ExpswA ='';
    let ExpswB ='';
    let ExpswI ='';
    // determinar valor edad 
    var i=0;
    for(i=0; i<jsonDataE.length;i++){
      
      if(jsonDataE[i].A=== datos.edad){
          const valueE = jsonDataE[i];
          EdadA = valueE.Advanced;
          EdadB = valueE.Beginner;
          EdadI = valueE.Intermediate;
      }
     
    }


    // determinar genero 
    for(i=0; i<jsonDataG.length;i++){
      
      if(jsonDataG[i].B=== datos.genero){
          const valueG = jsonDataG[i];
          GeneroA = valueG.Advanced;
          GeneroB = valueG.Beginner;
          GeneroI = valueG.Intermediate;
      }
     
    }
    // determinar autoevaluacion 
    for(i=0; i<jsonDataAu.length;i++){
      
      if(jsonDataAu[i].C=== datos.autoevaluacion){
          const valueA = jsonDataAu[i];
          AutoeA= valueA.Advanced;
          AutoeB= valueA.Beginner;
          AutoeI = valueA.Intermediate;
      }
     
    }

    // determinar veces curso 
    for(i=0; i<jsonDataV.length;i++){
      
      if(jsonDataV[i].D=== datos.vecesCurso){
          const valueV = jsonDataV[i];
          VecesA= valueV.Advanced;
          VecesB= valueV.Beginner;
          VecesI = valueV.Intermediate;
      }
     
    }

    // determinar experiencia 
    for(i=0; i<jsonDataEx.length;i++){
      
      if(jsonDataEx[i].E=== datos.experiencia){
          const valueEx = jsonDataEx[i];
          ExpA= valueEx.Advanced;
          ExpB= valueEx.Beginner;
          ExpI = valueEx.Intermediate;
      }
     
    }


    // determinar habilidad en computadora 
    for(i=0; i<jsonDataH.length;i++){
      
      if(jsonDataH[i].F=== datos.habcomputador){
          const valueH = jsonDataH[i];
          HabA= valueH.Advanced;
          HabB= valueH.Beginner;
          HabI = valueH.Intermediate;
      }
     
    }

    // determinar experiencia tecnología web 
    for(i=0; i<jsonDataExT.length;i++){
      
      if(jsonDataExT[i].G=== datos.expWeb){
          const valueExt = jsonDataExT[i];
          ExpWA= valueExt.Advanced;
          ExpWB= valueExt.Beginner;
          ExpWI = valueExt.Intermediate;
      }
     
    }

    // determinar experiencia sitios web 
    for(i=0; i<jsonDataExS.length;i++){
      
      if(jsonDataExS[i].H=== datos.expWebSite){
          const valueExs = jsonDataExS[i];
          ExpswA= valueExs.Advanced;
          ExpswB= valueExs.Beginner;
          ExpswI = valueExs.Intermediate;
      }
     
    }

    //calculo  probabilidad 
    const probabilidadA = EdadA*GeneroA*AutoeA*VecesA*ExpA*HabA*ExpWA*ExpswA*jsonDataProfesor[0].Advanced;
    const probabilidadB= EdadB*GeneroB*AutoeB*VecesB*ExpB*HabB*ExpWB*ExpswB*jsonDataProfesor[0].Beginner;
    const probabilidadI = EdadI*GeneroI*AutoeI*VecesI*ExpI*HabI*ExpWI*ExpswI*jsonDataProfesor[0].Intermediate;

    // RETORNO 
    if(probabilidadA>probabilidadB && probabilidadA>probabilidadI){
      setValue('resultado', 'Advanced');
    } else if(probabilidadB>probabilidadA && probabilidadB>probabilidadI) {
      setValue('resultado', 'Beginer');
    } else if(probabilidadI>probabilidadA && probabilidadI>probabilidadB) {
      setValue('resultado', 'Intermediate');
    }

    
  }
  return (
     // formulario con las opciones , al dar click dirige a la función OnSubmit()
    <div className="page-heading">
      <form onSubmit={handleSubmit(onSubmit)}>
        <center><h1>Tipo de Profesor</h1></center>
        <center><label>Seleccione del profesor ...</label></center>
        <label>*Edad</label>
        <select {...register('edad')}>
          <option value="1">Menor o igual a 30</option>
          <option value="2">Entre 30 y 55</option>
          <option value="3">Mayor a 55</option>
        </select>
        <br></br>
       <label>*Género</label>
        <select {...register('genero')}>
          <option value="F">F</option>
          <option value="M">M</option>
          <option value="NA">NA</option>
        </select>
        <br></br>
        <label>*Autoevaluación</label>
        <select {...register('autoevaluacion')}>
          <option value="B">Principiante</option>
          <option value="I">Intermedio</option>
          <option value="A">Avanzado</option>
        </select>
        <br></br>
        <label>*Veces que ha impartido el curso</label>
        <select {...register('vecesCurso')}>
          <option value="1">Nunca</option>
          <option value="2">1 a 5 veces</option>
          <option value="3">Más de 5 veces</option>
        </select>
        <br></br>
        <label>*Experiencia en : </label>
        <select {...register('experiencia')}>
          <option value="DM">Toma de decisiones</option>
          <option value="ND">Diseño de redes</option>
          <option value="O">Otro</option>
        </select>
        <br></br>
        <label>*Habilidad en computadora : </label>
        <select {...register('habcomputador')}>
          <option value="L">Baja</option>
          <option value="A">Promedio</option>
          <option value="H">Alta</option>
        </select>
        <br></br>
        <label>*Experiencia en tecnología web para enseñar : </label>
        <select {...register('expWeb')}>
          <option value="N">Nunca</option>
          <option value="S">A veces</option>
          <option value="O">A menudo</option>
        </select>
        <br></br>
        <label>*Experiencia usando sitios web: </label>
        <select {...register('expWebSite')}>
          <option value="N">Nunca</option>
          <option value="S">A veces</option>
          <option value="O">A menudo</option>
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

export default TipoProfesor;