const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const revoked = require('../middleware/revoked');

// Auth routes
router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);
router.post('/logout', controller.logout); //deconnect

// generic routes

router.get('/', revoked, controller.getAll);
router.get('/:id', revoked, controller.getById);
router.get('/getByEmail/:email', revoked, controller.getUserByEmail);
router.put('/:id', revoked, controller.update);
router.delete('/:id', revoked, controller.remove);

module.exports = router;