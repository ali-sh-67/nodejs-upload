const Controller = require('./controller');
const User = require('./../models/user');

class UserController extends Controller{
    async getAllUsers(req, res){
        console.log(this.name);
    let users = await User.find();
    res.render('users', { users, errors: req.flash('aaa') });
}

    async getOneUser(req, res){
    let user = await User.findById(req.params.id)

    res.render('user', { user });
}
    async createUser(req, res){
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
}
    async updateUser(req, res){
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect('/user');
}
    async deleteUser(req, res){
    await User.findByIdAndDelete(req.params.id);
    return res.redirect('/user');
}
}
module.exports=new UserController();