import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/joingroup/joingroup.js';
import '../../ui/pages/addpayment/addpayment.js';
import '../../ui/pages/groupoverview/groupoverview.js';
import '../../ui/pages/payment/payment.js';
// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/joingroup/:groupId', {
  name: 'App.joingroup',
  action() {
    BlazeLayout.render('App_body', { main: 'App_joingroup'});
  }
});

FlowRouter.route('/addpayment/', {
  name: 'App.addpayment',
  action() {
    BlazeLayout.render('App_body', { main: 'addpayment'});
  }
});

FlowRouter.route('/groupoverview/:groupId', {
  name: 'App.addpayment',
  action() {
    BlazeLayout.render('App_body', { main: 'groupoverview'});
  }
});

FlowRouter.route('/viewpayment/:paymentId', {
  name: 'App.viewpayment',
  action() {
    BlazeLayout.render('App_body', { main: 'payment'});
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
