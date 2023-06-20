import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
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
  Pressable,
  Divider,
  Flex,
  Image,
  Text,
  NativeBaseProvider,
} from 'native-base';
import { SelectList } from 'react-native-dropdown-select-list';
import { DatePickerModal } from 'react-native-paper-dates';
import * as ImagePicker from 'expo-image-picker';

import ConnectAPI from '../config/ConnectAPI';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function ModeloAPIForm({ route, navigation }) {
  const { item } = route.params;

  const img = require('../assets/adicionar.png');

  const [produto, setProduto] = useState({
    id: item.id || '',
    nome: item.nome || '',
    preco: item.preco || '',
    unidade_medida_id: item.unidade_medida_id || '',
    tipo_produto_id: item.tipo_produto_id || '',
    imagem: item.imagem ? ConnectAPI.urlFile() + item.imagem : '',
  });

  const [dataInicio, setDataInicio] = useState('');
  const [visivelDataInicio, setVisivelDataInicio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unidadeMedida, setUnidadeMedida] = useState([]);
  const [tipoProduto, setTipoProduto] = useState([]);

  const [imagemForm, setImagemForm] = useState(produto.imagem || img);

  const loadData = async () => {
    try {
      // componente combobox = select
      const responseUM = await ConnectAPI.call('unidade-medida');
      let um = responseUM.data.map((item) => {
        return {
          key: item.id,
          value: item.nome,
        };
      });
      setUnidadeMedida(um);

      // componente combobox = select
      const responseTP = await ConnectAPI.call('tipo-produto');
      let tp = responseTP.data.map((item) => {
        return {
          key: item.id,
          value: item.nome,
        };
      });
      setTipoProduto(tp);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    loadData();
  });

  const saveData = async () => {
    try {
      var response = await ConnectAPI.call(
        'produto', // nome da url
        produto, // objeto
        'POST' // method
      );

      // uploadImage();
      if (response.success) {
        navigation.push('ModeloAPIList');
      } else {
        alert(response.message + ' : ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      setProduto({ id: item.id });
      console.log(produto);
      var response = await ConnectAPI.call(
        'produto/' + item.id, // nome da url + id
        produto, // objeto
        'POST' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.push('ModeloAPIList');
  };

  const deleteData = async () => {
    try {
      setProduto({ id: produto.id });

      var response = await ConnectAPI.call(
        'produto/' + item.id, // nome da url + id
        produto, // objeto
        'DELETE' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.push('ModeloAPIList');
  };

  const selecionarImagem = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImagemSelected(true);

      setImagemForm({
        uri: result.assets[0].uri,
      });

      // console.log('teste: ' + JSON.stringify(result.uri));
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  const uploadImagem = async (objeto) => {
    if (objeto.imagem.path) {
      await storage.ref().child(objeto.imagem.path).delete();
    }

    let path = 'image_' + objeto.id + '.jpg';

    let objImagem = await storage
      .ref()
      .child(path)
      .putString(imagemForm.uri, 'data_url')
      .then(async (snapshot) => {
        //console.log('Uploaded Imagem!');
        return snapshot.ref.getDownloadURL().then(async (downloadUrl) => {
          return { uri: downloadUrl, path: path };
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return objImagem;
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
              <Pressable onPress={selecionarImagem}>
                <Flex alignSelf="center">
                  <Image
                    source={imagemForm}
                    borderRadius="8"
                    width="279"
                    height="180"
                    shadow="5"
                    alt="Imagem"
                  />
                </Flex>
              </Pressable>
            </Box>

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
              <FormControl>
                <FormControl.Label>Data Início</FormControl.Label>
                <Pressable
                  onPress={() => {
                    setVisivelDataInicio(true);
                  }}>
                  <Input
                    name="data_inicio"
                    value={dataInicio}
                    placeholder="00/00/2000"
                  />
                </Pressable>
                <DatePickerModal
                  locale="pt"
                  mode="single"
                  visible={visivelDataInicio}
                  onDismiss={() => {
                    setVisivelDataInicio(false);
                  }}
                  date={dataInicio}
                  onConfirm={(value) => {
                    setVisivelDataInicio(false);
                    setDataInicio(value.date.toLocaleDateString('pt-BR'));
                  }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired isInvalid>
                <FormControl.Label>Unidade de Medida</FormControl.Label>
                <SelectList
                  onSelect={() => produto.unidade_medida_id}
                  setSelected={(value) =>
                    setProduto({ ...produto, unidade_medida_id: value })
                  }
                  data={unidadeMedida}
                  save="key"
                  defaultOption={
                    unidadeMedida.filter(
                      (e) => e.key === produto.unidade_medida_id
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
              <FormControl isRequired isInvalid>
                <FormControl.Label>Tipo</FormControl.Label>
                <SelectList
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
                    padding: 5,
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
                onPress={() => navigation.navigate('ModeloAPIList')}
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
                <> </>
              )}
            </Button.Group>
          </Stack>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
