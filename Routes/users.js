const express = require('express');
const user = require('../model/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const createUserToken = (userId) => {
    return jwt.sign({id: userId}, config.jwt_pass, {expiresIn: config.jwt_expires_in});
}

router.get('/', async (req, res) => {
    try {
        const user = await user.find({});
        return res.send(users);
    }
    catch (err) {
        return res.send({ error: 'erro na consulta do usuario' })
    }
});


router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados Insuficientes!' });

    try {
        if(await user.findOne({ email })) return res.send({ error: 'Usuario ja registrado!' });
        const users = await user.create(req.body);
        user.password = undefined;
        return res.status(201).send({users, token: createUserToken(user.id)});
    } catch (err) {
        return res.send({ error: 'erro ao buscar usuario!' });
    }

});



router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados Insuficientes!' });

    try {
        const users = await user .findOne({ email }).select('+password');
        if (!users) return res.send({ error: 'Usuário não existe!' });

        const pass_ok = await bcrypt.compare(password, users.password);
        if (!pass_ok) return res.send({ error: 'Erro ao autenticar usuario' });

        users.password = undefined;
        return res.send({users, token: createUserToken(user.id)});

    } catch (err) {
        return res.send({ error: 'Erro ao buscar usuario' });
    }
});

module.exports = router;