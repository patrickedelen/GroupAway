import { Meteor } from 'meteor/meteor';
import './userinfo.html';

Template.userinfo.onCreated(function() {
    this.autorun(() => {
        if (ReactiveStripe.loaded()) {
      console.log('loaded');
        }
    });
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

    },

    'submit .userinfo-add-card'(event) {
        event.preventDefault();

        const target = event.target;

        const ccnum = target.ccnum.value;
        const cvc = target.cvc.value;
        const expmo = target.expmo.value;
        const expyr = target.expyr.value;
        console.log(ReactiveStripe);

        Stripe.createToken({
            number: ccnum,
            cvc: cvc,
            exp_month: expmo,
            exp_year: expyr,
        }, function(status, response) {
            stripeToken = response.id;
            Meteor.call('users.setCreditCard', stripeToken, (err) => {
                if (err) {
                    alert(err);
                } else {
                    alert('Card token added');
                }
            });
        });

    },

    'click .paymentIdA'(event) {
        event.preventDefault();

        let paymentId = event.target.id;

        Meteor.call('payments.confirmPayment', paymentId, (err) => {
            if (err) {
                alert(err);
            } else {
                alert('Payment Confirmed');
            }
        })
    }
});
