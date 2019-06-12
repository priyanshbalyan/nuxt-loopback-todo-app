/* eslint-disable max-len */
/* eslint-disable indent */
'use strict';

module.exports = function(Todo) {
    var app = require('../../server/server');

    Todo.getTodos = function(cb) {
        Todo.find({}, cb);
    };

    Todo.createNew = function(title, description, cb) {
        Todo.create({title: title, description: description}, cb);
    };

    Todo.deleteTodo = function(id, cb) {
        Todo.destroyById(id, cb);
    };

    Todo.editTodo = function(id, title, description, isComplete, cb) {
        Todo.findById(id, (err, todo)=>{
            if (err) return cb(err, null);
            if (!todo) return cb(new Error('No matching todo found'), null);
            Todo.upsert({id: id, title: title, description: description, isComplete: isComplete}, cb);
        });
    };

    Todo.changeStatus = function(id, newstatus, cb) {
        Todo.findById(id, (err, todo)=>{
            if (err) return cb(err, null);
            if (!todo) return cb(new Error('No matching todo found'), null);
            Todo.upsert({id: id, isComplete: newstatus}, cb);
        });
    };

    Todo.remoteMethod('getTodos', {
        description: 'Get all todos',
        returns: {type: 'array', root: true},
        http: {verb: 'get', path: '/'},
    });

    Todo.remoteMethod('createNew', {
        description: 'Create new Todo',
        accepts: [{arg: 'title', type: 'string'}, {arg: 'description', type: 'string'}],
        returns: {type: 'object', root: true},
        http: {verb: 'post', path: '/'},
    });

    Todo.remoteMethod('deleteTodo', {
        description: 'Delete a todo by id',
        accepts: {arg: 'id', type: 'string'},
        returns: {type: 'object', root: true},
        http: {path: '/:id', verb: 'delete'},
    });

    Todo.remoteMethod('editTodo', {
        description: 'Edit a todo by id',
        accepts: [{arg: 'id', type: 'string'}, {arg: 'title', type: 'string'}, {arg: 'description', type: 'string'}, {arg: 'isComplete', type: 'boolean'}],
        returns: {type: 'object', root: true},
        http: {path: '/:id', verb: 'patch'},
    });

    Todo.remoteMethod('changeStatus', {
        accepts: [{arg: 'id', type: 'string'}, {arg: 'newstatus', type: 'boolean'}],
        returns: {type: 'object', root: true},
    });
};
