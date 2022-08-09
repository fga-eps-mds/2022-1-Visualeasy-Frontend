import { VStack, Input} from "@chakra-ui/react";
import {ChakraStylesConfig, Select} from "chakra-react-select";
import { useState, useEffect } from "react";
import { listaNomeVariaveis } from "../../api/api";

/* const variables = [
    {
        label: "Charmander",
        value: "charmander",
        id: "charmander",
        variant: "outline"
    },
    {
        label: "Squirtle",
        value: "squirtle",
        id: "squirtle"
    },
    {
        label: "Bulbassauro",
        value: "bulbassauro",
        id: "bulbassauro"
    },
] */

const selectStyles: ChakraStylesConfig = {
    container: (provided) => ({
        ...provided,
        p: 0,
        w: "100%"
    }),

    placeholder: (provided) => ({
        ...provided,
        fontSize: "12px"
    })
}

export default function FormGraph() {
    const [variables, setVariables] = useState([])
    useEffect(() => {
        const getListaNomes = async()=>{
            const {variavels}= await listaNomeVariaveis();

            console.log("ESSA  É A RESPOSTA", variavels);
            setVariables(variavels)
        }
        getListaNomes()
      });

    
    return (
        <VStack w='100%'>
            <Input type="text" id={"title"} placeholder="Gráfico 1" value={""} />
            
            <Select
                name="variables"
                placeholder="Selecione as variáveis"
                isMulti
                id="variables-select"
                closeMenuOnSelect={false}
                size="md"
                tagVariant="solid"
                chakraStyles={selectStyles}
                options={variables}
            />
        </VStack>
    );
};
