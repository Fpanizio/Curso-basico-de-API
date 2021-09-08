const express = require('express');
const app = require('../app');
const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({ message: 'Tudo ok com o metodo GET da raiz!' })
})

router.post('/', auth, (req, res) => {
    return res.send({ message: 'Tudo ok com o metodo POST da raiz!' })
})

module.exports = router;