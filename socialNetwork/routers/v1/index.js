const router = require('express').Router();
const api = process.env.API_V1;

// import api routes
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const postsRoutes = require('./posts');

// Routers, makes the app aware of routes in another folder
router.use(`${api}/auth`, authRoutes);
router.use(`${api}/users`, usersRoutes);
router.use(`${api}/posts`, postsRoutes);

module.exports = router;