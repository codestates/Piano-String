const axios = require('axios');

const https = require('https');
const fs = require('fs');
https.globalAgent.options.ca = fs.readFileSync('./fullchain')

const _admin = {
  uuid: 'cb5d9303-7680-4f64-963b-e6a3c963586e',
  user_id: 'test01',
  pw_hash: '4b8f353889d9a05d17946e26d014efe99407cba8bd9d0102d4aab10ce6229043',
  name: '이름1',
  salt: 'salt1',
  access: true,
  created_at: '2021-12-21T12:00:15.637Z',
}

const _guest = {
  uuid: 'e520cf4b-ca0e-4af8-a790-105727623166',
  user_id: 'test02',
  pw_hash: '08f0d4cb02352f2f7fd251fbbe1c9aa5fd176bb0c7f1bd35e4f71a8dcb820852',
  name: 'name2',
  access: false,
  created_at: new Date(),
}

const newUser = {
  user_id: 'newid001',
  name: 'newname001',
  pw_hash: 'newpw001',
  created_at: '2021-12-21T12:00:15.637Z',
}

const music = {
  content: {
    notes: [
      { pitch: 60, startTime: 0.0, endTime: 0.5 },
      { pitch: 60, startTime: 0.5, endTime: 1.0 },
      { pitch: 67, startTime: 1.0, endTime: 1.5 },
      { pitch: 67, startTime: 1.5, endTime: 2.0 },
      { pitch: 69, startTime: 2.0, endTime: 2.5 },
      { pitch: 69, startTime: 2.5, endTime: 3.0 },
      { pitch: 67, startTime: 3.0, endTime: 4.0 },
      { pitch: 65, startTime: 4.0, endTime: 4.5 },
      { pitch: 65, startTime: 4.5, endTime: 5.0 },
      { pitch: 64, startTime: 5.0, endTime: 5.5 },
      { pitch: 64, startTime: 5.5, endTime: 6.0 },
      { pitch: 62, startTime: 6.0, endTime: 6.5 },
      { pitch: 62, startTime: 6.5, endTime: 7.0 },
      { pitch: 60, startTime: 7.0, endTime: 8.0 },
    ],
    totalTime: 8,
  },
}

const article = {
  title: 'newTitle',
  content: 'newContent',
  music,
  tag: ['new', 'article', 'music'],
}

const host = 'https://localhost';

function to(path) {
  return `${host}/${path}`;
}

function idpw(account) {
  const { user_id, pw_hash } = account;
  return { user_id, pw_hash };
}

const [admin, guest] = [idpw(_admin), idpw(_guest)];

function signIn({ user_id, pw_hash }) {
  // POST /user/sign-in
  return axios.post(`${host}/user/sign-in`, { user_id, pw_hash })
    .then((resp) => {
      console.log('    ==== POST /user/sign-in', resp.status);
      return { Authorization: 'Bearer ' + resp.data.access_token };
    })
}

function testUser() {
  console.log('==== User API');

  const [user_id, pw_hash, name] = ['newId', 'newPw', 'newName'];

  let account, headers, uuid;

  // POST /user/sign-up
  return axios.post(`${host}/user/sign-up`, { user_id, pw_hash, name })
    .then((resp) => {
      console.log('    ==== POST /user/sign-up', resp.status);
      uuid = resp.data.uuid;
    })

    // POST /user/sign-in
    .then(() => signIn({ user_id, pw_hash }))
      .then((auth) => { headers = auth; })

    // GET /user/:uuid
    .then(() => {
      return axios.get(`${host}/user/${uuid}`, { headers })
        .then((resp) => {
          console.log('    ==== GET /user/:uuid', resp.status);
        })
    })

    // PATCH /user/:uuid
    .then(() => {
      return axios.patch(`${host}/user/${uuid}`, { name: 'changedNewName' }, { headers })
        .then((resp) => {
          console.log('    ==== PATCH /user/:uuid', resp.status);
        })
    })

    // DELETE /user/:uuid
    .then(() => {
      return axios.delete(`${host}/user/${uuid}`, { headers })
        .then((resp) => {
          console.log('    ==== DELETE /user/:uuid', resp.status);
        })
    })

    .then(() => { console.log('') });

}

function testAnnouncement({ user_id, pw_hash }) {

  console.log('==== Announcement API');
  let headers, uuid;

  // POST /user/sign-in
  return signIn({ user_id, pw_hash }).then((auth) => { headers = auth })

    // GET /announcement
    .then(() => {
      return axios.get(`${host}/announcement/7d7e2be6-1319-44e7-8e91-7d2474c3a71d`)
        .then((resp) => {
          console.log('    ==== GET /announcement', resp.status);
        })
    })
  //
    // POST /announcement
    .then(() => {
      return axios.post(
        `${host}/announcement/`,
        { title: 'newTitle', content: 'Lorem ipsum dolor sit amet'},
        { headers },
      ).then((resp) => {
        uuid = resp.data.uuid;
        console.log('    ==== POST /announcement', resp.status)
      })
    })


    // GET /announcement/:uuid
    .then(() => {
      return axios.get(`${host}/announcement/${uuid}`)
        .then((resp) => {
          console.log('    ==== GET /announcement/:uuid', resp.status);
        })
    })

    // PATCH /announcement/:uuid
    .then(() => {
      return axios.patch(
        `${host}/announcement/${uuid}`,
        { title: 'changedTitle', content: 'Lorem ipsum dolor sit amet'},
        { headers },
      ).then(resp => console.log('    ==== PATCH /announcement/:uuid', resp.status)); // 204
    })

    // DELETE /announcement/:uuid
    .then(() => {
      return axios.delete(
        `${host}/announcement/${uuid}`,
        { headers },
      ).then(resp => console.log('    ==== DELETE /announcement/:uuid', resp.status)); // 204
    })

    .then(() => { console.log(''); })

}

function testArticle() {
  console.log('==== Article API');

  let headers, uuid;

  // POST /user/sign-in
  return signIn(guest).then((auth) => { headers = auth })

    // GET /article
    .then(() => {
      return axios.get(to('article'), { headers })
        .then(resp => console.log('    ==== GET /article', resp.status))
    })

    // POST /article
    .then(() => {
      return axios.post(to('article'), article, { headers })
        .then(resp => {
          uuid = resp.data.uuid;
          console.log('    ==== POST /article', resp.status);
        })
    })

    // GET /article/:uuid
    .then(() => {
      return axios.get(to(`article/${uuid}`), { headers })
        .then(resp => console.log('    ==== GET /article/:uuid', resp.status));
    })

    // PATCH /article/:uuid
    .then(() => {
      return axios.patch(to(`article/${uuid}`), { title: 'changedTitle', content: 'changedContent' }, { headers })
        .then(resp => console.log('    ==== PATCH /article/:uuid', resp.status));
    })

    // DELETE /article/:uuid
    .then(() => {
      return axios.delete(to(`article/${uuid}`), { headers })
        .then(resp => console.log('    ==== DELETE /article/:uuid', resp.status));
    })

    .then(() => console.log(''));
}

testUser()
  .then(() => testAnnouncement(admin))
  .then(() => testArticle())
;
