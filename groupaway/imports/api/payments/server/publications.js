// All payments-related publications

import { Meteor } from 'meteor/meteor';
import { Payments } from '../payments.js';

Meteor.publish('payments.all', function () {
  return Payments.find();
});

Meteor.publish('payments.group', function(groupId) {
    return Payments.find({"groupId": groupId});
})

Meteor.publish('payments.single', function(paymentId) {
    return Payments.find({"_id": paymentId});
});
