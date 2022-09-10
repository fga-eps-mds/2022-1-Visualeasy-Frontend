import React, { useState } from "react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
interface EnumServiceGetOrderBy {
  [index: number]: string;
}

interface dataFormProps {
  intervalo: number
  variavel: EnumServiceGetOrderBy[]
  startDate?: string
  endDate?: string
}

export default function DisplayHome({displayHomeData }: any) {
  const [dataForm, setDataForm] = useState<dataFormProps>({
    intervalo: 0,
    variavel: []
  })

  return (
    <Sidebar SidebarData={displayHomeData} />
  );
};
