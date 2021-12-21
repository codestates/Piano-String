'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [{
      uuid: 'cb5d9303-7680-4f64-963b-e6a3c963586e',
      user_id: 'test01',
      pw_hash: 'password01',
      name: '이름1',
      salt: 'salt1',
      access: true,
      created_at: new Date(),
      expired: false
    }, {
      uuid: 'e520cf4b-ca0e-4af8-a790-105727623166',
      user_id: 'test02',
      pw_hash: 'password02',
      name: '이름2',
      salt: 'salt2',
      access: false,
      created_at: new Date(),
      expired: false
    }];
    await queryInterface.bulkInsert('account', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
