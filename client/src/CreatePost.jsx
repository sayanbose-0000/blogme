import '../styles/createpost.scss';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BACK_URL } from './main';
import { formats, modules } from './QuillExtentions';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [fileView, setFileView] = useState(null);

  const dateNow = new Date();
  const date = dateNow.getDate();
  const month = dateNow.getMonth() + 1; // normally 0-indexed, converted to 1
  const year = dateNow.getFullYear() % 100; // only last 2 digits
  const timeNow = `${date}/${month}/${year}`;


  const handleFileView = (e) => {
    const img = e.target.files[0];

    if (img) {
      var reader = new FileReader();

      reader.onload = function () {
        setFileView(reader.result);
      }

      reader.readAsDataURL(img);
    }
  }

  const handleClickImageHolder = async () => {
    document.getElementById("fileselect").click();

    const response = await fetch(`${BACK_URL}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        fileView,
        title,
        summary,
        content,
        date,
        likes: 0
      })
    })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!fileView) {
      alert("Please choose an image :)");
      return;
    }
  }

  return (
    <div className='createpost'>
      <div className="blogcontainer">
        <div className="blogstart">
          <div className="image_likes">
            <input type="file" id="fileselect" accept="image/*" onChange={e => { handleFileView(e) }} />
            <img className="blogimg" src={fileView ? `${fileView}` : 'placeholder.jpg'} alt="blogimg" height={100} width={100} onClick={handleClickImageHolder} />
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
          <button className='submit'>Submit</button>
        </form>
      </div>
    </div>

  );
};

export default CreatePost;