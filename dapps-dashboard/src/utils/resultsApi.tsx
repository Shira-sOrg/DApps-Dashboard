import { useQuery } from 'react-query';

async function fetchResults(route: string, params: string) {
  let url = `http://127.0.0.1:5000/${route}?${params}`;
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Failed to fetch results');
  }
  try{
    return await response.json();
  } catch(error) {
    throw new Error('Error parsing response data')
  }
}

export default function useResults(route: string, params: string) {
  return useQuery(['results', params], () => fetchResults(route, params));
}