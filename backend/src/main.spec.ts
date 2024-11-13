import { User } from './users/users.entity';

describe('User Interface', () => {
  it('should create a user with all properties', () => {
    const user: Partial<User> = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });

  it('should allow partial user creation', () => {
    const user: Partial<User> = {
      id: '2',
    };

    expect(user.id).toBe(2);
  });
});
