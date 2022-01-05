const router = require('express').Router();
// const courseRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// router.use('/thought', courseRoutes);
router.use('/users', userRoutes);

module.exports = router;
