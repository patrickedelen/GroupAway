import { Groups } from '/imports/api/groups/groups.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveArray } from 'meteor/ciclopes:reactive-array';

import './joingroup.html';

var membersListArr = new ReactiveArray();

Template.App_joingroup.onCreated(function () {

    Meteor.subscribe('groups.single', FlowRouter.getParam('groupId'));

    Deps.autorun(function() {
        if(Groups.findOne({})) {
            let groupList = Groups.findOne({}).memberIds;
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

Template.App_joingroup.helpers({
  groupIndiv() {
    let groupSingle = Groups.findOne({});
    if (groupSingle) {
        return groupSingle.groupName;
    } else {
        return '';
    }
  },
  membersList() {
    return membersListArr.get();
  }
});

Template.App_joingroup.events({
    'click a.joingroup'(event) {
        event.preventDefault();

        Meteor.call('groups.addMember', FlowRouter.getParam('groupId'), function(err) {
            if (err) {
                alert(err);
            } else {
                alert('Member added');
                FlowRouter.go('App.home');
            }
        })
    }
})
