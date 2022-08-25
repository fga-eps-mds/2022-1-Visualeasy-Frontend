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

  useEffect( () => {
    const geraDadosGraficos = async () => {
      let listaRecebida = [];

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
        }

        const dados = response.variavels.map((element:any)=> { return {data:element.date, valor:Number(element.valor)} })
        const linhaTempo = response.variavels.map((element:any)=>element.date)
    
        const dataset = {
          label: dataForm.dataForm.variavel[i],
          data: dados,
          lineTension: 0.5,
          backgroundColor: `${getRandomColor()}`,
        }
    
        listaRecebida.push(dataset);
      }
      setListaVariaveis(listaRecebida);
    }
    
    geraDadosGraficos()
  }, [dataForm] )

  const data = {
    datasets: listaVariaveis,
  };
  console.log("DATA", listaVariaveis)
  const options = {
    type: "line",
    bezierCurve: false,
    parsing: {xAxisKey: 'data', yAxisKey:'valor'},
    elements: {
      line: {
        tension: 0.1,
        fill:true
      }
    },
  }
  return (
    <Box height="400px" w="100%">
      <Line className='Grafico' data={data} options={options} />
    </Box>
  );
};