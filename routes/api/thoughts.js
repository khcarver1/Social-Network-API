const router = require('express').Router();
const Thought = require('../../models/Thought');

//get all thoughts

router.get('/', (req, res) => {
    //get all users
    Thought.find({}).then((thoughtData) => {
        res.json(thoughtData);
        console.log('*** Successfully returned all thoughts ***');
    });
});

//get a single thought by it's _id

router.get('/:id', ({params}, res) => {
    //get all users
    Thought.find({_id: params.id}).then((thoughtData) => {
        res.json(thoughtData);
        console.log('*** Successfully returned single thought by ID ***');
    });
});

//create a new thought (push the thoughts _id to the associated users "thoughts" array)

router.post('/', (req, res) => {
    Thought.create(req.body).then((newThought) => {
        res.json(newThought);
        console.log('*** Successfully created new thought ***');
    });
});
//update a thought by it's _id

router.put('/update/:id', ({ params, body }, res) => {
    //update a user by it's _id
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true }).then((updatedThoughtData) => {
        res.json(updatedThoughtData);
        console.log('*** Successfully updated thought ***');
    });
});

//remove a thought by it's _id

router.delete('/delete/:id', async ({ params }, res) => {
    //delete a user by it's _id
    // bonus: remove a users thoughts when deleted
    Thought.findOneAndDelete({ _id: params.id }).then((thoughtData) => {
        res.json(thoughtData);
        console.log('*** Successfully deleted thought *** ' + thoughtData);
    });
});
router.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true }).then((newReactionData) => {
        res.json(newReactionData);
    });
});
router.delete('/:thoughtId/reactions/:_id', async (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: {_id: req.params._id } } }, { new: true }).then((deleteReactionData) => {
        res.json(deleteReactionData);
    });
});


module.exports = router;
