const express = require('express');
const router = express.Router();
const controller = require('../controllers/table.controller');
const revoked = require('../middleware/revoked');

// specific routes 
router.get('/capacity/:min', controller.getByCapacity); 
router.delete('/capacity/:id', revoked, controller.removeIfCapacityOK); // protected

// generic routes 
router.get('/', controller.getAll);
router.get('/:id', controller.getOne); 
router.post('/', revoked, controller.create);      // protected
router.put('/:id', revoked, controller.update);    // protected
router.delete('/:id', revoked, controller.remove); // protected

module.exports = router;