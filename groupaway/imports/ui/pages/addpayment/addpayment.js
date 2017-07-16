import { Payments } from '/imports/api/payments/payments.js';
import { Meteor } from 'meteor/meteor';
import './addpayment.html';

Template.addpayment.onCreated(function () {

});

Template.addpayment.helpers({

});

Template.addpayment.events({
  'submit .add-new-payment'(event) {
    event.preventDefault();

    const paymentDescription = event.target.description.value;
    const paymentAmount = event.target.amount.value;
    const userGroup = Meteor.user().profile.groupId;

    console.log(userGroup);

    Meteor.call('payments.create', paymentDescription, paymentAmount, userGroup, (error) => {
      if (error) {
        alert(error);
      } else {
      }
    });
  },
});
