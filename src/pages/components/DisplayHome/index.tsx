import React, { useState } from "react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import Graph from "../Graph";
interface EnumServiceGetOrderBy {
  [index: number]: string;
}

interface dataFormProps {
  intervalo:number
  variavel:EnumServiceGetOrderBy[]
  startDate?:string
  endDate?:string
}

export default function DisplayHome() {
  const [dataForm, setDataForm] = useState<dataFormProps>({
    intervalo:0,
    variavel:[]
  })
  
  return (
    <Grid
      minH="100vh"
      h="100%"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}
    >
      <GridItem padding="5px" rowSpan={2} colSpan={1} bg="#F6F6F6">
        <Sidebar SidebarData={(e)=>{setDataForm(e)}}/>
      </GridItem>
      <GridItem h="100%" colSpan={4}>
        <HStack w="100%" h="100%" align="start">
          <Graph dataForm={dataForm}/>
        </HStack>
      </GridItem>

      {/* <GridItem h="70px" colSpan={4} bg="tomato">
        <HStack h="100%"></HStack>
      </GridItem> */}
    </Grid>
  );
};
