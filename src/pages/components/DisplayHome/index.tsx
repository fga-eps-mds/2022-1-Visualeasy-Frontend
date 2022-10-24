import React, { useState } from "react";
import Sidebar from "../Sidebar";
interface EnumServiceGetOrderBy {
  [index: number]: string;
}

interface DataFormProps {
  intervalo: number
  variavel: EnumServiceGetOrderBy[]
  startDate?: string
  endDate?: string
}

export default function DisplayHome({displayHomeData }: any) {
  const [dataForm, setDataForm] = useState<DataFormProps>({
    intervalo: 0,
    variavel: []
  })

  return (
    <Sidebar SidebarData={displayHomeData} />
  );
};
