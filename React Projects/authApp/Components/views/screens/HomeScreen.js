import React from 'react';
import { Text, View, Image } from 'react-native';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    sessionStorage.clear();
    sessionStorage.setItem('userData', JSON.stringify({ loggedIn: false }));
    navigation.navigate('LoginScreen');
  };

  return (
    <View
      style={{
        paddingTop: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 40,
        }}
      >
        <Image
          source={require('../../../assets/profile.png')}
          style={{
            width: 100,
            height: 100,
            marginBottom: 40,
          }}
          onPress={() => {
            alert('Update Image');
          }}
        ></Image>
        <Text
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onPress={() => {
            alert('Update Name');
          }}
        >
          Welcome {userDetails?.fullname}
        </Text>
        <Text
          style={{ fontSize: 18 }}
          onPress={() => {
            alert('Update Email');
          }}
        >
          Email: {userDetails?.email}
        </Text>
        <Text
          style={{ fontSize: 18 }}
          onPress={() => {
            alert('Update Phone');
          }}
        >
          Phone: {userDetails?.phone}
        </Text>
        <Button
          title='Logout'
          onPress={logout}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
