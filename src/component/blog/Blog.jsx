import './blog.css';
import {
  FaBullhorn,
  FaCalendarAlt,
  FaChartLine,
  FaRegCommentDots,
  FaRegEdit,
} from 'react-icons/fa';

function Blog() {
  const blogs = [
    {
      title: '7 Key Stages to Build a Powerful Social Media Plan',
      date: 'August 8, 2024',
      comments: '0 Comments',
      image: '/blog/1.jpg',
      tone: 'orange',
      Icon: FaRegEdit,
      description:
        "In today's digital-driven world, an IT solutions company can't afford to ignore the power of social media.",
    },
    {
      title: 'Social Media Management for IT Solutions: Unlocking Growth in the Digital World',
      date: 'August 8, 2024',
      comments: '0 Comments',
      image: '/blog/2.jpg',
      tone: 'blue',
      Icon: FaBullhorn,
      description:
        'In a fast-paced digital era, where every business is fighting for visibility, IT solution companies must leverage social media.',
    },
    {
      title: 'Social Media Management for IT Solution Companies: Boosting Visibility in the Digital Age',
      date: 'August 8, 2024',
      comments: '0 Comments',
      image: '/blog/3.jpg',
      tone: 'green',
      Icon: FaChartLine,
      description:
        'In the ever-evolving tech world, visibility is everything. No matter how innovative your IT solutions.',
    },
  ];

  return (
    <section className="blog">
      <div className="blog-dots" aria-hidden="true" />
      <div className="blog-rings" aria-hidden="true" />

      <div className="blog-header">
        <p className="blog-kicker">Our Blog</p>
        <h2>
          Latest <span className='h2-italic'>Blog</span> & News
        </h2>
        <div className="blog-title-rule" aria-hidden="true" />
        <p>
          Our blog features expert articles, industry news, and updates on
          cutting-edge solutions from Shabdd Technology.
        </p>
      </div>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <article className={`blog-card blog-card-${blog.tone}`} key={blog.title}>
            <div className="blog-image-wrap">
              <img src={blog.image} alt={blog.title} />
              <div className="blog-card-icon" aria-hidden="true">
                <blog.Icon />
              </div>
            </div>

            <div className="blog-card-content">
              <div className="blog-meta">
                <span>
                  <FaCalendarAlt aria-hidden="true" />
                  {blog.date}
                </span>
                <span>
                  <FaRegCommentDots aria-hidden="true" />
                  {blog.comments}
                </span>
              </div>

              <h3>{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>

             
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;
