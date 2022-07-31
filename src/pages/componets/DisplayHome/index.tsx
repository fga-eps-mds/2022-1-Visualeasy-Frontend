import React from "react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import Sidebar from "../Sidbar";
import Graph from "../Graph";
// import Chart from "./componetes/Charts";
// import FooterChart from "./componetes/FooterCharts";
export default function DisplayHome() {
  return (
    <Grid
      minH="100vh"
      h="100%"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}
    >
      <GridItem padding="5px" rowSpan={2} colSpan={1} bg="#F6F6F6">
        <Sidebar/>
      </GridItem>
      <GridItem h="100%" colSpan={4}>
        <HStack w="100%" h="100%" align="start">
          <Graph/>
        </HStack>
      </GridItem>

      <GridItem h="70px" colSpan={4} bg="tomato">
        <HStack h="100%">{/* <FooterChart /> */}</HStack>
      </GridItem>
    </Grid>
  );
};
