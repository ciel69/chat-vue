import {Expose} from 'class-transformer';

export class User {

  @Expose()
  id?: number;

  @Expose()
  firstName?: number;

  @Expose()
  lastName?: number;

  @Expose()
  email?: number;

  @Expose()
  login?: number;

  @Expose()
  token?: any;

}
