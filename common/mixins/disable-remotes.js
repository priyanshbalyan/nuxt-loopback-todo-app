/* eslint-disable max-len */
'use strict';

module.exports = function disableRemotes(Model, options) {
  var arr = ['create', 'upsert', 'exists', 'findById', 'find', 'findOne', 'destroyById', 'count', 'prototype.updateAttributes', 'createChangeStream', 'updateAll', 'replaceOrCreate', 'replaceById', 'upsertWithWhere'];
  arr.forEach(prop=>{
    Model.disableRemoteMethodByName(prop, true);
  });
};
