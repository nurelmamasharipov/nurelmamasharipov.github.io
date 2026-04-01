const CATEGORY_ORDER = ["technology", "creativity", "business", "social", "analytical"];

const CATEGORY_INFO = {
  technology: {
    label: "Tech",
    color: "#4f7cff",
    description: "You enjoy digital tools, systems, and building solutions.",
  },
  creativity: {
    label: "Creative",
    color: "#ff7b72",
    description: "You think visually, imaginatively, and enjoy original ideas.",
  },
  business: {
    label: "Business",
    color: "#ffb347",
    description: "You are drawn to growth, leadership, strategy, and opportunity.",
  },
  social: {
    label: "Social",
    color: "#3ecf8e",
    description: "You care about people, teamwork, communication, and service.",
  },
  analytical: {
    label: "Analytical",
    color: "#a279ff",
    description: "You like logic, structure, evidence, and problem solving.",
  },
};

const CAREERS = [
  {
    id: "software-developer",
    title: "Software Developer",
    badge: "Tech Builder",
    description:
      "Software developers build websites, apps, and digital systems. This role is ideal for students who enjoy solving technical problems and turning ideas into working products.",
    shortDescription: "Build apps, websites, and digital tools through coding and problem solving.",
    salary: "$85,000 - $140,000 / year",
    skills: [
      "Programming fundamentals",
      "HTML, CSS, JavaScript or Python",
      "Debugging and testing",
      "Problem decomposition",
      "Git and collaboration",
    ],
    roadmap: [
      "Learn programming basics and web fundamentals.",
      "Build small projects like calculators, portfolios, and apps.",
      "Study algorithms, testing, and version control.",
      "Create a portfolio on GitHub with polished projects.",
      "Apply for internships, freelance work, or junior roles.",
    ],
    bestFor: "Students who like building, debugging, and logical systems.",
    fitText: "This path fits students who score highly in technology and analytical thinking.",
    weights: {
      technology: 1,
      creativity: 0.35,
      business: 0.2,
      social: 0.2,
      analytical: 0.95,
    },
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    badge: "Experience Designer",
    description:
      "UI/UX Designers create interfaces and experiences that feel clear, useful, and visually attractive. It suits students who combine creativity with empathy and structured thinking.",
    shortDescription: "Design useful and visually clear digital experiences for real users.",
    salary: "$70,000 - $120,000 / year",
    skills: [
      "Visual design",
      "User research",
      "Wireframing and prototyping",
      "Typography and layout",
      "Figma or interface tools",
    ],
    roadmap: [
      "Study design basics like typography, spacing, and color.",
      "Learn UX methods such as user interviews and journey mapping.",
      "Practice wireframing and prototyping in Figma.",
      "Build case studies that explain your design decisions.",
      "Create a portfolio and apply to internships or design teams.",
    ],
    bestFor: "Students who enjoy design, empathy, and digital products.",
    fitText: "This path fits students with strong creativity, social awareness, and structured thinking.",
    weights: {
      technology: 0.45,
      creativity: 1,
      business: 0.35,
      social: 0.7,
      analytical: 0.6,
    },
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    badge: "Growth Leader",
    description:
      "Entrepreneurs identify problems, create solutions, and build products or businesses around them. This path works well for students who are proactive, strategic, and comfortable with uncertainty.",
    shortDescription: "Turn ideas into products, services, or businesses that solve problems.",
    salary: "Highly variable: $0 - $250,000+ / year",
    skills: [
      "Opportunity spotting",
      "Leadership and communication",
      "Basic finance",
      "Sales and persuasion",
      "Resilience and adaptability",
    ],
    roadmap: [
      "Learn how businesses create value and solve customer problems.",
      "Explore ideas and validate them with real people.",
      "Build a simple prototype or pilot version.",
      "Practice pitching, selling, and refining your offer.",
      "Grow through feedback, partnerships, and experimentation.",
    ],
    bestFor: "Students who like ownership, strategy, and building something new.",
    fitText: "This path fits students with strong business, creativity, and decision-making instincts.",
    weights: {
      technology: 0.4,
      creativity: 0.7,
      business: 1,
      social: 0.75,
      analytical: 0.65,
    },
  },
  {
    id: "doctor",
    title: "Doctor",
    badge: "Human Impact",
    description:
      "Doctors combine scientific knowledge, care, and responsibility to help people improve and protect their health. It suits students who are disciplined, empathetic, and analytical.",
    shortDescription: "Help patients through science, diagnosis, care, and responsibility.",
    salary: "$120,000 - $250,000+ / year",
    skills: [
      "Biology and chemistry",
      "Patient communication",
      "Diagnostic thinking",
      "Ethics and responsibility",
      "Emotional resilience",
    ],
    roadmap: [
      "Focus on science subjects and strong study habits.",
      "Research your country's medical education path and entrance exams.",
      "Volunteer or shadow in health-related environments if possible.",
      "Develop communication and empathy alongside academics.",
      "Commit to long-term training, practice, and specialization.",
    ],
    bestFor: "Students who want service, science, and real human impact.",
    fitText: "This path fits students who combine strong social care with analytical discipline.",
    weights: {
      technology: 0.2,
      creativity: 0.15,
      business: 0.1,
      social: 1,
      analytical: 0.9,
    },
  },
  {
    id: "engineer",
    title: "Engineer",
    badge: "Systems Solver",
    description:
      "Engineers use science, math, and structured problem solving to design reliable systems and products. It fits students who enjoy technical precision and solving real-world constraints.",
    shortDescription: "Design dependable technical solutions using math, science, and logic.",
    salary: "$80,000 - $135,000 / year",
    skills: [
      "Mathematics and physics",
      "Systems thinking",
      "Technical modeling",
      "Data interpretation",
      "Precision and planning",
    ],
    roadmap: [
      "Build strong math and science fundamentals.",
      "Explore engineering branches to choose a focus area.",
      "Work on technical projects, labs, or design challenges.",
      "Learn tools used in your chosen engineering field.",
      "Gain experience through internships, competitions, or practical projects.",
    ],
    bestFor: "Students who like technical depth, optimization, and structured design.",
    fitText: "This path fits students with strong analytical and technology-oriented strengths.",
    weights: {
      technology: 0.8,
      creativity: 0.25,
      business: 0.2,
      social: 0.2,
      analytical: 1,
    },
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist",
    badge: "Audience Builder",
    description:
      "Marketing Specialists connect products with audiences through storytelling, strategy, and data. This path suits students who enjoy communication, trends, creativity, and growth.",
    shortDescription: "Grow products and brands through campaigns, storytelling, and strategy.",
    salary: "$60,000 - $110,000 / year",
    skills: [
      "Content and copywriting",
      "Audience research",
      "Brand positioning",
      "Campaign planning",
      "Analytics and reporting",
    ],
    roadmap: [
      "Study branding, communication, and customer psychology.",
      "Practice campaign ideas and content creation.",
      "Learn how to read marketing metrics and performance data.",
      "Build a portfolio with campaign concepts or case studies.",
      "Get experience through internships, student clubs, or freelance projects.",
    ],
    bestFor: "Students who like communication, persuasion, creativity, and growth.",
    fitText: "This path fits students who score well in business, creativity, and social communication.",
    weights: {
      technology: 0.3,
      creativity: 0.8,
      business: 0.9,
      social: 0.75,
      analytical: 0.5,
    },
  },
];

