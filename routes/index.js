var Posts = require('../model/Posts')

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  Posts.find()
    .then(posts => {
      res.render('index', { title: 'board', posts})
    })
  // res.render('index', { title: 'Board' });
});

router.post('/posts', function(req, res, next) {
  console.log(req.body);
  let post = new Posts();
  post.title = req.body.title;
  post.body = req.body.body;
  post.author = req.body.author;
  post.password = req.body.password;
  post.save()
    .then(newPost => {
      res.render('success',{
        what: "새 글 등록"
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err
      })
    })
  // res.sendStatus(200);
});

router.get('/posts/:id', function(req, res, next) {
  Posts.findById(req.params.id)
  .then(post => {
    res.render('post', {title: 'Board', post})
  })
})

router.delete('/posts/:id', function(req, res, next) {
  const _id = req.params.id;
  let password = req.headers['x-delete-password'];
  if (password == undefined) {
    res.sendStatus(500)
  }
  
  const query = { _id, password }
  console.log(query)
  Posts.deleteOne(query)
  .then( (result) => {
    if (!result.deletedCount) {
      console.log("err:", err);
      throw err
    };
    // console.log(result);
    console.log("delete success");
    res.render('success',{ what: "삭제" });
  }).catch( err => {
    console.log("catch")
    console.log(err)
    res.sendStatus(500);
  })
})

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Board' });
});

module.exports = router;
