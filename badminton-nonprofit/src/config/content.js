import {
  FaMedal,
  FaWheelchair,
  FaChildren,
  FaChalkboardUser,
} from 'react-icons/fa6'

// ---------------------------------------------------------------------------
// PLACEHOLDER DATA — replace before launch.
//
// The impact figures below are illustrative layout copy, not measured results.
// Publishing invented numbers on a 501(c)(3) site is a real problem, so every
// value here needs to be swapped for a figure the foundation can actually
// substantiate (or the stat band should be removed).
// ---------------------------------------------------------------------------
export const IMPACT_STATS = [
  { value: '0', suffix: '+', label: 'Athletes funded', note: 'TODO — real figure' },
  { value: '0', suffix: '', label: 'Partner clubs', note: 'TODO — real figure' },
  { value: '0', suffix: '', label: 'Free youth sessions', note: 'TODO — real figure' },
  { value: '0', suffix: '%', label: 'Of gifts to programs', note: 'TODO — real figure' },
]

export const PROGRAMS = [
  {
    slug: 'para-pathway',
    icon: FaWheelchair,
    name: 'Para-Badminton Pathway',
    summary:
      'Para-badminton made its Paralympic debut in Tokyo. The talent is here; the funding is not.',
    body:
      'We cover the costs that quietly end para-badminton careers before they start — sport wheelchairs, classification travel, entry fees for the international events that determine world ranking, and the coaching hours that turn a promising club player into a ranked competitor. Grants follow the athlete, not the club, so support travels with them as they move up.',
    bullets: [
      'Equipment grants for sport wheelchairs and adaptive rackets',
      'Travel and entry support for classification and ranking events',
      'Coaching stipends for para-specific technical work',
      'Mentorship pairings with current and former national team athletes',
    ],
  },
  {
    slug: 'veterans',
    icon: FaMedal,
    name: 'Adaptive Court Sports for Veterans',
    summary:
      'Six weeks on a badminton court, free, for service members and veterans recovering from injury.',
    body:
      'Built with VA medical centers and military installations, this program brings structured, instructor-led badminton to veterans living with PTS, TBI, amputation, and spinal-cord injury. Sessions run in six-week cycles so participants can graduate into the next one rather than finish and disappear. The court is the point: low impact, high focus, and a room full of people who understand the recovery.',
    bullets: [
      'Free six-week instructional cycles, no equipment required',
      'Delivered on-site at partner VA centers and installations',
      'Adaptive coaching for seated and standing sport classes',
      'A direct path into competitive para-badminton for those who want it',
    ],
  },
  {
    slug: 'youth-access',
    icon: FaChildren,
    name: 'Youth Access Initiative',
    summary:
      'Badminton is the second most-played sport on earth and one of the least funded in American schools.',
    body:
      'We put nets, rackets, and trained instructors into Title I schools, community centers, and after-school programs at no cost to the site. Every participating school keeps its equipment permanently, so the program does not end when our staff drives away. Sites that build sustained interest are connected to a local club so kids have somewhere to go next.',
    bullets: [
      'Permanent equipment grants — nets, rackets, shuttles, portable posts',
      'Instructor training for teachers and program staff',
      'Curriculum built for gym classes with no badminton background',
      'Club placement for players who want to keep competing',
    ],
  },
  {
    slug: 'coach-development',
    icon: FaChalkboardUser,
    name: 'Coach & Official Development',
    summary:
      'A sport grows at exactly the speed it can train the adults who run it.',
    body:
      'We underwrite certification for coaches and technical officials in regions with the thinnest coverage, with priority for candidates who commit to serving adaptive and youth programs. Certification is expensive and travel-heavy, which is precisely why the map of American badminton coaching has such large holes in it.',
    bullets: [
      'Certification scholarships for coaches and technical officials',
      'Priority for adaptive and para-badminton credentials',
      'Regional clinics in underserved states',
      'Continuing-education support for certified coaches',
    ],
  },
]

