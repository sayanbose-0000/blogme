import '../styles/blogpage.scss';
import DOMPurify from 'dompurify';

const BlogPage = () => {
  const dirtyHTML = `
  <h1>XSS Example</h1>
  <a href="javascript:alert(1)">Open Link</a>
`;

  const cleanHTML = DOMPurify.sanitize(dirtyHTML);

  return (
    <div className='blogpage'>

      <div className="blogcontainer">
        <div className="blogstart">
          <div className="image_likes">
            <img src="placeholder.jpg" className="blogimg" alt="blogimg" height={100} width={100} />
            <div className="likes">
              <p className="likescount">10k</p>
              <img src="heart_fill.svg" alt="heart" className="heart" height={100} width={100} />
            </div>
          </div>
          <div className="author_date">
            <p>Ram</p>
            <p className='title'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, mollitia!  elit. Fugit, optio.</p>
            <p>13/1/22</p>
          </div>
        </div>
        <div className="blogcontent">
          <div dangerouslySetInnerHTML={{ __html: cleanHTML }} className='content' />
        </div>
      </div>
    </div>

  );
};

export default BlogPage;