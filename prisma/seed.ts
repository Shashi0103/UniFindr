import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const campusImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1592289658764-f6eb07172089?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1525926476840-ae7015d862fb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1622397333309-3056849bc70b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
];

// Added 15 new colleges, with explicit cutoff ranks to cover up to 100,000+ ranks
const colleges = [
  // Original Top Tier
  { name: "IIT Bombay", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", type: "IIT", established: 1958, rating: 4.9, fees: 250000, description: "Indian Institute of Technology Bombay is one of India's premier engineering institutions.", website: "https://www.iitb.ac.in", ranking: 1, approved: "AICTE, UGC", campusSize: "550 acres", cutoffRank: 500 },
  { name: "IIT Delhi", location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi", type: "IIT", established: 1961, rating: 4.8, fees: 240000, description: "IIT Delhi is a leading technical university known for academic excellence.", website: "https://home.iitd.ac.in", ranking: 2, approved: "AICTE, UGC", campusSize: "320 acres", cutoffRank: 800 },
  { name: "IIT Madras", location: "Chennai, Tamil Nadu", city: "Chennai", state: "Tamil Nadu", type: "IIT", established: 1959, rating: 4.9, fees: 230000, description: "IIT Madras consistently ranks as India's top engineering institution.", website: "https://www.iitm.ac.in", ranking: 3, approved: "AICTE, UGC", campusSize: "617 acres", cutoffRank: 1000 },
  { name: "IIT Kanpur", location: "Kanpur, Uttar Pradesh", city: "Kanpur", state: "Uttar Pradesh", type: "IIT", established: 1959, rating: 4.7, fees: 235000, description: "IIT Kanpur is renowned for its academic rigor.", website: "https://www.iitk.ac.in", ranking: 4, approved: "AICTE, UGC", campusSize: "1055 acres", cutoffRank: 1200 },
  { name: "IIT Kharagpur", location: "Kharagpur, West Bengal", city: "Kharagpur", state: "West Bengal", type: "IIT", established: 1951, rating: 4.7, fees: 220000, description: "The oldest IIT with the largest campus.", website: "https://www.iitkgp.ac.in", ranking: 5, approved: "AICTE, UGC", campusSize: "2100 acres", cutoffRank: 1500 },
  { name: "NIT Trichy", location: "Tiruchirappalli, Tamil Nadu", city: "Tiruchirappalli", state: "Tamil Nadu", type: "NIT", established: 1964, rating: 4.5, fees: 175000, description: "Top-ranked NIT in India.", website: "https://www.nitt.edu", ranking: 9, approved: "AICTE, UGC", campusSize: "800 acres", cutoffRank: 4000 },
  { name: "NIT Warangal", location: "Warangal, Telangana", city: "Warangal", state: "Telangana", type: "NIT", established: 1959, rating: 4.4, fees: 165000, description: "One of the first RECs established in India.", website: "https://www.nitw.ac.in", ranking: 10, approved: "AICTE, UGC", campusSize: "248 acres", cutoffRank: 5000 },
  { name: "BITS Pilani", location: "Pilani, Rajasthan", city: "Pilani", state: "Rajasthan", type: "Private", established: 1964, rating: 4.7, fees: 520000, description: "Leading private technical university.", website: "https://www.bits-pilani.ac.in", ranking: 13, approved: "AICTE, UGC", campusSize: "328 acres", cutoffRank: 8000 },
  { name: "VIT Vellore", location: "Vellore, Tamil Nadu", city: "Vellore", state: "Tamil Nadu", type: "Private", established: 1984, rating: 4.3, fees: 400000, description: "Top private university known for vibrant campus.", website: "https://vit.ac.in", ranking: 15, approved: "AICTE, UGC", campusSize: "372 acres", cutoffRank: 25000 },
  { name: "SRM Institute", location: "Chennai, Tamil Nadu", city: "Chennai", state: "Tamil Nadu", type: "Private", established: 1985, rating: 4.1, fees: 380000, description: "Large private university with global partnerships.", website: "https://www.srmist.edu.in", ranking: 16, approved: "AICTE, UGC", campusSize: "250 acres", cutoffRank: 35000 },
  { name: "DTU Delhi", location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi", type: "State", established: 1941, rating: 4.4, fees: 195000, description: "Premier state university.", website: "https://www.dtu.ac.in", ranking: 18, approved: "AICTE, UGC", campusSize: "164 acres", cutoffRank: 12000 },
  { name: "Manipal Institute of Technology", location: "Manipal, Karnataka", city: "Manipal", state: "Karnataka", type: "Private", established: 1957, rating: 4.3, fees: 480000, description: "Premier private engineering institution.", website: "https://manipal.edu", ranking: 21, approved: "AICTE, UGC", campusSize: "600 acres", cutoffRank: 22000 },

  // New Colleges added for 1 lakh rank coverage
  { name: "Chandigarh University", location: "Mohali, Punjab", city: "Mohali", state: "Punjab", type: "Private", established: 2012, rating: 4.2, fees: 220000, description: "Fastest growing private university in North India with exceptional placement records.", website: "https://www.cuchd.in", ranking: 31, approved: "UGC, NAAC A+", campusSize: "200 acres", cutoffRank: 60000 },
  { name: "Lovely Professional University (LPU)", location: "Phagwara, Punjab", city: "Phagwara", state: "Punjab", type: "Private", established: 2005, rating: 4.1, fees: 240000, description: "India's largest university campus, housing over 30,000 students with world-class facilities.", website: "https://www.lpu.in", ranking: 35, approved: "UGC", campusSize: "600 acres", cutoffRank: 75000 },
  { name: "Amity University", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", type: "Private", established: 2005, rating: 4.0, fees: 350000, description: "A leading private research university with state-of-the-art infrastructure.", website: "https://www.amity.edu", ranking: 38, approved: "UGC, NAAC A+", campusSize: "1200 acres", cutoffRank: 85000 },
  { name: "Galgotias University", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", type: "Private", established: 2011, rating: 3.9, fees: 190000, description: "Known for rigorous academics and global tie-ups for robust student placements.", website: "https://www.galgotiasuniversity.edu.in", ranking: 45, approved: "UGC", campusSize: "52 acres", cutoffRank: 95000 },
  { name: "Sharda University", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", type: "Private", established: 2009, rating: 3.8, fees: 210000, description: "A highly sought-after private university with a diverse international student base.", website: "https://www.sharda.ac.in", ranking: 50, approved: "UGC", campusSize: "63 acres", cutoffRank: 110000 },
  { name: "Kalinga Institute of Industrial Technology (KIIT)", location: "Bhubaneswar, Odisha", city: "Bhubaneswar", state: "Odisha", type: "Private", established: 1992, rating: 4.3, fees: 380000, description: "Deemed university known for high academic standards and strong industry collaboration.", website: "https://kiit.ac.in", ranking: 28, approved: "AICTE, UGC, NAAC A++", campusSize: "700 acres", cutoffRank: 40000 },
  { name: "Jaypee Institute of Information Technology", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", type: "Deemed", established: 2001, rating: 4.1, fees: 270000, description: "A premier institute focused heavily on IT, computer science and management.", website: "https://www.jiit.ac.in", ranking: 40, approved: "AICTE, UGC", campusSize: "25 acres", cutoffRank: 55000 },
  { name: "Shiv Nadar University", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", type: "Private", established: 2011, rating: 4.4, fees: 420000, description: "A multidisciplinary research university offering world-class engineering programs.", website: "https://snu.edu.in", ranking: 32, approved: "UGC", campusSize: "286 acres", cutoffRank: 45000 },
  { name: "UPES Dehradun", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", type: "Private", established: 2003, rating: 4.2, fees: 380000, description: "Specialized in energy, petroleum, and core engineering branches in a scenic location.", website: "https://www.upes.ac.in", ranking: 42, approved: "UGC, NAAC A", campusSize: "44 acres", cutoffRank: 80000 },
  { name: "Graphic Era University", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", type: "Deemed", established: 1993, rating: 4.0, fees: 240000, description: "Top ranked university in Uttarakhand with outstanding placement track records.", website: "https://www.geu.ac.in", ranking: 48, approved: "AICTE, UGC", campusSize: "30 acres", cutoffRank: 90000 },
  { name: "Nirma University", location: "Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat", type: "Private", established: 2003, rating: 4.3, fees: 250000, description: "A prestigious university known for its strict discipline and robust placements.", website: "https://nirmauni.ac.in", ranking: 36, approved: "UGC, NAAC A", campusSize: "115 acres", cutoffRank: 38000 },
  { name: "Dhirubhai Ambani Institute (DA-IICT)", location: "Gandhinagar, Gujarat", city: "Gandhinagar", state: "Gujarat", type: "Private", established: 2001, rating: 4.6, fees: 210000, description: "Pioneer in Information and Communication Technology education in India.", website: "https://www.daiict.ac.in", ranking: 25, approved: "UGC", campusSize: "50 acres", cutoffRank: 15000 },
  { name: "BMS College of Engineering", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", type: "Private", established: 1946, rating: 4.2, fees: 280000, description: "First private engineering college in India, highly regarded for technical excellence.", website: "https://bmsce.ac.in", ranking: 33, approved: "AICTE, VTU", campusSize: "15 acres", cutoffRank: 28000 },
  { name: "Siksha 'O' Anusandhan (SOA)", location: "Bhubaneswar, Odisha", city: "Bhubaneswar", state: "Odisha", type: "Deemed", established: 2007, rating: 4.1, fees: 260000, description: "Highly ranked multidisciplinary university with great tech facilities.", website: "https://www.soa.ac.in", ranking: 39, approved: "UGC, NAAC A++", campusSize: "125 acres", cutoffRank: 65000 },
  { name: "Bharati Vidyapeeth", location: "Pune, Maharashtra", city: "Pune", state: "Maharashtra", type: "Deemed", established: 1964, rating: 3.9, fees: 200000, description: "A vast educational group offering strong engineering degree programs.", website: "https://bvuniversity.edu.in", ranking: 55, approved: "UGC, NAAC A+", campusSize: "85 acres", cutoffRank: 105000 },
];

const courseTemplates = [
  { name: "B.Tech Computer Science", duration: "4 Years", feeMultiplier: 1.0, seats: 120 },
  { name: "B.Tech Electronics & Communication", duration: "4 Years", feeMultiplier: 0.95, seats: 90 },
  { name: "B.Tech Mechanical Engineering", duration: "4 Years", feeMultiplier: 0.9, seats: 80 },
  { name: "B.Tech Electrical Engineering", duration: "4 Years", feeMultiplier: 0.9, seats: 70 },
  { name: "B.Tech Civil Engineering", duration: "4 Years", feeMultiplier: 0.85, seats: 60 },
  { name: "M.Tech Computer Science", duration: "2 Years", feeMultiplier: 0.7, seats: 30 },
  { name: "MBA", duration: "2 Years", feeMultiplier: 1.5, seats: 60 },
];

const reviewTemplates = [
  { author: "Rahul Sharma", rating: 4.5, title: "Excellent campus and faculty", comment: "The faculty is world-class and the campus infrastructure is outstanding." },
  { author: "Priya Patel", rating: 4.0, title: "Good placements but hostel needs improvement", comment: "Placement opportunities are excellent with top companies visiting." },
  { author: "Amit Kumar", rating: 5.0, title: "Best decision of my life", comment: "Choosing this college was the best decision. The exposure and network are unmatched." },
  { author: "Sneha Reddy", rating: 3.5, title: "Good academics, average campus life", comment: "Academics are strong but campus life could use more variety." },
  { author: "Vikram Singh", rating: 4.5, title: "World-class research opportunities", comment: "Research facilities are on par with international universities." },
  { author: "Ananya Gupta", rating: 4.0, title: "Great ROI on education", comment: "Considering the fees and the placement packages, incredible ROI." },
];

const topRecruiters = [
  '["Google", "Microsoft", "Amazon", "Goldman Sachs", "JP Morgan", "Adobe"]',
  '["TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Tech Mahindra"]',
  '["Flipkart", "Paytm", "Zomato", "Swiggy", "PhonePe", "CRED"]',
  '["Samsung", "Intel", "Qualcomm", "Texas Instruments", "Nvidia", "AMD"]',
];

async function main() {
  console.log("🌱 Seeding database...");
  await prisma.predictorRule.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  let index = 0;
  for (const col of colleges) {
    // Distribute images
    const imageUrl = campusImages[index % campusImages.length];
    index++;

    const college = await prisma.college.create({ 
      data: { 
        name: col.name,
        location: col.location,
        city: col.city,
        state: col.state,
        type: col.type,
        established: col.established,
        rating: col.rating,
        fees: col.fees,
        imageUrl: imageUrl,
        description: col.description,
        website: col.website,
        ranking: col.ranking,
        approved: col.approved,
        campusSize: col.campusSize
      } 
    });

    const numCourses = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < numCourses; i++) {
      const t = courseTemplates[i % courseTemplates.length];
      await prisma.course.create({ data: { name: t.name, duration: t.duration, fees: Math.round(col.fees * t.feeMultiplier), seats: t.seats, collegeId: college.id } });
    }
    
    for (let year = 2022; year <= 2025; year++) {
      const base = col.rating * 3;
      await prisma.placement.create({ data: { year, averagePackage: +(base + Math.random() * 5).toFixed(2), highestPackage: +(base * 3 + Math.random() * 20).toFixed(2), medianPackage: +(base - 2 + Math.random() * 4).toFixed(2), placementRate: +(75 + col.rating * 4 + Math.random() * 5).toFixed(1), topRecruiters: topRecruiters[Math.floor(Math.random() * topRecruiters.length)], collegeId: college.id } });
    }
    
    const numReviews = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numReviews; i++) {
      const r = reviewTemplates[i % reviewTemplates.length];
      await prisma.review.create({ data: { author: r.author, rating: r.rating, title: r.title, comment: r.comment, collegeId: college.id } });
    }
    
    const exams = col.type === "IIT" ? ["JEE Advanced"] : ["JEE Main"];
    for (const exam of exams) {
      // High chance: up to the cutoff rank
      await prisma.predictorRule.create({ data: { exam, minRank: 1, maxRank: col.cutoffRank, chance: "High", collegeId: college.id } });
      // Medium chance: cutoff rank up to 1.5x cutoff rank
      await prisma.predictorRule.create({ data: { exam, minRank: col.cutoffRank + 1, maxRank: Math.floor(col.cutoffRank * 1.5), chance: "Medium", collegeId: college.id } });
      // Low chance: 1.5x cutoff up to 2.5x cutoff rank (some can go beyond 1 lakh)
      await prisma.predictorRule.create({ data: { exam, minRank: Math.floor(col.cutoffRank * 1.5) + 1, maxRank: Math.floor(col.cutoffRank * 2.5), chance: "Low", collegeId: college.id } });
    }
    console.log(`  ✅ ${college.name}`);
  }
  console.log("🎉 Seeding complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
