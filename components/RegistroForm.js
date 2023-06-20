import React, { useState } from 'react';
import ConnectAPI from '../config/ConnectAPI';
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
  Text,
  NativeBaseProvider,
} from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function RegistroForm({ navigation }) {
  const [user, setUser] = useState({
    name: 'usuario3',
    email: 'usuario3@admin.com',
    password: 'admin@123',
    c_password: 'admin@123',
  });
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    setLoading(true);
    try {
      var response = await ConnectAPI.call(
        'register', // nome da url
        user, // objeto
        'POST' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.push('UsuarioList');
    setLoading(false);
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Text>
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
                  name="nome"
                  value={user.name}
                  onChangeText={(value) => setUser({ ...user, name: value })}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  name="email"
                  value={user.email}
                  onChangeText={(value) => setUser({ ...user, email: value })}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  E-mail inválido.
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  name="password"
                  value={user.password}
                  onChangeText={(value) =>
                    setUser({ ...user, password: value })
                  }
                  placeholder="******"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Password inválido.
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid>
                <FormControl.Label>Confirmar Senha</FormControl.Label>
                <Input
                  name="c_password"
                  value={user.c_password}
                  onChangeText={(value) =>
                    setUser({ ...user, c_password: value })
                  }
                  placeholder="******"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Confirmar Password inválido.
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
                onPress={saveData}
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
            </Button.Group>
          </Stack>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
