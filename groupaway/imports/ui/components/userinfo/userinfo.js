import { Meteor } from 'meteor/meteor';
import './userinfo.html';

Template.userinfo.onCreated(function() {

});

Template.userinfo.helpers({
    user() {
        return Meteor.user();
    }
});

Template.userinfo.events({
    'submit .userinfo-update-info'(event) {
        event.preventDefault();

        const target = event.target;

        const fullname = target.fullname.value;
        const address = target.address.value;
        const zipcode = target.zipcode.value;

        Meteor.call('users.updatePersonalInfo', fullname, address, zipcode, (err) => {
            if (err) {
                alert(err);
            } else {
                alert('formsubmitted');
            }
        });

    }
});
