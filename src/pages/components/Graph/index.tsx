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

import { BiSelectMultiple } from 'react-icons/bi';

import { Button, Checkbox, CheckboxGroup, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react'

import { CSVLink } from 'react-csv';

import { Line } from 'react-chartjs-2';

import {Box} from '@chakra-ui/react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// constante temporária p/ escolha dos gráficos
const tabs = [
  {
    id: '1',
    titulo: 'Gráfico 1',
    variaveis: [
      'Charmander',
      'Pikachu'
    ],
    intervalo: 3
  },
  {
    id: '2',
    titulo: 'Gráfico 2',
    variaveis: [
      'Squirtle'
    ],
    intervalo: 5,
    startDate: '2022-08-23T01:43',
    endDate: '2022-08-24T01:43'
  },
  {
    id: '3',
    titulo: 'Gráfico 3',
    variaveis: [
      'Bulbassauro',
      'Charmander'
    ],
    intervalo: 2
  }
];

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Graph(dataBase) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    type:'line',
   
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
    let dformat = d.toLocaleString('pt-BR').replace(/\D/g, '');
    return `${dformat}`;
  }
    
  return (
      
      <Box height='400px' w='100%'>
        <Line className='Grafico' data={data} options={options} />
        
        {dataBase.dataBase.variavels && 
          <CSVLink
            data={dataBase.dataBase.variavels}
            filename={getFileName()}
            target='_blank'
            separator={';'}> 
            <IconButton 
              aria-label='download'
              size='sm' 
              icon={<FiDownload />} 
              variant='outline'
            />
          </CSVLink>}
          
          <IconButton 
            aria-label='expand' 
            icon={<BiSelectMultiple />} 
            variant='outline'
            size='sm'
            onClick={onOpen}
            />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Selecione os gráficos que deseja visualizar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CheckboxGroup defaultValue={tabs.map(tab => tab.id)}>
                  <Stack spacing={[1, 5]} direction={['column']}>
                    {
                      tabs.map(tab => {
                        return <Checkbox value={tab.id}>{tab.titulo}</Checkbox>
                      })
                    }
                  </Stack>
                </CheckboxGroup>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </Box>
    );
  };

  