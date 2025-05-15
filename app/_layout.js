import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

export default function Layout() {

  return (
    <PaperProvider theme={DefaultTheme}>
      <Stack />
    </PaperProvider>
  );
}