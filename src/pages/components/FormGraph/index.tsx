import { VStack, Input, Button } from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { useState, useEffect } from "react";
import { listaNomeVariaveis } from "../../api/api";
import RatioSelect from "../RatioTimeChart/Index";

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

export default function FormGraph({FormGraphProps}: any) {
    const [GraphParameters, setGraphParameters] = useState('')
    const [variablesName, setVariablesName] = useState([{}])
    const [graphName, setgraphName] = useState('')
    const [variavelSelect, setvariavelSelect] = useState([])
    
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
            let option = {
                label: variavels[i].variavel,
                value: variavels[i].variavel,
                id: variavels[i].variavel,
            }
            variablesName.push(option)
        }
        variablesName[0] = { ...variablesName[0], variant: "outline" }
        setVariablesName(variablesName)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setgraphName(event.target.value);
    }

    function Gerar() {
        const variavel = [] = Object.keys(newArr)
            .map(function (key) {
                return newArr[key];
            });

        const FormGraphData = {
            ...GraphParameters,
            variavel
        };
        
        FormGraphProps({
            ...FormGraphData
          });

        // Se o valor de intervalo for entre 1 e 4, chamar a rota /variavel/filteredByPeriod.
        // Se o valor de intervalo for 5, chamar a rota /variavel/filtered, enviando startDate e endDate

    }
    return (
        <VStack w='100%'>
            <Input type="text" id={"title"} placeholder="Gráfico 1" value={graphName} onChange={handleInputChange} />

            <Select
                name="variables"
                placeholder="Selecione as variáveis"
                isMulti
                id="1"
                instanceId={"1"}
                closeMenuOnSelect={false}
                size="md"
                tagVariant="solid"
                onChange={(e) => setvariavelSelect(e)}
                chakraStyles={selectStyles}
                options={variablesName}
            />
            <RatioSelect RatioRange={(e) => setGraphParameters(e)} />
            <Button colorScheme='red' size='lg' onClick={() => Gerar()}>Gerar gráfico</Button>
        </VStack>
    );
};

