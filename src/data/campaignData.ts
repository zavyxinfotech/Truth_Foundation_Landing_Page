import { Campaign, DonationOption, FAQItem, GalleryItem, MonthlyGivingOptions, Testimonial } from '../types';
import heroChildLongingMeal from '../assets/images/hero_child_longing_meal.jpg';
import heroRedhillsOrphanage from '../assets/images/hero_redhills_orphanage.jpg';
import heroSpecialNeedsCare from '../assets/images/hero_special_needs_care.jpg';
import heroTuitionSchoolMeals from '../assets/images/hero_tuition_school_meals.jpg';
import elderlyFoodCareDrive from '../assets/images/elderly_food_care_drive.jpg';

import heroImg from '../assets/images/hero_child_meal_1785560801958.jpg';
import volunteerImg from '../assets/images/img155.jpg';
import HealthCampsImg from '../assets/images/img293.jpg';
import covidCampsImg from '../assets/images/img299.jpg';
import childrenImg from '../assets/images/img155.jpg';
import servingMealsImg from '../assets/images/img155.jpg';
import culturalFestivalImg from '../assets/images/img191.jpg';
import schoolKitsImg from '../assets/images/img125.jpg';
import birthdayFeastImg from '../assets/images/volunteer_birthday_celebration_1785568062985.jpg';
import festivalSweetsImg from '../assets/images/festival_joy_children_1785568098245.jpg';
import happyChildrenMealsImg from '../assets/images/img71.jpg';

export const DEFAULT_MONTHLY_GIVING: MonthlyGivingOptions = {
  enabled: true,
  suggestedAmounts: [300, 500, 1000, 2500],
  defaultAmount: 500,
  perks: [
    'Automated monthly 80G tax exemption receipts',
    'Quarterly photo & video progress reports on WhatsApp',
    'Cancel, pause, or adjust your recurring amount anytime'
  ],
  impactDescription: 'Sustained monthly support helps Truth Foundation plan long-term kitchen operations and guarantee wholesome meals for children every single day.'
};

export const CURRENT_CAMPAIGN: Campaign = {
  id: 'truth-foundation-drive',
  title: 'Truth Foundation Comprehensive Care Drive',
  subtitle: 'Your support empowers 45 orphaned children, 20 abandoned elders, 23 special-needs children, and 346 tuition students.',
  tagline: 'Public Charitable Trust (Est. 5th July 2010)',
  heroImage: heroChildLongingMeal,
  targetMeals: 100000,
  mealsServed: 58420,
  donorsCount: 12480,
  minAmount: 100,
  suggestedAmounts: [100, 500, 1000, 2500, 5000],
  badge: '80G Tax Exempted (50% Exemption Under Sec 80G)',
  description: 'Launched on 5th July 2010, Truth Foundation (A Public Charitable Trust) operates a Orphanage in Redhills Chennai, an Old Age Day Care Home, a Special School for mentally retarded children in Thiruvallur, and 8 Free Evening Tuition Centers serving 346+ children with education, food, and hygiene supplies.',
  monthlyOptions: DEFAULT_MONTHLY_GIVING
};

