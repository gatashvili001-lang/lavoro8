import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const US_JOBS = [
  // ─── MAGAZZINO / WAREHOUSE ───
  {
    title: "Warehouse Associate",
    company: "Amazon Fulfillment",
    city: "Dallas, TX",
    country: "US",
    category: "Magazzino",
    salaryMin: 3200,
    salaryMax: 3800,
    contractType: "Full-time",
    description: `Amazon Fulfillment is hiring Warehouse Associates for its Dallas distribution center.

What you'll do:
• Receive, sort and stow incoming inventory
• Pick and pack customer orders using handheld scanners
• Load and unload trucks
• Maintain a safe and organized work area

Requirements:
• No prior experience required (paid training provided)
• Ability to lift up to 49 lbs
• Availability for day, evening or overnight shifts
• Legal right to work in the US

What we offer:
• Competitive hourly pay ($18-$21/hr)
• Full benefits from day one (medical, dental, vision)
• 401(k) with company match
• Career advancement programs`,
  },
  {
    title: "Forklift Operator",
    company: "Walmart Distribution Center",
    city: "Bentonville, AR",
    country: "US",
    category: "Magazzino",
    salaryMin: 3400,
    salaryMax: 4100,
    contractType: "Full-time",
    description: `Walmart Distribution is looking for certified Forklift Operators for its Bentonville facility.

Responsibilities:
• Operate forklifts and pallet jacks safely
• Load/unload trailers and move product within the warehouse
• Perform inventory counts and cycle checks
• Follow all safety protocols

Requirements:
• Valid forklift certification (or willingness to obtain one — training provided)
• At least 6 months of warehouse experience preferred
• Ability to work rotating shifts

We offer:
• $19.50-$23/hr depending on shift
• Health insurance and paid time off
• Store discount program
• Overtime opportunities`,
  },
  {
    title: "Package Handler — Night Shift",
    company: "UPS",
    city: "Louisville, KY",
    country: "US",
    category: "Magazzino",
    salaryMin: 2900,
    salaryMax: 3500,
    contractType: "Part-time",
    description: `UPS is hiring Package Handlers for its Worldport hub in Louisville, night shift (11pm-4am).

What you'll do:
• Load, unload and sort packages
• Scan and route packages accurately
• Keep the work area clean and organized

Requirements:
• Must be 18 years or older
• Ability to lift up to 70 lbs
• Reliable and punctual

We offer:
• $21/hr starting pay plus tuition assistance
• Weekly pay
• Free uniforms
• Opportunity to move into full-time driver roles`,
  },

  // ─── RIDER / DELIVERY ───
  {
    title: "Delivery Driver",
    company: "Amazon Flex",
    city: "Chicago, IL",
    country: "US",
    category: "Rider",
    salaryMin: 2800,
    salaryMax: 4000,
    contractType: "Flexible / Gig",
    description: `Amazon Flex is looking for delivery drivers in the Chicago metro area. Choose your own hours and deliver packages using your own vehicle.

What you'll do:
• Pick up packages from an Amazon delivery station
• Deliver packages to customers following the app's route
• Provide friendly, reliable service

Requirements:
• Own a car, van or SUV
• Valid driver's license and insurance
• Smartphone with the Amazon Flex app
• At least 21 years old

We offer:
• Earn $18-$25/hr depending on demand
• Flexible scheduling — work as much or as little as you want
• Weekly direct deposit`,
  },
  {
    title: "Food Delivery Courier",
    company: "DoorDash",
    city: "Miami, FL",
    country: "US",
    category: "Rider",
    salaryMin: 2500,
    salaryMax: 3800,
    contractType: "Flexible / Gig",
    description: `DoorDash is looking for delivery couriers (car, scooter or bike) in the Miami area.

What you'll do:
• Accept delivery orders through the Dasher app
• Pick up food from restaurants and deliver to customers
• Provide excellent customer service

Requirements:
• Own a vehicle, scooter or bike
• Smartphone
• Background check required

We offer:
• Set your own schedule
• Weekly pay plus 100% of tips
• Sign-up bonus for new Dashers`,
  },

  // ─── RISTORANTE / RESTAURANT ───
  {
    title: "Line Cook",
    company: "Olive Garden",
    city: "Orlando, FL",
    country: "US",
    category: "Ristorante",
    salaryMin: 2800,
    salaryMax: 3400,
    contractType: "Full-time",
    description: `Olive Garden is hiring a Line Cook for its Orlando location.

What you'll do:
• Prepare menu items following recipes and standards
• Maintain a clean and organized kitchen station
• Work as part of a fast-paced kitchen team

Requirements:
• Previous kitchen experience preferred but not required
• Ability to work evenings and weekends
• Food handler's certification (or willingness to obtain)

We offer:
• $16-$19/hr plus meal discounts
• Flexible scheduling
• Health benefits for full-time staff
• Paid training`,
  },
  {
    title: "Server / Waitstaff",
    company: "Cheesecake Factory",
    city: "Los Angeles, CA",
    country: "US",
    category: "Ristorante",
    salaryMin: 2600,
    salaryMax: 4500,
    contractType: "Full-time",
    description: `The Cheesecake Factory is hiring servers for its Los Angeles restaurant.

What you'll do:
• Take orders and serve food and beverages
• Provide excellent guest service
• Handle payments and process orders accurately

Requirements:
• Previous serving experience preferred
• Friendly, outgoing personality
• Availability for evenings and weekends

We offer:
• Base pay plus tips (average $22-$28/hr with tips)
• Flexible scheduling
• Employee meal discounts
• Growth opportunities into management`,
  },

  // ─── HOTEL ───
  {
    title: "Hotel Housekeeper",
    company: "Marriott Hotels",
    city: "Las Vegas, NV",
    country: "US",
    category: "Hotel",
    salaryMin: 2700,
    salaryMax: 3200,
    contractType: "Full-time",
    description: `Marriott is hiring Housekeepers for its Las Vegas property.

What you'll do:
• Clean and prepare guest rooms to brand standards
• Restock supplies and linens
• Report maintenance issues

Requirements:
• No experience necessary (training provided)
• Attention to detail
• Ability to stand and walk for extended periods
• Legal right to work in the US

We offer:
• $17-$19/hr
• Health insurance and paid vacation
• Hotel discounts worldwide
• Advancement opportunities`,
  },
  {
    title: "Front Desk Agent",
    company: "Hilton Hotels",
    city: "New York, NY",
    country: "US",
    category: "Hotel",
    salaryMin: 3000,
    salaryMax: 3600,
    contractType: "Full-time",
    description: `Hilton is hiring a Front Desk Agent for its Manhattan location.

What you'll do:
• Check guests in and out
• Answer guest questions and resolve issues
• Process payments and reservations

Requirements:
• Excellent customer service and communication skills
• Basic computer skills
• Availability for shift work including weekends

We offer:
• $19-$22/hr
• Hotel travel discounts
• Health and dental insurance
• 401(k) plan`,
  },

  // ─── BADANTE / CAREGIVER ───
  {
    title: "In-Home Caregiver for Elderly Client",
    company: "Home Instead Senior Care",
    city: "Phoenix, AZ",
    country: "US",
    category: "Badante",
    salaryMin: 2600,
    salaryMax: 3200,
    contractType: "Full-time",
    description: `Home Instead is hiring caregivers to support elderly clients in the Phoenix area.

What you'll do:
• Assist with daily living activities (bathing, dressing, meals)
• Provide companionship and light housekeeping
• Accompany clients to appointments
• Monitor client wellbeing and report changes

Requirements:
• Previous caregiving experience preferred (not required)
• Valid driver's license and reliable transportation
• Compassionate and patient personality
• Ability to pass a background check

We offer:
• $16-$19/hr
• Flexible scheduling (day, evening, weekend shifts)
• Paid training and certification
• Mileage reimbursement`,
  },
  {
    title: "Live-in Caregiver",
    company: "Private family — Boston, MA",
    city: "Boston, MA",
    country: "US",
    category: "Badante",
    salaryMin: 3800,
    salaryMax: 4500,
    contractType: "Full-time",
    description: `A family in Boston is seeking a live-in caregiver for an elderly parent with limited mobility.

Responsibilities:
• Full-time assistance with daily personal care
• Meal preparation and light housekeeping
• Accompanying to medical appointments
• Companionship and cognitive engagement

Requirements:
• Proven experience in elderly care
• CPR/First Aid certification preferred
• Legal right to work in the US
• Verifiable references

We offer:
• Private furnished room and full board included
• Competitive monthly salary
• Paid time off`,
  },

  // ─── COLF / HOUSEKEEPER ───
  {
    title: "House Cleaner — Part Time",
    company: "Merry Maids",
    city: "Denver, CO",
    country: "US",
    category: "Colf",
    salaryMin: 2000,
    salaryMax: 2600,
    contractType: "Part-time",
    description: `Merry Maids is hiring house cleaners for residential clients across the Denver metro area.

What you'll do:
• Clean homes following a set checklist
• Handle laundry, dusting, vacuuming and sanitizing
• Travel between client homes (company vehicle provided)

Requirements:
• No experience needed — full training provided
• Reliable and detail-oriented
• Valid driver's license

We offer:
• $16-$18/hr plus tips
• Paid travel time between jobs
• Set daytime schedule, no nights or weekends
• Supplies and equipment provided`,
  },
  {
    title: "Private Housekeeper",
    company: "Private family — San Francisco, CA",
    city: "San Francisco, CA",
    country: "US",
    category: "Colf",
    salaryMin: 3200,
    salaryMax: 3800,
    contractType: "Full-time",
    description: `A family in San Francisco is looking for a full-time housekeeper for their home.

Responsibilities:
• General house cleaning and organization
• Laundry and ironing
• Grocery shopping and errands
• Occasional light meal preparation

Requirements:
• Previous housekeeping experience
• Trustworthy with verifiable references
• Legal right to work in the US

We offer:
• Competitive salary
• Paid holidays and vacation
• Stable, long-term position`,
  },

  // ─── BABY-SITTER / NANNY ───
  {
    title: "Full-Time Nanny",
    company: "Private family — Austin, TX",
    city: "Austin, TX",
    country: "US",
    category: "Baby-sitter",
    salaryMin: 3000,
    salaryMax: 3800,
    contractType: "Full-time",
    description: `A family in Austin is seeking a full-time nanny for two children (ages 2 and 5).

Responsibilities:
• Daily care and supervision of the children
• School pickup/drop-off
• Meal preparation and light housekeeping related to childcare
• Engaging educational activities

Requirements:
• Previous nanny or childcare experience
• CPR/First Aid certified (or willing to obtain)
• Valid driver's license
• Verifiable references

We offer:
• Competitive weekly salary
• Paid holidays and vacation
• Use of family vehicle for errands with kids`,
  },
  {
    title: "After-School Babysitter",
    company: "Private family — Seattle, WA",
    city: "Seattle, WA",
    country: "US",
    category: "Baby-sitter",
    salaryMin: 1400,
    salaryMax: 1900,
    contractType: "Part-time",
    description: `A family in Seattle needs an after-school babysitter for their two kids (ages 7 and 9), Monday-Friday 3pm-6:30pm.

Responsibilities:
• School pickup
• Homework help
• Snack preparation
• Light activities and play

Requirements:
• Experience with school-age children
• Reliable transportation
• References required

We offer:
• $22-$25/hr
• Consistent weekly schedule
• Friendly family environment`,
  },

  // ─── EDILIZIA / CONSTRUCTION ───
  {
    title: "Construction Laborer",
    company: "PulteGroup",
    city: "Houston, TX",
    country: "US",
    category: "Edilizia",
    salaryMin: 3000,
    salaryMax: 3800,
    contractType: "Full-time",
    description: `PulteGroup is hiring Construction Laborers for residential building projects in the Houston area.

What you'll do:
• Assist skilled tradespeople on job sites
• Load and move construction materials
• Maintain a clean and safe work site
• Basic site preparation tasks

Requirements:
• No experience required (on-the-job training)
• Ability to lift heavy materials and work outdoors
• Steel-toe boots required
• Legal right to work in the US

We offer:
• $18-$22/hr
• Overtime opportunities
• Health insurance after 90 days
• Path to skilled trade apprenticeships`,
  },

  // ─── AGRICOLTURA / AGRICULTURE ───
  {
    title: "Farm Worker — Seasonal",
    company: "Central Valley Farms",
    city: "Fresno, CA",
    country: "US",
    category: "Agricoltura",
    salaryMin: 2600,
    salaryMax: 3200,
    contractType: "Seasonal",
    description: `Central Valley Farms is hiring seasonal farm workers for the harvest season in Fresno County.

What you'll do:
• Harvest fruits and vegetables by hand
• Sort and pack produce
• Operate light farm equipment (training provided)

Requirements:
• Ability to work outdoors in varying weather
• Physical stamina for repetitive tasks
• Legal right to work in the US (H-2A visa sponsorship available for qualified applicants)

We offer:
• $17-$19/hr
• Housing assistance available for out-of-area workers
• Transportation to/from housing and fields
• Potential for return-season rehire`,
  },
];

async function seedUsJobs() {
  try {
    console.log(`📥 Inserting ${US_JOBS.length} new US job listings...`);
    for (const job of US_JOBS) {
      await db.insert(jobsTable).values(job as any);
      console.log(`  ✓ ${job.title} — ${job.company} (${job.city}, ${job.country})`);
    }
    console.log(`\n✅ Inserted ${US_JOBS.length} new US listings without touching existing data.`);
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

seedUsJobs();
