import React from 'react';
import '../styles/blogcard.scss';
import { Link } from 'react-router-dom';

const BlogCard = () => {
  return (
    <Link to="/blogpost" className='blogcard'>
      <img src="placeholder.jpg" className="blogimg" alt="blogimg" height={100} width={100} />
      <div className="likes">
        <p className="likescount">10k</p>
        <img src="heart_fill.svg" alt="heart" className="heart" height={100} width={100} />
      </div>
      <div className="content">
        <div className="details">
          <p className="author">Aman</p>
          <p className="date">12/1/23</p>
        </div>
        <p className='title'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit blanditiis assumenda magni repudiandae quae natus labore, qui quas perspiciatis, quisquam quia unde accusantium dolor cupiditate cum laudantium, nostrum beatae mollitia?</p>
        <p className='summary'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam non at, id esse facilis nam totam nihil quibusdam nemo consequuntur vitae fuga enim sunt corrupti ducimus. Quae quos fugit neque?</p>
      </div>
    </Link>
  )
}

export default BlogCard;