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
  Select,
  CheckIcon,
  NativeBaseProvider,
} from 'native-base';
import { SelectList } from 'react-native-dropdown-select-list';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function ModeloAsyncStorageForm({ route, navigation }) {
  const { item } = route.params;

  const [produto, setProduto] = useState({
    id: item.id || '',
    nome: item.nome || '',
    preco: item.preco || '',
    tipo_produto_id: item.tipo_produto_id || '',
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tipoProduto, setTipoProduto] = useState([]);

  const dataTipo = [
    { id: 1, nome: 'Plastico' },
    { id: 2, nome: 'Aluminio' },
    { id: 3, nome: 'Prata', disabled: true },
    { id: 4, nome: 'Ferro' },
    { id: 5, nome: 'Outros', disabled: true },
  ];

  const loadData = async () => {
    try {
      const values = await AsyncStorage.getItem('@produto');
      let list = await JSON.parse(values);
      if (list) {
        setData(list);
      }

      // componente combobox == select
      let um = dataTipo.map((item) => {
        return {
          key: item.id,
          value: item.nome,
        };
      });
      setTipoProduto(um);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    loadData();
  });

  const saveData = async () => {
    try {
      data.push(produto);
      await AsyncStorage.setItem('@produto', JSON.stringify(data));

      navigation.push('ModeloAsyncStorageList');
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      setProduto({ id: item.id });

      data[produto.id] = produto;
      //console.log(data);

      await AsyncStorage.setItem('@produto', JSON.stringify(data));

      navigation.push('ModeloAsyncStorageList');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async () => {
    try {
      
      setProduto({ id: produto.id });

      data.splice(produto.id, 1);
      console.log(data);

      await AsyncStorage.setItem('@produto', JSON.stringify(data));

      navigation.push('ModeloAsyncStorageList');
    } catch (error) {
      console.error(error);
    }
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
                  value={produto.nome}
                  onChangeText={(value) =>
                    setProduto({ ...produto, nome: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired isInvalid>
                <FormControl.Label>Tipo</FormControl.Label>
                <SelectList
                  onSelect={() => produto.tipo_produto_id}
                  setSelected={(value) =>
                    setProduto({ ...produto, tipo_produto_id: value })
                  }
                  data={tipoProduto}
                  save="key"
                  defaultOption={
                    tipoProduto.filter(
                      (e) => e.key === produto.tipo_produto_id
                    )[0] || null
                  }
                  searchPlaceholder="Pesquisar"
                  notFoundText="Dados não encontrado"
                  placeholder="Selecione"
                  boxStyles={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#d9d9d9',
                    padding: 8,
                  }} //override default styles
                  dropdownStyles={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#d9d9d9',
                    padding: 8,
                  }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid>
                <FormControl.Label>Preço</FormControl.Label>
                <Input
                  value={produto.preco}
                  onChangeText={(value) =>
                    setProduto({ ...produto, preco: value })
                  }
                  placeholder="1.99"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Texto inválido.
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
                {item == '' ? 'Salvar' : 'Atualizar'}
              </Button>
              <Button
                variant="outline"
                onPress={() => navigation.navigate('ModeloAsyncStorageList')}
                startIcon={
                  <Icon as={FontAwesome} name="arrow-left" size="sm" />
                }>
                Voltar
              </Button>
              {item !== '' ? (
                <Button
                  variant="subtle"
                  colorScheme="danger"
                  onPress={() => {
                    if (confirm('Deseja remover o registro?')) {
                      deleteData();
                    }
                  }}
                  startIcon={<Icon as={FontAwesome} name="trash" size="sm" />}>
                  Deletar
                </Button>
              ) : (
                <></>
              )}
            </Button.Group>
          </Stack>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
