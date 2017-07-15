import { Groups } from '/imports/api/groups/groups.js';
import { Meteor } from 'meteor/meteor';
import './info.html';

Template.info.onCreated(function () {
  Meteor.subscribe('groups.all');
});

Template.info.helpers({
  groups() {
    return Groups.find({});
  },
});

Template.info.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name;

    Meteor.call('groups.create', name.value, (error) => {
      if (error) {
        alert(error);
      } else {
        name.value = '';
      }
    });
  },
});
