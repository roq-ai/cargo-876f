import { UserInterface } from 'interfaces/user';
import { FreightBrokerInterface } from 'interfaces/freight-broker';
import { GetQueryInterface } from 'interfaces';

export interface OfferInterface {
  id?: string;
  price: number;
  user_id?: string;
  freight_broker_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  freight_broker?: FreightBrokerInterface;
  _count?: {};
}

export interface OfferGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  freight_broker_id?: string;
}
