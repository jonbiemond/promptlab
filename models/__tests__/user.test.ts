import { UserModel } from '../user';

describe('UserModel', () => {
  let user: UserModel;

  beforeEach(() => {
    user = new UserModel('testUser', 'testPassword');
  });

  it('should initialize with correct values', () => {
    expect(user.username).toBe('testUser');
    expect(user.password_hash).toBe('testPassword');
    expect(user.recentSessions).toEqual([]);
  });

  it('should add session to recentSessions', () => {
    user.addSession('sessionId');
    expect(user.recentSessions?.length).toBe(1);
    expect(user.recentSessions?.[0]).toBe('sessionId');
  });

  it('should limit recentSessions to 10', () => {
    for (let i = 0; i < 15; i++) {
      user.addSession(`session${i}`);
    }
    expect(user.recentSessions?.length).toBe(10);
    expect(user.recentSessions?.[0]).toBe('session5');
  });
});