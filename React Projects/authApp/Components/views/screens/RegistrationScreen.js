import React from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import registerService from '../../../Service/register.service';

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    } else if (inputs.fullname.length < 5) {
      handleError('Min length is 5', 'fullname');
      isValid = false;
    }
    if (!inputs.phone) {
      handleError('Please input Phone Number', 'phone');
      isValid = false;
    } else if (!inputs.phone.match(/[7-9]\d{9}/)) {
      handleError('Please input a valid Phone Number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length is 5', 'password');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const api_key = 'c14ba1b7-1320-11ee-addf-0200cd936042';
      let url =
        'https://2factor.in/API/V1/' +
        api_key +
        '/SMS/+91' +
        inputs.phone +
        '/AUTOGEN';

      try {
        let user = await registerService(inputs);
        if (user.status == 201) {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.Status == 'Success') {
                sessionStorage.setItem('session-id', data.Details);
                sessionStorage.setItem('userData', JSON.stringify(user.data));
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
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter your details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName='email-outline'
            label='Email'
            placeholder='Enter your email address'
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName='account-outline'
            label='Full Name'
            placeholder='Enter your full name'
            error={errors.fullname}
          />

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
            title='Register'
            onPress={validate}
          />
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Already have an account!
          </Text>
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
