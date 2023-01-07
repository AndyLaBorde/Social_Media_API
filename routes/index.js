const router = require('express').Router();

// import all API routes from the api directory
const apiRoutes = require('./api');

// add prefix of '/api' to all of the api routes imported from api directory
router.use('/api', apiRoutes);

router.use((req, res) => res.status(500).send('Wrong route!!'));

module.exports = router;
