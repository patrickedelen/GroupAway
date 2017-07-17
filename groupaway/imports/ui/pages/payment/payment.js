import { Payments } from '/imports/api/payments/payments.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveArray } from 'meteor/ciclopes:reactive-array';

import './payment.html';

var membersListArr = new ReactiveArray();

Template.payment.onCreated(function () {
    membersListArr.clear();

    Meteor.subscribe('payments.single', FlowRouter.getParam('paymentId'));
    console.log('subscribed');

    Deps.autorun(function() {
        if(Payments.findOne({})) {
            let groupList = Payments.findOne({}).pendingIds;
            console.log(groupList);

            groupList.forEach(function(element) {
                Meteor.call('users.getData', Meteor.userId(), function(err, info) {
                    if(err) {console.log(err);}
                    membersListArr.push(info);
                });
            }, this);
        }
    })

  
});

Template.payment.helpers({
  paymentIndiv() {
    let pays = Payments.findOne({});
    if (pays) {
        return pays;
    } else {
        return '';
    }
  },
  membersList() {
    return membersListArr.get();
  }
});
