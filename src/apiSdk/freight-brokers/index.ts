import axios from 'axios';
import queryString from 'query-string';
import { FreightBrokerInterface, FreightBrokerGetQueryInterface } from 'interfaces/freight-broker';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFreightBrokers = async (
  query?: FreightBrokerGetQueryInterface,
): Promise<PaginatedInterface<FreightBrokerInterface>> => {
  const response = await axios.get('/api/freight-brokers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFreightBroker = async (freightBroker: FreightBrokerInterface) => {
  const response = await axios.post('/api/freight-brokers', freightBroker);
  return response.data;
};

export const updateFreightBrokerById = async (id: string, freightBroker: FreightBrokerInterface) => {
  const response = await axios.put(`/api/freight-brokers/${id}`, freightBroker);
  return response.data;
};

export const getFreightBrokerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/freight-brokers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFreightBrokerById = async (id: string) => {
  const response = await axios.delete(`/api/freight-brokers/${id}`);
  return response.data;
};
