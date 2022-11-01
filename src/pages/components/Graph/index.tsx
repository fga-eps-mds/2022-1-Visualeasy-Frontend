import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';

import absoluteUrl from 'next-absolute-url'

import { ptBR } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import { FiDownload } from 'react-icons/fi';

import { AiOutlineShareAlt } from 'react-icons/ai';

import { CSVLink } from "react-csv";

import { Line } from 'react-chartjs-2';

import { Box, IconButton, Image, Stack, useClipboard } from "@chakra-ui/react";

import zoomPlugin from "chartjs-plugin-zoom";

import { postAllData } from "../../api/api";

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  TimeScale,
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
  const array = new Uint16Array(6);
  const random = crypto.getRandomValues(array)
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(random[i] / 100000 * 16)];
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

        const dados = response.variavels.map((element: any) => {
          let dat = element.date.split(' ');
          dat[0] = dat[0].split('-').reverse().join('-');
          if (dat[1]) {
            dat[1] = dat[1].split(':');
            if (!dat[1][1]) {
              dat[1].push('00')
            }
            dat[1] = dat[1].join(':');
          }
          const res = dat.join(' ');
          return {
            nome: dataForm.variavel[i],
            data: Date.parse(res),
            valor: Number(element.valor)
          }
        })
        const dataset = {
          label: dataForm.variavel[i],
          data: dados,
          lineTension: 0.5,
          backgroundColor: `${getRandomColor()}`,
        }

        for (const element of dados) {
          let dataCsv;
          if (dataForm.granularity === 'second') {
            dataCsv = format(new Date(element.data), 'dd-MM-yyyy hh:mm:ss');
          } else if (dataForm.granularity === 'minute' || dataForm.granularity === 'hour') {
            dataCsv = format(new Date(element.data), 'dd-MM-yyyy hh:mm');
          } else if (dataForm.granularity === 'day') {
            dataCsv = format(new Date(element.data), 'dd-MM-yyyy');
          } else if (dataForm.granularity === 'month') {
            dataCsv = format(new Date(element.data), 'MM-yyyy');
          } else if (dataForm.granularity === 'year') {
            dataCsv = format(new Date(element.data), 'yyyy');
          } else {
            dataCsv = element.data;
          }
          listaDados.push([element.nome, dataCsv, element.valor]);
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
    scales: {
      xAxis: {
        type: 'time',
        time: {
          unit: dataForm.granularity,
          displayFormats: {
            'second': 'dd-MM-yyyy hh:mm:ss',
            'minute': 'dd-MM-yyyy hh:mm',
            'hour': 'dd-MM-yyyy hh',
            'day': 'dd-MM-yyyy',
            'month': 'MM-yyyy',
          }
        }
      }
    },
    adapters: {
      date: {
        locale: ptBR
      }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: 'x'
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
    let dformat = d.toLocaleString('pt-BR').replace(/\D/g, '');
    return `${dformat}`;
  }

  let params = new URLSearchParams(dataForm).toString();
  const { origin } = absoluteUrl()
  const apiURL = `${origin}?${params}`


  const [value, setValue] = React.useState(apiURL);
  const { hasCopied, onCopy } = useClipboard(value)

  function copiaLink() {
    alert("Link copiado com sucesso!");
    onCopy();
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
          _hover={{ bg: "#b3b3cc" }}
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
            _hover={{ bg: "#b3b3cc" }}
            size="md"
            icon={<FiDownload />}
            variant='outline'
          />
        </CSVLink>


        <IconButton
          aria-label='compartilhar'
          borderColor="#000000"
          border="1px"
          _hover={{ bg: "#b3b3cc" }}
          size="md"
          icon={<AiOutlineShareAlt />}
          variant='outline'
          onClick={copiaLink}
        ></IconButton>
      </Stack>
    </Box>
  );
}

