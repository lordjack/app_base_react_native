import React, { useState, useEffect } from 'react';
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
  List,
  Divider,
  useColorMode,
  ScrollView,
} from 'native-base';

const SecondRoute = () => <Box flex={1} bg="violet.400" />;

const ThirdRoute = () => <Box flex={1} bg="red.400" />;

const Tab = createMaterialTopTabNavigator();

export default function ModeloAPIList({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const loadData = async () => {
    try {
      const response = await ConnectAPI.call('produto');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //useState useEffect
  useEffect(() => {
    loadData();
  }, []);

  searchData = (text) => {
    if (text) {
      //alert('Pesquisando... ' + text);
      const newArray = data.filter((item) => {
        const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        console.log(text);
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      // setTimeout(() => {
      setSearch(text);
      setData(newArray);
      console.log(data);
      // }, '3000');
    } else {
      loadData();
      setSearch(null);
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();

  const ListagemProdutos = () => (
    <>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Pesquisar"
          value={search}
          onChangeText={(value) => searchData(value)}
          onClear={(text) => searchData('')}
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
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        <List
          divider={
            <Divider ml={16} opacity={colorMode == 'dark' ? '0.4' : '1'} />
          }
          px={3}
          // mt={12}
          py={0}
          // borderColor="red.200"
          borderWidth={0}
          borderRightWidth={0}
          w="100%">
          {data?.map((item, index) => (
            <List.Item
              key={index}
              onPress={() => {
                navigation.navigate('ModeloAPIForm', { item: item || null });
                //alert('Teste ' + item.name + ' - ' + item.id);
              }}
              _hover={{ bg: 'coolGray.300' }}>
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
            </List.Item>
          ))}
        </List>
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
