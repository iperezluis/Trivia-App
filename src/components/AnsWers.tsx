import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useButton} from '../hooks/useButton';

interface Props {
  state: boolean;
  title: string;
  onPress: () => void;
}
export default function AnsWers({state, title, onPress}: Props) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={{borderRadius: 10}}>
        <Text style={{color: 'black'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
