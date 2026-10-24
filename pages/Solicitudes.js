import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Menu({ theme, carrito = [], setCarrito }) {

  const nuevosProductos = [
    { id: 1, nombre: 'Chispa & Crujido', descripcion: 'Explosión de sabor', precio: 6.5, imagen: 'https://i.pinimg.com/1200x/32/ee/85/32ee85a332705e0da35ec1995d792017.jpg' },
    { id: 2, nombre: 'Mega Burger', descripcion: 'Doble carne + queso', precio: 8.0, imagen: 'https://i.pinimg.com/1200x/2a/e2/cc/2ae2cca2df5c972d3e3928de84e1bc0e.jpg' },
    { id: 3, nombre: 'Papas Explosivas', descripcion: 'Con salsa especial', precio: 4.0, imagen: 'https://i.pinimg.com/1200x/5b/7c/f5/5b7cf559f5fc7a049855f564abe5f198.jpg' }
  ];

  return (
    <ScrollView
      style={[styles.container, theme.container]}
      contentContainerStyle={{ paddingBottom: 80 }}
    >

      <Text style={[styles.sectionTitle, theme.text]}>
        Productos
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {nuevosProductos.map(item => (
          <TouchableOpacity key={item.id}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, theme.text]}>
        Recién llegado
      </Text>

      {nuevosProductos.map(item => (
        <View key={item.id} style={styles.card}>

          <Image source={{ uri: item.imagen }} style={styles.newImage} />

          <View style={styles.content}>
            <Text style={[styles.title, theme.text]}>
              {item.nombre}
            </Text>

            <Text style={theme.text}>
              {item.descripcion}
            </Text>

            <Text style={styles.price}>
              ${item.precio}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const existe = carrito.find(p => p.id === item.id);

                if (existe) {
                  setCarrito(
                    carrito.map(p =>
                      p.id === item.id
                        ? { ...p, cantidad: (p.cantidad || 1) + 1 }
                        : p
                    )
                  );
                } else {
                  setCarrito([...carrito, { ...item, cantidad: 1 }]);
                }
              }}
            >
              <Icon name="shopping-cart" size={20} color="#fff" />
              <Text style={styles.buttonText}> Agregar</Text>
            </TouchableOpacity>

          </View>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  image: {
    width: 250,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  newImage: {
    width: 100,
    height: 100,
    borderRadius: 10
  },

  content: {
    flex: 1,
    marginLeft: 10
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  price: {
    color: 'green',
    marginTop: 5
  },

  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  buttonText: {
    color: '#fff',
    marginLeft: 5
  }
});