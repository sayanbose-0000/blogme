import '../styles/createpost.scss';
import { useState } from 'react';

const CreatePost = () => {

  const dateNow = new Date();
  const date = dateNow.getDate();
  const month = dateNow.getMonth() + 1; // normally 0-indexed, converted to 1
  const year = dateNow.getFullYear() % 100; // only last 2 digits
  const timeNow = `${date}/${month}/${year}`;

  const [fileView, setFileView] = useState(null);

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

  const handleClickImageHolder = () => {
    document.getElementById("fileselect").click();
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
          <p>Hello</p>
          <button className='submit'>Submit</button>
        </form>
      </div>
    </div>

  );
};

export default CreatePost;