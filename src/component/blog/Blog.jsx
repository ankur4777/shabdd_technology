import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaRegCalendarAlt,
  FaSearch,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config/api";
import "./blog.css";

const fallbackImage = "/blog/blog-card-banner.jpeg";
const initialVisibleBlogs = 9;
const visibleBlogsStep = 9;

const getBlogTimestamp = (blog) =>
  new Date(blog.published_date || blog.date || blog.created_at || 0).getTime();

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(initialVisibleBlogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadMoreRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    fetch(`${API_BASE_URL}/blogs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Blogs could not be loaded.");
        }

        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          const sortedBlogs = Array.isArray(data)
            ? [...data].sort((first, second) => getBlogTimestamp(second) - getBlogTimestamp(first))
            : [];

          setBlogs(sortedBlogs);
        }
      })
      .catch(() => {
        if (!ignore) {
          setError("Blogs load nahi ho pa rahe hain. Please backend API check karein.");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const categories = useMemo(() => {
    const blogCategories = blogs
      .map((blog) => blog.category)
      .filter(Boolean);

    return ["All Articles", ...Array.from(new Set(blogCategories))];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All Articles" || blog.category === activeCategory;

      const searchableText = [
        blog.title,
        blog.description,
        blog.desc,
        blog.category,
        blog.author?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, blogs, searchTerm]);

  useEffect(() => {
    setSlideIndex(0);
    setVisibleCount(initialVisibleBlogs);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    if (filteredBlogs.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % filteredBlogs.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [filteredBlogs.length]);

  const featuredPost = filteredBlogs[slideIndex] || filteredBlogs[0];
  const visibleBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMoreBlogs = visibleCount < filteredBlogs.length;

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !hasMoreBlogs) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + visibleBlogsStep, filteredBlogs.length)
          );
        }
      },
      {
        rootMargin: "280px 0px",
      }
    );

    observer.observe(loadMoreElement);

    return () => observer.disconnect();
  }, [filteredBlogs.length, hasMoreBlogs]);

  const goToPreviousSlide = () => {
    if (!filteredBlogs.length) {
      return;
    }

    setSlideIndex((current) =>
      current === 0 ? filteredBlogs.length - 1 : current - 1
    );
  };

  const goToNextSlide = () => {
    if (!filteredBlogs.length) {
      return;
    }

    setSlideIndex((current) => (current + 1) % filteredBlogs.length);
  };

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-kicker">OUR BLOG</span>
          <h1 className="primary-title" style={{textAlign: "left"}}>
            Ideas, Insights & <br />
            <span className="primary-text">Digital Growth</span>
          </h1>
          <p className="blog-hero-description">
            Explore the latest trends, expert insights and practical guides on
            web development, digital marketing, SEO, design and more.
          </p>
        </div>
      </section>

      <section className="blog-wrapper">
        <div className="blog-filter-row">
          {categories.map((category) => (
            <button
              className={category === activeCategory ? "active" : ""}
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}

          <label className="blog-search-box" aria-label="Search blog posts">
            <FaSearch />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search blogs"
            />
          </label>
        </div>

        {loading && (
          <div className="blog-loading" aria-label="Loading blogs">
            <div className="blog-loading-featured">
              <span />
              <div>
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="blog-loading-grid">
              {[1, 2, 3].map((item) => (
                <div className="blog-loading-card" key={item}>
                  <span />
                  <i />
                  <i />
                  <i />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && error && <div className="blog-empty">{error}</div>}

        {!loading && !error && !filteredBlogs.length && (
          <div className="blog-empty">No blogs found.</div>
        )}

        {!loading && !error && featuredPost && (
          <article className="blog-featured-card" key={featuredPost.slug} aria-live="polite">
            <Link className="blog-featured-media" to={`/blog/${featuredPost.slug}`}>
              <img
                src={featuredPost.image || fallbackImage}
                alt={featuredPost.title}
                fetchPriority="high"
              />
              <span>{slideIndex === 0 ? "LATEST" : "FEATURED"}</span>
            </Link>

            <div className="blog-featured-copy">
              <span className="blog-category">{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.description || featuredPost.desc}</p>

              <div className="blog-meta">
                <span>
                  <FaRegCalendarAlt /> {featuredPost.date}
                </span>
                <span>
                  <FaClock /> {featuredPost.read_time || 5} Min Read
                </span>
              </div>

              <Link to={`/blog/${featuredPost.slug}`}>
                Read More <FaArrowRight />
              </Link>

              <strong className="blog-featured-number">
                {String(slideIndex + 1).padStart(2, "0")}
              </strong>
            </div>
          </article>
        )}

        {!loading && !error && filteredBlogs.length > 1 && (
          <div className="blog-slide-dots" aria-label="Featured blog slideshow">
            {filteredBlogs.map((post, index) => (
              <button
                className={index === slideIndex ? "active" : ""}
                type="button"
                key={post.slug}
                aria-label={`Show featured blog ${index + 1}`}
                onClick={() => setSlideIndex(index)}
              />
            ))}
          </div>
        )}

        <div className="blog-heading-row">
          <div>
            <span className="blog-kicker">LATEST ARTICLES</span>
            <h2>Latest Blog & News</h2>
          </div>

          <div className="blog-heading-side">
            <p>
              Showing {visibleBlogs.length} of {filteredBlogs.length} database blog
              {filteredBlogs.length === 1 ? "" : "s"}.
            </p>

            <div className="blog-slider-controls">
              <button
                type="button"
                aria-label="Previous featured blog"
                onClick={goToPreviousSlide}
                disabled={filteredBlogs.length <= 1}
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Next featured blog"
                onClick={goToNextSlide}
                disabled={filteredBlogs.length <= 1}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="blog-grid">
          {visibleBlogs.map((post) => (
            <Link
              className="blog-card"
              to={`/blog/${post.slug}`}
              key={post.slug}
              aria-label={post.title}
            >
              <img
                src={post.image || fallbackImage}
                alt={post.title}
                loading="lazy"
                decoding="async"
              />

              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>{post.category}</span>
                  <small>
                    <FaRegCalendarAlt /> {post.date}
                  </small>
                </div>

                <h3>{post.title}</h3>
                <p>{post.description || post.desc}</p>
                <span className="blog-read-more">
                  Read More <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {hasMoreBlogs && (
          <div className="blog-load-more-sentinel" ref={loadMoreRef}>
            <span>Loading More blogs...</span>
          </div>
        )}
      </section>
    </main>
  );
}

export default Blog;
