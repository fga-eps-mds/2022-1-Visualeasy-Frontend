import React, { useEffect, useState } from "react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import Graph from "../Graph";
import { postAllData } from "../../api/api";
// import Chart from "./componetes/Charts";
// import FooterChart from "./componetes/FooterCharts";

// var rows = [];
// for (var i = 0; i < numrows; i++) {
//     rows.push(ObjectRow());
// }
// return tbody(rows);

// let userData = {
//   variavel: "None"
//   startDate: '2022-06-30T06:18:50',
//   endDate: '2022-06-30T06:26:14'
// };
// var data = [];
// for (var i = 0; i < example["variavel"].length; i++) {
//   userData["variavel"] = example["variavel"][i]
//   const row  = await api.post('/filtered', userData)
//   data.push(row)
  
// }

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
  const [database, setDatabase] = useState([])
  const [dataForm, setDataForm] = useState<dataFormProps>({
    intervalo:0,
    variavel:[]
  })

  useEffect(() => {
    async function getData(alldata=[]) {
      let teste 
      const userData = {
        variavel:alldata["variavel"],
        intervalo: dataForm.intervalo,
        startDate: dataForm["startDate"],
        endDate: dataForm["endDate"]
    };

    if (dataForm.intervalo!==5) {
      teste = await postAllData("filteredByPeriod", userData)
    } else {
      teste = await postAllData("filtered", userData)
    }

    setDatabase(teste)
    }

    getData(dataForm)
  }, [dataForm])
  
  return (
    // <Grid
    //   minH="100vh"
    //   h="100%"
    //   templateRows="repeat(1, 1fr)"
    //   templateColumns="repeat(5, 1fr)"
    //   gap={2}
    // >
    //   <GridItem padding="5px" rowSpan={2} colSpan={1} bg="#F6F6F6">
        <Sidebar SidebarData={(e)=>{setDataForm(e)}}/>
      /* </GridItem>
      <GridItem h="100%" colSpan={4}>
        <HStack w="100%" h="100%" align="start">
          <Graph dataBase={database}/>
        </HStack>
      </GridItem> */

      /* <GridItem h="70px" colSpan={4} bg="tomato">
        <HStack h="100%"></HStack>
      </GridItem> */
    // </Grid>
  );
};
