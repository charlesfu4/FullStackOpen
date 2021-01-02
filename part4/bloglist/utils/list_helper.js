const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ?
    0:
    blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (item1, item2) => {
    if(item1.likes > item2.likes) return item1
    else return item2
  }
  if(blogs.length === 0) return undefined
  const favBlogOrg = blogs.reduce(reducer)
  // eslint-disable-next-line no-undef
  return ( { title, author, likes } = favBlogOrg, { title, author, likes })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}