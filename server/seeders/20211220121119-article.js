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
      uuid: '501a5fe8-6741-469f-a745-762ee54d0679',
      account_uuid: 'cb5d9303-7680-4f64-963b-e6a3c963586e',
      music_uuid: '8fa0bbdf-6b54-43dd-8a68-9feeb064e6cc',
      title: '게시글 제목01',
      content: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
      created_at: new Date('2021-12-20 03:01:52')
    }, {
      uuid: '96779070-d8c5-4320-a315-797807eb96f3',
      account_uuid: 'cb5d9303-7680-4f64-963b-e6a3c963586e',
      music_uuid: '8fa0bbdf-6b54-43dd-8a68-9feeb064e6cc',
      title: '게시글 제목02',
      content: '내용2',
      created_at: new Date('2021-12-20 01:03:37')
    }, {
      uuid: 'c91dae32-d2bf-4c93-892d-46772d7a7954',
      account_uuid: 'e520cf4b-ca0e-4af8-a790-105727623166',
      music_uuid: '5a0da949-8ee4-4205-a552-81d3825ae5c2',
      title: '게시글 제목03!!!!!!!!',
      content: '내용 333333',
      created_at: new Date('2021-12-20 07:00:00')
    }];
    await queryInterface.bulkInsert('article', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('article', null, {});
  }
};
