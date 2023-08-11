import React from 'react';
import {
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Box,
  Text,
  Center,
} from 'native-base';

export default function AlertMsg(props) {
  //console.log(props.msg);
  const status = props.status ? props.status : 'error';
  return (
    <Center flex={1} px="3">
      <Alert maxW="400" status={status}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                {props.msg.titulo}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: 'coolGray.600',
              }}
            />
          </HStack>
          <Box
            pl="6"
            _text={{
              color: 'coolGray.600',
            }}>
            {props.msg.msg}
          </Box>
        </VStack>
      </Alert>
    </Center>
  );
}
