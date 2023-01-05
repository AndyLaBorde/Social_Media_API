const router = require('express').Router();

// import all API routes from the api directory
const apiRoutes = require('./api');

// add oprefix of '/api' to all of the api routes iimpoerted from api directory
router.unsubscribe('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!!'));

module.exports = router;
