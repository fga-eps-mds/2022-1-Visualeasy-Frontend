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

export default function FormGraph({ FormGraphProps, disablebutton, getDataFrom }: any) {

    const obj = getDataFrom?.variavel.map((e) => ({ label: e }))

    const [GraphParameters, setGraphParameters] = useState(getDataFrom?.intervalo)
    const [variablesName, setVariablesName] = useState([{}])
    const [graphName, setgraphName] = useState("Gráfico")
    const [variavelSelect, setvariavelSelect] = useState([])

    useEffect(() => { getListaNomes() }, []);
    let newArr = variavelSelect.map(function (val, index) {
        return (val.value)
    })

    const getListaNomes = async () => {
        const { variavels } = await listaNomeVariaveis();
        let variablesName = []

        for (const element of variavels) {
            let option = {
                label: element.variavel,
                value: element.variavel,
                id: element.variavel,
            }
            variablesName.push(option)
        }
        variablesName[0] = { ...variablesName[0], variant: "outline" }
        setVariablesName(variablesName)
    }

    function Gerar() {
        const variavel = Object.keys(newArr)
            .map(function (key) {
                return newArr[key];
            });

        const FormGraphData = {
            id: new Date().getTime(),
            ...GraphParameters,
            variavel,
            graphName
        };

        FormGraphProps({
            ...FormGraphData
        });


    }

    return (
        <VStack w='100%'>
            <Input type="text" id={"title"} value={getDataFrom?.graphName} placeholder="Gráfico 1" onChange={(e) => { setgraphName(e.target.value) }} />

            <Select
                name="variables"
                placeholder="Selecione as variáveis"
                isMulti
                id="1"
                instanceId={"1"}
                closeMenuOnSelect={false}
                defaultValue={obj}
                size="md"
                tagVariant="solid"
                onChange={(e) => setvariavelSelect(e)}
                chakraStyles={selectStyles}
                options={variablesName}
            />
            <RatioSelect RatioRange={(e) => setGraphParameters(e)} />
            {disablebutton ?
                (<Button colorScheme='red' size='lg' onClick={() => Gerar()}>Gerar gráfico</Button>
                ) : (
                    <></>
                )
            }

        </VStack>
    );
}

