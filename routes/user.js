const express = require('express');
const router = express.Router();
// let users = require('./../users');
const { check, validationResult } = require('express-validator');
const { application } = require('express');
const User = require('./../models/user');

router.get('/', async (req, res) => {
    let users = await User.find();
    res.render('users', { users, errors: req.flash('aaa') });
})
// router.get('/', (req, res) => {
//     res.render('users', { users, errors: req.flash('aaa') });
// })
// router.get('/', (req, res) => {
//     res.status(200).json({
//         data: users,
//         success: true
//     });
// })
router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id)

    res.render('user', { user });
})
// router.get('/:id', (req, res) => {
//     let user = users.find((user) => {
//         if (user.id == req.params.id) return user;
//     });

//     res.render('user', { user });
// })
// router.get('/:id', (req, res) => {
//     let user = users.find((user) => {
//         if (user.id == req.params.id) return user;
//     });
//     res.status(200).json({
//         data: user,
//         success: true
//     })
// })
router.post('/',
    [
        check('email', 'email invalid').isEmail(),
        check('password', 'password min 5 must be').isLength({ min: 5 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('aaa', errors.array());
            return res.redirect('/user');
        }
        users = new User({
            first_name: req.body.first_name,
            email: req.body.email,
            password: req.body.password
        });
        await users.save();
        return res.redirect('/user');
    })
// router.post('/',
//     [
//         check('email', 'email invalid').isEmail(),
//         check('password', 'password min 5 must be').isLength({ min: 5 })
//     ], (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             req.flash('aaa', errors.array());
//             return res.redirect('/user');
//         }

//         users.push(req.body);
//         return res.redirect('/user');
//     })
// router.post('/',
//     [
//         check('email', 'email invalid').isEmail(),
//         check('password', 'password min 5 must be').isLength({ min: 5 })
//     ], (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
//         console.log(req.body);
//         users.push(req.body);
//         res.json({
//             data: users,
//             success: true,
//             message: 'user create successfuly'
//         });
//     })
router.put('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect('/user');
})
// router.put('/:id', (req, res) => {
//     users = users.map((user) => {
//         if (user.id == req.params.id) {
//             return req.body;
//         }
//         return user;
//     });
//     return res.redirect('/user');
// })
// router.put('/:id', (req, res) => {
//     users = users.map((user) => {
//         if (user.id == req.params.id) {
//             return req.body;
//         }
//         return user;
//     });
//     res.json({
//         data: users,
//         success: true
//     })
// })
router.delete('/:id', async (req, res) => {
   await User.findByIdAndDelete(req.params.id);
    return res.redirect('/user');

})
// router.delete('/:id', (req, res) => {
//     users = users.filter((user) => {
//         if (user.id != req.params.id) return user;
//     });
//     return res.redirect('/user');

// })
// router.delete('/:id', (req, res) => {
//     users = users.filter((user) => {
//         if (user.id != req.params.id) return user;
//     });
//     res.json({
//         data: users,
//         success: true
//     });
// })

module.exports = router;