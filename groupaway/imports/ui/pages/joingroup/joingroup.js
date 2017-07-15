import { Groups } from '/imports/api/groups/groups.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './joingroup.html';

Template.App_joingroup.onCreated(function () {
    let template = Template.instance();
    template.membersList = new ReactiveVar( {} );

    Meteor.subscribe('groups.single', FlowRouter.getParam('groupId'));

    Deps.autorun(function() {
        if(Groups.findOne({})) {
            let groupList = Groups.findOne({});
            console.log(groupList);

            groupList.array.forEach(function(element) {
                Meteor.call('users.getData', Meteor.userId(), function(err, info) {
                    if(err) {console.log(err);}
                    membersList.push(info);
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
    return Template.instance.membersList.get();
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
