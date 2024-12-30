// Home.js
import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&w=600' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.greeting}>Welcome to the Home Screen!</Text>
        <Button title="Log Out" onPress={handleLogout} color="#ff6347" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 20,
    borderRadius: 10,
  },
  greeting: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Home;
