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

import { FiDownload } from 'react-icons/fi';

import { IconButton } from '@chakra-ui/react'

import { CSVLink } from "react-csv";

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

  
  const getFileName = () => {
    let d = new Date();
    let dformat = d.toLocaleString('pt-BR').replace(/\D/g, "");
    return `${dformat}`;
  }
    
  return (
      
      <Box height="400px" w="100%">
        <Line className='Grafico' data={data} options={options} />
        
        {dataBase.dataBase.variavels && 
          <CSVLink
            data={dataBase.dataBase.variavels}
            filename={getFileName()}
            target="_blank"
            separator={";"}> 
            <IconButton 
              aria-label='download'
              size="sm" 
              icon={<FiDownload />} 
              variant='outline'
            />    
          </CSVLink>}     
      </Box>
    );
  };

  