const app = require('express');
const router = app.Router();
const addC = require('../controllers/add.c');

router.post('/thuoc', addC.postAddDrug);
router.post('/dich-vu', addC.postAddService);
module.exports = router;