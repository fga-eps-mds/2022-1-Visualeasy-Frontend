import React, { useEffect, useState, useCallback, useRef } from 'react';
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

import { Box, IconButton, Image, Stack } from "@chakra-ui/react";

import zoomPlugin from "chartjs-plugin-zoom";

import { postAllData } from "../../api/api";

ChartJS.register(
  zoomPlugin,
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

export default function Graph({ dataForm }: any) {

  const ref = useRef();
  const [listaVariaveis, setListaVariaveis] = useState([{}]);
  const [listaDados, setListaDados] = useState([{}]);


  useEffect(() => {
    const geraDadosGraficos = async () => {
      let listaRecebida = [];
      let listaDados = [];

      for (let i = 0; i < dataForm.variavel.length; i++) {
        let response;

        const bodyRequest = {
          variavel: dataForm.variavel[i],
          intervalo: dataForm.intervalo,
          startDate: dataForm.startDate,
          endDate: dataForm.endDate,
          granularity: dataForm.granularity
        };

        if (dataForm.intervalo !== 5) {
          response = await postAllData("filteredByPeriod", bodyRequest)
        } else {
          response = await postAllData("filtered", bodyRequest)
        }

        const dados = response.variavels.map((element: any) => { return {nome: dataForm.variavel[i], data: element.date, valor: Number(element.valor) } })
        const dataset = {
          label: dataForm.variavel[i],
          data: dados,
          lineTension: 0.5,
          backgroundColor: `${getRandomColor()}`,
        }

        //for-of para gerar os dados para o csv
        for (const element of dados) {
          listaDados.push([element.nome, element.data, element.valor]);
        }

        listaRecebida.push(dataset);

      }
      setListaVariaveis(listaRecebida);
      setListaDados(listaDados);
    }

    geraDadosGraficos()
  }, [dataForm])

  const data = {
    datasets: listaVariaveis,
  };
  console.log(data);
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
    parsing: { xAxisKey: 'data', yAxisKey: 'valor' },
    elements: {
      line: {
        tension: 0.1,
        fill: true
      }
    },
    plugins: {
      zoom: {
          zoom: {
              wheel: {
                  enabled: true,
              },
              mode: 'xy'
          },
          pan: {
              enabled: true,
              mode: 'xy'
          }
      },
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
          _hover={{ bg: "#b3b3cc"}}
          placeholder='Download'
          onClick={downloadImage}
        >
          <Image
            objectFit='cover' id='screenshot-icon' src='images/screenshot-icon.svg' />
        </Box>

          <CSVLink
            data={listaDados || []}
            filename={getFileName()}
            target="_blank"
            separator={";"}>
            <IconButton
              aria-label='download'
              borderColor="#000000"
              border="1px"
              _hover={{ bg: "#b3b3cc"}}
              size="md"
              icon={<FiDownload />}
              variant='outline'
            />
          </CSVLink>
      </Stack>
    </Box>
  );
};

