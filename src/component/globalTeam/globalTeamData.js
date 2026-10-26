export const globalTeamData = {
  eyebrow: 'CANADA · INDIA · AUSTRALIA',
  title: 'Three countries. One team.',
  description:
    'Strategy and delivery across time zones. Our partner network keeps product, engineering and growth moving around the clock.',
  offices: [
    {
      id: 'canada',
      country: 'Canada',
      city: 'Winnipeg',
      latitude: 49.8951,
      longitude: -97.1384,
      timeZone: 'CST · UTC−6',
      partnerName: 'Workaholic Developers',
      partnerUrl: 'https://workaholicdevelopers.com/',
      description: 'Product strategy, client success and delivery coordination across North America.',
      accent: '#12e7f2',
    },
    {
      id: 'india',
      country: 'India',
      city: 'New Delhi',
      latitude: 28.6139,
      longitude: 77.209,
      timeZone: 'IST · UTC+5:30',
      partnerName: 'Shabdd Technology',
      partnerUrl: 'https://shabddtechnology.in/',
      description: 'Engineering, AI solutions and digital growth delivered from our India team.',
      accent: '#12e7f2',
    },
    {
      id: 'australia',
      country: 'Australia',
      city: 'Sydney',
      latitude: -33.8688,
      longitude: 151.2093,
      timeZone: 'AEDT · UTC+11',
      partnerName: 'EduWeb Consulting',
      partnerUrl: 'https://eduwebconsulting.com/',
      description: 'Education technology partnerships and regional support across Australia.',
      accent: '#12e7f2',
    },
  ],
}

export const connectionPairs = [
  ['canada', 'india'],
  ['india', 'australia'],
  ['australia', 'canada'],
]
