import React, { useState } from 'react'
import Banner from '../Banner'
import servicesData from '../serviceData'
import { FaBullseye, FaChevronLeft, FaChevronRight, FaGaugeHigh, FaLocationDot, FaStar } from 'react-icons/fa6'
import { MdOutlineDesktopWindows } from 'react-icons/md'
import './Seo.css'

const seoOverviewServices = [
  {
    title: 'Keyword Research & Strategy:',
    text: 'Identify and target high-traffic keywords that resonate with your audience.',
    icon: <FaBullseye />,
  },
  {
    title: 'On-Page SEO:',
    text: 'Optimize meta tags, headers, and content to ensure your website is search engine friendly.',
    icon: <MdOutlineDesktopWindows />,
  },
  {
    title: 'Technical SEO:',
    text: 'Improve site speed, mobile optimization, and overall technical performance for better rankings',
    icon: <FaGaugeHigh />,
  },
  {
    title: 'LOCAL SEO:',
    text: 'Enhance your visibility in local search results with location-based strategies.',
    icon: <FaLocationDot />,
  },
]

const seoProjects = [
  {
    title: 'Kamboj Logistics',
    image: '/company_logo/Untitled-design-9.png',
    link: '#',
    className: 'seo-project-kamboj',
  },
  {
    title: 'Liberty Interiors',
    image: '/company_logo/PrtnerBackground.png',
    link: '#',
    className: 'seo-project-spider',
    featured: true,
  },
  {
    title: 'THE BTS',
    image: '/company_logo/Untitled-design-8.png',
    link: '#',
    className: 'seo-project-bts',
  },
]

export function SeoProjects() {
  const [activeProject, setActiveProject] = useState(1)

  const previousProject = () => {
    setActiveProject((currentProject) => (
      currentProject === 0 ? seoProjects.length - 1 : currentProject - 1
    ))
  }

  const nextProject = () => {
    setActiveProject((currentProject) => (
      currentProject === seoProjects.length - 1 ? 0 : currentProject + 1
    ))
  }

  const getProjectPosition = (index) => {
    if (index === activeProject) {
      return 'is-active'
    }

    const previousIndex = activeProject === 0 ? seoProjects.length - 1 : activeProject - 1
    return index === previousIndex ? 'is-left' : 'is-right'
  }

  return (
    <section className="seo-projects-section" aria-label="SEO project portfolio">
      <div className="seo-projects-heading">
        <span>Our Work</span>
        <h2>View Our <strong>Projects</strong></h2>
        <p>
          At <strong>Shabdd Technology</strong>, our projects showcase innovative,
          custom solutions designed to meet diverse business needs. Explore how
          we've helped clients achieve their goals through cutting-edge technology
          and strategic development.
        </p>
      </div>

      <div className="seo-projects-carousel">
        <button
          className="seo-project-nav seo-project-nav-left"
          type="button"
          aria-label="Previous project"
          onClick={previousProject}
        >
          <FaChevronLeft />
        </button>

        <div className="seo-projects-stage">
          {seoProjects.map((project, index) => (
            <a
              className={`seo-project-card ${project.className} ${getProjectPosition(index)}`}
              href={project.link}
              key={project.title}
              aria-label={`Open ${project.title} project`}
            >
              <img src={project.image} alt={project.title} />
              {project.featured && <FaStar className="seo-project-spark" />}
            </a>
          ))}
        </div>

        <button
          className="seo-project-nav seo-project-nav-right"
          type="button"
          aria-label="Next project"
          onClick={nextProject}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  )
}

function Seo() {
  return (
    <div>
      <Banner {...servicesData['seo']} />

      <section className="seo-overview-section" aria-label="SEO service overview">
        <div className="seo-overview-panel">
          <div className="seo-overview-copy">
            <h2>Service <span>Overview</span></h2>
            <div className="seo-overview-line" />
            <p>
              At Shabdd Technologies, we recognize that search engine visibility is
              fundamental to achieving online success. In today's competitive digital
              world, simply having a website is not enough; your business needs to be
              found by the right audience. That's where our expert SEO Management
              services come in.
            </p>
            <p>
              We focus on improving your website's ranking on major search engines
              like Google, driving high-quality organic traffic that converts. Our
              comprehensive approach combines on-page SEO, technical optimization,
              and local search strategies to help your business rise above the
              competition and achieve measurable growth.
            </p>
          </div>

          <div className="seo-services-card">
            <h3>Our <span>Key Services</span> Include</h3>
            <div className="seo-services-list">
              {seoOverviewServices.map((service, index) => (
                <article className="seo-service-item" key={service.title}>
                  <span className="seo-service-icon">{service.icon}</span>
                  <div>
                    <h4>{service.title}</h4>
                    <p>{service.text}</p>
                  </div>
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Seo
