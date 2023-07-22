import React from 'react';
import { View, Text, SafeAreaView, Keyboard } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import loginService from '../../../Service/login.service';

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ phone: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.phone) {
      handleError('Please input Phone Number', 'phone');
      isValid = false;
    } else if (!inputs.phone.match(/^[6-9]\d{9}$/)) {
      handleError('Please input a valid Phone Number', 'phone');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input Password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length is 5', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const api_key = 'c14ba1b7-1320-11ee-addf-0200cd936042';
      const url =
        'https://2factor.in/API/V1/' +
        api_key +
        '/SMS/+91' +
        inputs.phone +
        '/AUTOGEN';

      try {
        let user = await loginService(inputs);
        // console.log(user);
        if (user.status == 202) {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              if (data.Status == 'Success') {
                sessionStorage.setItem('session-id', data.Details);
                sessionStorage.setItem(
                  'userData',
                  JSON.stringify(user.data.users)
                );
                alert('OTP Send Successfully');
              }
            })
            .catch((err) => {
              console.error(err);
              alert('Error sending OTP');
            });
          navigation.navigate('otp');
        }
      } catch (error) {
        alert(error.user.data.msg);
      }
    }, 2000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
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
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter your details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            inputMode='numeric'
            onChangeText={(text) => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName='phone-outline'
            label='Phone Number'
            placeholder='Enter your phone no'
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName='lock-outline'
            label='Password'
            placeholder='Enter your password'
            error={errors.password}
            password
          />
          <Button
            title='Log In'
            onPress={validate}
          />
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Don't have account?
          </Text>
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
