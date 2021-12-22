const userState = {
  isSignedIn: true,
  uuid: 'c04c889f-18f7-4645-8cee-17292222ffd5',
  info: {
    userId: 'user',
    name: 'wandu',
  },
  password: 'mypassword1234',
  pw_hash: 'b803c54fcf790679cd590b29be99934ebc28271460fe1ee7f1f43d32b2e0fd18',
};

const music = {
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
};

export { music, userState };
