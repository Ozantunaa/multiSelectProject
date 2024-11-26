import { Text, View, SafeAreaView } from 'react-native';
import CharacterSelect from './src/components/CharacterSelect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="bg-white flex-1">
        <CharacterSelect />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

