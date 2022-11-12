import { createPost } from './create';

// The create item(post) function creates a new item on the API
function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 201,
    statusText: 'OK',
    json: () => Promise.resolve(POST_ITEM),
  });
}

function fetchFailure(status = 400, statusText = 'Bad Request') {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

const POST_ITEM = {
  title: 'string',
  body: 'string',
  tags: ['string'],
  media: 'url',
};

const INVALID_POST_ITEM = {
  title: 4,
  body: true,
  tags: 53,
  media: false,
};

describe('CreatePost', () => {
  it('Creates a new post on the API if provided with valid data inputs', async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const post = await createPost();
    expect(post).toEqual(POST_ITEM);
  });

  it('throws a new error with value of statusText when provided with invalid data inputs', async () => {
    global.fetch = jest.fn(() => fetchFailure());
    try {
      await createPost(INVALID_POST_ITEM);
    } catch (e) {
      await expect(createPost).rejects.toThrow('Bad Request');
    }
  });
});
