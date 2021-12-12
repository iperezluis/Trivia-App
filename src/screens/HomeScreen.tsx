import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {UsuarioStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<any, 'HomeScreen'> {
  usuario: Usuario;
}
interface Usuario {
  name: string | undefined;
}

const HomeScreen = ({navigation, usuario}: Props) => {
  const [name, setName] = useState<string>();
  const userPLay = (name: string|undefined) => {
    if (!name) {
      return Alert.alert('Error', 'Los campos estan vacios');
    }
    navigation.navigate('QuestionScreen', {
       usuario: name,
    });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Usuario</Text>
      <TextInput
        underlineColorAndroid="black"
        placeholder="inserte usuario"
        onChangeText={value => setName(value)}
        value={name}
      />
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          borderRadius: 5,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => userPLay(name)}>
        <Text style={{color: 'white'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
