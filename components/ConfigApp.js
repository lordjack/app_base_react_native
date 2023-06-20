import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from '../config/firebase';


// or any pure javascript modules available in npm
import { Card, TextInput, Button } from 'react-native-paper';

//https://random-data-api.com/api/v2/users
export default function ConfigApp({ navigation }) {


  return (
    <View style={styles.container}>
      <Button icon="content-save" mode="contained" onPress={() => salvar()}>
        Config
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});
