import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { FAB, Portal, Dialog, Button, TextInput, List, Avatar, RadioButton } from 'react-native-paper';
import ContactItem from '../components/Contactltem';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
    const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ title: 'Meus Contatos' });
  }, [navigation]);
  const [contacts, setContacts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('pessoal');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const openDialog = (contact = null) => {
    if (contact) {
      setEditing(contact);
      setName(contact.name);
      setPhone(contact.phone);
      setCategory(contact.category);
    } else {
      setEditing(null);
      setName('');
      setPhone('');
      setCategory('pessoal');
    }
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
    setEditing(null);
    setName('');
    setPhone('');
    setCategory('pessoal');
  };

  const saveContact = () => {
    if (editing) {
      setContacts(contacts.map(c => c.id === editing.id ? { ...editing, name, phone, category } : c));
    } else {
      setContacts([...contacts, { id: Date.now().toString(), name, phone, category }]);
    }
    closeDialog();
  };

  const askDelete = (contact) => {
    setToDelete(contact);
    setConfirmDelete(true);
  };

  const confirmDeleteContact = () => {
    setContacts(contacts.filter(c => c.id !== toDelete.id));
    setConfirmDelete(false);
    setToDelete(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onEdit={() => openDialog(item)}
            onDelete={() => askDelete(item)}
          />
        )}
        ListEmptyComponent={<List.Item title="Nenhum contato cadastrado" />}
      />

      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => openDialog()}
      />

      
      <Portal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>{editing ? 'Editar Contato' : 'Novo Contato'}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nome"
              value={name}
              onChangeText={setName}
              style={{ marginBottom: 8 }}
            />
            <TextInput
              label="Telefone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={{ marginBottom: 8 }}
            />
            <RadioButton.Group onValueChange={setCategory} value={category}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="pessoal" />
                <List.Item title="Pessoal" />
                <RadioButton value="trabalho" />
                <List.Item title="Trabalho" />
                <RadioButton value="familia" />
                <List.Item title="Família" />
              </View>
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={saveContact}>{editing ? 'Salvar' : 'Adicionar'}</Button>
          </Dialog.Actions>
        </Dialog>

       
        <Dialog visible={confirmDelete} onDismiss={() => setConfirmDelete(false)}>
          <Dialog.Title>Excluir contato?</Dialog.Title>
          <Dialog.Content>
            <List.Item title={`Deseja excluir ${toDelete?.name}?`} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDelete(false)}>Cancelar</Button>
            <Button onPress={confirmDeleteContact}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}