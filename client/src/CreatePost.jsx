import '../styles/createpost.scss';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BACK_URL } from './main';
import { formats, modules } from './QuillExtentions';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [timeNow, setTimeNow] = useState('');
  const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateDate();
  }, [])

  const updateDate = () => {
    const dateNow = new Date();
    const date = dateNow.getDate();
    const month = dateNow.getMonth() + 1; // normally 0-indexed, converted to 1
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

    response.ok ? toast.success(await response.json()) : toast.error(await response.json());
    response.ok ? setRedirect(true) : null;

    setLoading(false);
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='createpost'>
      <div className="blogcontainer">
        <div className="blogstart">
          <div className="image_likes">
            {image === '' ?
              <>
                <label htmlFor="fileselect" className="fileselectlabel">Upload Image</label>
                <input type="file" id="fileselect" accept="image/*" onChange={(e) => { handleImageClick(e) }} />
              </>
              :
              <>
                <img className="blogimg" src={imageSrc} alt="blogimg" height={100} width={100} />
              </>
            }
          </div>
          <div className="author_date">
            <p>Ram</p>
            <p>{timeNow}</p>
          </div>
        </div>
        <form className="blogcontent" onSubmit={(e) => { handleSignUp(e) }}>
          <div className="title_summary">
            <input type="text" name="" id="" placeholder='Enter title' className='title' value={title} onChange={(e) => { setTitle(e.target.value) }} required />
            <input type="text" name="" id="" placeholder='Enter summary' className='summary' value={summary} onChange={(e) => { setSummary(e.target.value) }} required />
          </div>
          <ReactQuill value={content} modules={modules} formats={formats} onChange={setContent} />
          {
            loading ?
              <button className='notsubmit' disabled>Loading...</button>
              :
              <button className='submit'>Submit</button>
          }
        </form>
      </div>
    </div>
  );
};

export default CreatePost;