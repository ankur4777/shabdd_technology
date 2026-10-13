const img = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const destinations = [
  {
    slug: 'greece',
    place: 'Greece',
    image: img('photo-1570077188670-e3a8d69ac5ff'),
    description: 'Explore the island villages, blue waters and unforgettable sunsets of Greece.',
  },
  {
    slug: 'switzerland',
    place: 'Switzerland',
    image: img('photo-1506905925346-21bda4d32df4'),
    description: 'Discover alpine lakes, scenic mountain views and charming Swiss towns.',
  },
  {
    slug: 'amritsar-india',
    place: 'Amritsar, India',
    image: img('photo-1609948543911-7f01ff385be5'),
    description: 'Experience the warmth, food and heritage of Punjab in the heart of Amritsar.',
  },
  {
    slug: 'paris-france',
    place: 'Paris, France',
    image: img('photo-1502602898657-3e91760cbb34'),
    description: 'Wander historic streets, admire iconic landmarks and enjoy the spirit of Paris.',
  },
  {
    slug: 'maldives',
    place: 'Maldives',
    image: img('photo-1514282401047-d79a71a590e8'),
    description: 'Unwind beside clear turquoise water and the beautiful islands of the Maldives.',
  },
  {
    slug: 'manali-india',
    place: 'Manali, India',
    image: img('photo-1500530855697-b586d89ba3ee'),
    description: 'Take in fresh mountain air, dramatic landscapes and the adventure of Manali.',
  },
  {
    slug: 'japan',
    place: 'Japan',
    image: img('photo-1528164344705-47542687000d'),
    description: 'Find a memorable mix of rich traditions, lively cities and beautiful scenery in Japan.',
  },
  {
    slug: 'dubai-uae',
    place: 'Dubai, UAE',
    image: img('photo-1548013146-72479768bada'),
    description: 'See Dubai’s striking landmarks, desert horizons and vibrant city life.',
  },
  {
    slug: 'kashmir-india',
    place: 'Kashmir, India',
    image: img('photo-1483664852095-d6cc6870702d'),
    description: 'Enjoy peaceful valleys, mountain scenery and the natural beauty of Kashmir.',
  },
  {
    slug: 'thailand',
    place: 'Thailand',
    image: img('photo-1507525428034-b723cf961d3e'),
    description: 'Explore tropical shores, welcoming culture and vibrant experiences across Thailand.',
  },
];

export default destinations;
