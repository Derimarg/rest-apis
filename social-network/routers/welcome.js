const router = require("express").Router();

router.get('/', (req, res) => {
    res.json({
        succes: true,
        message: 'Welcome to backend'
    })
});



module.exports = router;