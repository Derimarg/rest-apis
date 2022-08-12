const router = require('express').Router();

// import api routes
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const postsRoutes = require('./posts');

// Routers, makes the app aware of routes in another folder
router.use(`/auth`, authRoutes);
router.use(`/users`, usersRoutes);
router.use(`/posts`, postsRoutes);

module.exports = router;