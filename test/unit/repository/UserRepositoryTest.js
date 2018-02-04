//Quentin Molinié - FIPA 3
//UserRepositoryTest - Complétion
//04/02/2018


var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository", function() {

    //Cas nominal
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);
        repository.create({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });
        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });

    //Cas d'erreurs
    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });

});

describe("UserRepository_findOneById", function() {

    //Cas nominal
    it("should call db.value", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue({
            id: '123',
            firstname: 'Jean',
            lastname: 'Test',
            birthday: '21-01-2018'
        })

        var repository = new UserRepository(mockDb);
        var user = repository.findOneById('123');

        expect(user.id).toEqual('123');
        expect(user.firstname).toEqual('Jean');
        expect(user.lastname).toEqual('Test');
        expect(user.birthday).toEqual('21-01-2018');
        
        expect(mockDb.find).toHaveBeenCalledTimes(1);
    });

    //Cas d'erreurs
    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.findOneById();
        };

        expect(f).toThrow('User object is missing information')
    });

});

describe("UserRepository_Update", function() {

    //Cas nominal
    it("should call db.write with update", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'assign', 'find', 'value', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.assign.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue({
            id: '1',
            firstname: 'John',
            lastname: 'Doe',
            birthday: '2005-01-01'
        })

        var repository = new UserRepository(mockDb);
        repository.create({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.write).toHaveBeenCalledTimes(1);

        repository.update({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2005-01-01'
        });

        expect(mockDb.find).toHaveBeenCalledTimes(1);


    });

    //Cas d'erreurs
    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.update();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });

});

describe("UserRepository_Delete", function() {

    //Cas nominal
    it("should call db.value", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'unset', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.unset.and.returnValue(mockDb);
        mockDb.value.and.returnValue(true);

        var repository = new UserRepository(mockDb);
        var user = repository.delete('123');
        
        expect(mockDb.unset).toHaveBeenCalledTimes(1);
    });


    //Cas d'erreurs
    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.findOneById();
        };

        expect(f).toThrow('User object is missing information')
    });

});
