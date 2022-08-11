import { VStack, Input, Button } from "@chakra-ui/react";
import { constants } from "buffer";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { useState, useEffect } from "react";
import { api, listaNomeVariaveis } from "../../api/api";
import RatioSelect from "../RatioTimeChart/Index";

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
    const [GraphParameters, setGraphParameters] = useState('')
    const [variablesName, setVariablesName] = useState([{}])
    const [graphName, setgraphName] = useState('')
    const [variavelSelect, setvariavelSelect] = useState([])

    async function getData() {
        const userData = {
            variavel: 'Pikachu',
            startDate: '2022-06-30T06:18:50',
            endDate: '2022-06-30T06:26:14'
        };
        const { data } = await api.post('/filtered', userData)
        console.log(data)
    }


    useEffect(() => {
      
        getListaNomes()
    }, []);
    var newArr = variavelSelect.map(function (val, index) {
        return (val.value)
    })



    const getListaNomes = async () => {
        const { variavels } = await listaNomeVariaveis();
        let variablesName = []

        for (let i = 0; i < variavels.length; i++) {
            //console.log("ESSA  É A RESPOSTAaa", variavels[i].variavel);
            let opition = {
                label: variavels[i].variavel,
                value: variavels[i].variavel,
                id: variavels[i].variavel,
            }
            variablesName.push(opition)
        }
        variablesName[0] = { ...variablesName[0], variant: "outline" }
        //console.log("Esse é o objeto", variablesName)
        setVariablesName(variablesName)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setgraphName(event.target.value);
    }

    function Gerar() {
        var variavel = [] = Object.keys(newArr)
            .map(function (key) {
                return newArr[key];
            });


        let remoteJob = {
            ...GraphParameters,
            variavel
        };


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
                onChange={(e) => setvariavelSelect(e)}
                chakraStyles={selectStyles}
                options={variablesName}
            />
            <RatioSelect RatioRange={(e) => setGraphParameters({ intervalo: e })} />
            <Button onClick={() => Gerar()}>gerar</Button>
        </VStack>
    );
};
