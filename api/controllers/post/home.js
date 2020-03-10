module.exports = async (req, res) => {

  const posts = await Post.find()
  
  return res.view('pages/home', {posts})
}