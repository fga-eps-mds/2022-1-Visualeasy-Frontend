import React from "react";
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

import RatioSelect from "../RatioTimeChart/Index";

export default function Sidebar({SidebarData}:any) {
  
  return (

    <VStack align='stretch'w="340px">
      <Box marginBottom="10px">
        <Center>
          <Image
            id="logo-retangular"
            src="https://bit.ly/dan-abramov"
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
            <FormGraph FormGraphProps={(e)=>{SidebarData({...e})}} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
