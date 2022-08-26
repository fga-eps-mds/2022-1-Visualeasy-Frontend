import React, { useState } from "react";
import {

  Image,
  Box,

  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,

  Grid,
  GridItem,
  CloseButton
} from "@chakra-ui/react";


import FormGraph from "../FormGraph";
import FormGraphinfo from "../FormShowInfo";

import Graph from "../Graph";
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


  const [postList, setPostList] = useState([]);


  const addPostlist = (postitem) => setPostList([...postList, postitem]);


  function deletPostList(deletitem) {
    var filtered =  postList.filter((e)=>(e.id!==deletitem))
    setPostList(filtered)
   // setPostList(postList.filter((e) => { e.id !== deletitem }));
  }


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
          </Box >
          <TabList  mb="1em" overflowY="hidden" overflowX="auto" >
            <Tab>
              Gráfico 1
            </Tab>
            {
              postList.map((e, index) => (
                <Tab key={index}>
                  {e.graphName}
                  <CloseButton size='sm' onClick={() => { deletPostList(e.id) }} />
                </Tab>
              ))

            }
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormGraph FormGraphProps={addPostlist} disablebutton />
            </TabPanel>
            {postList.map((e,index) => (
              <TabPanel key={index}>
                <FormGraphinfo getDataFrom={e} />
              </TabPanel>
            ))}
          </TabPanels>
        </GridItem>
        <TabPanels>

          <TabPanel>
            <GridItem pl='2' area={'main'}>
              <Graph dataBase={dataForm} />
            </GridItem>
          </TabPanel>
          {postList.map((e, index) => (
            <TabPanel key={index}>
              <GridItem pl='2' area={'main'}>
                <Graph dataBase={e} />
              </GridItem>
            </TabPanel>
          ))
          }

        </TabPanels>

      </Grid>
    </Tabs>
  );
};
