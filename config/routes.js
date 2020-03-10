
module.exports.routes = {
  // '/': { view: 'pages/homepage' },

  //ENDPOINTS
  'GET /posts': 'PostsController.posts',
  'GET /post/:postId': 'PostsController.findByID',
  'POST /post': 'PostsController.create',
  'DELETE /post/:postId': 'PostsController.delete',
  'PUT /post/:postId': 'PostsController.update',
  
  //PAGES
  'GET /': 'post/home'
};
