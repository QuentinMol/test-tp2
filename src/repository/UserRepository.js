//Quentin Molinié - FIPA 3
//UserRepositoryTest - Complétion
//04/02/2018



/**
 *
 * @param db
 * @constructor
 */
var UserRepository = function (db) {
    this.db = db;
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.create = function (user) {

    if (!user) {
        throw 'User object is undefined';
    }

    if (!user.id || !user.firstname || !user.lastname || !user.birthday) {
        throw 'User object is missing information';
    }

    var userData = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        birthday: user.birthday
    };

    this.db
        .get('users')
        .push(userData)
        .write()
};

/**
 *
 * @param {number} id
 * @return User
 */
UserRepository.prototype.findOneById = function (id) {
    
    if(!id){
        throw 'User object is missing information';
    }

    return this.db
           .get('users')
           .find({ id: id })
           .value()

};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.update = function (user) {

    if (!user) {
        throw 'User object is undefined';
    }

    if (!user.id || !user.firstname || !user.lastname || !user.birthday) {
        throw 'User object is missing information';
    }


    this.db
        .get('users')
        .find({ id: user.id })
        .assign({ firstname: user.firstname }, { lastname: user.lastname }, { birthday: user.birthday })
        .value()

};

/**
 *
 * @param {number} id
 */
UserRepository.prototype.delete = function (id) {

    if(!id){
        throw 'User object is missing information';
    }

    return this.db
           .get('users')
           .unset(id)
           .value()

};


module.exports = UserRepository;


