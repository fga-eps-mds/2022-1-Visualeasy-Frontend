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
  CloseButton,

  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader,
  ModalOverlay,
  Stack,
  
  Checkbox,
  CheckboxGroup,
  Button,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";

import { BiSelectMultiple } from 'react-icons/bi';

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

  const [ displayedGraphs, setDisplayedGraphs ] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [postList, setPostList] = useState([]);


  const addPostlist = (postitem) => {
    postitem.show = true;
    setPostList([...postList, postitem]);
  }

  function deletPostList(deletitem) {
    var filtered = postList.filter((e) => (e.id !== deletitem))
    setPostList(filtered)
    // setPostList(postList.filter((e) => { e.id !== deletitem }));
  }

  const confirmarGraficos = () => {
    postList.forEach(postItem => {
      if(displayedGraphs.includes(postItem.id)) {
        postItem.show = true;
      } else {
        postItem.show = false;
      }
    });
    onClose();
  }

  return (
    <div>

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
          <TabList mb="1em" overflowY="hidden" overflowX="auto" >
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
            {postList.map((e, index) => (
              <TabPanel key={index}>
                <FormGraphinfo getDataFrom={e} />
                  <IconButton 
                    aria-label='expand' 
                    icon={<BiSelectMultiple />} 
                    variant='outline'
                    size='sm'
                    onClick={onOpen}
                    />
              </TabPanel>
            ))}
          </TabPanels>
        </GridItem>

        <TabPanels>
          <TabPanel>
            <GridItem pl='2' area={'main'}>
                {/* <Graph dataBase={dataForm} /> */}
            </GridItem>
          </TabPanel>
            {postList.map((e, index) => {
            if (e.show) {
              return (
                  <GridItem key={index} height="650px">
                    <h3 align="center">{e.graphName}</h3>
                    <Graph dataForm={e} postList={postList} />
                  </GridItem>
                )
              } else {
                return (
                  <div key={index}></div>
                )
              }
            })
            }

          </TabPanels>
        </Grid>
      </Tabs >

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecione os gráficos que deseja visualizar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Stack spacing={[1, 5]} direction={['column']}>
                {
                  postList.map((postItem) => {
                    return <Checkbox onChange={(e) => setDisplayedGraphs(
                      displayedGraphs.includes(postItem.id) ? 
                      displayedGraphs.filter((data, idx) => idx !== displayedGraphs.indexOf(postItem.id)) :
                      [...displayedGraphs, postItem.id]
                      )} value={postItem.id} key={postItem.id} isChecked={displayedGraphs.includes(postItem.id)}>{postItem.graphName}</Checkbox>
                  })
                }
            </Stack>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={confirmarGraficos} >
              Confirmar
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
