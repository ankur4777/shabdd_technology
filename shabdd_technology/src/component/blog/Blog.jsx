import React from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt, FaRegCommentDots, FaArrowRight, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import "./Blog.css";
import { categories, featuredPost, posts } from "./blogData";

function Blog() {
  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-kicker">OUR BLOG</span>
          <h1>
            Ideas, Insights & <br />
            <span>Digital Growth</span>
          </h1>
          <p>
            Explore the latest trends, expert insights and practical guides on
            web development, digital marketing, SEO, design and more.
          </p>
          <div className="blog-breadcrumb">
            <span>Home</span>
            <FaArrowRight aria-hidden="true" />
            <strong>Blog</strong>
          </div>
        </div>
      </section>

      <section className="blog-wrapper">
        <div className="blog-filter-row">
          {categories.map((category, index) => (
            <button className={index === 0 ? "active" : ""} key={category} type="button">
              {category}
            </button>
          ))}
          <button className="blog-search" type="button" aria-label="Search blog posts">
            <FaSearch />
          </button>
        </div>

        <article className="blog-featured-card">
          <Link className="blog-featured-media" to={`/blog/${featuredPost.slug}`}>
            <img src={featuredPost.image} alt={featuredPost.title} />
            <span>FEATURED</span>
          </Link>
          <div className="blog-featured-copy">
            <span className="blog-category">{featuredPost.category}</span>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.desc}</p>
            <div className="blog-meta">
              <span><FaRegCalendarAlt /> {featuredPost.date}</span>
              <span><FaRegCommentDots /> 5 Comments</span>
            </div>
            <Link to={`/blog/${featuredPost.slug}`}>Read More <FaArrowRight /></Link>
            <strong className="blog-featured-number">01</strong>
          </div>
        </article>

        <div className="blog-heading-row">
          <div>
            <span className="blog-kicker">LATEST ARTICLES</span>
            <h2>Latest Blog & News</h2>
          </div>
          <div className="blog-heading-side">
            <p>
              Stay updated with the latest trends in web development, digital
              marketing, design and technology. Useful resources, guides and
              expert insights for your business growth.
            </p>
            <div className="blog-slider-controls">
              <button type="button" aria-label="Previous articles"><FaChevronLeft /></button>
              <button type="button" aria-label="Next articles"><FaChevronRight /></button>
            </div>
          </div>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <Link className="blog-card" to={`/blog/${post.slug}`} key={post.slug} aria-label={post.title}>
              <img src={post.image} alt={post.title} />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>{post.category}</span>
                  <small><FaRegCalendarAlt /> {post.date}</small>
                </div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <span className="blog-read-more">Read More <FaArrowRight /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="blog-pagination">
          <button className="active" type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">4</button>
          <button type="button">...</button>
          <button type="button">8</button>
          <button type="button" aria-label="Next page"><FaChevronRight /></button>
        </div>
      </section>
    </main>
  );
}

export default Blog;