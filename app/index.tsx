import CharacterSelect from '../src/components/CharacterSelect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <CharacterSelect />
        </QueryClientProvider>
    );
};