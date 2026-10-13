import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config/api";
import NotFound from "../../pages/notFound/NotFound";
import "./blog.css";

const fallbackImage = "/blog/blog-card-banner.jpeg";
const fallbackAuthorImage = "/blog/1.jpg";
const linkedInUrl = "https://in.linkedin.com/company/shabdd-innovations";

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setNotFound(false);

    Promise.all([
      fetch(`${API_BASE_URL}/blogs/${slug}`),
      fetch(`${API_BASE_URL}/blogs`),
    ])
      .then(async ([postResponse, blogsResponse]) => {
        if (!postResponse.ok) {
          throw new Error("not-found");
        }

        const postData = await postResponse.json();
        const blogsData = blogsResponse.ok ? await blogsResponse.json() : [];

        if (!ignore) {
          setPost(postData);
          setBlogs(Array.isArray(blogsData) ? blogsData : []);
        }
      })
      .catch(() => {
        if (!ignore) {
          setNotFound(true);
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
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) {
      return [];
    }

    const sameCategory = blogs.filter(
      (item) => item.slug !== post.slug && item.category === post.category
    );

    const fallbackRelated = blogs.filter((item) => item.slug !== post.slug);

    return (sameCategory.length ? sameCategory : fallbackRelated).slice(0, 3);
  }, [blogs, post]);

  const shareArticleOnWhatsApp = async () => {
    const articleUrl = window.location.href;
    const shareText = `${post.title} ${articleUrl}`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(articleUrl);
        setCopiedShareLink(true);
        window.setTimeout(() => setCopiedShareLink(false), 1800);
      }
    } catch (error) {
      setCopiedShareLink(false);
    }

    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (loading) {
    return (
      <main className="blog-page blog-detail-page">
        <section className="blog-detail-wrapper">
          <div className="blog-detail-loading" aria-label="Loading blog detail">
            <i className="blog-detail-loading-breadcrumb" />
            <i className="blog-detail-loading-title" />
            <div className="blog-detail-loading-meta">
              <i />
              <i />
              <i />
            </div>
            <i className="blog-detail-loading-image" />
            <div className="blog-detail-loading-content">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="blog-detail-loading-author">
              <i />
              <span>
                <i />
                <i />
              </span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (notFound || !post) {
    return <NotFound />;
  }

  const author = post.author || {};
  const contentSections = post.content_sections || [];

  return (
    <main className="blog-page blog-detail-page">
      <article className="blog-detail-wrapper">
       
        <header className="blog-detail-header">
          <h1>{post.title}</h1>

          <div className="blog-detail-meta-row">
            <div className="blog-detail-author-mini">
              <img
                src={author.image || fallbackAuthorImage}
                alt={author.name || "Author"}
              />
              <span>
                <strong>By {author.name || "Shabdd Technology"}</strong>
                <small>{author.role || "Author"}</small>
              </span>
            </div>

            <span className="blog-detail-meta-item">
              <FaCalendarAlt />
              {post.date}
            </span>

            <span className="blog-detail-meta-item">
              <FaClock />
              {post.read_time || 5} Min Read
            </span>

            <div className="blog-detail-share" aria-label="Share and social links">
              <button
                className="blog-detail-share-button blog-detail-whatsapp"
                type="button"
                aria-label="Copy link and share on WhatsApp"
                title={copiedShareLink ? "Link copied" : "Share on WhatsApp"}
                onClick={shareArticleOnWhatsApp}
              >
                <FaWhatsapp />
              </button>
              <a
                className="blog-detail-share-button blog-detail-linkedin"
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Shabdd Innovations on LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </header>

        <img
          className="blog-detail-image"
          src={post.image || fallbackImage}
          alt={post.title}
          fetchPriority="high"
        />

        <div className="blog-detail-content">
          <h2>Introduction</h2>
          <p>{post.description || post.desc}</p>
          {post.introduction && <p>{post.introduction}</p>}

          {!!contentSections.length && (
            <div className="blog-stage-list">
              {contentSections.map((section, index) => (
                <div className="blog-stage-item" key={`${section.heading}-${index}`}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{section.heading}</h3>
                    <p>{section.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="blog-author-box">
          <img
            src={author.image || fallbackAuthorImage}
            alt={author.name || "Author"}
            loading="lazy"
            decoding="async"
          />
          <div>
            <span>Written by</span>
            <h3>{author.name || "Shabdd Technology"}</h3>
            <p>{author.role || "Author"}</p>
            {author.bio && <small>{author.bio}</small>}
          </div>
        </div>
      </article>

      {!!relatedPosts.length && (
        <section className="blog-wrapper blog-related-section">
          <div className="blog-heading-row">
            <div>
              <h2>Related Articles</h2>
            </div>
            <Link className="blog-view-all" to="/blog">
              View All Blogs <FaArrowRight />
            </Link>
          </div>

          <div className="blog-grid">
            {relatedPosts.map((relatedPost) => (
              <Link
                className="blog-card"
                to={`/blog/${relatedPost.slug}`}
                key={relatedPost.slug}
                aria-label={relatedPost.title}
              >
                <img
                  src={relatedPost.image || fallbackImage}
                  alt={relatedPost.title}
                  loading="lazy"
                  decoding="async"
                />

                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <small>{relatedPost.date}</small>
                  </div>
                  <h3>{relatedPost.title}</h3>
                  <span className="blog-read-more">
                    Read More <FaArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default BlogDetail;
