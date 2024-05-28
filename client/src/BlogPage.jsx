import DOMPurify from 'dompurify';
import '../styles/blogpage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';

const BlogPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({})
  const [dirtyHTML, setDirtyHTML] = useState("");
  const [cleanHTML, setCleanHTML] = useState("");

  useEffect(() => {
    fetch(`${BACK_URL}/post/${id}`)
      .then(res => {
        if (!res.ok) toast.error(res.json());
        return res.json();
      })
      .then(data => setPostInfo(data))
      .catch(err => toast.error(err.message));
  }, [id])

  useEffect(() => {
    if (postInfo.content) {
      console.log(postInfo);
      setDirtyHTML(`${postInfo.content}`);
      setCleanHTML(DOMPurify.sanitize(dirtyHTML));
    }
  }, [postInfo])

  return (
    <div className='blogpage'>
      <div className="blogpage__container">
        <div className="blogpage__start">
          <div className="blogpage__image-likes">
            <img src={postInfo.imagePath} className="blogpage__img" alt="blogimg" height={100} width={100} />
            <div className="blogpage__likes">
              <p className="blogpage__likes-count">{postInfo.likes}</p>
              <img src="/heart_empty.svg" alt="heart" className="blogpage__heart" height={100} width={100} />
            </div>
          </div>
          <div className="blogpage__author-date">
            <p>{postInfo.author ? postInfo.author.userName : null}</p>
            <p>{postInfo.date}</p>
          </div>
        </div>
        <div className="blogpage__content">
          <p className='blogpage__title'>{postInfo.title}</p>
          <div dangerouslySetInnerHTML={{ __html: cleanHTML }} className='blogpage__content-text' />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
