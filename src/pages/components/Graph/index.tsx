import React from 'react';
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

import { Button } from '@chakra-ui/react'

import { CSVLink, CSVDownload } from "react-csv";

import { Line } from 'react-chartjs-2';

import {Box} from "@chakra-ui/react"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Graph(dataBase) {
   const data = {
    datasets: [
      {
        label: 'Dataset 1',
        data: dataBase.dataBase.variavels,
        lineTension: 0.5,  
        backgroundColor: `${getRandomColor()}`,
      },

    ],
  };
  const options = {
    type:"line",
   
    bezierCurve : false,
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
        
        <CSVLink
          data={dataBase.dataBase.variavels || ""}
          filename="results.csv"
          target="_blank"
          > <Button colorScheme='red' size='sm' > Baixar CSV </Button>    
        </CSVLink>
        
      </Box>
    );
  };

  