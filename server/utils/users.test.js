const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

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

});