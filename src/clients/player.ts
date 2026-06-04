import customAxios from '@/libs/axios';
import type { FindPlayersResponse } from '@/schema/response';

// B-001
export const findPlayers = async (): Promise<FindPlayersResponse> => {
  const response = await customAxios.get('/players');
  return response.data;
};
