import {log} from 'console';
import bcryptjs from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import {jwtSecret} from '../../config/keys.js';

const router = Router();


// @route POST api/users/register
// @descr Register user
// @access Public 
router.post('/register', async (req, res) => {

    const {name, email, password, avatar} = req.body;
    
    try {
        // check unique email
        const isExist = await User.findOne({email});
        if (isExist) {
            return res.status(400).json({Error: 'Email already exist'})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);

        // create new user
        const user = new User({
            name, 
            email,
            password: hash,
            avatar
        });

        // mongo request
        await user.save();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

// @route POST api/users/login
// @descr Login user & get token
// @access Public 
router.post('/login', async (req, res) => {

    const {email, password} = req.body;

    try {
        // find user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(403).send({Error: 'Invalid credentials'})
        }

        // compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).send({Error: 'Invalid credentials'})
        }

        jwt.sign({userId: user.id},
            jwtSecret,
            {expiresIn: '2 days'},
            (err, token) => {
                if (err) throw err;

                // log('token: ', token);
                res.status(200).json({token, user});
            });
    } catch (error) {
        log('catch err: ', error);
        res.status(500).send({Error: error});
    }
});

// @route GET api/users
// @descr Get all user
// @access Public 
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        log('err: ', err);
        res.sendStatus(500);
    }
})

export default router;