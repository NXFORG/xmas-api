const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const User = require('../models/User');

async function register (req, res) {
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password: hash})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
};

async function login (req, res) {
    try {
        const user = await User.findByName(req.body.username);
        if(!user){ throw new Error('No user with this username'); }
        const authed = await bcrypt.compare(req.body.password, user.password)
        if (authed){
            const sendToken = (err, token) => {
                if(err){ throw new Error('Could not create token')}
                res.status(200).json({
                    success: true,
                    token: 'Bearer ' + token
                })
            } 
            const secret = process.env.TOKEN_SECRET;

            const payload = { username: user.username, id:user.id}

            jwt.sign(payload, secret, { expiresIn: '2h' }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
};

module.exports = { register, login }