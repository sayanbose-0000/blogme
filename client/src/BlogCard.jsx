import React from 'react';
import '../styles/blogcard.scss';

const BlogCard = () => {
  return (
    <div className='blogcard'>
      <img src="person.jpg" alt="blogimg" height={100} width={100} />
      <div className="content">
        <div className="details">
          <p className="author"></p>
          <p className="date">12/1/23</p>
        </div>
        <p className='title'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit blanditiis assumenda magni repudiandae quae natus labore, qui quas perspiciatis, quisquam quia unde accusantium dolor cupiditate cum laudantium, nostrum beatae mollitia?</p>
        <p className='summary'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam non at, id esse facilis nam totam nihil quibusdam nemo consequuntur vitae fuga enim sunt corrupti ducimus. Quae quos fugit neque?</p>
      </div>
    </div>
  )
}

export default BlogCard;