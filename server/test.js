const axios = require('axios');

const _admin = {
  uuid: 'cb5d9303-7680-4f64-963b-e6a3c963586e',
  user_id: 'test01',
  pw_hash: 'password01',
  name: '이름1',
  salt: 'salt1',
  access: true,
  created_at: '2021-12-21T12:00:15.637Z',
}

const _user = {
  uuid: 'e520cf4b-ca0e-4af8-a790-105727623166',
  user_id: 'test02',
  pw_hash: 'password02',
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

const server = 'http://localhost';

function idpw(account) {
  const { user_id, pw_hash } = account;
  return { user_id, pw_hash };
}

const [admin, user] = [idpw(_admin), idpw(_user)];

function signIn({ user_id, pw_hash }) {
  // POST /user/sign-in
  return axios.post(`${server}/user/sign-in`, { user_id, pw_hash })
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
  return axios.post(`${server}/user/sign-up`, { user_id, pw_hash, name })
    .then((resp) => {
      console.log('    ==== POST /user/sign-up', resp.status);
      uuid = resp.data.uuid;
    })

    // POST /user/sign-in
    .then(() => signIn({ user_id, pw_hash }))
      .then((auth) => { headers = auth; })

    // GET /user/:uuid
    .then(() => {
      return axios.get(`${server}/user/${uuid}`, { headers })
        .then((resp) => {
          console.log('    ==== GET /user/:uuid', resp.status);
        })
    })

    // PATCH /user/:uuid
    .then(() => {
      return axios.patch(`${server}/user/${uuid}`, { name: 'changedNewName' }, { headers })
        .then((resp) => {
          console.log('    ==== PATCH /user/:uuid', resp.status);
        })
    })

    // DELETE /user/:uuid
    .then(() => {
      return axios.delete(`${server}/user/${uuid}`, { headers })
        .then((resp) => {
          console.log('    ==== DELETE /user/:uuid', resp.status);
        })
    })

    .then(() => { console.log('') });

}

function testAnnouncement({ user_id, pw_hash }) {

  console.log('==== Announcement API');
  // entrypoint
  let headers, uuid;
  return signIn({ user_id, pw_hash }).then((auth) => { headers = auth })

    // GET /announcement
    .then(() => {
      return axios.get(`${server}/announcement/7d7e2be6-1319-44e7-8e91-7d2474c3a71d`)
        .then((resp) => {
          console.log('    ==== GET /announcement', resp.status);
        })
    })
  //
    // POST /announcement
    .then(() => {
      return axios.post(
        `${server}/announcement/`,
        { title: 'newTitle', content: 'Lorem ipsum dolor sit amet'},
        { headers },
      ).then((resp) => {
        uuid = resp.data.uuid;
        console.log('    ==== POST /announcement', resp.status)
      })
    })


    // GET /announcement/:uuid
    .then(() => {
      return axios.get(`${server}/announcement/${uuid}`)
        .then((resp) => {
          console.log('    ==== GET /announcement/:uuid', resp.status);
        })
    })

    // PATCH /announcement/:uuid
    .then(() => {
      return axios.patch(
        `${server}/announcement/${uuid}`,
        { title: 'changedTitle', content: 'Lorem ipsum dolor sit amet'},
        { headers },
      ).then(resp => console.log('    ==== PATCH /announcement/:uuid', resp.status)); // 204
    })

    // DELETE /announcement/:uuid
    .then(() => {
      return axios.delete(
        `${server}/announcement/${uuid}`,
        { headers },
      ).then(resp => console.log('    ==== DELETE /announcement/:uuid', resp.status)); // 204
    })

    .then(() => { console.log(''); })

}

testUser()
  .then(() => testAnnouncement(admin))
;
