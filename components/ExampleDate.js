import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FormControl, Input, Button, Icon, Box, Pressable } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
const ExampleDate = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [visivelDataInicio, setVisivelDataInicio] = useState(false);

  return (
    <Box>
      <FormControl>
        <FormControl.Label>Data Início</FormControl.Label>
        <Input
          name="data_inicio"
          value={dataInicio}
          placeholder="00/00/2000"
          onChangeText={(e) => setDataInicio(e)}
          InputLeftElement={
            <Pressable
              onPress={() => setVisivelDataInicio(true)}
              overflow="hidden"
              px="2"
            >
              <Icon
                as={<FontAwesome name="calendar" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            </Pressable>
          }
        />
        <DateTimePickerModal
          isVisible={visivelDataInicio}
          mode="date"
          onConfirm={(date) => {
            setDataInicio(date.toLocaleDateString("pt-BR"));
            setVisivelDataInicio(false);
          }}
          onCancel={() => setVisivelDataInicio(false)}
        />
      </FormControl>
    </Box>
  );
};

export default ExampleDate;
