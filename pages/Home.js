import { useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CHATS_INICIALES = [
  {
    id: '1',
    nombre: 'María Rodríguez',
    mensaje: '¡Hola! ¿Cómo va el proyecto?',
    hora: '10:42',
    noLeidos: 2,
    online: true,
    tipo: 'privado',
    color: '#DCE9FF',
    iniciales: 'MR',
  },
  {
    id: '2',
    nombre: 'Equipo de desarrollo',
    mensaje: 'Carlos: Ya subí los cambios al repositorio',
    hora: '10:30',
    noLeidos: 4,
    online: false,
    tipo: 'grupo',
    color: '#D9F5E5',
    iniciales: 'ED',
  },
  {
    id: '3',
    nombre: 'Andrés Martínez',
    mensaje: 'Perfecto, nos vemos mañana.',
    hora: '09:15',
    noLeidos: 0,
    online: true,
    tipo: 'privado',
    color: '#FBE5D6',
    iniciales: 'AM',
  },
  {
    id: '4',
    nombre: 'Laura Gómez',
    mensaje: '¿Me puedes enviar el documento?',
    hora: 'Ayer',
    noLeidos: 0,
    online: false,
    tipo: 'privado',
    color: '#F1DFFF',
    iniciales: 'LG',
  },
  {
    id: '5',
    nombre: 'Proyecto SML Chat',
    mensaje: 'Tú: Revisemos la seguridad del backend',
    hora: 'Ayer',
    noLeidos: 0,
    online: false,
    tipo: 'grupo',
    color: '#DDF4F4',
    iniciales: 'SC',
  },
];

export default function HomeScreen({ theme, navigation, onOpenChat }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [chats, setChats] = useState(CHATS_INICIALES);

  const colores = {
    fondo: '#F7F9FC',
    superficie: '#FFFFFF',
    texto: '#172033',
    secundario: '#8490A3',
    primario: '#246BFD',
    borde: '#E9EDF4',
  };

  const chatsFiltrados = useMemo(() => {
    return chats.filter((chat) => {
      const coincideBusqueda =
        chat.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        chat.mensaje.toLowerCase().includes(busqueda.toLowerCase());

      const coincideFiltro =
        filtro === 'Todos' ||
        (filtro === 'No leídos' && chat.noLeidos > 0) ||
        (filtro === 'Grupos' && chat.tipo === 'grupo');

      return coincideBusqueda && coincideFiltro;
    });
  }, [busqueda, filtro, chats]);

  const abrirChat = (chat) => {
    if (onOpenChat) {
      onOpenChat(chat);
      return;
    }

    if (navigation) {
      navigation.navigate('Chat', { chat });
      return;
    }

    console.log('Chat seleccionado:', chat.nombre);
  };

  const iniciarConversacion = () => {
    if (navigation) {
      navigation.navigate('NewChat');
    } else {
      console.log('Abrir selección de contactos');
    }
  };

  const renderAvatar = (chat) => (
    <View
      style={[
        styles.avatar,
        { backgroundColor: chat.color },
      ]}
    >
      <Text style={styles.avatarText}>{chat.iniciales}</Text>

      {chat.online && (
        <View style={styles.onlineIndicator} />
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colores.fondo }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colores.fondo} />

      {/* ENCABEZADO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>SML Chat</Text>
          <Text style={styles.subtitle}>Mensajes seguros</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation?.navigate('Profile')}
          accessibilityLabel="Abrir perfil"
        >
          <Text style={styles.profileInitials}>TÚ</Text>
        </TouchableOpacity>
      </View>

      {/* BUSCADOR */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          placeholder="Buscar conversaciones..."
          placeholderTextColor={colores.secundario}
          value={busqueda}
          onChangeText={setBusqueda}
          style={styles.searchInput}
          returnKeyType="search"
          accessibilityLabel="Buscar conversaciones"
        />

        {busqueda.length > 0 && (
          <TouchableOpacity onPress={() => setBusqueda('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* FILTROS */}
      <View style={styles.filters}>
        {['Todos', 'No leídos', 'Grupos'].map((opcion) => {
          const seleccionado = filtro === opcion;

          return (
            <TouchableOpacity
              key={opcion}
              onPress={() => setFiltro(opcion)}
              style={[
                styles.filterButton,
                seleccionado && styles.filterSelected,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  seleccionado && styles.filterTextSelected,
                ]}
              >
                {opcion}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LISTA DE CONVERSACIONES */}
      <ScrollView
        style={styles.chatList}
        contentContainerStyle={styles.chatListContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mensajes</Text>
          <Text style={styles.chatCount}>
            {chatsFiltrados.length} conversaciones
          </Text>
        </View>

        {chatsFiltrados.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyTitle}>
              No hay conversaciones
            </Text>
            <Text style={styles.emptyDescription}>
              Prueba otra búsqueda o inicia un nuevo chat.
            </Text>
          </View>
        ) : (
          chatsFiltrados.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => abrirChat(chat)}
              activeOpacity={0.7}
            >
              {renderAvatar(chat)}

              <View style={styles.chatInfo}>
                <View style={styles.chatTopRow}>
                  <Text style={styles.chatName} numberOfLines={1}>
                    {chat.nombre}
                  </Text>

                  <Text
                    style={[
                      styles.chatTime,
                      chat.noLeidos > 0 && styles.unreadTime,
                    ]}
                  >
                    {chat.hora}
                  </Text>
                </View>

                <View style={styles.chatBottomRow}>
                  <Text
                    style={[
                      styles.lastMessage,
                      chat.noLeidos > 0 && styles.unreadMessage,
                    ]}
                    numberOfLines={1}
                  >
                    {chat.mensaje}
                  </Text>

                  {chat.noLeidos > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>
                        {chat.noLeidos}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* BOTÓN NUEVA CONVERSACIÓN */}
      <TouchableOpacity
        style={styles.newChatButton}
        onPress={iniciarConversacion}
        accessibilityLabel="Iniciar nueva conversación"
      >
        <Text style={styles.newChatIcon}>＋</Text>
        <Text style={styles.newChatText}>Nuevo chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },
  logo: {
    fontSize: 27,
    fontWeight: '800',
    color: '#172033',
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: 13,
    color: '#8490A3',
    marginTop: 3,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: '#246BFD',
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 20,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E9EDF4',
  },
  searchIcon: {
    fontSize: 26,
    color: '#8490A3',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#172033',
    paddingVertical: 8,
  },
  clearSearch: {
    fontSize: 17,
    color: '#8490A3',
    padding: 5,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 8,
    gap: 9,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9EDF4',
  },
  filterSelected: {
    backgroundColor: '#246BFD',
    borderColor: '#246BFD',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#667085',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#172033',
  },
  chatCount: {
    fontSize: 12,
    color: '#8490A3',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 53,
    height: 53,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#344054',
  },
  onlineIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#20C77A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    right: 0,
    bottom: 0,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F6',
  },
  chatTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  chatName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#172033',
  },
  chatTime: {
    fontSize: 11,
    color: '#8490A3',
  },
  unreadTime: {
    color: '#246BFD',
    fontWeight: '600',
  },
  chatBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    gap: 8,
  },
  lastMessage: {
    flex: 1,
    fontSize: 13,
    color: '#8490A3',
  },
  unreadMessage: {
    color: '#475467',
    fontWeight: '600',
  },
  unreadBadge: {
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    paddingHorizontal: 6,
    backgroundColor: '#246BFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 55,
  },
  emptyIcon: {
    fontSize: 38,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#172033',
  },
  emptyDescription: {
    fontSize: 13,
    color: '#8490A3',
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 20,
  },
  newChatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 54,
    borderRadius: 28,
    backgroundColor: '#246BFD',
    elevation: 5,
    shadowColor: '#246BFD',
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  newChatIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 7,
  },
  newChatText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
