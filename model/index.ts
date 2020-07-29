export * from './state';
export * from './dialog';
export * from './users';

export interface Reqest<T> {
  data: Record<string, T>;
}

export interface Process {
  browser: boolean;
}

export interface Person {
  id: number;
  // eslint-disable-next-line camelcase
  first_name: string;
  // eslint-disable-next-line camelcase
  last_name: string;
  contact: Contact;
  gender: string;
  // eslint-disable-next-line camelcase
  ip_address: string;
  avatar: string;
  address: Address;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}

export interface IGraphql {
  query?: any;
  subscribe?: any;
  mutate?: any;
  fetchPolicy?: string;
  variables?: Record<string, any>;
}
