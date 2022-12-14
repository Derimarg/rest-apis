const Post = require('../../models/post');
const User = require('../../models/user');
const express = require('express');
const router = express.Router();
// const multer = require('multer');

// images storage
// const storage = multer.diskStorage({
//     destination(req, file, callback) {
//       callback(null, './images');
//     },
//     filename(req, file, callback) {
//       callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//     },
//   });

//   const upload = multer({ storage });

//   app.get('/', (req, res) => {
//     res.status(200).send('/upload.');
//   });

// upload image

//   app.post('/api/upload', upload.array('photo', 3), (req, res) => {
//     console.log('file', req.files);
//     console.log('body', req.body);
//     res.status(200).json({
//       message: 'success!',
//     });
//   });


//create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//delete a post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//like / dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user's all posts

router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline posts

router.get("/timeline/:id", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
});


// get all posts
router.get("/", async (req, res) => {
    try {
        const postList = await Post.find();
        if (!postList) {
            res.status(500).json({ success: false })
        }
        res.send(postList);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;