export const FUTURE_CAMPAIGNS: Campaign[] = [
  {
    id: 'orphanage-home-redhills',
    title: 'Redhills Orphanage & Child Care',
    subtitle: 'Provide food, shelter, dormitories, education, and love to 45 resident boys and girls in Redhills.',
    tagline: 'Our Campus in Redhills, Chennai',
    heroImage: heroRedhillsOrphanage,
    targetMeals: 50000,
    mealsServed: 32400,
    donorsCount: 6840,
    minAmount: 500,
    suggestedAmounts: [500, 1000, 2500, 5000, 10000],
    badge: '15+ Years Orphanage Home',
    description: 'Our Redhills campus features separate dormitories, study halls, playgrounds, and dining facilities for 45 children managed by 16 committed staff members.',
    monthlyOptions: DEFAULT_MONTHLY_GIVING
  },
  {
    id: 'special-needs-school',
    title: 'Special School for Special Needs Children',
    subtitle: 'Special education, physiotherapy, and dedicated free van pickup for 23 children in Thiruvallur.',
    tagline: 'China Ikaadu, Thiruvallur District',
    heroImage: heroSpecialNeedsCare,
    targetMeals: 30000,
    mealsServed: 14200,
    donorsCount: 3120,
    minAmount: 300,
    suggestedAmounts: [300, 600, 1200, 2500, 5000],
    badge: 'Special Needs & Physiotherapy',
    description: 'Trained professional educators and physiotherapists provide tailored care for 23 children with intellectual disabilities, complete with daily van door-step transportation.',
    monthlyOptions: {
      ...DEFAULT_MONTHLY_GIVING,
      suggestedAmounts: [300, 600, 1200, 2500],
      defaultAmount: 600,
      impactDescription: 'Sustained monthly support fuels physiotherapy equipment and van fuel for daily pickup of special needs children.'
    }
  },
  {
    id: 'old-age-care-center',
    title: 'Old Age Home & Senior Care Center',
    subtitle: 'Nourishment, shelter, daily medication, and dignity for 20 abandoned street seniors in Redhills.',
    tagline: 'Care for Abandoned Elders',
    heroImage: elderlyFoodCareDrive,
    targetMeals: 40000,
    mealsServed: 19800,
    donorsCount: 4120,
    minAmount: 500,
    suggestedAmounts: [500, 1500, 3000, 7500],
    badge: 'Senior Day Care & Shelter',
    description: 'Providing food, shelter, periodic medical checkups, and loving care to elderly citizens left destitute on streets by family members.',
    monthlyOptions: DEFAULT_MONTHLY_GIVING
  },
  {
    id: 'evening-tuition-centers',
    title: 'Child Care & Evening Tuition Centers',
    subtitle: 'Free tuition, daily nutrition, notebooks, bags, and hygiene kits for 346 children across 8 centers.',
    tagline: 'Chennai & Thiruvallur Districts',
    heroImage: heroTuitionSchoolMeals,
    targetMeals: 60000,
    mealsServed: 34100,
    donorsCount: 5210,
    minAmount: 300,
    suggestedAmounts: [300, 1000, 2000, 5000],
    badge: '346 Enrolled Children',
    description: 'Operating in Vyasarpadi, Pulianthope, Surapattu, Periyapalem, Vichoor, Perungavoor, Athipattu, and Thirumullaivoyal with dedicated volunteer educators.',
    monthlyOptions: DEFAULT_MONTHLY_GIVING
  }
];

