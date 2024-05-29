import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/blogcard.css';

const BlogCard = ({ id, imagePath, title, summary, content, author, date, likes }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    (imagePath) ? setImage(imagePath) : setImage("placeholder.jpg");
  })

  return (
    <Link to={`/post/${id}`} className='blogcard'>
      <img src={`${image}`} className="blogcard__img" alt="blogimg" height={100} width={100} />
      {/*
        <div className="blogcard__likes">
          <p className="blogcard__likescount">{likes}</p>
          <img src="/heart_fill.svg" alt="heart" className="blogcard__heart" height={100} width={100} />
        </div>
      */}
      <div className="blogcard__content">
        <div className="blogcard__details">
          <p className="blogcard__author">{author}</p>
          <p className="blogcard__date">{date}</p>
        </div>
        <p className='blogcard__title'>{title}</p>
        <p className='blogcard__summary'>{summary}</p>
      </div>
    </Link>
  );
};
export default BlogCard;
