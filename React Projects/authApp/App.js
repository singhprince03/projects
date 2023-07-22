import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Components/views/screens/LoginScreen';
import RegistrationScreen from './Components/views/screens/RegistrationScreen';
import HomeScreen from './Components/views/screens/HomeScreen';
import Loader from './Components/views/components/Loader';
import OtpScreen from './Components/views/screens/OtpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = sessionStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name='RegistrationScreen'
              component={RegistrationScreen}
            />
            <Stack.Screen
              name='LoginScreen'
              component={LoginScreen}
            />
            <Stack.Screen
              name='otp'
              component={OtpScreen}
            />
            <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
