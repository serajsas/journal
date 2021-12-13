const Journal = require('../models/journal');
const User = require('../models/user');

const createJournal = async function (req, res) {
    const journal = new Journal(req.body);
    await User.findOneAndUpdate({ _id: req.session.loggedIn }, { $push: { blogs: journal } })
    return res.redirect(`/blog/${journal._id}`);
}


const renderCompose = function (req, res, args = null) {
    return res.render('./pages/compose', { journal: args })
}


const renderBlog = async function (req, res) {
    const user = await User.findUser(req.session.username);
    const journal = user.blogs.find((blog) => blog._id == req.params.id)
    return res.render('./pages/blog', { journal })
}

const renderBlogs = async function (req, res) {
    const user = await User.findUser(req.session.username);
    return res.render("./pages/blogs", { name: req.session.username, journals: user.blogs });
}


module.exports = { createJournal, renderCompose, renderBlog, renderBlogs }