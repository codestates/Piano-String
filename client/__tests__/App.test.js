/* global expect, test */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../src/App';
import SignInPage from '../src/pages/SignIn';
import nock from 'nock';

// TODO: use dotenv
describe('SignInPage test', () => {

  it('Click sign-in button', (done) => {
    const API_SERVER = 'https://piano-string.com';
    const scope = nock(API_SERVER)
      .post('/sign-in')
      .reply(200, {data: {accessToken: 'fake access token'}})
    const { container, getByRole } = render(<SignInPage />);
    userEvent.click(getByRole('button'));

    setTimeout(() => {
      const count = scope.interceptors[0].interceptionCounter;
      console.log(count);
      expect(count).toBe(1);
      done();
    })
  })

})
