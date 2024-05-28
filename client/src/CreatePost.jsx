import '../styles/createpost.css';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BACK_URL } from './main';
import { formats, modules } from './QuillExtentions';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { userAuthContext } from './UserContextProvider';
import { useContext } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [timeNow, setTimeNow] = useState('');
  const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useContext(userAuthContext);
  const [redirectedPath, setRedirectedPath] = useState("");
  const userName = userInfo?.userName;

  useEffect(() => {
    updateDate();
  }, [])

  const updateDate = () => {
    const dateNow = new Date();
    const date = dateNow.getDate();
    const month = dateNow.getMonth() + 1; // 0-indexed, converted to 1
    const year = dateNow.getFullYear() % 100; // only last 2 digits
    setTimeNow(`${date}/${month}/${year}`);
  }

  const handleImageClick = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedImage);

      fileReader.onload = () => {
        setImageSrc(fileReader.result);
      }
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    updateDate();

    if (!image) {
      toast.error("Please choose an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('timeNow', timeNow);
    formData.append('likes', 0);
    formData.append('image', image);

    const response = await fetch(`${BACK_URL}/postblog`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })

    if (response.ok) {
      const data = await response.json();
      toast.success(data.message);
      setRedirect(true);
      setRedirectedPath(`/post/${data.postId}`)
    }

    else {
      const errData = await response.json();
      toast.error(errData);
    }

    setLoading(false);
  }

  if (redirect) {
    return <Navigate to={redirectedPath} />
  }

  return (
    <div className='createpost'>
      <div className="createpost__blogcontainer">
        <div className="createpost__blogstart">
          <div className="createpost__image-likes">
            {image === '' ?
              <>
                <label htmlFor="createpost__fileselect" className="createpost__fileselectlabel">Upload Image</label>
                <input type="file" id="createpost__fileselect" accept="image/*" onChange={(e) => { handleImageClick(e) }} />
              </>
              :
              <>
                <img className="createpost__blogimg" src={imageSrc} alt="blogimg" height={100} width={100} />
              </>
            }
          </div>
          <div className="createpost__author-date">
            <p>{userName}</p>
            <p>{timeNow}</p>
          </div>
        </div>
        <form className="createpost__blogcontent" onSubmit={(e) => { handleSignUp(e) }}>
          <div className="createpost__title-summary">
            <input type="text" name="" id="" placeholder='Enter title' className='createpost__title' value={title} onChange={(e) => { setTitle(e.target.value) }} required />
            <input type="text" name="" id="" placeholder='Enter summary' className='createpost__summary' value={summary} onChange={(e) => { setSummary(e.target.value) }} required />
          </div>
          <ReactQuill value={content} modules={modules} formats={formats} onChange={setContent} className='createpost__quill' />
          {
            loading ?
              <button className='createpost__notsubmit' disabled>Loading...</button>
              :
              <button className='createpost__submit'>Submit</button>
          }
        </form>
      </div>
    </div>
  );
};

export default CreatePost;