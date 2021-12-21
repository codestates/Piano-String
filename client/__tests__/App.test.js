/* global expect, test */
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../src/App';
import SignInPage from '../src/pages/SignIn';
import SignUpPage from '../src/pages/SignUp';
import nock from 'nock';
import appConfig from '../src/app.config';

const { API_SERVER } = appConfig;

axios.defaults.host = 'http://localhost';
axios.defaults.adapter = httpAdapter;

global.crypto = require('crypto').webcrypto;
global.TextEncoder = require('util').TextEncoder;

const mock = {
  useNavigate: jest.fn(),
  setUserState: () => new Promise(() => {})
}

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mock.useNavigate
}));

describe('SignInPage test', () => {

  it('Click sign-in button', (done) => {
    const scope = nock(API_SERVER)
       // .defaultReplyHeaders({
       //  'access-control-allow-origin': '*'
       // })
      .post('/sign-in', (body) => {
        return body.id && body.pw_hash && body.pw_hash.length === 64;
      })
      .reply(200, {accessToken: 'fake access token'})
    const { getByLabelText, getByRole } = render(<SignInPage setUserState={ mock.setUserState }/>);

    fireEvent.change(
      getByLabelText(/^id$/i, { selector: 'input' }),
      { target: { value: 'user' } }
    );
    fireEvent.change(
      getByLabelText(/^password$/i, { selector: 'input' }),
      { target: { value: 'password' } }
    );
    userEvent.click(getByRole('button', { name: /sign ?in/i }));

    setTimeout(() => {
      const count = scope.interceptors[0].interceptionCounter;
      expect(count).toBe(1);
      expect(mock.useNavigate).toHaveBeenCalledWith('/');
      scope.done();
      done();
    }, 100)
  })

})

describe('SignUpPage test', () => {

  it('Click sign-up button', (done) => {
    const scope = nock(API_SERVER)
      .post('/sign-up', (body) => {
        return body.id && body.pw_hash && body.name && body.pw_hash.length === 64;
      })
      .reply(200, { access_token: 'fake access token' })
    const {
      getAllByPlaceholderText,
      getByPlaceholderText,
      getByRole
    } = render(<SignUpPage setUserState={ mock.setUserState }/>);

    fireEvent.change(getByPlaceholderText(/^id$/i), { target: { value: 'userid' } });
    fireEvent.change(getByPlaceholderText(/^username$/i), { target: { value: 'username' } });
    getAllByPlaceholderText(/password/i).forEach(node => {
      fireEvent.change(node, { target: { value: 'userpassword' }})
    })
    userEvent.click(getByRole('button', { name: /sign ?up/i }));
    setTimeout(() => {
      expect(scope.interceptors[0].interceptionCounter).toBe(1);
      expect(mock.useNavigate).toHaveBeenCalledWith('/');
      scope.done();
      done();
    }, 100)
  })

})
