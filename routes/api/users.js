const router = require('express').Router();
const User = require('../../models/User');


router.get('/', (req, res) => {
    //get all users
    User.find({}).then((userData) => {
        res.json(userData);
    });
});
router.get('/_id', async (req, res) => {
    //get all users by _id and return thought and friend data
});
router.post('/', async (req, res) => {
    //post a new user, example:
    //"username": "",
    //"email": ""
    User.create(req.body).then((newUser) => {
        res.json(newUser);
    })
});
router.put('/', async (req, res) => {
    //update a user by it's _id
    User.findOneAndUpdate()
});
router.delete('/delete/:id', async ({params}, res) => {
    //delete a user by it's _id
    // bonus: remove a users thoughts when deleted
    User.findOneAndDelete({ _id: params.id }).then((userData) => {
        res.json(userData);
    })
});



router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
    //add a new friend to a user's friend list
});
router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    //remove a friend from a user's friend list
});


module.exports = router;
