import React from 'react';
import '../styles/blogcard.scss';

const BlogCard = () => {
  return (
    <div className='blogcard'>
      <img src="backimg.jpg" alt="blogimg" />
      <p>Title</p>
      <p>Summary</p>
    </div>
  )
} 
  
export default BlogCard;