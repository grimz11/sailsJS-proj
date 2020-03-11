module.exports = {
  posts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (err) {
      res.serverError(err.toString());
    }
  },
  findByID: async (req, res) => {
    try {
      const id = req.param("postId");
      const post = await Post.find({ id });
      sails.log.warn(post);
      res.send(post);
    } catch (err) {
      res.serverError(err.toString());
    }
  },
  create: async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    try {
      await Post.create({ title, body });
      sails.log.info("Successfully created");
      return res.redirect("/");
    } catch (err) {
      res.serverError(err.toString());
    }
  },
  delete: async (req, res) => {
    const id = req.param("postId");
    try {
      await Post.destroy({ id });
      res.send(`Successfully deleted`);
    } catch (err) {
      res.serverError(err.toString());
    }
  },
  update: async (req, res) => {
    const id = req.param("postId");
    try {
      const updatedPost = await Post.update(id)
        .set({ title: req.param("title"), body: req.param("body") })
        .fetch();
      sails.log.warn("Successfully Updated");
      res.send(updatedPost);
    } catch (err) {
      res.serverError(err.toString());
    }
  }
};
