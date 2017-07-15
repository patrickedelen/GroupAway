// methods for updating user info

import { Meteor } from 'meteor/meteor';

Meteor.users.allow({
  	update: function (userId, doc, fields, modifier) {
		console.log('UPDATE USER');
		return true; 
    }
});

Meteor.methods({
    'users.updatePersonalInfo'(fullName, address, zipcode) {
        Meteor.users.update({"_id": this.userId}, {
            $set: {
                profile: {
                    fullName,
                    address,
                    zipcode
                }
            }
        });
    },
    'users.getData'(userId) {
        let user = Meteor.users.findOne({"_id": userId});

        let usrObj = {
            userPhoto: 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large',
            userFullName: user.services.facebook.name
        };

        return usrObj;
    }
});
