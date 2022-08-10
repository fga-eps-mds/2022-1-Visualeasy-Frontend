import React, { useEffect } from "react";
import {

  Image,
  Box,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center
} from "@chakra-ui/react";

import FormGraph from "../FormGraph";

import logo from './../../../public/logo-retangular.png';

export default function Sidebar() {

  return (

    <VStack align='stretch'>
      <Box marginBottom="10px">
        <Center>
          <Image
            id="logo-retangular"
            src="images/logo-retangular.png"
            alt="Logo"
          />
        </Center>
      </Box>
      <Tabs  className="Tabs" variant='enclosed'>
        <TabList>
          <Tab>Gráfico 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormGraph />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
