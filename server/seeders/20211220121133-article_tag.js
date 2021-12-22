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
      article_uuid: '501a5fe8-6741-469f-a745-762ee54d0679',
      tag_uuid: 'd862174f-be69-45e5-be2d-9bd83ea44dd3',
    }, {
      article_uuid: '501a5fe8-6741-469f-a745-762ee54d0679',
      tag_uuid: '81677b9b-8546-44c6-8538-a538218e5e3f',
    }, {
      article_uuid: '501a5fe8-6741-469f-a745-762ee54d0679',
      tag_uuid: '449b3407-6185-4620-a973-061d9a493db8',
    }, {
      article_uuid: '96779070-d8c5-4320-a315-797807eb96f3',
      tag_uuid: 'd862174f-be69-45e5-be2d-9bd83ea44dd3',
    }, {
      article_uuid: '96779070-d8c5-4320-a315-797807eb96f3',
      tag_uuid: '81677b9b-8546-44c6-8538-a538218e5e3f',
    }, {
      article_uuid: 'c91dae32-d2bf-4c93-892d-46772d7a7954',
      tag_uuid: 'd862174f-be69-45e5-be2d-9bd83ea44dd3',
    }];
    await queryInterface.bulkInsert('article_tag', data, {});
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
