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
      pw_hash: '$argon2id$v=19$m=4096,t=3,p=1$O9K+vsnRxIlhNRE34K3cTQ$O5Su3JMD769qMpi97FUQJA0M0XLIc6F6N6JjZpo+vYc', // 'password01'
      name: 'name1',
      access: true,
      created_at: new Date(),
    }, {
      uuid: 'e520cf4b-ca0e-4af8-a790-105727623166',
      user_id: 'test02',
      pw_hash: '$argon2id$v=19$m=4096,t=3,p=1$9tdykJdBgB9DF8UCIrP7WQ$oYO3P/rsVB5mZF/YKelPg4Jh9gZICCg8nYML9EEhczk', // 'password02'
      name: 'name2',
      access: false,
      created_at: new Date(),
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
    await queryInterface.bulkDelete('account', null, {});
  }
};
