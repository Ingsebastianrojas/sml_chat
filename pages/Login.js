import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ setUser, setScreen }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {

      
      const API_URL ='http://192.168.7.162:8082/auth/Login';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const text = await response.text();
      console.log("Respuesta cruda:", text);

      if (!response.ok) {
        alert("Error del servidor");
        return;
      }

      const data = JSON.parse(text);

      if (!data || !data.id) {
        alert("Usuario no existe");
        return;
      }

      setUser(data);

      //  Redirección por rol
      if (data.rol === 'ADMIN') setScreen('admin');
      else if (data.rol === 'COCINERO') setScreen('cocina');
      else if (data.rol === 'REPARTIDOR') setScreen('reparto');
      else setScreen('home');

    } catch (error) {
      console.log("ERROR:", error);
      alert("Error conectando al servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('register')}>
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'black' }}>
          Crear cuenta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
}
);