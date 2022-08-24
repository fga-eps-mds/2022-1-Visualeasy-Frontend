import React, { useEffect, useState } from "react";
import {

  Image,
  Box,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  Button
} from "@chakra-ui/react";

import { AiOutlineClose } from 'react-icons/ai';

import FormGraph from "../FormGraph";

export default function Sidebar({ SidebarData }: any) {
  const [numTabs, setNumTabs] = useState(1);
  const [mostrarSegundaAba, setMostrarSegundaAba] = useState(false);
  const [mostrarTerceiraAba, setMostrarTerceiraAba] = useState(false);
  const [mostrarQuartaAba, setMostrarQuartaAba] = useState(false);

  useEffect(() => {
    console.log(numTabs);
  }, [numTabs])

  function addTab() {
    if (numTabs === 1) {
      setMostrarSegundaAba(true);
    } else if (numTabs === 2) {
      setMostrarTerceiraAba(true);
    } else if (numTabs === 3) {
      setMostrarQuartaAba(true);
    }

    if (numTabs <= 4) {
      setNumTabs(numTabs + 1);
    }
  }

  function renderNewTab() {
    console.log("new tab")
    return (
      <Tab>
        Gráfico 1
        {numTabs === 1 ?
          <div></div>
          :
          <Button onClick={() => setNumTabs(numTabs - 1)} size="sm">
            <AiOutlineClose />
          </Button>
        }
      </Tab>
    );
  }

  return (

    <VStack align='stretch' w="340px">
      <Box marginBottom="10px">
        <Center>
          <Image
            id="logo-retangular"
            src="images/logo-retangular.png"
            alt="Logo"
          />
        </Center>
      </Box>
      <Tabs isFitted defaultIndex={0} className="Tabs" variant='enclosed'>
        <TabList mb="1em">
          <Tab>
            Gráfico 1
            {numTabs === 1 ?
              <div></div>
              :
              <Button onClick={() => setNumTabs(numTabs - 1)} size="sm">
                <AiOutlineClose />
              </Button>
            }
          </Tab>

          {
            mostrarSegundaAba ?
              <Tab>
                Gráfico 2
                {
                  numTabs === 1 ?
                    <div></div>
                    :
                    <Button onClick={() => { setNumTabs(numTabs - 1); setMostrarSegundaAba(false) }} size="sm">
                      <AiOutlineClose />
                    </Button>
                }
              </Tab>
              :
              <div></div>
          }

          {
            mostrarTerceiraAba ?
              <Tab>
                Gráfico 3
                {
                  numTabs === 1 ?
                    <div></div>
                    :
                    <Button onClick={() => { setNumTabs(numTabs - 1); setMostrarTerceiraAba(false) }} size="sm">
                      <AiOutlineClose />
                    </Button>
                }
              </Tab>
              :
              <div></div>
          }

          {
            mostrarQuartaAba ?
              <Tab>
                Gráfico 4
                {
                  numTabs === 1 ?
                    <div></div>
                    :
                    <Button onClick={() => { setNumTabs(numTabs - 1); setMostrarQuartaAba(false) }} size="sm">
                      <AiOutlineClose />
                    </Button>
                }
              </Tab>
              :
              <div></div>
          }
          <Button colorScheme='red' size='md' onClick={addTab}> + </Button>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FormGraph FormGraphProps={(e) => { SidebarData({ ...e }) }} />
          </TabPanel>

          {
            mostrarSegundaAba ?
              <TabPanel>
                <FormGraph FormGraphProps={(e) => { SidebarData({ ...e }) }} />
              </TabPanel>
              :
              <div></div>
          }

          {
            mostrarTerceiraAba ?
              <TabPanel>
                <FormGraph FormGraphProps={(e) => { SidebarData({ ...e }) }} />
              </TabPanel>
              :
              <div></div>
          }

          {
            mostrarQuartaAba ?
              <TabPanel>
                <FormGraph FormGraphProps={(e) => { SidebarData({ ...e }) }} />
              </TabPanel>
              :
              <div></div>
          }
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
