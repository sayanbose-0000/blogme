import '../styles/blogpage.scss';

const BlogPage = () => {
  return (
    <div className='blogpage'>
      <div className="blogcontainer">
        <img src="person.jpg" className='blogimage' alt="blogimage" height={100} width={100} />
        <div className="blogcontent">
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;