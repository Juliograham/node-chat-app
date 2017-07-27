const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    beforeEach(() => {
      users = new Users();
      users.users = [{
          id: '1',
          name: 'Mike',
          room: 'Test'
      }, {
          id: '2',
          name: 'Norm',
          room: 'Holdup'
      }, {
          id: '3',
          name: 'Olaf',
          room: 'Test'
      }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '111',
            name: 'Julio',
            room: 'Valor'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
      let userId = '1';
      let user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
      let userId = '50';
      let user = users.removeUser(userId);

      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
      let userId = '2';
      let user = users.getUser(userId);

      expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
      let userId = '50';
      let user = users.getUser(userId);

      expect(user).toNotExist();
    });

    it('should return names for Test room', () => {
      let userList = users.getUserList('Test');

      expect(userList).toEqual(['Mike', 'Olaf']);
    });
    
    it('should return names for Holdup room', () => {
      let userList = users.getUserList('Holdup');

      expect(userList).toEqual(['Norm']);
    });
});