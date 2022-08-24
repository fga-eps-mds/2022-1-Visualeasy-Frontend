import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';

import { Line } from 'react-chartjs-2';

import { Box } from "@chakra-ui/react"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { postAllData } from "../../api/api";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Graph(dataForm:any) {

  const [ listaVariaveis, setListaVariaveis ] = useState([{}]);
  const [xAxis, setXAxis] = useState([''])

  useEffect( () => {
    const geraDadosGraficos = async () => {

      setXAxis([])
      let listaRecebida = [];
      let linhaTempoTotal:any = [];

      for( let i = 0; i < dataForm.dataForm.variavel.length; i++ ) {
    
        let response;

        const bodyRequest = {
          variavel: dataForm.dataForm.variavel[i],
          intervalo: dataForm.dataForm.intervalo,
          startDate: dataForm.dataForm.startDate,
          endDate: dataForm.dataForm.endDate,
          granularity: dataForm.dataForm.granularity
        };
    
        if (dataForm.dataForm.intervalo!==5) {
          response = await postAllData("filteredByPeriod", bodyRequest)
        } else {
          response = await postAllData("filtered", bodyRequest)
          //console.log("RESPOSTA DA REQ", response)
        }

        const dados = response.variavels.map((element:any)=> element.valor)
        const linhaTempo = response.variavels.map((element:any)=>element.date)
        //console.error(`Tamanho TIMELINE ${dataForm.dataForm.variavel[i]}: ${linhaTempo.length}`)
    
        const dataset = {
          label: dataForm.dataForm.variavel[i],
          data: dados,
          lineTension: 0.5,
          backgroundColor: `${getRandomColor()}`,
        }
    
        listaRecebida.push(dataset);
        
        linhaTempo.forEach((element:any)=>{
          //console.log("Valor da linha do tempo", element)
          //console.log("Valor da xAxis", xAxis[index])
          if(!linhaTempoTotal.includes(element)){
            //console.log("Entrou")
            linhaTempoTotal.push(element)
            //setXAxis([...xAxis, element])
          }
        })
        console.error(`Tamanho TIMELINE TOTAL: ${xAxis.length}`)
      }
      console.log("Linha tempo total", linhaTempoTotal);
      setListaVariaveis(listaRecebida);
      setXAxis(linhaTempoTotal)
      //console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ",xAxis)
    }
    
    geraDadosGraficos()
    //console.log("Todos os dados", listaVariaveis)
  }, [dataForm] )

  //console.log("AXIOS", xAxis)

  const data = {
    datasets: listaVariaveis,
    labels: xAxis
  };
  //console.log("DATA", data)
  const options = {
    type: "line",

    bezierCurve: false,
    parsing: {
      xAxisKey: 'data',
      yAxisKey: 'valor'
    },
    elements: {
      line: {
        tension: 0
      }
    },
  }
  return (
    <Box height="400px" w="100%">
      <Line className='Grafico' data={data} options={options} />
    </Box>
  );
};