import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import '../styles/home.css';
import { BACK_URL } from './main';

const Home = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${BACK_URL}/home`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='home'>

      {
        blogs.map(ele =>
          <BlogCard key={ele._id} id={ele._id} imagePath={ele.imagePath} title={ele.title} summary={ele.summary} content={ele.content} author={ele.author.userName} date={ele.date} likes={ele.likes} />
        )
      }
      {/* <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard /> */}
    </div>
  )
}

export default Home;