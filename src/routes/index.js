const ticket = require('./ticket');
const cardEvent = require('./cardEvent');
const user = require('./user');
const invitations = require('./invitations');
const stories = require('./stories');
const post = require('./post');
const comment = require('./comment');
const friends = require('./friends');
const message = require('./message');
const email = require('./email');
function routes(app) {
    app.use('/tickets', ticket);

    app.use('/cardEvent', cardEvent);

    app.use('/user', user);

    app.use('/invitations', invitations);

    app.use('/stories', stories);

    app.use('/post', post);

    app.use('/friends', friends);

    app.use('/comment', comment);

    app.use('/message', message);
    
    app.use('/email', email);
}
module.exports = routes;