export const DONATION_PRESETS: DonationOption[] = [
  {
    amount: 100,
    meals: 1,
    label: '₹100',
    description: 'Provides 1 warm, protein-rich meal to a child in need.'
  },
  {
    amount: 500,
    meals: 5,
    label: '₹500',
    description: 'Provides 5 warm nutritious meals to children.',
    popular: true
  },
  {
    amount: 1000,
    meals: 10,
    label: '₹1,000',
    description: 'Provides 10 nutritious meals to underprivileged kids.'
  },
  {
    amount: 2500,
    meals: 25,
    label: '₹2,500',
    description: 'Provides 25 warm meals + essential classroom learning support.'
  },
  {
    amount: 5000,
    meals: 50,
    label: '₹5,000',
    description: 'Sponsors 50 warm meals + hygiene kits for an entire classroom.'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'About Truth Foundation',
    question: 'When was Truth Foundation established and what is its registration status?',
    answer: 'TRUTH FOUNDATION was launched on 5th July 2010 as a Public Charitable Trust registered under the Indian Trusts Act, 1882 and Section 12A.'
  },
  {
    category: 'Centers & Locations',
    question: 'Where are Truth Foundation centers and projects located?',
    answer: 'Our Orphanage and Old Age Day Care Home are located in rural Redhills, Northern Chennai (#244 Mallima Nagar, Vilagadupakkam). Our Special School for special-needs children is located in China Ikaadu, Thiruvallur District (with free van pickup). Our 8 Evening Tuition Centers operate across Vyasarpadi, Pulianthope, Surapattu, Periyapalem, Vichoor, Perungavoor, Athipattu, and Thirumullaivoyal.'
  },
  {
    category: 'Donations & Receipts',
    question: 'Where does my donation go?',
    answer: '100% of your donation is routed directly to supporting 45 orphaned children, 20 abandoned elders, 23 special-needs children, and 346 tuition students. Out of every ₹100 donated, ₹88 directly covers fresh grain, vegetables, school kits, and medical supplies, ₹7 covers transport/delivery, and ₹5 covers operational oversight.'
  },
  {
    category: 'Security & Receipts',
    question: 'Is payment secure and will I receive a donation receipt?',
    answer: 'Yes! All transactions are encrypted via 256-bit SSL using PCI-DSS compliant Razorpay gateway. You will receive an instant official donation receipt on your email and WhatsApp immediately after contribution.'
  },
  {
    category: 'Volunteering & Visits',
    question: 'Can I visit the Redhills campus or special school to volunteer?',
    answer: 'Yes! We warmly welcome donors and volunteers to visit our  Redhills Orphanage campus, Old Age Home, or Thiruvallur Special School. You can volunteer for teaching, spending time with elders, or distributing evening tuition kits. Call 044-26511661 or WhatsApp +91 98402 78910 to schedule a visit.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Deshmukh',
    role: 'Donor',
    location: 'Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    comment: 'I donated ₹2,500 on my birthday. Seeing the WhatsApp update with children smiling while receiving hot meals made my day unforgettable. Complete transparency!',
    rating: 5,
    date: '2 days ago',
    verified: true,
    donatedAmount: '₹2,500'
  },
  {
    id: 't2',
    name: 'Vikramjit Singh',
    role: 'CSR Partner',
    location: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    comment: 'Truth Foundation is one of the most organized NGOs in India. Their ISO-certified kitchens and prompt 80G receipts give complete confidence to corporate & individual donors.',
    rating: 5,
    date: '1 week ago',
    verified: true,
    donatedAmount: '₹25,000'
  },
  {
    id: 't3',
    name: 'Priya Sundaram',
    role: 'Volunteer',
    location: 'Bengaluru, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    comment: 'Having volunteered at their East Delhi kitchen, I can personally attest to the extreme cleanliness and care that goes into every single meal cooked for these kids.',
    rating: 5,
    date: '3 days ago',
    verified: true
  },
  {
    id: 't4',
    name: 'Rameshwar Prasad',
    role: 'Teacher',
    location: 'Primary Govt School, Noida',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    comment: 'Since Truth Foundation started providing mid-day meals in our school, student attendance has increased by 40% and children stay attentive throughout the afternoon lessons.',
    rating: 5,
    date: '5 days ago',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Truth Foundation Orphanage Home Campus',
    category: 'Meals',
    imageUrl: servingMealsImg,
    location: 'Redhills, Northern Chennai',
    date: 'Est. 15+ Years (Active)',
    description: 'Dedicated campus providing separate dormitories, study halls, playgrounds, and nutritious dining for 45 boys and girls.',
    quote: '“Let decisions of the people be based on values of social justice, equality, truth, freedom and dignity.”',
    aspectRatio: 'tall',
    impactStat: { label: 'Residents', value: '45 Children' },
    beneficiaries: '16 Staff Members',
    readTime: '3 min read',
    storyDetails: 'Functioning for over 15 years in rural Redhills, Chennai, TRUTH FOUNDATION operates on an acre of land equipped with separate dormitories, hygienic bathrooms, dining halls, and playgrounds for boys and girls. Cared for by 16 committed full-time and part-time staff members, the orphanage is sustained through compassionate philanthropists.'
  },
  {
    id: 'g3',
    title: 'Special Needs School & Van Transportation',
    category: 'Education',
    imageUrl: schoolKitsImg,
    location: 'China Ikaadu, Thiruvallur District',
    date: 'Ongoing Campus',
    description: 'Tailored special education, physiotherapy, and free door-step van transportation for 23 children with intellectual disabilities.',
    quote: '“Bringing hope and professional care to special children from rural Thiruvallur households.”',
    aspectRatio: 'square',
    impactStat: { label: 'Special Students', value: '23 Children' },
    beneficiaries: 'Free Van Pick & Drop',
    readTime: '3 min read',
    storyDetails: 'Truth Foundation stepped forward to establish a specialized school for children with intellectual disabilities in China Ikaadu, Thiruvallur. Dedicated vans pick up children from their rural homes and drop them back safely. Professional educators and trained physiotherapy teachers provide continuous therapy and developmental learning.'
  },
  {
    id: 'g4',
    title: 'Free Evening Tuition & Child Care Centers',
    category: 'Volunteers',
    imageUrl: happyChildrenMealsImg,
    location: 'Vyasarpadi, Surapattu, Perungavoor & 5 Centers',
    date: 'Daily 5:00 PM - 8:00 PM',
    description: 'Free evening tuition, wholesome meals, stationery kits, and hygiene supplies for 346 underprivileged children.',
    quote: '“Nourishing young minds with free tuition, textbooks, backpacks, and personal hygiene kits.”',
    aspectRatio: 'tall',
    impactStat: { label: 'Tuition Students', value: '346 Children' },
    beneficiaries: '8 Rural & Slum Centers',
    readTime: '2 min read',
    storyDetails: 'Truth Foundation conducts free evening child care centers across Vyasarpadi, Pulianthope, and Surapattu in Chennai, as well as Periyapalem, Vichoor, Perungavoor, Athipattu, and Thirumullaivoyal in Thiruvallur. 346 children receive free tuition, nutritious meals, school bags, notebooks, textbooks, pens, and hygiene supplies like soap, shampoo, and footwear.'
  },
  {
    id: 'g5',
    title: 'Annual Cultural Festival & Government Dignitaries',
    category: 'Events',
    imageUrl: culturalFestivalImg,
    location: 'Perungavoor Village, Redhills, Chennai',
    date: 'December 25 (Annual)',
    description: 'Grand cultural program celebrated with community members, state ministers, MPs, MLAs, and TV coverage.',
    quote: '“Celebrating community harmony, talent growth, and equal opportunities for rural youth.”',
    aspectRatio: 'wide',
    impactStat: { label: 'TV Broadcast', value: 'Makkal & Thanthi TV' },
    beneficiaries: '1,000+ Villagers',
    readTime: '2 min read',
    storyDetails: 'Our annual Christmas & Cultural Festival at Perungavoor Village Redhills brings together hundreds of children and elders. Esteemed guests include Hon’ble Minister Thiru. B.V. Ramana (Minister for Dairy), Thiru. M. Prakash (Chairman, Minority Commission), M.P. Thiru. P. Venugopal, and M.L.A. Mr. V. Moorthy. The event was highlighted on national TV programs including Makkal TV and Thanthi TV.'
  },
  {
    id: 'g6',
    title: 'HIV/AIDS & Rural Health Awareness Drives',
    category: 'Medical',
    imageUrl: HealthCampsImg,
    location: 'Redhills Bypass & Rural Thiruvallur',
    date: 'Weekly Women SHG Meetings',
    description: 'Public health demonstrations, AIDS awareness, medical camps, and environmental sanitation education.',
    quote: '“Empowering rural women and youth to break social stigmas and maintain disease-free households.”',
    aspectRatio: 'square',
    impactStat: { label: 'Health Camps', value: 'Weekly SHGs' },
    beneficiaries: 'Rural Women & Youth',
    readTime: '2 min read',
    storyDetails: 'Truth Foundation conducts weekly health input sessions in rural women self-help groups. We invite medical experts and social advocates to conduct HIV/AIDS awareness rallies at Redhills Bypass, organize free health screening camps, and educate families on mosquito and vector control to eliminate malaria and dengue.'
  },
  {
    id: 'g7',
    title: 'COVID-19 & Flood Disaster Emergency Relief',
    category: 'Events',
    imageUrl: covidCampsImg,
    location: 'Thiruvallur, Kanchipuram, Chengalpattu & Chennai',
    date: '25,000+ Served',
    description: 'Distributing food packets, dry ration kits, sanitation items, and clothing to blind, elderly, leprosy, and transgender communities.',
    quote: '“Reaching the most vulnerable marginalized communities during crisis without hesitation.”',
    aspectRatio: 'tall',
    impactStat: { label: 'Relief Served', value: '25,000+ People' },
    beneficiaries: '4 Districts in TN',
    readTime: '3 min read',
    storyDetails: 'During COVID-19 lockdowns and severe monsoon flooding, Truth Foundation deployed emergency teams across Thiruvallur, Kanchipuram, Chengalpattu, and Chennai. We supplied cooked meal packets, water bottles, sanitation kits, rice bags, and clothing specifically prioritizing visually impaired individuals, elderly persons, leprosy-affected families, gypsy communities, and transgender persons.'
  }
];

export const LIVE_DONATION_TICKER = [
  { name: 'Rajesh K.', location: 'Mumbai', amount: '₹1,000', time: '2 mins ago' },
  { name: 'Dr. Smita V.', location: 'Bengaluru', amount: '₹2,500', time: '4 mins ago' },
  { name: 'Karan M.', location: 'Delhi NCR', amount: '₹500', time: '6 mins ago' },
  { name: 'Neha P.', location: 'Pune', amount: '₹5,000', time: '11 mins ago' },
  { name: 'Sunil G.', location: 'Hyderabad', amount: '₹100', time: '14 mins ago' }
];
