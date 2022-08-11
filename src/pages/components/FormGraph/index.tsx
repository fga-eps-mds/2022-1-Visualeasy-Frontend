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

export default function FormGraph(this: any) {
    const [variablesName, setVariablesName] = useState([{}])
    useEffect(() => {
        getListaNomes()
    },[]);
    const [graphName, setgraphName] = useState('')
    
    
    const getListaNomes = async()=>{
        const {variavels} = await listaNomeVariaveis();
        let variablesName = []

        for(let i = 0; i<variavels.length; i++){
            //console.log("ESSA  É A RESPOSTAaa", variavels[i].variavel);
            let opition = {
                label: variavels[i].variavel,
                value: variavels[i].variavel,
                id: variavels[i].variavel,
            }
            variablesName.push(opition)
        }
        variablesName[0] = {...variablesName[0], variant: "outline"}
        //console.log("Esse é o objeto", variablesName)
        setVariablesName(variablesName)
    }
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setgraphName(event.target.value);
    }
    return (
        <VStack w='100%'>
            <Input type="text" id={"title"} placeholder="Gráfico 1" value={graphName} onChange={handleInputChange} />
            
            <Select
                name="variables"
                placeholder="Selecione as variáveis"
                isMulti
                id="variables-select"
                closeMenuOnSelect={false}
                size="md"
                tagVariant="solid"
                chakraStyles={selectStyles}
                options={variablesName}
            />
        </VStack>
    );
};
