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

import FontAwesome from  'react-native-vector-icons/FontAwesome5';

export default function LoginForm({ navigation }) {
  const [user, setUser] = useState({
    email: 'usuario1@admin.com',
    password: 'admin@123',
  });
  const [loading, setLoading] = useState(false);

  const logar = async () => {
    setLoading(true);

    ConnectAPI.call('login', user, 'POST');
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
                  secureTextEntry={true}
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
                onPress={logar}
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
