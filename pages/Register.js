import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Register({ setScreen }) {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleRegister = async () => {

  if (!nombre || !email || !password) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const response = await fetch('http://192.168.7.162:8080/auth/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        email,
        password,
        rol: "CLIENTE"
      })
    });

    if (response.ok) {
      alert("Usuario creado correctamente");

      // 🔥 REGRESA AL LOGIN
      setScreen('Login');

    } else {
      alert("No se pudo registrar");
    }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        onChangeText={setNombre}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    textAlign: 'center',
    marginBottom: 20
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
  },

  link: {
    marginTop: 15,
    textAlign: 'center',
    color: 'blue'
  }
});