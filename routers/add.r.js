const app=require('express');
const router=app.Router();
const addC=require('../controllers/add.c');

router.post('/thuoc/them-thuoc', addC.postAddDrug);
router.post('/dich-vu/them-dich-vu', addC.postAddService);
module.exports=router;