const {Router}=require('express');
const authController=require("../routes/authcontroller.js");
const router=Router();
//configure the directions depending on the action of the user
router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);

module.exports=router;