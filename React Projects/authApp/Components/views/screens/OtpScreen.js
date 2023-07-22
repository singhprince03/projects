import React from 'react';
import { View, Text, SafeAreaView, Keyboard } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleOnchange = (text, otp) => {
    setOtp((prevState) => ({ ...prevState, [otp]: text }));
  };

  const handleError = (error, otp) => {
    setErrors((prevState) => ({ ...prevState, [otp]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!otp) {
      handleError('Please input OTP', 'otp');
      isValid = false;
    } else if (otp.otp.match(/[^0-9]/)) {
      handleError('Please input a valid OTP', 'otp');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const verifyOTP = () => {
    const api_key = 'c14ba1b7-1320-11ee-addf-0200cd936042';
    const session_id = sessionStorage.getItem('session-id');
    let otp_entered_by_user = otp.otp;
    if (otp_entered_by_user == '') {
      alert('Please enter the OTP');
      return;
    }
    let url =
      'https://2factor.in/API/V1/' +
      api_key +
      '/SMS/VERIFY/' +
      session_id +
      '/' +
      otp_entered_by_user;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data['Details'] == 'OTP Matched') {
          alert('OTP matched successfully');
          let userData = JSON.parse(sessionStorage.getItem('userData'));
          navigation.navigate('HomeScreen');
          sessionStorage.setItem(
            'userData',
            JSON.stringify({ ...userData, loggedIn: true })
          );
        } else {
          alert('OTP not matched');
          return false;
        }
      })
      .catch((err) => console.error(err));
  };

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      verifyOTP();
    }, 2000);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View
        style={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}
          >
            OTP
          </Text>
          <Text
            style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}
          >
            Enter your OTP to Login
          </Text>
          <Input
            inputMode='numeric'
            onChangeText={(text) => handleOnchange(text, 'otp')}
            onFocus={() => handleError(null, 'otp')}
            iconName='lock-outline'
            label='OTP'
            placeholder='Enter your OTP'
            error={errors.otp}
            password
          />
          <Button
            title='Log In'
            onPress={validate}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
