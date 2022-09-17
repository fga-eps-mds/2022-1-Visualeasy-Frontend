import { VStack, Input, Button, Text, HStack } from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { useState, useEffect } from "react";
import { AiFillWarning } from "react-icons/ai";
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

export default function FormGraph({ FormGraphProps, disablebutton }: any) {
    const [GraphParameters, setGraphParameters] = useState('')
    const [variablesName, setVariablesName] = useState([{}])
    const [graphName, setgraphName] = useState("Gráfico")
    const [variavelSelect, setvariavelSelect] = useState([])
    const [hasError, setHasError] = useState(false)

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

    function Gerar() {

        if(variavelSelect.length === 0 || graphName === '') {
            setHasError(true);
            return;
        } else {
            setHasError(false);
        }

        const variavel = [] = Object.keys(newArr)
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

        // Se o valor de intervalo for entre 1 e 4, chamar a rota /variavel/filteredByPeriod.
        // Se o valor de intervalo for 5, chamar a rota /variavel/filtered, enviando startDate e endDate

    }
    return (
        <VStack w='100%'>
            <Input type="text" id={"title"} placeholder="Gráfico 1" onChange={(e) => { setgraphName(e.target.value) }} />

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

            {
                hasError ?
                    <HStack color={"red"}>
                        <AiFillWarning />
                        <Text color="red" fontSize="16px">
                            Preencha todos os campos
                        </Text>
                    </HStack>
                :
                    <></>
            }
            {disablebutton ?
                (<Button colorScheme='red' size='lg' onClick={() => Gerar()}>Gerar gráfico</Button>
                ) : (
                    <></>
                )
            }

        </VStack>
    );
};

