import React from 'react';
import { List, Avatar, IconButton } from 'react-native-paper';
import { View } from 'react-native';

const categoryIcon = {
  pessoal: 'account',
  trabalho: 'briefcase',
  familia: 'home-heart',
};

export default function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <List.Item
      title={contact.name}
      description={`${contact.phone} - ${contact.category}`}
      left={() => (
        <Avatar.Text
          label={contact.name[0]?.toUpperCase() || '?'}
          size={40}
          style={{ backgroundColor: '#e0e0e0', marginTop: 8 }}
        />
      )}
      right={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="pencil" onPress={onEdit} />
          <IconButton icon="delete" onPress={onDelete} />
        </View>
      )}
      style={{ borderBottomWidth: 1, borderColor: '#eee' }}
    />
  );
}