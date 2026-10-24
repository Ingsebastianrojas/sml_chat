import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const API_URL = "http://192.168.56.1:8082/pedidos/1"; // cambia el ID

export default function UsuarioScreen() {
  const [pedido, setPedido] = useState(null);

  const cargarPedido = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPedido(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPedido();
    const interval = setInterval(cargarPedido, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!pedido) {
    return <Text>Cargando...</Text>;
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}> Estado: {pedido.estado}</Text>

      <MapView
        style={styles.map}
        region={{
          latitude: pedido.latitud || 4.6097,
          longitude: pedido.longitud || -74.0817,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {pedido.latitud && pedido.longitud && (
          <Marker
            coordinate={{
              latitude: pedido.latitud,
              longitude: pedido.longitud,
            }}
            title="Tu pedido "
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});