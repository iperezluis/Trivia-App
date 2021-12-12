import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {UsuarioStackParams} from '../../navigation/StackNavigator';
import AnsWers from '../components/AnsWers';
import {useButton} from '../hooks/useButton';

//NOTA: PONERLE EL TEMPORIZADOR Y ELIMINAR LAS PREGUNTAS DEL BANCO UNA VEZ CHECKEADAS
interface Props
  extends StackScreenProps<UsuarioStackParams, 'QuestionScreen'> {}

export interface Question {
  title: string;
  answers: string[];
  answersTrue: string;
}

const QuestionScreen = ({route}: Props) => {
  const [Timer, setTimer] = useState<number>(0);
  // const Timer = useRef(0);
  const {usuario} = route.params;

  const question: Question[] = [
    {
      title: '¿Quien invento el V8?',
      answers: [' Teodoro Rossbell', 'Tomas Edison', ' Bejamin Franklin'],
      answersTrue: 'Henry Ford',
    },
    {
      title: '¿Quien invento la batidora?',
      answers: [
        'Carlos Slim',
        ' Rockefeller Jr',
        'Rotschild Jame',
        ' Arthur Seatle',
      ],
      answersTrue: 'Albert Beldroff',
    },
    {
      title: '¿Quien invento el plutonio?',
      answers: [
        'Jhon Nash',
        ' Nikolas Tesla',
        'Isaac Newton',
        ' Nicolas Copernico',
      ],
      answersTrue: 'Theodoro Rossebelrt',
    },
    {
      title: '¿Cuando termino la 2da guerra mundial?',
      answers: ['1947', ' 1935', ' 1962'],
      answersTrue: '1945',
    },
    {
      title: '¿Cuantos tipos de bases de datos existen?',
      answers: ['2', '8', '3 '],
      answersTrue: '4',
    },
    {
      title: '¿Cuantos dias tiene 1 mes?',
      answers: ['22', '18', '33 '],
      answersTrue: '30',
    },
    {
      title: '¿Cuantos estados tiene venezuela?',
      answers: ['42', '18', '13 '],
      answersTrue: '24',
    },
  ];
  const item = Math.floor(Math.random() * question.length);

  const {
    checkResp,
    countResp,
    Question,
    isVisible,
    setIsVisible,
    isVisibleWinner,
    Winners,
  } = useButton(
    question[item].title,
    question[item].answers,
    question,
    usuario!,
  );
  useEffect(() => {
    loadQuestion();
  }, []);
  const loadQuestion = () => {
    setIsVisible(true);
  };
  // useEffect(() => {
  //   loadTime();
  // }, []);
  // const loadTime = () => {
  //   // setInterval(() => {
  //   //   setTimer(Timer + 1);
  //   // }, 1000);
  //   // console.log(Timer);
  // };
  const resp = (el: string) => {
    return (
      <Text key={el}>
        <AnsWers
          title={el}
          state={false}
          onPress={() =>
            checkResp(question[item].answersTrue, false, question[item])
          }
        />
      </Text>
    );
  };

  return (
    <View>
      <View style={{flexDirection: 'row', position: 'absolute', left: 10}}>
        <Text>Usuario : </Text>
        <Text>{usuario}</Text>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 5,
            top: 20,
          }}>
          <Text>Respuestas correctas:</Text>
          <Text>{countResp}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 5,
            top: 40,
          }}>
          <Text>Tiempo:</Text>
          <Text>{Timer}</Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 5,
            top: 40,
          }}>
          <Text>Total preguntas:</Text>
          <Text>{Question}</Text>
        </View> */}
      </View>

      <Modal animationType="slide" visible={isVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 400,
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              alignItems: 'center',
              borderRadius: 10,
              shadowOffset: {
                width: 0,
                height: 20,
              },
              shadowOpacity: 0.25,
              elevation: 15,
              shadowRadius: 20,
            }}>
            <Text style={{top: 20, position: 'absolute'}}>Preguntas</Text>
            <Text key={question[item].title}>{question[item].title}</Text>

            {question[item].answers.map(el => {
              return resp(el);
            })}

            <Text>
              <AnsWers
                key={question[item].answersTrue}
                title={question[item].answersTrue}
                state={true}
                onPress={() =>
                  checkResp(question[item].answersTrue, true, question[item])
                }
              />
            </Text>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" visible={isVisibleWinner} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 300,
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              alignItems: 'center',
              borderRadius: 10,
              shadowOffset: {
                width: 0,
                height: 20,
              },
              shadowOpacity: 0.25,
              elevation: 15,
              shadowRadius: 20,
            }}>
            <Text
              style={{
                top: 20,
                position: 'absolute',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              ¡HAZ GANADO EL JUEGO!
            </Text>
            <Text style={{top: 60, position: 'absolute'}}>
              Lista de ganadores
            </Text>

            {Winners.map(el => {
              return <Text key={el}>{el}</Text>;
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuestionScreen;
