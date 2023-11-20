import { createMocks } from 'node-mocks-http';
import handler from './route';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('message route', () => {
  it('should return 400 if no message is provided', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should return 500 if no response from AI model', async () => {
    jest.mock('openai', () => {
      return {
        OpenAI: jest.fn().mockImplementation(() => {
          return {
            chat: {
              completions: {
                create: jest.fn().mockImplementation(() => {
                  return Promise.resolve({choices: []});
                }),
              },
            },
          };
        }),
      };
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'Hello',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toBe(JSON.stringify({ error: 'No response from AI model' }));

    // Clear the mock after the test
    jest.resetModules();
  });

  it('should return 200 if message is provided', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'Hello',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  it('should return "This is a test"', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'Say this is a test',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain('This is a test');
  });
});