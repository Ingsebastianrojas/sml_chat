import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Config({ theme }) {
  return (
    <View style={styles.container}>
      <Text style={theme.text}> Configuración</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});