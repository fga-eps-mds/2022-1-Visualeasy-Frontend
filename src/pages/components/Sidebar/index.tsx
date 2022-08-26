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
  Button,
  Grid,
  GridItem
} from "@chakra-ui/react";

import { AiOutlineClose } from 'react-icons/ai';

import FormGraph from "../FormGraph";
import Graph from "../Graph";
import { postAllData } from "../../api/api";
interface EnumServiceGetOrderBy {
  [index: number]: string;
}

interface dataFormProps {
  intervalo: number
  variavel: EnumServiceGetOrderBy[]
  startDate?: string
  endDate?: string
}

export default function Sidebar({ SidebarData }: any) {
  const [dataForm, setDataForm] = useState<dataFormProps>({
    intervalo: 0,
    variavel: []
  })
  const [dataForm1, setDataForm1] = useState<dataFormProps>({
    intervalo: 0,
    variavel: []
  })
  const [dataForm2, setDataForm2] = useState<dataFormProps>({
    intervalo: 0,
    variavel: []
  })
  const [dataForm3, setDataForm3] = useState<dataFormProps>({
    intervalo: 0,
    variavel: []
  })








  return (
    <Tabs isFitted defaultIndex={0} className="Tabs" variant='enclosed'>
      <Grid
        templateAreas={`"nav main"
                  "nav main"
                  "nav main"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'340px 1fr'}
        h="100vh"
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'

      >
        <GridItem pl='2' p={2} bg='#F6F6f6' area={'nav'}>
          <Box marginBottom="10px">
            <Center>
              <Image
                id="logo-retangular"
                src="images/logo-retangular.png"
                alt="Logo"
              />
            </Center>
          </Box>
          <TabList mb="1em">
            <Tab>
              Gráfico 1
            </Tab>
            <Tab>
              Gráfico 2
            </Tab>
            <Tab>
              Gráfico 3
            </Tab>
            <Tab>
              Gráfico 4
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FormGraph FormGraphProps={(e) => { setDataForm({ ...e }) }} />
            </TabPanel>
            <TabPanel>
              <FormGraph FormGraphProps={(e) => { setDataForm1({ ...e }) }} />
            </TabPanel>
            <TabPanel>
              <FormGraph FormGraphProps={(e) => { setDataForm2({ ...e }) }} />
            </TabPanel>
            <TabPanel>
              <FormGraph FormGraphProps={(e) => { setDataForm3({ ...e }) }} />
            </TabPanel>
          </TabPanels>
        </GridItem>



        <TabPanels>
          <TabPanel>
            <GridItem pl='2' area={'main'}>
              <Graph dataBase={dataForm} />
            </GridItem>
          </TabPanel>
          <TabPanel>
            <GridItem pl='2' area={'main'}>
              <Graph dataBase={dataForm1} />
            </GridItem>
          </TabPanel>
          <TabPanel>
            <GridItem pl='2' area={'main'}>
              <Graph dataBase={dataForm2} />
            </GridItem>
          </TabPanel>
          <TabPanel>
            <GridItem pl='2' area={'main'}>
              <Graph dataBase={dataForm3} />
            </GridItem>
          </TabPanel>
        </TabPanels>

      </Grid>
    </Tabs>
  );
};
