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
      pw_hash: '$argon2id$v=19$m=4096,t=3,p=1$aYj7X70nIg7ZPGOl+MpJwQ$uvvRJsS0Jjxvo6yOdrDRsK+g28qHdRGb+wnioAi129E', // '4b8f353889d9a05d17946e26d014efe99407cba8bd9d0102d4aab10ce6229043' by hashing 'password01'
      name: 'name1',
      access: true,
      created_at: new Date(),
    }, {
      uuid: 'e520cf4b-ca0e-4af8-a790-105727623166',
      user_id: 'test02',
      pw_hash: '$argon2id$v=19$m=4096,t=3,p=1$aSO0kgAn6VkSbMw9WNNL3g$OS5mrFKbzVc3RYoVZ0vu7VD6yZ3TuF7oIw2QjsoVzJs', // '08f0d4cb02352f2f7fd251fbbe1c9aa5fd176bb0c7f1bd35e4f71a8dcb820852' by hashing 'password02'
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
