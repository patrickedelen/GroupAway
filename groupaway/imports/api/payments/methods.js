// groups methods

import { Meteor } from 'meteor/meteor';
import { Payments } from './payments.js';
import { Groups } from '../groups/groups';

var stripe = require("stripe")(
  "sk_test_3NMf7ice26ANC0D3XEfHofKm"
);

Meteor.methods({
    'payments.create'(paymentDesc, paymentAmt, groupId) {
        let requesterId = this.userId;
        let groupMembers = Groups.findOne({"_id": groupId}).memberIds;
        let pmntEach = parseInt(paymentAmt) / groupMembers.length;

        console.log(pmntEach);

        Payments.insert({
            paymentDesc,
            requesterId,
            pendingIds: groupMembers,
            paymentEach: pmntEach,
            createdAt: new Date()
        }, function(err, docId) {
            let paymentUsrArr = [];
            groupMembers.forEach(function(elem) {
                Meteor.users.update({"_id": elem}, {
                    $push: { "profile.paymentsPending": docId }
                });
            });

            Groups.update(groupId, {
                $push: {payments: docId}
            });
        });
    },
    'payments.confirmPayment'(paymentId, creditToken) {
        console.log('Submitting payment for paymentId: ' + paymentId);

        let processPayment = function(err, charge) {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log('Payment passed');
                Meteor.users.update(this.userId, {
                    $pull: { "profile.paymentsPending": paymentId }
                });

                Payments.update(paymentId, {
                    $pull: { "pendingIds": this.userId }
                });
            }
        }

        let processPaymentAsync = Meteor.bindEnvironment(processPayment);

        let usrToken = Meteor.users.find({"_id": this.userId}).fetch()[0].profile.creditToken;
        let paymentObj = Payments.find({"_id": paymentId}).fetch()[0];
        let paymentDesc = "Charge for payment: " + paymentObj.paymentDesc;
        let paymentConverted = (paymentObj.paymentEach * 100);

        stripe.charges.create({
            amount: paymentConverted,
            currency: "usd",
            source: usrToken,
            description: paymentDesc
        }, function(err, charge) {
            processPaymentAsync(err, charge);
        });
    }
});