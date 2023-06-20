import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Stack,
  Icon,
  Button,
  Box,
  WarningOutlineIcon,
  ScrollView,
  Center,
  Divider,
  NativeBaseProvider,
} from 'native-base';
import ConnectAPI from '../config/ConnectAPI';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function UsuarioForm({ route, navigation }) {
  const { item } = route.params;

  const [usuario, setUsuario] = useState({
    id: item.id || "",
    name: item.name || "",
    detail: item.detail || "",
  });
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    try {
      var response = await ConnectAPI.call(
        'products', // nome da url
        usuario, // objeto
        'POST' // method
      );
      console.log(response);
      navigation.push('UsuarioList');

    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      setUsuario({ id: item.id });

      var response = await ConnectAPI.call(
        'products/' + item.id, // nome da url + id
        usuario, // objeto
        'PUT' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.push('UsuarioList');
  };

  const deleteData = async () => {
    try {
      var response = await ConnectAPI.call(
        'products/' + item.id, // nome da url + id
        usuario, // objeto
        'DELETE' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.push('UsuarioList');
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <ScrollView w="100%">
          <Stack
            space={2.5}
            alignSelf="center"
            px="4"
            safeArea
            mt="4"
            w={{
              base: '100%',
              md: '25%',
            }}>
            <Box>
              <FormControl>
                <FormControl.Label>Nome</FormControl.Label>
                <Input
                  value={usuario.name}
                  onChangeText={(value) =>
                    setUsuario({ ...usuario, name: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid>
                <FormControl.Label>CPF</FormControl.Label>
                <Input
                  value={usuario.detail}
                  onChangeText={(value) =>
                    setUsuario({ ...usuario, detail: value })
                  }
                  placeholder="000.000.000-00"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  CPF inválido.
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid>
                <FormControl.Label>Telefone</FormControl.Label>
                <Input placeholder="(49) 98855-0055" />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Telefone inválido.
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Divider />
            <Button.Group
              isAttached
              colorScheme="blue"
              mx={{
                base: 'auto',
                md: 10,
              }}
              size="sm">
              <Button
                variant="subtle"
                onPress={item == '' ? saveData : updateData}
                startIcon={<Icon as={FontAwesome} name="save" size="sm" />}>
                Salvar
              </Button>
              <Button
                variant="outline"
                onPress={() => navigation.navigate('UsuarioList')}
                startIcon={
                  <Icon as={FontAwesome} name="arrow-left" size="sm" />
                }>
                Voltar
              </Button>
              {item !== '' ? (
                <Button
                  variant="subtle"
                  colorScheme="danger"
                  onPress={deleteData}
                  startIcon={<Icon as={FontAwesome} name="trash" size="sm" />}>
                  Deletar
                </Button>
              ) : (
                <> </>
              )}
            </Button.Group>
          </Stack>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}