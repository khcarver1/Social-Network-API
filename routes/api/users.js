const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
    //get all users
    User.find({}).then((userData) => {
        res.json(userData);
    });
});
router.get('/:id', async ({ params }, res) => {
    //get all users by _id and return thought and friend data
    User.find({ _id: params.id }).then((userData) => {
        res.json(userData);
    })
});
router.post('/', async (req, res) => {
    //post a new user, example:
    //"username": "",
    //"email": ""
    User.create(req.body).then((newUser) => {
        res.json(newUser);
        console.log('*** Successfully created user *** ' + newUser);
    })
});
router.put('/update/:id', ({ params, body }, res) => {
    //update a user by it's _id
    User.findOneAndUpdate({ _id: params.id }, body, { new: true }).then((updatedUserData) => {
        res.json(updatedUserData);
        console.log('*** Successfully updated user ***');
    });
});
router.delete('/delete/:id', async ({ params }, res) => {
    //delete a user by it's _id
    // bonus: remove a users thoughts when deleted
    User.findOneAndDelete({ _id: params.id }).then((userData) => {
        res.json(userData);
        console.log('*** Successfully deleted user *** ' + userData);
    });
});

router.post('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true }).then((newFriendData) => {
        res.json(newFriendData);
    });
});
router.delete('/:userId/friends/:friendId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true }).then((deletedFriendData) => {
        res.json(deletedFriendData);
    });
    // User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true }).then((deletedFriendData) => {
    //     res.json(deletedFriendData);
    // });

});


module.exports = router;