// ---------------------------------------------------------------------------
// LEADERSHIP
//
// Steve Kearney's biography below is drafted from publicly reported sources
// (USA Badminton, the National Senior Games Association, and Military Adaptive
// Court Sports). Confirm the details and his willingness to be listed before
// this page is published.
// ---------------------------------------------------------------------------
export const LEADERSHIP = [
  {
    name: 'Steve Kearney',
    role: 'Founding Board Chair',
    photo: null,
    bio: 'Steve Kearney has spent more than three decades inside American badminton — as a nationally ranked doubles and mixed-doubles player, as President of USA Badminton, and across twelve years on its Board of Directors. He managed the sport of badminton for the 1996 Olympic Games, served as team leader at the 2000 Olympic Games in Sydney and the 2003 Pan American Games, and called the sport for NBC as a color commentator at the Beijing and London Olympic Games. He has served on the board of the United States Olympic Committee, has worked with the National Senior Games Association since 1999, and led USA Badminton\'s para-badminton program into its Paralympic debut.',
    highlights: [
      'Past President, USA Badminton',
      'Board of Directors, USA Badminton — 12 years',
      'Sport Manager, Badminton — 1996 Olympic Games',
      'Team Leader — 2000 Olympic Games, 2003 Pan American Games',
      'NBC color commentator — 2008 and 2012 Olympic Games',
      'Para-badminton leadership through the sport\'s Paralympic debut',
    ],
    linkedin:
      'https://www.linkedin.com/in/steve-kearney-bb77225',
  },
  {
    // TODO: replace with real board members.
    name: 'TODO — Board Member',
    role: 'Treasurer',
    photo: null,
    bio: 'Add a short biography for each additional board member. Two to four sentences is plenty: what they do, what they bring to the foundation, and their connection to the sport.',
    highlights: [],
    linkedin: null,
  },
  {
    // TODO: replace with real board members.
    name: 'TODO — Board Member',
    role: 'Secretary',
    photo: null,
    bio: 'Add a short biography for each additional board member. Two to four sentences is plenty: what they do, what they bring to the foundation, and their connection to the sport.',
    highlights: [],
    linkedin: null,
  },
]

export const VALUES = [
  {
    title: 'The athlete, not the overhead',
    body:
      'Grants follow people. We would rather fund one athlete completely than fund twenty partially and watch all of them stall in the same place.',
  },
  {
    title: 'Adaptive is not a side program',
    body:
      'Para-badminton and adaptive court sports sit at the center of what we fund, with the same standards and the same ambition as every other pathway.',
  },
  {
    title: 'Leave the equipment behind',
    body:
      'Every school and center we work with keeps its nets and rackets permanently. A program that ends when our van pulls away was never a program.',
  },
  {
    title: 'Say what the money did',
    body:
      'We publish what we raised, what we granted, and what happened next — including the parts that did not work.',
  },
]

export const WAYS_TO_GIVE = [
  {
    title: 'Give once',
    body: 'A single gift, put straight to work in the current grant cycle.',
    cta: 'Donate',
    primary: true,
  },
  {
    title: 'Give monthly',
    body: 'Recurring support is what lets us commit to an athlete for a full season instead of a single tournament.',
    cta: 'Become a sustainer',
    primary: false,
  },
  {
    title: 'Sponsor a program',
    body: 'Underwrite a six-week veterans cycle, a school equipment grant, or an athlete\'s international season.',
    cta: 'Talk to us',
    primary: false,
  },
  {
    title: 'Volunteer',
    body: 'Coaches, stringers, drivers, and event staff — clinics do not run without them.',
    cta: 'Sign up',
    primary: false,
  },
]

export const FAQS = [
  {
    q: 'Are you USA Badminton?',
    a: 'No. Rally Forward Foundation is an independent 501(c)(3) nonprofit. USA Badminton is the sport\'s national governing body; we are a separate charitable organization whose grants support athletes, clubs, and programs across the American badminton community.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Gifts to the foundation are tax-deductible to the fullest extent allowed by law once our 501(c)(3) determination is on file. Our EIN appears in the footer of every page.',
  },
  {
    q: 'How do I apply for a grant?',
    a: 'Athlete and program grant applications open each cycle. Write to us at the address on the contact page and we will send you the current application and deadlines.',
  },
  {
    q: 'Do you fund equipment for a club, or only individuals?',
    a: 'Both. Individual athlete grants follow the athlete; program grants go to schools, clubs, VA centers, and community organizations running open-access sessions.',
  },
]
