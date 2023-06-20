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

const data1 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'João Da Silva',
    timeStamp: '12:47',
    recentText: 'Bom dia!',
    avatarUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Chiquinha',
    timeStamp: '11:11',
    recentText: 'Sabe dizer onde esta o chaves?',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Chaves',
    timeStamp: '8:22',
    recentText: 'Bom diaa!',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fullName: 'Kiko',
    timeStamp: '12:47',
    recentText: 'Vou contar para minha mãe.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fullName: 'Dona Florinda',
    timeStamp: '12:47',
    recentText: 'Prof. girafales.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Chaves',
    timeStamp: '8:22',
    recentText: 'Bom diaa!',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fullName: 'Kiko',
    timeStamp: '12:47',
    recentText: 'Vou contar para minha mãe.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fullName: 'Dona Florinda',
    timeStamp: '12:47',
    recentText: 'Prof. girafales.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Chaves',
    timeStamp: '8:22',
    recentText: 'Bom diaa!',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fullName: 'Kiko',
    timeStamp: '12:47',
    recentText: 'Vou contar para minha mãe.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fullName: 'Dona Florinda',
    timeStamp: '12:47',
    recentText: 'Prof. girafales.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  },
];
const SecondRoute = () => <Box flex={1} bg="violet.400" />;

const ThirdRoute = () => <Box flex={1} bg="red.400" />;

const Tab = createMaterialTopTabNavigator();

export default function UsuarioList({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const loadData = async () => {
    try {
      const response = await ConnectAPI.call('products');
      setData(response.data);

      // return data;
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
//useState useEffect
  useState(() => {
    //  const response = ConnectAPI.call('products');
    // setData(response.data);
    //  return data;
    //console.log(response.data);
    loadData();
  });

  searchData = async (text) => {
    if (text != '') {
      //alert('Pesquisando... ' + text);
      const newArray = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        console.log(text);
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setSearch(text);
      setData(newArray);
      console.log(data);
    } else {
      await loadData();
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
                navigation.navigate('UsuarioForm', { item: item || null });
                //alert('Teste ' + item.name + ' - ' + item.id);
              }}
              _hover={{ bg: 'coolGray.300' }}>
              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack space={[3, 0]} justifyContent="space-between">
                  <Avatar
                    size="58px"
                    source={{
                      uri:
                        item.avatarUrl ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.detail}
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
                    {item.timeStamp}
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
        onPress={() => navigation.navigate('UsuarioForm', { item: '' })}
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
