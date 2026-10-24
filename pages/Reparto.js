import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

const API_URL = "http://192.168.7.162:8080/pedidos"; 


export default function RepartidorScreen() {
  const [pedidos, setPedidos] = useState([]);

  const cargarPedidos = async () => {
    try {
      const response = await fetch(`${API_URL}/estado/LISTO`);
      const data = await response.json();
      setPedidos(data);
    } catch (error) {r
      console.error("Error:", error);
    }
  };



  const iniciarEntrega = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/estado?estado=EN_CAMINO`, {
        method: "PUT",
      });

      Alert.alert(" Pedido en camino");
      cargarPedidos();
    } catch (error) {
      console.error(error);
    }
  };

  const finalizarEntrega = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/estado?estado=ENTREGADO`, {
        method: "PUT",
      });

      Alert.alert(" Pedido entregado");
      cargarPedidos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPedidos();
    const interval = setInterval(cargarPedidos, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text>Descripción: {item.descripcion}</Text>
      <Text>
        Tipo: {item.direccion ? "Domicilio " : "En local "}
      </Text>
      <Text>Estado: {item.estado}</Text>

      <Button
        title="Iniciar entrega"
        onPress={() => iniciarEntrega(item.id)}
      />

      <Button
        title="Finalizar entrega"
        onPress={() => finalizarEntrega(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Repartidor</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,  
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#e6f7ff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
});

