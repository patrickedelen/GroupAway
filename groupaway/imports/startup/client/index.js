// Import client startup through a single index entry point
Meteor.startup(function() {
    ReactiveStripe.load("pk_test_Ck2jpnOGAoyE9u1Sj1H2ZzgP");
});

import './routes.js';
