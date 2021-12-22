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
      uuid: 'd862174f-be69-45e5-be2d-9bd83ea44dd3',
      title: 'tag1',
    }, {
      uuid: '81677b9b-8546-44c6-8538-a538218e5e3f',
      title: '태그2',
    }, {
      uuid: '449b3407-6185-4620-a973-061d9a493db8',
      title: '태그333333333',
    },
  ];
    await queryInterface.bulkInsert('tag', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tag', data, {});
  }
};
