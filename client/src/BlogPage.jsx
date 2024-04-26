import '../styles/blogpage.scss';

const BlogPage = () => {
  return (
    <div className='blogpage'>

      <div className="blogcontainer">
        <div className="blogstart">
          <div className="image_likes">
            <img src="person.jpg" className="blogimg" alt="blogimg" height={100} width={100} />
            <div className="likes">
              <p className="likescount">10k</p>
              <img src="heart_fill.svg" alt="heart" className="heart" height={100} width={100} />
            </div>
          </div>

          <div className="author_date">
            <p>Ram</p>
            <p>13/1/22</p>
          </div>
        </div>

        <div className="blogcontent">
          <p>Hello</p>
        </div>

      </div>
    </div>

  );
};

export default BlogPage;