const QUESTIONS = [
  {
    text: "What kind of school project sounds most exciting to you?",
    prompt: "Choose the option that feels most natural.",
    options: [
      {
        label: "Building an app or digital tool",
        description: "You like practical technical creation.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Designing a visual concept or interface",
        description: "You enjoy aesthetics and user experience.",
        scores: { technology: 1, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Launching a business idea or campaign",
        description: "You like momentum, strategy, and opportunity.",
        scores: { technology: 0, analytical: 1, creativity: 1, business: 3, social: 1 },
      },
      {
        label: "Helping a group solve a real human problem",
        description: "You care about people and impact.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "Which compliment would mean the most to you?",
    prompt: "Pick the one that feels strongest.",
    options: [
      {
        label: "You solve hard problems quickly",
        description: "You value logic and technical ability.",
        scores: { technology: 2, analytical: 3, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Your ideas are original and well designed",
        description: "You value creativity and expression.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "You know how to make things grow",
        description: "You care about results and influence.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 1 },
      },
      {
        label: "People trust you and feel supported",
        description: "You value care and communication.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "When you face a challenge, what do you do first?",
    prompt: "Choose your default response.",
    options: [
      {
        label: "Break the problem into smaller steps",
        description: "You approach problems methodically.",
        scores: { technology: 1, analytical: 3, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Explore fresh ideas and different angles",
        description: "You approach problems creatively.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Think about the best strategy to win",
        description: "You focus on leverage and outcomes.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 0 },
      },
      {
        label: "Talk to people and understand their needs",
        description: "You approach challenges relationally.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "What kind of content do you enjoy most?",
    prompt: "Pick what pulls your attention naturally.",
    options: [
      {
        label: "Technology, coding, or how-things-work videos",
        description: "You are curious about systems and tools.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Art, branding, design, or creative inspiration",
        description: "You are drawn to visuals and style.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Startups, business stories, and growth strategies",
        description: "You enjoy strategy and real-world momentum.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 1 },
      },
      {
        label: "Health, psychology, or human stories",
        description: "You care about people and well-being.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "What role do you often take in group work?",
    prompt: "Choose the role that sounds most like you.",
    options: [
      {
        label: "The builder or technical problem solver",
        description: "You like making the core solution work.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "The person shaping the concept and presentation",
        description: "You care about experience and design.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "The organizer who drives results",
        description: "You like direction and execution.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 1 },
      },
      {
        label: "The one who keeps everyone aligned",
        description: "You care about team health and support.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "Which class would you most likely enjoy?",
    prompt: "Pick the one you would want more of.",
    options: [
      {
        label: "Computer science or robotics",
        description: "You enjoy technical systems and building.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Design, media, or visual arts",
        description: "You enjoy creativity and communication.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Economics, leadership, or entrepreneurship",
        description: "You enjoy strategy and growth.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 1 },
      },
      {
        label: "Biology, health, or psychology",
        description: "You enjoy people-centered science.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "What kind of success feels most meaningful?",
    prompt: "Pick the outcome you care about most.",
    options: [
      {
        label: "Building something useful that people rely on",
        description: "You like practical impact through systems.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Creating something memorable and beautifully crafted",
        description: "You value originality and quality.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Growing an idea into something big",
        description: "You are motivated by scale and traction.",
        scores: { technology: 0, analytical: 1, creativity: 1, business: 3, social: 0 },
      },
      {
        label: "Helping people at important moments",
        description: "You value direct human impact.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "How do you prefer to learn?",
    prompt: "Pick the style that suits you best.",
    options: [
      {
        label: "By testing, building, and troubleshooting",
        description: "You like learning through systems and practice.",
        scores: { technology: 2, analytical: 3, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "By experimenting visually and creatively",
        description: "You learn through exploration and expression.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "By understanding what creates results",
        description: "You learn with a strategic lens.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 0 },
      },
      {
        label: "By discussing and applying ideas with people",
        description: "You learn best through connection and context.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "Which environment sounds best to you?",
    prompt: "Choose where you would thrive most.",
    options: [
      {
        label: "A team building products and solving technical issues",
        description: "You like structured technical work.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "A creative studio shaping interfaces and stories",
        description: "You like design-forward collaboration.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "A fast-growing company where strategy matters every day",
        description: "You like movement and ambition.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 1 },
      },
      {
        label: "A mission-driven place centered on helping people",
        description: "You like service and purpose.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "What type of task would you volunteer for first?",
    prompt: "Pick the task you would raise your hand for.",
    options: [
      {
        label: "Fixing a broken process or system",
        description: "You enjoy logic and structure.",
        scores: { technology: 2, analytical: 3, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Redesigning the look and feel",
        description: "You enjoy improving experience and presentation.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Improving the strategy or plan",
        description: "You enjoy thinking in outcomes and leverage.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 0 },
      },
      {
        label: "Talking to people and understanding what they need",
        description: "You enjoy human-centered work.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "What usually motivates you to keep going?",
    prompt: "Choose your strongest driver.",
    options: [
      {
        label: "Solving the challenge correctly",
        description: "You like precision and results.",
        scores: { technology: 1, analytical: 3, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Making something exciting and original",
        description: "You are motivated by creativity.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Reaching a strong outcome or win",
        description: "You are motivated by progress and impact.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 0 },
      },
      {
        label: "Knowing the work matters to someone",
        description: "You are motivated by usefulness to others.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "What sounds like a fun personal project?",
    prompt: "Choose the one you would actually start.",
    options: [
      {
        label: "Building a website, app, or automation",
        description: "You like making tools and digital systems.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Creating a brand, interface, or design concept",
        description: "You like shaping visual experiences.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Launching a side hustle",
        description: "You enjoy initiative and real-world experimentation.",
        scores: { technology: 0, analytical: 1, creativity: 1, business: 3, social: 0 },
      },
      {
        label: "Starting a helpful community or support initiative",
        description: "You enjoy meaningful people-centered work.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "Which statement sounds most like you?",
    prompt: "Choose the statement that feels truest.",
    options: [
      {
        label: "I enjoy understanding how complex things work",
        description: "You are curious about systems and logic.",
        scores: { technology: 2, analytical: 3, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "I notice design and details other people miss",
        description: "You notice expression, form, and polish.",
        scores: { technology: 0, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "I naturally think about growth and leadership",
        description: "You are pulled toward strategy and ownership.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 1 },
      },
      {
        label: "I care deeply about helping people solve real problems",
        description: "You are motivated by service and connection.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
  {
    text: "How do you feel about data and evidence?",
    prompt: "Pick the answer that fits best.",
    options: [
      {
        label: "I like using data to improve systems",
        description: "You connect numbers with technical decisions.",
        scores: { technology: 2, analytical: 3, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "I use data when it helps support creative ideas",
        description: "You balance intuition with proof.",
        scores: { technology: 0, analytical: 1, creativity: 2, business: 0, social: 0 },
      },
      {
        label: "I use data to make smart strategic choices",
        description: "You connect evidence with growth.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 0 },
      },
      {
        label: "I use data carefully when people depend on the outcome",
        description: "You value evidence in human-centered work.",
        scores: { technology: 0, analytical: 2, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What kind of future work feels most exciting?",
    prompt: "Choose the future you want to grow into.",
    options: [
      {
        label: "Creating digital products people use every day",
        description: "You want to build in technology.",
        scores: { technology: 3, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Designing products that feel intuitive and beautiful",
        description: "You want to shape experiences.",
        scores: { technology: 1, analytical: 0, creativity: 3, business: 0, social: 1 },
      },
      {
        label: "Building and leading something of my own",
        description: "You want ownership and momentum.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 3, social: 1 },
      },
      {
        label: "Helping people with knowledge, care, and trust",
        description: "You want responsibility with human impact.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 3 },
      },
    ],
  },
];
