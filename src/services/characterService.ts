import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/ constants'

const getCharacters = async ({ pageParam = 1, search = '' }) => {
  const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}?page=${pageParam}&name=${search}`);
  return response.data;
};

export const useCharacters = (search: string) => {
  return useInfiniteQuery({
    queryKey: ['characters', search],
    queryFn: ({ pageParam }) => getCharacters({ pageParam, search }),
    getNextPageParam: (lastPage: any) => {

      if (lastPage.info.next) {
        const nextPage = lastPage.info.next.split('page=')[1]?.split('&')[0];
        return parseInt(nextPage);
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: search.length > 0,
  });
};