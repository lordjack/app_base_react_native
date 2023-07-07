import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ConnectAPI from '../config/ConnectAPI';

import {
  Box,
  Icon,
  Text,
  Input,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Fab,
  FlatList,
  Pressable,
  Divider,
  useColorMode,
  ScrollView,
} from 'native-base';

const SecondRoute = () => <Box flex={1} bg="violet.400" />;

const ThirdRoute = () => <Box flex={1} bg="red.400" />;

const Tab = createMaterialTopTabNavigator();

export default function ModeloAPIList({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = useCallback(async () => {
    setData([]);
    try {
      const response = await ConnectAPI.call('produto');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //useState useEffect
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const dataFilter = data.filter(
    ({ nome }) => nome.toLowerCase()?.indexOf(search.toLowerCase()) > -1
  );

  const { colorMode, toggleColorMode } = useColorMode();

  const ListagemProdutos = () => (
    <>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Pesquisar"
            value={search}
            onChangeText={(value) => setSearch(value)}
            // onClear={(text) => searchData('')}
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<FontAwesome name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={<FontAwesome name="microphone" />}
              />
            }
          />
        </VStack>
        <FlatList
          data={dataFilter}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate('ModeloAPIForm', { item: item || null });
              }}
              onLongPress={() => {
                if (confirm('Deseja remover o registro?')) {
                  //deleteData(item.id);
                }
              }}
              rounded="8"
              overflow="hidden"
              borderWidth="1"
              borderColor="coolGray.300"
              maxW="96"
              shadow="3"
              bg="coolGray.100"
              p="5">
              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack space={[3, 0]} justifyContent="space-between">
                  <Avatar
                    size="58px"
                    source={{
                      uri: item.imagem
                        ? ConnectAPI.urlFile() + item.imagem
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.nome}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.descricao}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item.preco}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <Fab
        placement="bottom-right"
        colorScheme="blue"
        size="lg"
        icon={<Icon as={FontAwesome} name="plus" size="sm" />}
        onPress={() => navigation.navigate('ModeloAPIForm', { item: '' })}
      />
    </>
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Usuário" component={ListagemProdutos} />
      <Tab.Screen name="Profile" component={SecondRoute} />
      <Tab.Screen name="Teste" component={ThirdRoute} />
    </Tab.Navigator>
  );
}
