import { logout } from './logout';
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

describe('logout', () => {
  it('Clears the token from browser storage when called', () => {
    const key = 'token';
    const value = 'string';
    storage.save(key, value);
    expect(storage.load(key)).toEqual(value);

    // Call function to clear local storage
    logout();
    expect(storage.load(key)).toEqual(null);
  });

  it('Clears the profile from browser storage when called', () => {
    const key = 'profile';
    const value = { name: 'name', email: 'email' };
    storage.save(key, value);
    expect(storage.load(key)).toEqual(value);

    // Call function to clear localstorage
    logout();
    expect(storage.load(key)).toEqual(null);
  });
});
