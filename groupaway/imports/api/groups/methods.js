// groups methods

import { Meteor } from 'meteor/meteor';
import { Groups } from './groups.js';

Meteor.methods({
    'groups.create'(groupName) {
        let ownerId = this.userId;
        return Groups.insert({
            groupName,
            ownerId,
            memberIds: [ownerId],
            payments: [],
            createdAt: new Date()
        });
    },
    'groups.addMember'(groupId) {
        Groups.update(groupId, {
            $push: {memberIds: this.userId}
        });

        Meteor.users.update({"_id": this.userId}, {
            $set: {'profile.groupId': groupId}
        });
    },
    // 'groups.addPayment'(groupId, paymentAmt, paymentDesc) {
    //     let groupMembers = Groups.findOne({"_id": groupId}).memberIds;
    //     let pmntEach = paymentAmt / groupMembers.length;

    //     Groups.update(groupId, {
    //         $push: {payments: {
    //             paymentDescription: paymentDesc,
    //             paymentTotal: paymentAmt,
    //             paymentEach: pmntEach,
    //             pendingMembers: groupMembers,
    //             paymentOwner: this.userId
    //         }}
    //     });
    // }
});