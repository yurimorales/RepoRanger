import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('app', 'user', 'password', {
  host: 'db',
  dialect: 'mariadb',
});