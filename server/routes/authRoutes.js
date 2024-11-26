const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/request', authController.getApproved)
router.get('/dashboard', authController.getDashboard);

router.get('/admin', authController.getAdmin)
router.post('/admin', authController.postAdminLogin);
router.get('/aprove', authController.aprovedUser);
router.post('/admin-aproval', authController.postAdminAproval);
router.get('/aproved-sucess', authController.aprovedUserSuccess);
router.get('/logout', authController.logout);

router.get('/test', (req, res) => {
  // if (!req.isAuthenticated()) return res.redirect('/login');
  res.json({ name: 'Hameed' });
})

module.exports = router;
