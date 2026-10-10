import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
  FaLink,
  FaTwitter,
} from "react-icons/fa";
import NotFound from "../../pages/notFound/NotFound";
import { allBlogPosts, posts } from "./blogData";
import "./Blog.css";

const author = {
  name: "Priya Sharma",
  role: "Content Writer at Shabdd Technology",
  image: "/blog/1.jpg",
  bio: "Passionate about technology, digital marketing, and helping businesses grow through innovative content.",
};

function BlogDetail() {
  const { slug } = useParams();
  const post = allBlogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const stagePoints = post.content.slice(0, 2).map((text, index) => ({
    title: index === 0 ? "Define Your Goals" : "Research Your Audience",
    text,
  }));

  return (
    <main className="blog-page blog-detail-page">
      <article className="blog-detail-wrapper">
        <nav className="blog-detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/blog">Blog</Link>
          <span>/</span>
          <strong>{post.title}</strong>
        </nav>

        <header className="blog-detail-header">
          <h1>{post.title}</h1>

          <div className="blog-detail-meta-row">
            <div className="blog-detail-author-mini">
              <img src={author.image} alt={author.name} />
              <span>
                <strong>By {author.name}</strong>
                <small>{author.role}</small>
              </span>
            </div>
            <span className="blog-detail-meta-item">
              <FaCalendarAlt />
              {post.date}
            </span>
            <span className="blog-detail-meta-item">
              <FaClock />
              5 Min Read
            </span>
            <div className="blog-detail-share" aria-label="Share article">
              <span>Share:</span>
              <a href="https://www.facebook.com/" aria-label="Share on Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/" aria-label="Share on LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com/" aria-label="Share on Twitter">
                <FaTwitter />
              </a>
              <button type="button" aria-label="Copy article link">
                <FaLink />
              </button>
            </div>
          </div>
        </header>

        <img className="blog-detail-image" src={post.image} alt={post.title} />

        <div className="blog-detail-content">
          <h2>Introduction</h2>
          <p>{post.desc}</p>
          <p>{post.content[0]}</p>

          <div className="blog-stage-list">
            {stagePoints.map((stage, index) => (
              <div className="blog-stage-item" key={stage.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="blog-author-box">
          <img src={author.image} alt={author.name} />
          <div>
            <span>Written by</span>
            <h3>{author.name}</h3>
            <p>{author.role}</p>
            <small>{author.bio}</small>
          </div>
        </div>
      </article>

      <section className="blog-wrapper blog-related-section">
        <div className="blog-heading-row">
          <div>
            <h2>Related Articles</h2>
          </div>
          <Link className="blog-view-all" to="/blog">View All Blogs <FaArrowRight /></Link>
        </div>
        <div className="blog-grid">
          {relatedPosts.map((relatedPost) => (
            <Link className="blog-card" to={`/blog/${relatedPost.slug}`} key={relatedPost.slug} aria-label={relatedPost.title}>
              <img src={relatedPost.image} alt={relatedPost.title} />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <small>{relatedPost.date}</small>
                </div>
                <h3>{relatedPost.title}</h3>
                <span className="blog-read-more">Read More <FaArrowRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogDetail;
