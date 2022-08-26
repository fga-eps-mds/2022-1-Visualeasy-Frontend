import React, { useEffect, useState , useCallback, useRef } from 'react';
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
  const ref= useRef();
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
    parsing: {xAxisKey: 'data', yAxisKey:'valor'},
    elements: {
      line: {
        tension: 0.1,
        fill:true
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
        {/* {listaVariaveis[0].data &&
          <CSVLink
            data={listaVariaveis[0].data}
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

