import React, { useEffect, useState } from 'react';
import { Box, Radio, RadioGroup, SimpleGrid, Stack,Text } from '@chakra-ui/react'
import {ChakraStylesConfig, Select} from "chakra-react-select";
import { Container } from '@chakra-ui/react'

const RatioSelect=({RatioRange})=> {
    const [SelectRatio, setSelectRatio] = useState('0')
    useEffect(() => {
    RatioRange(parseInt(SelectRatio))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectRatio]);
    
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
    </Box>
    )

}
export default RatioSelect



