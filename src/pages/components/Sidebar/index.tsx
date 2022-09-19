import React, { useState, useEffect } from "react";
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
  Button,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";

import { BiSelectMultiple, BiWindow } from 'react-icons/bi';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import dynamic from 'next/dynamic'

import FormGraph from "../FormGraph";
import FormGraphinfo from "../FormShowInfo";

interface EnumServiceGetOrderBy {
  [index: number]: string;
}

const Graph = dynamic(
  () => import('../Graph'),
  { ssr: false }
)


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

  const [displayedGraphs, setDisplayedGraphs] = useState([]);
  const [currentGraph, setCurrentGraph] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSidebar, setShowSidebar] = useState('block')
  const [templateColumns, setTemplateColumns] = useState('27vw 70vw')

  const [postList, setPostList] = useState([]);


  const addPostlist = (postitem) => {
    postitem.show = true;
    setPostList([...postList, postitem]);

  }


  useEffect(() => {
    if (SidebarData) {

      setPostList([SidebarData])
    }
  }, [SidebarData])

  function deletPostList(deletitem) {
    var filtered = postList.filter((e) => (e.id !== deletitem))
    setPostList(filtered)
  }

  const confirmarGraficos = () => {

    postList.forEach(postItem => {
      if (displayedGraphs.includes(postItem.id)) {
        postItem.show = true;
      } else {
        postItem.show = false;
      }
    });
    onClose();
    setCurrentGraph([]);
  }


  const handleClickSidebar = () => {
    showSidebar === 'block' ?
      (
        setShowSidebar('none'),
        setTemplateColumns('90vw 5vw')
      ) :
      (
        setShowSidebar('block'),
        setTemplateColumns('27vw 70vw')
      )
  }


  return (
    <div>

      <Tabs isFitted defaultIndex={0} className="Tabs" variant='enclosed'>
        <Grid
          templateAreas={`"nav main"
                  "nav main"
                  "nav main"`}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={templateColumns}
          h="100vh"
          gap='1'
          color='blackAlpha.700'
          fontWeight='bold'

        >
          <GridItem display={showSidebar} pl='2' p={2} bg='#F6F6f6' area={'nav'}>
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
                  <Tab key={index} onClick={() => { setCurrentGraph(e.id) }}>
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
                    title='abre-modal'
                    size='lg'
                    onClick={onOpen}
                  />
                  <IconButton
                    aria-label='expand'
                    icon={<BiWindow />}
                    variant='outline'
                    size='lg'
                    title='fecha-multi-graficos'
                    onClick={() => { setCurrentGraph(e.id) }}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </GridItem>
          <TabPanels>

            <TabPanel>
              <GridItem pl='2' area={'main'}>
              </GridItem>
            </TabPanel>
            {
              postList.map((e, index) => {
                if (currentGraph.length != 0) {
                  if (e.id == currentGraph) {
                    return (
                      <GridItem key={index} height="650px">
                        <h3 align="center">{e.graphName}</h3>
                        <>
                          <Graph dataForm={e} postList={postList} />

                          <IconButton
                            aria-label={"expand-graph"}
                            icon={(showSidebar === 'block') ? <AiFillCaretLeft /> : <AiFillCaretRight />}
                            size='sm'
                            marginLeft='0px'
                            bottom='15vh'
                            backgroundColor='transparent'
                            onClick={handleClickSidebar} />
                        </>
                      </GridItem>
                    )
                  }
                  else {
                    return (
                      <div key={index}></div>
                    )
                  }
                }
                else if (e.show) {
                  return (
                    <GridItem key={index} height="650px">
                      <h3 align="center">{e.graphName}</h3>
                      <>
                        <Graph dataForm={e} postList={postList} />

                        <IconButton
                          aria-label={"expand-graph"}
                          icon={(showSidebar === 'block') ? <AiFillCaretLeft /> : <AiFillCaretRight />}
                          size='sm'
                          marginLeft='0px'
                          bottom='15vh'
                          backgroundColor='transparent'
                          onClick={handleClickSidebar} />
                      </>
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
