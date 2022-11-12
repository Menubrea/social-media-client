import { login } from './login';
import * as storage from '../../storage/index.js';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(profile),
  });
}

function fetchFailure(status = 401, statusText = 'Invalid email/password') {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

const valid_credentials = {
  email: 'test@stud.noroff.no',
  password: '12345678',
};

const invalid_credentials = {
  email: 'test@test.no',
  password: '123',
};

const profile = {
  name: 'string',
  email: valid_credentials.email,
  accessToken: 'JWT',
  banner: 'string',
  avatar: 'string',
};

describe('Login', () => {
  it('Returns a valid token when provided with valid credentials', async () => {
    expect(storage.load('token')).toEqual(null);
    global.fetch = jest.fn(() => fetchSuccess());
    const { email, password } = valid_credentials;
    await login(email, password);
    expect(storage.load('token')).toEqual('JWT');
    storage.remove('profile');
  });

  it('Returns a valid profile when provided with valid credentials', async () => {
    expect(storage.load('profile')).toEqual(null);
    global.fetch = jest.fn(() => fetchSuccess());
    const { email, password } = valid_credentials;
    await login(email, password);
    expect(storage.load('profile')).toEqual(profile);
  });

  it('throws a new error with value of statusText if provided with invalid credentials', async () => {
    global.fetch = jest.fn(() => fetchFailure());
    const { email, password } = invalid_credentials;
    try {
      await login(email, password);
    } catch (e) {
      await expect(login).rejects.toThrow('Invalid email/password');
    }
  });
});
