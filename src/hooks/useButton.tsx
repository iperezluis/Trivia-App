import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import AnsWers from '../components/AnsWers';
import {Question} from '../screens/QuestionScreen';

export const useButton = (
  title: string,
  resp: string[],
  arr: Question[],
  user: string,
) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleWinner, setIsVisibleWinner] = useState<boolean>(false);

  const [respRespondidas, setRespRespondidas] = useState<string[]>([]);
  const [countResp, setCountResp] = useState<number>();
  const [change, setChange] = useState<string>();
  const [changeText, setChangeText] = useState<string>('black');
  const [Question, setQuestion] = useState<Question[]>(arr);
  const [Winners, setWinners] = useState<string[]>([]);

  const load = () => {
    return setQuestion([...Question]);
  };

  const checkResp = (res: string, state: boolean, item: Question) => {
    if (state === false) {
      setChange('red');
      setChangeText('white');
      return Alert.alert('OOPS!', 'Has respondido mal la pregunta');
    }
    if (state === true) {
      setChange('green');
      setChangeText('white');
      Alert.alert('SUCCESFUL!', 'Has respondido correctamente la pregunta', [
        {text: 'siguiente', onPress: () => load()},
        {text: 'ok', onPress: () => null},
      ]);
      if (respRespondidas.indexOf(res) === -1) {
        //agregamos la respuesta correcta al array
        respRespondidas.push(res);
        setCountResp(respRespondidas.length);

        setTimeout(() => {
          arr.splice(arr.indexOf(item));
          console.log(
            'ha sido eliminada de las preguntas: ' + JSON.stringify(item),
          );
        }, 3000);
      } else {
        console.log('este respuesta ya existe');
        return setQuestion([...Question]);
      }
      if (respRespondidas.length === 7) {
        Winners.push(user);
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
        setIsVisibleWinner(true);
      }
      // eliminamos el objeto del banco de preguntas

      console.log('Quedan: ' + arr.length + ' preguntas por responder');
      setRespRespondidas([...respRespondidas]);
      console.log(respRespondidas);
      setIsDisabled(false);
    }
  };
  return {
    isDisabled,
    setIsDisabled,
    checkResp,
    change,
    changeText,
    countResp,
    Question,
    isVisible,
    setIsVisible,
    isVisibleWinner,
    setIsVisibleWinner,
    Winners,
  };
};
