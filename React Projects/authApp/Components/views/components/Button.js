import React from 'react';
import { Pressable, Text } from 'react-native';
import COLORS from '../../conts/colors';

const Button = ({ title, onPress = () => {} }) => {
  return (
    <Pressable
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 50,
        width: '100%',
        backgroundColor: COLORS.blue,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}
    >
      <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
