import React, { useEffect, useState } from 'react';
import { Box, Input, Radio, RadioGroup, SimpleGrid, Stack,Text } from '@chakra-ui/react'
import {ChakraStylesConfig, Select} from "chakra-react-select";
import { Container } from '@chakra-ui/react'

const RatioSelect=({RatioRange})=> {
    const [SelectRatio, setSelectRatio] = useState('0')
    const [BeginDate, setBeginDate] = useState('2022-08-10')
    const [EndDate, setEndDate] = useState('2022-08-10')
    // console.log(BeginDate)
    // console.log(EndDate)
    useEffect(() => {
      console.log("teste", SelectRatio, BeginDate, EndDate);
      debugger;
      RatioRange({intervalo: parseInt(SelectRatio), BeginDate, EndDate})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectRatio, BeginDate, EndDate]);
    
    return(
        <Box
        borderColor="#000"
        border="1px"
        borderRadius="10px"
        bg="#fff"
        w="100%"
        padding="5px 5px 5px 15px"
      >
         <Text>Selecione o intervalo:</Text>
    <RadioGroup onChange={setSelectRatio} value={SelectRatio}>
      <Stack spacing={2} direction='row'>
      <SimpleGrid columns={[2, null, 3]} spacing="10px">
        <Radio colorScheme='red' value='0'>
          1 Hora
        </Radio>
        <Radio colorScheme='red' value='1'>
          1 Dia
        </Radio>
        <Radio colorScheme='red' value='2'>
          1 Sem
        </Radio>
        <Radio colorScheme='red' value='3'>
          1 Mês
        </Radio>
        <Radio colorScheme='red' value='4'>
         Personalizado
        </Radio>
        </SimpleGrid>
      </Stack>
    </RadioGroup>
    {SelectRatio === "4" ? (    
        <Stack spacing={1}>
            <Text>Início:</Text>
            <Input 
                size="md" 
                type="datetime-local" 
                onChange={e => setBeginDate({dataInit: e.currentTarget.value})}/>
            <Text>Fim:</Text>
            <Input 
                size="md" 
                type="datetime-local"
                onChange={e => setEndDate({dataEnd: e.currentTarget.value})}/>
        </Stack>
        ) : ([])}
    </Box>
    )

}
export default RatioSelect