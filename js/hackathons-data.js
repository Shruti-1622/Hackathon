/* ==============================================
   HACKATHONS DATA — Rich schema for registration flow
   ============================================== */

window.HACKATHONS = [
  {
    id: 1,
    title: "InnovateTech 2026",
    organiser: "Google x HackVerse",
    organiserLogo: "G",
    fee: 0,
    prize: "₹15,00,000",
    tags: ["AI/ML", "Cloud", "Web"],
    status: "upcoming",
    format: "online",
    teamRequired: true,
    minTeam: 2,
    maxTeam: 4,
    totalSlots: 1500,
    registeredCount: 1240,
    registrationDeadline: "2026-08-05T23:59:00",
    teamFormationDeadline: "2026-08-03T23:59:00",
    startDate: "August 10, 2026",
    endDate: "August 12, 2026",
    bannerGradient: "linear-gradient(135deg, #1a150e, #0a0a0a)",
    image: "assets/hackathon events/googleh.webp",
    description: "InnovateTech 2026 is Google's flagship AI & Cloud hackathon, bringing together the brightest minds to build cutting-edge solutions. Over 48 intense hours, teams will leverage Google Cloud, Vertex AI, and TensorFlow to create projects that push the boundaries of technology. With mentorship from Google engineers and ₹15 lakh in prizes, this is your chance to turn bold ideas into reality.",
    tracks: [
      { name: "AI for Good", prize: "₹5,00,000", description: "Build AI solutions addressing climate change, healthcare accessibility, or education equity using responsible AI principles." },
      { name: "Cloud Native", prize: "₹4,00,000", description: "Design and deploy scalable, resilient applications on Google Cloud Platform with Kubernetes, Cloud Run, or Firebase." },
      { name: "Web Innovation", prize: "₹3,00,000", description: "Create next-generation web experiences using modern frameworks, WebAssembly, or Progressive Web App technologies." }
    ],
    timeline: [
      { label: "Registrations open", date: "July 1, 2026", past: false },
      { label: "Team formation deadline", date: "August 3, 2026", past: false },
      { label: "Hackathon begins", date: "August 10, 2026", past: false },
      { label: "Submission deadline", date: "August 12, 2026", past: false },
      { label: "Results announced", date: "August 20, 2026", past: false }
    ],
    sponsors: ["Google Cloud", "DeepMind", "Vertex AI"],
    prizes: [
      { rank: "1st Place", amount: "₹5,00,000" },
      { rank: "2nd Place", amount: "₹3,00,000" },
      { rank: "3rd Place", amount: "₹2,00,000" }
    ]
  },
  {
    id: 2,
    title: "DevFusion 2026",
    organiser: "Devfolio x MLH",
    organiserLogo: "D",
    fee: 0,
    prize: "₹7,50,000",
    tags: ["Web", "Open Source", "DevTools"],
    status: "upcoming",
    format: "hybrid",
    teamRequired: true,
    minTeam: 2,
    maxTeam: 5,
    totalSlots: 800,
    registeredCount: 312,
    registrationDeadline: "2026-09-10T23:59:00",
    teamFormationDeadline: "2026-09-08T23:59:00",
    startDate: "September 14, 2026",
    endDate: "September 16, 2026",
    bannerGradient: "linear-gradient(135deg, #181510, #0a0a0a)",
    image: "assets/hackathon events/blue.webp",
    description: "DevFusion brings together open-source enthusiasts and web developers for 72 hours of non-stop building. Hosted in partnership with MLH, this hybrid event features in-person hacking hubs in Mumbai and Delhi alongside a global online track. Free to enter, with workshops, mentorship, and swag for all participants.",
    tracks: [
      { name: "Open Source Tools", prize: "₹3,00,000", description: "Build developer tools, CLI apps, or libraries that solve real pain points in the open-source ecosystem." },
      { name: "Full Stack Web", prize: "₹2,50,000", description: "Create polished full-stack web applications with exceptional UI/UX and robust backends." }
    ],
    timeline: [
      { label: "Registrations open", date: "August 1, 2026", past: false },
      { label: "Workshops begin", date: "September 7, 2026", past: false },
      { label: "Team formation deadline", date: "September 8, 2026", past: false },
      { label: "Hackathon begins", date: "September 14, 2026", past: false },
      { label: "Submission deadline", date: "September 16, 2026", past: false },
      { label: "Results announced", date: "September 25, 2026", past: false }
    ],
    sponsors: ["Devfolio", "MLH", "GitHub", "Vercel"],
    prizes: [
      { rank: "1st Place", amount: "₹3,00,000" },
      { rank: "2nd Place", amount: "₹2,00,000" },
      { rank: "3rd Place", amount: "₹1,00,000" }
    ]
  },
  {
    id: 3,
    title: "Web3 Buildathon",
    organiser: "Polygon x ETHGlobal",
    organiserLogo: "P",
    fee: 0,
    prize: "₹10,00,000",
    tags: ["Web3", "Blockchain", "DeFi"],
    status: "upcoming",
    format: "online",
    teamRequired: false,
    minTeam: 1,
    maxTeam: 4,
    totalSlots: 2000,
    registeredCount: 1876,
    registrationDeadline: "2026-10-08T23:59:00",
    teamFormationDeadline: "2026-10-06T23:59:00",
    startDate: "October 15, 2026",
    endDate: "October 17, 2026",
    bannerGradient: "linear-gradient(135deg, #1a120b, #0a0a0a)",
    image: "assets/hackathon events/ethokyo.webp",
    description: "The Web3 Buildathon challenges developers to push the boundaries of decentralised technology. Build DApps, DeFi protocols, or NFT platforms using Polygon, Solidity, and cutting-edge blockchain tooling. Solo or team — everyone is welcome. Top projects get direct access to Polygon's accelerator programme.",
    tracks: [
      { name: "DeFi Innovation", prize: "₹4,00,000", description: "Build novel decentralised finance protocols — lending, DEXes, yield optimisers, or cross-chain bridges." },
      { name: "NFT & Gaming", prize: "₹3,00,000", description: "Create immersive blockchain gaming experiences or innovative NFT utility platforms." },
      { name: "Infrastructure", prize: "₹3,00,000", description: "Developer tools, SDKs, oracles, or scalability solutions for the Web3 ecosystem." }
    ],
    timeline: [
      { label: "Registrations open", date: "September 10, 2026", past: false },
      { label: "Mentor AMA session", date: "October 5, 2026", past: false },
      { label: "Hackathon begins", date: "October 15, 2026", past: false },
      { label: "Submission deadline", date: "October 17, 2026", past: false },
      { label: "Demo day", date: "October 22, 2026", past: false }
    ],
    sponsors: ["Polygon", "ETHGlobal", "Alchemy", "OpenZeppelin"],
    prizes: [
      { rank: "1st Place", amount: "₹4,00,000" },
      { rank: "2nd Place", amount: "₹3,00,000" },
      { rank: "3rd Place", amount: "₹2,00,000" }
    ]
  },
  {
    id: 4,
    title: "CloudFest Hackathon",
    organiser: "Microsoft Azure",
    organiserLogo: "M",
    fee: 0,
    prize: "₹5,00,000",
    tags: ["Cloud", "Azure", "DevOps"],
    status: "upcoming",
    format: "online",
    teamRequired: true,
    minTeam: 3,
    maxTeam: 5,
    totalSlots: 600,
    registeredCount: 142,
    registrationDeadline: "2026-11-01T23:59:00",
    teamFormationDeadline: "2026-10-28T23:59:00",
    startDate: "November 5, 2026",
    endDate: "November 6, 2026",
    bannerGradient: "linear-gradient(135deg, #15130f, #0a0a0a)",
    image: "assets/hackathon events/cloudf.webp",
    description: "CloudFest is Microsoft's 24-hour sprint hackathon focused on cloud-native development. Build scalable microservices, serverless functions, or AI-powered applications on Azure. Free to participate with Azure credits for all registered teams. Winners receive Microsoft Surface devices and internship fast-tracks.",
    tracks: [
      { name: "Serverless Apps", prize: "₹2,50,000", description: "Build production-ready serverless applications using Azure Functions, Logic Apps, and Cosmos DB." },
      { name: "AI + Cloud", prize: "₹2,50,000", description: "Combine Azure Cognitive Services with cloud infrastructure to build intelligent applications." }
    ],
    timeline: [
      { label: "Registrations open", date: "October 1, 2026", past: false },
      { label: "Azure workshop", date: "October 25, 2026", past: false },
      { label: "Team formation deadline", date: "October 28, 2026", past: false },
      { label: "Hackathon begins", date: "November 5, 2026", past: false },
      { label: "Submission deadline", date: "November 6, 2026", past: false },
      { label: "Results announced", date: "November 15, 2026", past: false }
    ],
    sponsors: ["Microsoft Azure", "GitHub Copilot", "VS Code"],
    prizes: [
      { rank: "1st Place", amount: "₹2,00,000" },
      { rank: "2nd Place", amount: "₹1,50,000" },
      { rank: "3rd Place", amount: "₹1,00,000" }
    ]
  },
  {
    id: 5,
    title: "Cyber Nexus 2026",
    organiser: "Cisco x ISRO",
    organiserLogo: "C",
    fee: 0,
    prize: "₹12,00,000",
    tags: ["Cybersecurity", "IoT", "Space"],
    status: "upcoming",
    format: "hybrid",
    teamRequired: true,
    minTeam: 2,
    maxTeam: 4,
    totalSlots: 500,
    registeredCount: 498,
    registrationDeadline: "2026-12-20T23:59:00",
    teamFormationDeadline: "2026-12-18T23:59:00",
    startDate: "December 25, 2026",
    endDate: "December 27, 2026",
    bannerGradient: "linear-gradient(135deg, #14110d, #0a0a0a)",
    image: "assets/hackathon events/cisco.webp",
    description: "Cyber Nexus brings together cybersecurity experts and space technology enthusiasts for a 48-hour challenge. Co-hosted by Cisco and ISRO, participants will work on securing satellite communication systems, IoT networks, and critical infrastructure. Hybrid format with hacking hubs in Bangalore and Hyderabad.",
    tracks: [
      { name: "Space Security", prize: "₹5,00,000", description: "Develop security solutions for satellite communication, space data integrity, and ground station networks." },
      { name: "IoT Defence", prize: "₹4,00,000", description: "Build intrusion detection systems, secure firmware, or network monitoring tools for IoT ecosystems." },
      { name: "Cyber Forensics", prize: "₹3,00,000", description: "Create tools for digital forensics, malware analysis, or incident response automation." }
    ],
    timeline: [
      { label: "Registrations open", date: "November 15, 2026", past: false },
      { label: "Security bootcamp", date: "December 15, 2026", past: false },
      { label: "Team formation deadline", date: "December 18, 2026", past: false },
      { label: "Hackathon begins", date: "December 25, 2026", past: false },
      { label: "Submission deadline", date: "December 27, 2026", past: false },
      { label: "Results announced", date: "January 5, 2027", past: false }
    ],
    sponsors: ["Cisco", "ISRO", "Palo Alto Networks", "CrowdStrike"],
    prizes: [
      { rank: "1st Place", amount: "₹5,00,000" },
      { rank: "2nd Place", amount: "₹4,00,000" },
      { rank: "3rd Place", amount: "₹2,00,000" }
    ]
  },
  {
    id: 6,
    title: "NeuralVerse AI",
    organiser: "NVIDIA x HackVerse",
    organiserLogo: "N",
    fee: 0,
    prize: "₹8,00,000",
    tags: ["AI/ML", "Deep Learning", "Computer Vision"],
    status: "upcoming",
    format: "online",
    teamRequired: false,
    minTeam: 1,
    maxTeam: 3,
    totalSlots: 1200,
    registeredCount: 890,
    registrationDeadline: "2027-01-12T23:59:00",
    teamFormationDeadline: "2027-01-10T23:59:00",
    startDate: "January 18, 2027",
    endDate: "January 20, 2027",
    bannerGradient: "linear-gradient(135deg, #1a1610, #0a0a0a)",
    image: "assets/hackathon events/nvidia.webp",
    description: "NeuralVerse AI is NVIDIA's premier deep learning hackathon. Leverage CUDA, TensorRT, and NVIDIA GPUs to build state-of-the-art AI models for computer vision, NLP, and generative AI. Solo-friendly with free GPU cloud credits for all participants. Winners get NVIDIA RTX hardware and fast-track interviews.",
    tracks: [
      { name: "Generative AI", prize: "₹4,00,000", description: "Build creative applications using diffusion models, GANs, or large language models with NVIDIA NeMo." },
      { name: "Computer Vision", prize: "₹4,00,000", description: "Develop real-time vision systems for autonomous driving, medical imaging, or industrial inspection." }
    ],
    timeline: [
      { label: "Registrations open", date: "December 20, 2026", past: false },
      { label: "GPU credits distributed", date: "January 10, 2027", past: false },
      { label: "Hackathon begins", date: "January 18, 2027", past: false },
      { label: "Submission deadline", date: "January 20, 2027", past: false },
      { label: "Results announced", date: "January 30, 2027", past: false }
    ],
    sponsors: ["NVIDIA", "CUDA", "TensorRT", "AWS"],
    prizes: [
      { rank: "1st Place", amount: "₹3,50,000" },
      { rank: "2nd Place", amount: "₹2,50,000" },
      { rank: "3rd Place", amount: "₹1,50,000" }
    ]
  },
  {
    id: 7,
    title: "Midnight CodeFest",
    organiser: "GitHub x HackVerse",
    organiserLogo: "GH",
    fee: 0,
    prize: "₹6,00,000",
    tags: ["Open Source", "Web", "Mobile"],
    status: "upcoming",
    format: "online",
    teamRequired: true,
    minTeam: 2,
    maxTeam: 4,
    totalSlots: 1000,
    registeredCount: 456,
    registrationDeadline: "2027-02-01T23:59:00",
    teamFormationDeadline: "2027-01-28T23:59:00",
    startDate: "February 5, 2027",
    endDate: "February 7, 2027",
    bannerGradient: "linear-gradient(135deg, #16120e, #0a0a0a)",
    image: "assets/hackathon events/github.webp",
    description: "Midnight CodeFest is a 36-hour coding marathon celebrating open-source culture. Hosted by GitHub, this event challenges teams to build impactful projects that will be open-sourced upon completion. Every participant gets GitHub Pro for a year and exclusive Octocat swag. Best projects get featured on GitHub's official blog.",
    tracks: [
      { name: "Developer Tools", prize: "₹2,50,000", description: "Build tools that make developers' lives easier — extensions, automation, CI/CD pipelines, or code quality tools." },
      { name: "Social Impact", prize: "₹2,00,000", description: "Create open-source solutions for education, accessibility, environmental sustainability, or public health." },
      { name: "Mobile First", prize: "₹1,50,000", description: "Build cross-platform mobile applications using React Native, Flutter, or Kotlin Multiplatform." }
    ],
    timeline: [
      { label: "Registrations open", date: "January 1, 2027", past: false },
      { label: "Open source workshop", date: "January 25, 2027", past: false },
      { label: "Team formation deadline", date: "January 28, 2027", past: false },
      { label: "Hackathon begins", date: "February 5, 2027", past: false },
      { label: "Submission deadline", date: "February 7, 2027", past: false },
      { label: "Results announced", date: "February 15, 2027", past: false }
    ],
    sponsors: ["GitHub", "Vercel", "Supabase", "Netlify"],
    prizes: [
      { rank: "1st Place", amount: "₹2,50,000" },
      { rank: "2nd Place", amount: "₹2,00,000" },
      { rank: "3rd Place", amount: "₹1,00,000" }
    ]
  },
  {
    id: 8,
    title: "Enigma ML Challenge",
    organiser: "IIT BHU x DRDO",
    organiserLogo: "E",
    fee: 0,
    prize: "₹3,00,000",
    tags: ["ML", "Data Science", "Research"],
    status: "upcoming",
    format: "hybrid",
    teamRequired: false,
    minTeam: 1,
    maxTeam: 3,
    totalSlots: 400,
    registeredCount: 88,
    registrationDeadline: "2027-03-01T23:59:00",
    teamFormationDeadline: "2027-02-28T23:59:00",
    startDate: "March 5, 2027",
    endDate: "March 7, 2027",
    bannerGradient: "linear-gradient(135deg, #1c150c, #0a0a0a)",
    image: "assets/hackathon events/en.webp",
    description: "Enigma is a research-focused ML challenge co-organised by IIT BHU and DRDO. Participants tackle real-world datasets from defence, agriculture, and public health sectors. Solo-friendly with mentorship from IIT professors and DRDO scientists. Top solutions may be adopted for national projects. Free entry for all students.",
    tracks: [
      { name: "Defence Analytics", prize: "₹1,50,000", description: "Apply ML to satellite imagery analysis, signal processing, or predictive maintenance for defence systems." },
      { name: "AgriTech AI", prize: "₹1,50,000", description: "Build models for crop disease detection, yield prediction, or precision agriculture using real farm datasets." }
    ],
    timeline: [
      { label: "Registrations open", date: "February 1, 2027", past: false },
      { label: "Dataset release", date: "February 20, 2027", past: false },
      { label: "Team formation deadline", date: "February 28, 2027", past: false },
      { label: "Hackathon begins", date: "March 5, 2027", past: false },
      { label: "Submission deadline", date: "March 7, 2027", past: false },
      { label: "Results announced", date: "March 15, 2027", past: false }
    ],
    sponsors: ["IIT BHU", "DRDO", "NVIDIA", "Google Research"],
    prizes: [
      { rank: "1st Place", amount: "₹1,50,000" },
      { rank: "2nd Place", amount: "₹1,00,000" },
      { rank: "3rd Place", amount: "₹50,000" }
    ]
  },
  {
    id: 101,
    title: "Adobe India Hackathon 2026",
    organiser: "Adobe",
    organiserLogo: "A",
    fee: 0,
    prize: "₹10,00,000",
    tags: ["AI", "Design", "Dev"],
    status: "upcoming",
    format: "online",
    teamRequired: true,
    minTeam: 2,
    maxTeam: 4,
    totalSlots: 1000,
    registeredCount: 850,
    registrationDeadline: "2026-07-01T23:59:00",
    teamFormationDeadline: "2026-07-05T23:59:00",
    startDate: "July 8, 2026",
    endDate: "July 10, 2026",
    bannerGradient: "linear-gradient(135deg, #221408, #0a0a0a)",
    image: "assets/hackathon events/adobe video.mp4",
    description: "Build the future of digital experiences with Adobe. Leverage Adobe APIs, Firefly AI, and Document Cloud to create innovative solutions.",
    tracks: [
      { name: "Creative GenAI", prize: "₹5,00,000", description: "Build tools that augment creativity using generative AI." },
      { name: "Document Intelligence", prize: "₹5,00,000", description: "Automate document workflows using Adobe PDF Extract APIs." }
    ],
    timeline: [
      { label: "Registrations open", date: "June 1, 2026", past: false },
      { label: "Hackathon begins", date: "July 8, 2026", past: false }
    ],
    sponsors: ["Adobe"],
    prizes: [
      { rank: "1st Place", amount: "₹5,00,000" },
      { rank: "2nd Place", amount: "₹3,00,000" }
    ]
  },
  {
    id: 102,
    title: "Amazon HackOn 2026",
    organiser: "Amazon",
    organiserLogo: "A",
    fee: 0,
    prize: "₹12,00,000",
    tags: ["AWS", "E-commerce", "AI"],
    status: "upcoming",
    format: "hybrid",
    teamRequired: true,
    minTeam: 2,
    maxTeam: 5,
    totalSlots: 2000,
    registeredCount: 1500,
    registrationDeadline: "2026-08-01T23:59:00",
    teamFormationDeadline: "2026-08-01T23:59:00",
    startDate: "August 15, 2026",
    endDate: "August 17, 2026",
    bannerGradient: "linear-gradient(135deg, #24180a, #0a0a0a)",
    image: "assets/hackathon events/ama.avif",
    description: "Amazon HackOn is a pan-India hackathon focused on solving complex problems in e-commerce, logistics, and AI. Build with AWS and mentor with Amazon engineers.",
    tracks: [
      { name: "Smart Commerce", prize: "₹6,00,000", description: "Enhance shopping experiences with AI and AR." },
      { name: "Green Logistics", prize: "₹6,00,000", description: "Optimize supply chains for sustainability." }
    ],
    timeline: [
      { label: "Registrations open", date: "July 1, 2026", past: false },
      { label: "Hackathon begins", date: "August 15, 2026", past: false }
    ],
    sponsors: ["Amazon", "AWS"],
    prizes: [
      { rank: "1st Place", amount: "₹6,00,000" },
      { rank: "2nd Place", amount: "₹4,00,000" }
    ]
  },
  {
    id: 103,
    title: "Imagine Cup 2026",
    organiser: "Microsoft",
    organiserLogo: "M",
    fee: 0,
    prize: "$100,000",
    tags: ["Azure", "AI", "Global"],
    status: "upcoming",
    format: "online",
    teamRequired: true,
    minTeam: 1,
    maxTeam: 4,
    totalSlots: 5000,
    registeredCount: 4200,
    registrationDeadline: "2026-11-01T23:59:00",
    teamFormationDeadline: "2026-11-01T23:59:00",
    startDate: "November 15, 2026",
    endDate: "March 1, 2027",
    bannerGradient: "linear-gradient(135deg, #1c1610, #0a0a0a)",
    image: "assets/hackathon events/microsoftt.webp",
    description: "Microsoft's premier global student technology competition. Build AI-driven solutions on Azure to solve global challenges.",
    tracks: [
      { name: "Earth", prize: "$25,000", description: "Solutions for climate change, agriculture, and green tech." },
      { name: "Education", prize: "$25,000", description: "Innovations for learning and accessibility." },
      { name: "Health", prize: "$25,000", description: "Tackling issues in treatment, diagnosis, and care." }
    ],
    timeline: [
      { label: "Registrations open", date: "September 1, 2026", past: false },
      { label: "Hackathon begins", date: "November 15, 2026", past: false }
    ],
    sponsors: ["Microsoft"],
    prizes: [
      { rank: "World Champion", amount: "$100,000" }
    ]
  },
  {
    id: 104,
    title: "CloudFest Hackathon 2026",
    organiser: "CloudFest",
    organiserLogo: "C",
    fee: 0,
    prize: "₹5,00,000",
    tags: ["Web3", "AI", "Cloud"],
    status: "upcoming",
    format: "hybrid",
    teamRequired: true,
    minTeam: 2,
    maxTeam: 5,
    totalSlots: 1000,
    registeredCount: 450,
    registrationDeadline: "2026-07-20T23:59:00",
    teamFormationDeadline: "2026-07-20T23:59:00",
    startDate: "July 24, 2026",
    endDate: "July 26, 2026",
    bannerGradient: "linear-gradient(135deg, #1b1611, #0a0a0a)",
    image: "assets/hackathon events/cloudfest.webp",
    description: "48-hour AI & Web3 hackathon with ₹5L prize pool. Join top developers and build next-generation applications on the cloud.",
    tracks: [
      { name: "Web3 Innovation", prize: "₹2,50,000", description: "Build decentralized applications." },
      { name: "AI Services", prize: "₹2,50,000", description: "Integrate AI services into cloud applications." }
    ],
    timeline: [
      { label: "Registrations open", date: "June 1, 2026", past: false },
      { label: "Hackathon begins", date: "July 24, 2026", past: false }
    ],
    sponsors: ["CloudFest"],
    prizes: [
      { rank: "1st Place", amount: "₹2,50,000" }
    ]
  }
];
