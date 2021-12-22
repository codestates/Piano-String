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
      uuid: 'd2cd7b4c-42bc-4ebe-879d-e046f09dccb4',
      account_uuid: 'cb5d9303-7680-4f64-963b-e6a3c963586e',
      title: '테스트 타이틀-01',
      content: '테스트 콘텐츠입니다! 무려 1번째죠!',
      created_at: new Date('2021-12-22 06:01:52')
    }, {
      uuid: '7d7e2be6-1319-44e7-8e91-7d2474c3a71d',
      account_uuid: 'cb5d9303-7680-4f64-963b-e6a3c963586e',
      title: '#테스트타이틀#02',
      content: '테스트를 위해 입력된 데이터 중 2번째입니다. (It\'s second data.)',
      created_at: new Date('2021-12-11 12:03:37')
    }, {
      uuid: '7d7e2be6-1319-44e7-8e91-7d2474c3a71d',
      account_uuid: 'e520cf4b-ca0e-4af8-a790-105727623166',
      title: 'test title***03***',
      content: '考试题目03 (시험제목03)',
      created_at: new Date('2021-12-20 00:00:00')
    }];
    await queryInterface.bulkInsert('announcement', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('announcement', null, {});
  }
};
