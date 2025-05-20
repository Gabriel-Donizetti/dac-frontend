const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userRoutes = require('./userRoutes');

// Autenticação
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Serviços protegidos
router.use('/', userRoutes);

// aqui vai outras rotas
// router.use('/reservas', require('./reservasRoutes'));

module.exports = router;
