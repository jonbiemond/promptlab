import { createMocks } from 'node-mocks-http';
import { POST as handler } from '../route';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('message route', () => {
  it('should return 400 if no message is provided', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {},
    });

    const res = await handler(req);

    expect(res.statusText).toBe(400);
    expect(await res.text()).toBe(JSON.stringify({ message: 'Message is required' }));
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

    const { req } = createMocks({
      method: 'POST',
      body: {
        message: 'Hello',
      },
    });

    const res = await handler(req);

    expect(res.status).toBe(500);
    expect(await res.text()).toBe(JSON.stringify({ error: 'No response from AI model' }));

    // Clear the mock after the test
    jest.resetModules();
  });

  it('should return 200 if message is provided and AI model responds', async () => {
    jest.mock('openai', () => {
      return {
        OpenAI: jest.fn().mockImplementation(() => {
          return {
            chat: {
              completions: {
                create: jest.fn().mockImplementation(() => {
                  return Promise.resolve({choices: [{message: {content: 'Test response'}}]});
                }),
              },
            },
          };
        }),
      };
    });

    const { req } = createMocks({
      method: 'POST',
      body: {
        message: 'Hello',
      },
    });

    const res = await handler(req);

    expect(res.statusText).toBe(200);
    // expect(res.message).toBe('Test response');

    // Clear the mock after the test
    jest.resetModules();
  });
});