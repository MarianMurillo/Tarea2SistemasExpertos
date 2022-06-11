import React from "react";
import { useForm } from "react-hook-form";
let jsonData= require('../DataEstiloRecinto/ProbabilidadEstilos.json'); // arreglo con los datos existentes 
let jsonDataEC= require('../DataEstiloRecinto/ProbabilidadEC.json'); // arreglo con los datos existentes 
let jsonDataOR= require('../DataEstiloRecinto/ProbabilidadOR.json'); // arreglo con los datos existentes
let jsonDataCA= require('../DataEstiloRecinto/ProbabilidadCA.json'); // arreglo con los datos existentes  
let jsonDataEA= require('../DataEstiloRecinto/ProbabilidadEA.json'); // arreglo con los datos existentes 
let jsonDataCAEC= require('../DataEstiloRecinto/ProbabilidadCAEC.json'); // arreglo con los datos existentes 
let jsonDataEAOR= require('../DataEstiloRecinto/ProbabilidadEAOR.json'); // arreglo con los datos existentes 
function Test() {
  const {register,formState:{ errors }, handleSubmit , setValue }=useForm();
  const onSubmit = (datos) =>{
    
  
   var i=0;

   let ECd ='';
   let ECCo ='';
   let ECA ='';
   let ECAsi ='';

   let ORd ='';
   let ORCo ='';
   let ORA ='';
   let ORAsi ='';

   let CAd ='';
   let CACo ='';
   let CAA ='';
   let CAAsi ='';

   let EAd ='';
   let EACo ='';
   let EAA ='';
   let EAAsi ='';

   let CAECd ='';
   let CAECCo ='';
   let CAECA ='';
   let CAECAsi ='';

   let EAORd ='';
   let EAORCo ='';
   let EAORA ='';
   let EAORAsi ='';

   // datos es el objeto con las opciones que ingresó el usuario
   var ec = parseInt(datos.c5) +parseInt(datos.c9) +parseInt(datos.c13)  + parseInt(datos.c17) + parseInt(datos.c25) + parseInt(datos.c27);
   var or = parseInt(datos.c2) + parseInt(datos.c10)+ parseInt(datos.c22) + parseInt(datos.c26) + parseInt(datos.c30) + parseInt(datos.c34);
   var ca = parseInt(datos.c7) +parseInt(datos.c11)+ parseInt(datos.c15) + parseInt(datos.c19)+parseInt(datos.c31) + parseInt(datos.c31);
	var ea = parseInt(datos.c4)+ parseInt(datos.c12)+ parseInt(datos.c24) +parseInt( datos.c24) + parseInt(datos.c32) + parseInt(datos.c36);

	const caec = ca-ec;
   const eaor = ea-or;

   var ecS = ec.toString();
   var orS = or.toString();
   var caS = ca.toString();
   var eaS = ea.toString();

   var caecS = caec.toString();
   var eaorS = eaor.toString();
   // RECORRIENDO DATOS 
   // EC
   for(i=0; i<jsonDataEC.length;i++){
      
      if(jsonDataEC[i].EC===ecS){
          const valueS = jsonDataEC[i];
           ECd = valueS.DIVERGENTE;
           ECCo = valueS.CONVERGENTE;
           ECA = valueS.ACOMODADOR;
           ECAsi= valueS.ASIMILADOR;
      }
     
    }
  
   //OR
   for(i=0; i<jsonDataOR.length;i++){
      
      if(jsonDataOR[i].OR=== orS){
          const valueor = jsonDataOR[i];
           ORd = valueor.DIVERGENTE;
          ORCo = valueor.CONVERGENTE;
          ORA= valueor.ACOMODADOR;
          ORAsi= valueor.ASIMILADOR;
      }
     
    }

   //CA

   for(i=0; i<jsonDataCA.length;i++){
      
      if(jsonDataCA[i].CA=== caS){
          const valueoca =jsonDataCA[i];
           CAd= valueoca.DIVERGENTE;
          CACo= valueoca.CONVERGENTE;
          CAA= valueoca.ACOMODADOR;
          CAAsi= valueoca.ASIMILADOR;
      }
     
    }

   //EA
   for(i=0; i<jsonDataEA.length;i++){
      
      if(jsonDataEA[i].EA=== eaS){
          const valueoEA =jsonDataEA[i];
           EAd= valueoEA.DIVERGENTE;
          EACo= valueoEA.CONVERGENTE;
          EAA= valueoEA.ACOMODADOR;
          EAAsi= valueoEA.ASIMILADOR;
      }
     
    }
    
    //CAEC 
    for(i=0; i<jsonDataCAEC.length;i++){
      
      if(jsonDataCAEC[i]["CA-EC"]=== caecS){
          const valueocaec =jsonDataCAEC[i];
           CAECd= valueocaec.DIVERGENTE;
          CAECCo= valueocaec.CONVERGENTE;
          CAECA= valueocaec.ACOMODADOR;
          CAECAsi= valueocaec.ASIMILADOR;
      }
     
    }

    //EAOR
    for(i=0; i<jsonDataEAOR.length;i++){
      
      if(jsonDataEAOR[i]["EA-OR"]=== eaorS){
          const valueoeaor =jsonDataEAOR[i];
          EAORd= valueoeaor.DIVERGENTE;
          EAORCo= valueoeaor.CONVERGENTE;
          EAORA= valueoeaor.ACOMODADOR;
          EAORAsi=valueoeaor.ASIMILADOR;
      }
     
    }

    // PROBABILIDADES 
    const probabilidadD = ECd*ORd*CAd*EAd*CAECd*EAORd*jsonData[0].DIVERGENTE;
    const probabilidadCo= ECCo*ORCo*CACo*EACo*CAECCo*EAORCo*jsonData[0].CONVERGENTE;
    const probabilidadA = ECA*ORA*CAA*EAA*CAECA*EAORA*jsonData[0].ACOMODADOR;
    const probabilidadAsi = ECAsi*ORAsi*CAAsi*EAAsi*CAECAsi*EAORAsi*jsonData[0].ASIMILADOR;

    if(probabilidadD>probabilidadCo && probabilidadD>probabilidadA && probabilidadD>probabilidadAsi ){
      setValue('resultado', 'Divergente');
     } else if(probabilidadCo>probabilidadD && probabilidadCo>probabilidadA && probabilidadCo>probabilidadAsi ){
      setValue('resultado', 'Convergente');
     } if(probabilidadA>probabilidadCo && probabilidadA>probabilidadD && probabilidadA>probabilidadAsi ){
      setValue('resultado', 'Acomodador');
     } if(probabilidadAsi>probabilidadCo && probabilidadAsi>probabilidadA && probabilidadAsi>probabilidadD ){
      setValue('resultado', 'Asimilador');
     }else {
      setValue('resultado', 'Asimilador');
     }

    // RETORNO 
    
  }
  return (
    // formulario con las opciones , al dar click dirige a la función OnSubmit()
    <div className="page-heading">
      
      <form onSubmit={handleSubmit(onSubmit)}>
       <label> CUAL ES SU ESTILO DE APRENDIZAJE?</label>
       <p>Instrucciones: <br></br>
       Para utilizar el instrumento usted debe conceder una calificación alta a aquellas palabras que mejor caracterizan la forma en que usted aprende, y una calificación baja a las palabras que menos caracterizan su estilo de aprendizaje.
       <br></br>Le puede ser difícil seleccionar las palabras que mejor describen su estilo de aprendizaje, ya que no hay respuestas correctas o incorrectas.<br></br>Todas las respuestas son buenas, ya que el fin del instrumento es describir cómo y no juzgar su habilidad para aprender.
       <br></br>De inmediato encontrará nueve series o líneas de cuatro palabras cada una. Ordene de mayor a menor cada serie o juego de cuatro palabras que hay en cada línea, ubicando 4 en la palabra que mejor caracteriza su estilo de aprendizaje, un 3 en la palabra siguiente en cuanto a la correspondencia con su estilo; a la siguiente un 2, y un 1 a la palabra que menos caracteriza su estilo. Tenga cuidado de ubicar un número distinto al lado de cada palabra en la misma línea.</p>
       <br></br>
       <label>Yo aprendo...</label>
       <br></br>
       <table  border="1" cellpadding="2" cellspacing="2">
           <tbody>
             <tr>
               <td>
                   <select {...register('c1')}>
                       <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                   discerniendo<br></br>
                </td>
                <td>
                   <select {...register('c2')}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                   ensayando<br></br>
                </td>
                <td>
                   <select {...register('c3')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                   involucrándome<br></br>
                </td>
                <td>
                   <select {...register('c4')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                   practicando<br></br>
                </td>

              </tr>
              <tr>
               <td>
                   <select {...register('c5')}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                    receptivamente<br></br>
                </td>
                <td>
                   <select {...register('c6')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    relacionando<br></br>
                </td>
                <td>
                   <select {...register('c7')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    analíticamente<br></br>
                </td>
                <td>
                   <select {...register('c8')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    imparcialmente<br></br>
                </td>

              </tr>
              <tr>
               <td>
                   <select {...register('c9')}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                    sintiendo<br></br>
                </td>
                <td>
                   <select {...register('c10')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    observando<br></br>
                </td>
                <td>
                   <select {...register('c11')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    pensando<br></br>
                </td>
                <td>
                   <select {...register('c12')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    haciendo<br></br>
                </td>

              </tr>
              <tr>
               <td>
                   <select {...register('c13')}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                    aceptando<br></br>
                </td>
                <td>
                   <select {...register('c14')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    arriesgando<br></br>
                </td>
                <td>
                   <select {...register('c15')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    evaluando<br></br>
                </td>
                <td>
                   <select {...register('c16')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    con cautela<br></br>
                </td>

              </tr>
              <tr>
               <td>
                   <select {...register('c17')}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                    intuitivamente<br></br>
                </td>
                <td>
                   <select {...register('c18')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    productivamente<br></br>
                </td>
                <td>
                   <select {...register('c19')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    lógicamente<br></br>
                </td>
                <td>
                   <select {...register('c20')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    cuestionando<br></br>
                </td>

              </tr>
              <tr>
               <td>
                   <select {...register('c21')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    abstracto<br></br>
                </td>
                <td>
                   <select {...register('c22')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    observando<br></br>
                </td>
                <td>
                   <select {...register('c23')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    concreto<br></br>
                </td>
                <td>
                   <select {...register('c24')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    activo<br></br>
                </td>

              </tr>
              
              <tr>
               <td>
                   <select {...register('c25')}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                    orientado al presente<br></br>
                </td>
                <td>
                   <select {...register('c26')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    reflexivamente<br></br>
                </td>
                <td>
                   <select {...register('c27')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    orientado hacia el futuro<br></br>
                </td>
                <td>
                   <select {...register('c28')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    pragmático<br></br>
                </td>

              </tr>
              <tr>
               <td>
                   <select {...register('c29')}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                    aprendo más de la experiencia<br></br>
                </td>
                <td>
                   <select {...register('c30')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    aprendo más de la observación<br></br>
                </td>
                <td>
                   <select {...register('c31')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    aprendo más de la conceptualización<br></br>
                </td>
                <td>
                   <select {...register('c32')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    aprendo más de la experimentación<br></br>
                </td>

              </tr>
              <tr>
               <td>
                   <select {...register('c33')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    emotivo<br></br>
                </td>
                <td>
                   <select {...register('c34')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    reservado<br></br>
                </td>
                <td>
                   <select {...register('c35')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    racional<br></br>
                </td>
                <td>
                   <select {...register('c36')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    abierto<br></br>
                </td>

              </tr>
        
            </tbody>
         </table>
          <br></br>
          <button > Calcular </button>
            <label>Estudiante Estilo: </label><textarea placeholder="Resultado encontrado"  readOnly {...register('resultado')}></textarea>
       </form>
      
         <br></br>
    </div>
  );
}

export default Test;