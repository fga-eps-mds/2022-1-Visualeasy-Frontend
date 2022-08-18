import React, { useEffect, useState } from 'react';
import { Box, Input, Radio, RadioGroup, SimpleGrid, Stack,Text } from '@chakra-ui/react'

const RatioSelect=({RatioRange})=> {
    const [SelectRatio, setSelectRatio] = useState('1')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
      RatioRange({intervalo: parseInt(SelectRatio), startDate, endDate})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectRatio, startDate, endDate]);
    
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
              <Radio colorScheme='red' value='1'>
                1 Hora
              </Radio>
              <Radio colorScheme='red' value='2'>
                1 Dia
              </Radio>
              <Radio colorScheme='red' value='3'>
                1 Sem
              </Radio>
              <Radio colorScheme='red' value='4'>
                1 Mês
              </Radio>
              <Radio colorScheme='red' value='5'>
                Personalizado
              </Radio>
            </SimpleGrid>
          </Stack>
        </RadioGroup>

        {SelectRatio === "5" ? (    
          <Stack spacing={1}>
            <Text>Início:</Text>
            <Input 
                size="md" 
                type="datetime-local" 
                onChange={e => setStartDate(e.currentTarget.value)}/>
            <Text>Fim:</Text>
            <Input 
                size="md" 
                type="datetime-local"
                onChange={e => setEndDate(e.currentTarget.value)}/>
          </Stack>
        ) : ([])}
      </Box>
    )

}
export default RatioSelect