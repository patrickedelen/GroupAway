// methods for updating user info
var stripe = require("stripe")(
  "sk_test_3NMf7ice26ANC0D3XEfHofKm"
);


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
        if (user) {
            let usrObj = {
                userPhoto: 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large',
                userFullName: user.services.facebook.name
            };
            return usrObj;
        } else {
            return null;
        }
    },
    'users.setCreditCard'(creditToken) {
        console.log('Adding card');
        var cId = '';
        let userSavedId = this.userId;
        let processPayment = function(err, charge) {
            if (err) {
                console.log(err.message);
                return err;
            } else {
                console.log('Intro payment passed');
                return Meteor.users.update({"_id": userSavedId}, {
                    $set: { 
                        "profile.creditToken": cId,
                        "profile.currentBalence": 20.00
                        }
                });
            }
        }

        let processPaymentAsync = Meteor.bindEnvironment(processPayment);
        let customerDesc = "Customer for userId: " + this.userId;

        stripe.customers.create({
            description: customerDesc,
            source: creditToken,
            }, function(err, customer) {

                if (err) {
                    console.log(err);
                    return err;
                } else {
                console.log('Adding credit card');

                cId = customer.id;

                stripe.charges.create({
                    amount: 2000,
                    currency: "usd",
                    customer: cId, // obtained with Stripe.js
                    description: "Introduction charge for GroupAway"
                }, function(err, charge) {
                    processPaymentAsync(err, charge);
                });
                }
        });
    }
});
