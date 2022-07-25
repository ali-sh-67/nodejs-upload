const express = require('express');
const router = express.Router();
let users = require('./../users');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('users',{users});
})
// router.get('/', (req, res) => {
//     res.status(200).json({
//         data: users,
//         success: true
//     });
// })
router.get('/:id', (req, res) => {
    let user = users.find((user) => {
        if (user.id == req.params.id) return user;
    });
    res.status(200).json({
        data: user,
        success: true
    })
})
router.post('/',
    [
        check('email', 'email invalid').isEmail(),
        check('password', 'password min 5 must be').isLength({ min: 5 })
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.redirect('/user');
        console.log(req.body);
        users.push(req.body);
        return res.redirect('/user');
    })
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
router.put('/:id', (req, res) => {
    users = users.map((user) => {
        if (user.id == req.params.id) {
            return req.body;
        }
        return user;
    });
    res.json({
        data: users,
        success: true
    })
})
router.delete('/:id', (req, res) => {
    users = users.filter((user) => {
        if (user.id != req.params.id) return user;
    });
    return res.redirect('/user');

})
// router.delete('/:id', (req, res) => {
//     users = users.filter((user) => {
//         if (user.id != req.params.id) return user;
//     });
//     res.json({
//         data: users,
//         success: true
//     });
// })

module.exports=router;