import DOMPurify from 'dompurify';
import '../styles/blogpage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { userAuthContext } from './UserContextProvider';

const BlogPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({})
  const [cleanHTML, setCleanHTML] = useState("");
  const [showEditDel, setShowEditDel] = useState(false);
  const { userInfo, setUserInfo } = useContext(userAuthContext);


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
      setCleanHTML(DOMPurify.sanitize(postInfo.content));


      if (postInfo.author?._id === userInfo.id) {
        setShowEditDel(true);
      }
    }

    console.log(postInfo);
  }, [postInfo])

  // useEffect(() => {
  // fetch(`${BACK_URL}/profile`, {
  //   method: 'GET',
  //   credentials: 'include',
  //   headers: {'Content-Type': 'application/json'}
  // })
  // .then(res => res.json())
  // .then(data => )
  // })

  const handleDeletePost = async (e) => {
    const response = fetch(`${BACK_URL}/deletepost`, {
      method: 'POST',
    })

    
  }


  return (
    <div className='blogpage'>
      <div className="blogpage__container">
        <div className="blogpage__start">
          <div className="blogpage__image-likes">
            <img src={postInfo.imagePath} className="blogpage__img" alt="blogimg" height={100} width={100} />
            {
              showEditDel &&
              <div className="blogpage__editdelcontainer">
                <p className="blogpage__editdel blogpage__edit">Edit</p>
                <p className="blogpage__editdel blogpage__del" onClick={(e) => { handleDeletePost(e) }}>Delete</p>
              </div>
            }
            {/*
                  <img src="/heart_empty.svg" alt="heart" className="blogpage__heart" height={100} width={100} />
                */}
          </div>
          <div className="blogpage__author-date">
            <p>{postInfo.author?.userName}</p>
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
