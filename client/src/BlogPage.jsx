import DOMPurify from 'dompurify';
import '../styles/blogpage.css';

const BlogPage = () => {
  const dirtyHTML = `
    <h1>XSS Example</h1>
    <a href="javascript:alert(1)">Open Link</a>
  `;

  const cleanHTML = DOMPurify.sanitize(dirtyHTML);

  return (
    <div className='blogpage'>

      <div className="blogpage__container">
        <div className="blogpage__start">
          <div className="blogpage__image-likes">
            <img src="placeholder.jpg" className="blogpage__img" alt="blogimg" height={100} width={100} />
            <div className="blogpage__likes">
              <p className="blogpage__likes-count">10k</p>
              <img src="heart_empty.svg" alt="heart" className="blogpage__heart" height={100} width={100} />
            </div>
          </div>
          <div className="blogpage__author-date">
            <p>Ram</p>
            <p>13/1/22</p>
          </div>
        </div>
        <div className="blogpage__content">
          <p className='blogpage__title'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, mollitia!  elit. Fugit, optio.</p>
          <div dangerouslySetInnerHTML={{ __html: cleanHTML }} className='blogpage__content-text' />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
