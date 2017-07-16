// All groups-related publications

import { Meteor } from 'meteor/meteor';
import { Groups } from '../groups.js';

Meteor.publish('groups.all', function () {
  return Groups.find();
});

Meteor.publish('groups.single', function(groupId) {
    return Groups.find({"_id": groupId});
});
