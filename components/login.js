import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
//   function handle login
  const handleLogin =async () => {
    // console.log(email);
  console.log('Login button clicked'); 
    try {
        // Sending login request to the backend
        const response = await axios.post('http://localhost:5000/api/login', {
          email:email,
          password:password
        });
       const token=response.data.token
        if (response.data) {
          console.log('Login successful:', response.data);
          // Store token or user data in AsyncStorage if needed
    await AsyncStorage.setItem('jwt_token',token);
    console.log('Token saved successfully');
          navigation.navigate('Home');
        } else {
          setError('Invalid credentials!');
        }
        const savedToken = await AsyncStorage.getItem('jwt_token');
    if (savedToken === token) {
      console.log('Token verified successfully:', savedToken);
    } else {
      console.error('Token mismatch!');
    }
      } catch (err) {
        console.error('Error during login:',err);
        setError('Something went wrong. Please try again.');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} />
      <Text style={styles.switchText} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  switchText: {
    marginTop: 15,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default Login;
