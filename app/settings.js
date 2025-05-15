import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="titleLarge">Configurações</Text>
      <Text>Exemplo de tela de configurações.</Text>
    </View>
  );
}