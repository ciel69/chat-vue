import * as R from 'ramda';
import {Reqest} from '~/model';

// Геттер для получения данных пришедших от аполло
export const getData = <T>(req: Reqest<T>): T => {
  // @ts-ignore
  return R.compose(
    R.head,
    // @ts-ignore
    R.values,
    R.path(['data'])
    // @ts-ignore
  )(req);
};
