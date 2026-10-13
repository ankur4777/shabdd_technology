import React from 'react'
import { useParams } from 'react-router-dom'
import WebDevelopment from './webdevelopment/WebDevelopment'
import WebApplication, { WebApplicationProcess } from './webApplication/WebApplication'
import DigitalMarketing from './digitalMarketing/DigitalMarketing'
import Seo, { SeoProjects } from './seo/Seo'
import MetaADS from './metaAds/MetaADS'
import Graphic, { GraphicProcess } from './graphic/Graphic'
import YoutubeAds from './youtubeAds/YoutubeAds'
import AllserviceText from './AllserviceText'
import ServiceShowcaseSection from './ServiceShowcaseSection'
import servicesData from './serviceData'
import FSQ from './FSQ'
import NotFound from '../notFound/NotFound'

const serviceComponents = {
  'web-development': WebDevelopment,
  'web-application': WebApplication,
  'digital-marketing': DigitalMarketing,
  "seo": Seo,
  'meta-ads': MetaADS,
  'graphic-designing': Graphic,
  'youtube-ads': YoutubeAds,
}

function ServicePage() {
  const { serviceKey } = useParams()
  const SelectedService = serviceComponents[serviceKey]
  const service = servicesData[serviceKey]

  if (!SelectedService || !service) {
    return <NotFound />
  }

  return (
    <div>
      <SelectedService />
      <AllserviceText serviceText={service.serviceText} />
      <ServiceShowcaseSection data={service.showcaseSection} />
      {serviceKey === 'web-application' && <WebApplicationProcess />}
      {serviceKey === 'seo' && <SeoProjects />}
      {serviceKey === 'graphic-designing' && <GraphicProcess />}
      <FSQ />
    </div>
  )
}

export default ServicePage
