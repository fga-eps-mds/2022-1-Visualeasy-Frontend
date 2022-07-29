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
  Center
} from "@chakra-ui/react";

import FormGraph from "../FormGraph";

export default function Sidebar() {
  return (

    <VStack align='stretch'>
      <Box marginBottom="10px">
        <Center>

          <Image
            boxSize="150px"
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
            <FormGraph />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
