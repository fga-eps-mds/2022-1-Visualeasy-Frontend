import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import { CSVLink } from "react-csv";

import { Line } from 'react-chartjs-2';

import { Box, IconButton, Image, Stack } from "@chakra-ui/react"
import { postAllData } from '../../api/api';
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


interface EnumServiceGetOrderBy {
  [index: number]: string;
}

interface dataFormProps {
  intervalo: number
  variavel: EnumServiceGetOrderBy[]
  startDate?: string
  endDate?: string
}


export default function Graph({dataBase}) {
  const [database, setDatabase] = useState([])
  const [dataForm, setDataForm] = useState<dataFormProps>({
    intervalo: 0,
    variavel: []
  })

  useEffect(() => {
   
    async function getData() {
      let teste
      const userData = {
        variavel: dataBase["variavel"],
        intervalo: dataBase.intervalo,
        startDate: '2022-06-30T06:18:50',
        endDate: '2022-06-30T06:26:14'
      };
      if (dataBase.intervalo !== 5) {
        teste = await postAllData("filteredByPeriod", userData)
      } else {
        teste = await postAllData("filtered", userData)
      }
console.log("grafico",teste)


      setDatabase(teste)
    }

    getData(dataForm)
  }, [dataBase])
  // =======================
  const ref = useRef();
  const data = {
    datasets: [
      {
        label: 'Dataset 1',
        data: database.variavels,
        lineTension: 0.5,
        backgroundColor: `${getRandomColor()}`,

      },

    ],
  };
  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);


  const plugin = {
    beforeDraw: (chartCtx) => {
      const ctx = chartCtx.canvas.getContext('2d');
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, chartCtx.width, chartCtx.height);
      ctx.restore();
    }
  };
  
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

  const getFileName = () => {
    let d = new Date();
    let dformat = d.toLocaleString('pt-BR').replace(/\D/g, "");
    return `${dformat}`;
  }

  return (

    <Box height="400px" w="100%">
      <Line plugins={[plugin]} ref={ref} className='Grafico' data={data} options={options} />
      <Stack borderRadius="5px" border="1px" p="5px" marginTop="1.5rem" direction='row' spacing={5}>
        <Box as='button'
          borderColor="#FFFFFF"
          border="1px"
          borderRadius='md'
          w='40px'
          h='40px'
          placeholder='Download'
          onClick={downloadImage}
        >
          <Image
            objectFit='cover' id='screenshot-icon' src='images/screenshot-icon.svg' />
        </Box>
        {/* {dataBase.dataBase.variavels &&
          <CSVLink
            data={dataBase.dataBase.variavels}
            filename={getFileName()}
            target="_blank"
            separator={";"}>
            <IconButton
              aria-label='download'
              size="md"
              icon={<FiDownload />}
              variant='outline'
            />
          </CSVLink>} */}
      </Stack>
    </Box>
  );
};

