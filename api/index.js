const router = require('express').Router();
const notesRoutes = require('./notes-routes');

router.use('/notes', notesRoutes);

module.exports = router;
