import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getCharacters = async (search: string) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character?name=${search}`);
  return response.data.results;
};

export const useCharacters = (search: string) => {
  return useQuery({
    queryKey: ['characters', search],
    queryFn: () => getCharacters(search),
    enabled: search.length > 0,
  });
};