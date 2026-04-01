const CATEGORY_ORDER = [
  "technology",
  "creativity",
  "business",
  "social",
  "analytical",
];

const CATEGORY_INFO = {
  technology: {
    label: "Technology",
    shortLabel: "Tech",
    color: "#1f5eff",
    description: "You enjoy tools, systems, digital products, and learning how things work.",
  },
  creativity: {
    label: "Creativity",
    shortLabel: "Creative",
    color: "#ff6b4a",
    description: "You bring imagination, visual thinking, and original ideas into your work.",
  },
  business: {
    label: "Business",
    shortLabel: "Biz",
    color: "#f7a928",
    description: "You are energized by leadership, opportunity spotting, growth, and strategy.",
  },
  social: {
    label: "Social",
    shortLabel: "Social",
    color: "#14a36f",
    description: "You care about people, communication, collaboration, and making a real impact.",
  },
  analytical: {
    label: "Analytical",
    shortLabel: "Logic",
    color: "#7d57ff",
    description: "You like structure, evidence, precision, and solving complex problems clearly.",
  },
};

const CAREERS = [
  {
    id: "software-developer",
    title: "Software Developer",
    categoryLabel: "Tech Builder",
    shortDescription: "Create websites, apps, and digital tools by combining logic, coding, and user needs.",
    description:
      "Software Developers design, build, test, and improve digital products. This path fits students who enjoy problem-solving, technology, and turning ideas into functional systems people can use every day.",
    salary: "$85,000 - $140,000 / year",
    bestFor: "Students who love building, debugging, and learning modern tools.",
    growthFocus: "Coding, system design, product thinking, collaboration.",
    workStyle: "Project-based, iterative, detail-oriented, and team-driven.",
    fitText:
      "This role rewards strong problem-solving and a comfort with technology-rich environments.",
    weights: {
      technology: 1,
      creativity: 0.45,
      business: 0.2,
      social: 0.25,
      analytical: 0.95,
    },
    skills: [
      "Programming fundamentals",
      "JavaScript, Python, or another core language",
      "Debugging and testing",
      "Algorithms and data structures",
      "Version control with Git",
      "Collaboration and product communication",
    ],
    roadmap: [
      "Build a strong foundation in HTML, CSS, JavaScript, and basic programming logic.",
      "Create small projects such as calculators, portfolios, or to-do apps.",
      "Learn one backend or app development path to expand your capabilities.",
      "Practice GitHub, teamwork, and code reviews through real projects.",
      "Build a portfolio and apply for internships, open-source work, or freelance opportunities.",
    ],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    categoryLabel: "Creative Strategist",
    shortDescription: "Design digital experiences that feel intuitive, useful, and visually engaging.",
    description:
      "UI/UX Designers research user needs, plan product flows, and shape interfaces that are both beautiful and easy to use. This career blends creativity, empathy, and structured thinking.",
    salary: "$70,000 - $120,000 / year",
    bestFor: "Students who enjoy design, psychology, storytelling, and digital products.",
    growthFocus: "User research, wireframing, visual design, prototyping.",
    workStyle: "Human-centered, collaborative, experimental, and visual.",
    fitText:
      "This path shines when creative instincts are balanced with empathy and thoughtful structure.",
    weights: {
      technology: 0.55,
      creativity: 1,
      business: 0.35,
      social: 0.6,
      analytical: 0.65,
    },
    skills: [
      "User research and empathy mapping",
      "Wireframing and prototyping",
      "Visual design principles",
      "Figma or other design tools",
      "Interaction design",
      "Presenting ideas clearly",
    ],
    roadmap: [
      "Study visual hierarchy, typography, color, and design basics.",
      "Learn UX methods like user interviews, personas, and journey mapping.",
      "Practice with Figma by redesigning existing app screens.",
      "Create case studies that explain your process and design decisions.",
      "Build a portfolio and seek internships, freelance work, or student product teams.",
    ],
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    categoryLabel: "Growth Leader",
    shortDescription: "Turn ideas into products, services, or businesses by solving real-world problems.",
    description:
      "Entrepreneurs identify opportunities, validate ideas, and build solutions that can grow. This career suits students who love initiative, leadership, risk-taking, and creating value from scratch.",
    salary: "Highly variable: $0 - $250,000+ / year",
    bestFor: "Students who like ownership, experimentation, leadership, and building from zero.",
    growthFocus: "Opportunity analysis, sales, leadership, strategy, resilience.",
    workStyle: "Fast-moving, ambiguous, resourceful, and high ownership.",
    fitText:
      "This direction fits people who combine initiative with strategic thinking and a willingness to learn by doing.",
    weights: {
      technology: 0.4,
      creativity: 0.7,
      business: 1,
      social: 0.75,
      analytical: 0.7,
    },
    skills: [
      "Problem validation and market research",
      "Leadership and communication",
      "Basic finance and budgeting",
      "Sales and persuasion",
      "Brand and product strategy",
      "Adaptability and resilience",
    ],
    roadmap: [
      "Observe real problems around you and write down ideas worth solving.",
      "Study basic business models, customer discovery, and startup case studies.",
      "Build a low-cost prototype or minimum viable product.",
      "Talk to users, measure interest, and refine based on feedback.",
      "Learn pitching, partnerships, and growth fundamentals while building traction.",
    ],
  },
  {
    id: "doctor",
    title: "Doctor",
    categoryLabel: "Human Impact",
    shortDescription: "Diagnose, treat, and support patients through science, care, and responsibility.",
    description:
      "Doctors combine deep scientific knowledge with patient care. This path is ideal for students who are disciplined, empathetic, and motivated by helping others through high-stakes work.",
    salary: "$120,000 - $250,000+ / year",
    bestFor: "Students driven by service, science, and long-term academic commitment.",
    growthFocus: "Biology, communication, ethics, diagnosis, patient care.",
    workStyle: "Structured, people-centered, high responsibility, and knowledge intensive.",
    fitText:
      "This role is strongest for students whose empathy and discipline stay steady under pressure.",
    weights: {
      technology: 0.25,
      creativity: 0.2,
      business: 0.15,
      social: 1,
      analytical: 0.9,
    },
    skills: [
      "Biology and chemistry knowledge",
      "Critical thinking and diagnosis",
      "Patient communication",
      "Emotional resilience",
      "Ethical decision-making",
      "Lifelong learning discipline",
    ],
    roadmap: [
      "Focus strongly on science subjects, especially biology and chemistry.",
      "Build study discipline and volunteer in health-related environments if possible.",
      "Research the medical education path in your country and prepare required exams.",
      "Strengthen communication and empathy through real service experiences.",
      "Commit to long-term training, specialization, and continuous professional development.",
    ],
  },
  {
    id: "engineer",
    title: "Engineer",
    categoryLabel: "Systems Solver",
    shortDescription: "Design practical solutions to technical problems in the physical or digital world.",
    description:
      "Engineers use math, science, and structured thinking to create reliable systems, products, and processes. This path fits students who enjoy logic, optimization, and making ideas work in the real world.",
    salary: "$80,000 - $135,000 / year",
    bestFor: "Students who like math, systems, technical challenges, and hands-on problem solving.",
    growthFocus: "Mathematics, design thinking, simulation, precision, teamwork.",
    workStyle: "Methodical, technical, project-based, and impact-oriented.",
    fitText:
      "Engineering rewards students who enjoy turning complex constraints into dependable solutions.",
    weights: {
      technology: 0.8,
      creativity: 0.35,
      business: 0.25,
      social: 0.25,
      analytical: 1,
    },
    skills: [
      "Mathematics and physics",
      "Technical design and modeling",
      "Data interpretation",
      "Problem decomposition",
      "Attention to detail",
      "Collaborative project execution",
    ],
    roadmap: [
      "Strengthen math and science fundamentals through coursework and practice.",
      "Explore engineering branches to find the one that matches your interests.",
      "Build small technical projects, models, or experiments to apply concepts.",
      "Learn software or tools used in your chosen engineering discipline.",
      "Pursue internships, competitions, or lab experiences to gain real-world exposure.",
    ],
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist",
    categoryLabel: "Audience Builder",
    shortDescription: "Connect products with people through campaigns, storytelling, strategy, and data.",
    description:
      "Marketing Specialists understand audiences, create compelling messages, and help brands grow. This role is a strong fit for students who enjoy communication, strategy, trends, and creative problem solving.",
    salary: "$60,000 - $110,000 / year",
    bestFor: "Students who like storytelling, trends, communication, and strategic growth.",
    growthFocus: "Content, analytics, audience research, branding, campaign thinking.",
    workStyle: "Creative, fast-paced, collaborative, and insight-driven.",
    fitText:
      "Marketing is a strong match when communication, creativity, and strategic judgment show up together.",
    weights: {
      technology: 0.35,
      creativity: 0.8,
      business: 0.9,
      social: 0.75,
      analytical: 0.55,
    },
    skills: [
      "Content and copywriting",
      "Audience research",
      "Campaign planning",
      "Analytics and performance tracking",
      "Brand strategy",
      "Presentation and collaboration",
    ],
    roadmap: [
      "Study the basics of branding, communication, and consumer psychology.",
      "Practice writing campaigns, posts, and marketing ideas for real or imaginary brands.",
      "Learn analytics tools and how to measure content or campaign performance.",
      "Build a small portfolio with campaign concepts, social ideas, or case studies.",
      "Gain experience through clubs, internships, freelance projects, or student organizations.",
    ],
  },
];

const QUESTIONS = [
  {
    text: "When you start a new project, what excites you most?",
    prompt: "Choose the option that feels most natural to you.",
    options: [
      {
        label: "Figuring out the tools and systems behind it",
        description: "You like understanding how things work before jumping in.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Imagining a unique concept or visual direction",
        description: "You naturally think in ideas, aesthetics, and experiences.",
        scores: { technology: 0, analytical: 1, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Thinking about how it could become successful",
        description: "You focus on value, growth, and opportunities.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "Considering who it helps and how they will feel",
        description: "You are motivated by people and impact.",
        scores: { technology: 0, analytical: 0, creativity: 1, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "Which school activity sounds most rewarding?",
    prompt: "Pick the activity you would gladly spend extra time on.",
    options: [
      {
        label: "Coding a small app or website",
        description: "You enjoy creating technical solutions.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Designing posters, interfaces, or presentations",
        description: "You like shaping how ideas look and feel.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Running a student event or fundraiser",
        description: "You enjoy leadership and organizing people around a goal.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 2, social: 2 },
      },
      {
        label: "Tutoring or helping classmates understand topics",
        description: "You feel fulfilled when other people succeed.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What kind of problem do you enjoy solving most?",
    prompt: "Think about the challenge that makes you feel energized.",
    options: [
      {
        label: "A technical bug or digital issue",
        description: "You like tracing systems and finding precise fixes.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Making something clearer, prettier, or more engaging",
        description: "You like refining the user experience.",
        scores: { technology: 0, analytical: 1, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Improving results, sales, or performance",
        description: "You are motivated by measurable growth.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "Helping someone through a difficult situation",
        description: "You value support, empathy, and real human impact.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "How do you usually make decisions?",
    prompt: "Choose the style that best matches your instinct.",
    options: [
      {
        label: "I test options and compare what works best",
        description: "You trust logic and experimentation.",
        scores: { technology: 1, analytical: 2, creativity: 0, business: 1, social: 0 },
      },
      {
        label: "I follow ideas that feel fresh and expressive",
        description: "You rely on originality and creative intuition.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "I look for the smartest strategic opportunity",
        description: "You think about leverage, timing, and outcomes.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "I consider the people involved first",
        description: "Relationships and well-being guide your choices.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "If you had a free weekend, what would you most likely do?",
    prompt: "Answer with your natural preference, not what sounds impressive.",
    options: [
      {
        label: "Build or learn something with tech",
        description: "You like experimenting with tools and systems.",
        scores: { technology: 2, analytical: 1, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Create art, content, or design concepts",
        description: "You enjoy bringing ideas into visible form.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Work on a side hustle or business idea",
        description: "You are drawn to initiative and value creation.",
        scores: { technology: 0, analytical: 1, creativity: 1, business: 2, social: 0 },
      },
      {
        label: "Volunteer, mentor, or spend meaningful time helping others",
        description: "You gain energy from people-centered experiences.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "Which compliment feels most meaningful to you?",
    prompt: "Pick the one that would make you proudest.",
    options: [
      {
        label: "You are amazing at building things that work",
        description: "You value competence and technical execution.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "You have such original ideas and taste",
        description: "You care about expression and imagination.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "You know how to turn ideas into results",
        description: "You like strategy and momentum.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "People trust you and feel supported by you",
        description: "You care deeply about human connection.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What kind of class environment helps you thrive?",
    prompt: "Choose where you naturally do your best work.",
    options: [
      {
        label: "Labs, projects, and hands-on technical challenges",
        description: "You like practical problem-solving.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Creative studios and open-ended assignments",
        description: "You prefer space to imagine and explore.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Debates, pitches, and leadership projects",
        description: "You enjoy influence and strategic thinking.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 2, social: 2 },
      },
      {
        label: "Group discussions about people and society",
        description: "You connect deeply with human-centered topics.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "When a challenge gets difficult, what keeps you going?",
    prompt: "Pick the motivation you most relate to.",
    options: [
      {
        label: "The satisfaction of cracking the problem",
        description: "You love solving puzzles and making systems work.",
        scores: { technology: 1, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "The chance to make something inspiring",
        description: "A strong vision keeps you engaged.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "The possibility of achieving a big outcome",
        description: "Ambition and progress motivate you.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 0 },
      },
      {
        label: "Knowing the outcome matters to someone",
        description: "You work hard when people depend on you.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What role do you naturally take in a group project?",
    prompt: "Choose your most common pattern.",
    options: [
      {
        label: "The one who builds the structure or solves the hard part",
        description: "You like tackling the core challenge directly.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "The one who shapes the concept and presentation",
        description: "You care about clarity, story, and experience.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "The one who organizes tasks and drives momentum",
        description: "You like direction, planning, and outcomes.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "The one who keeps everyone aligned and supported",
        description: "You naturally care about team dynamics.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "Which kind of success appeals to you most?",
    prompt: "Choose the outcome you would be most excited to achieve.",
    options: [
      {
        label: "Building a product people rely on",
        description: "You like creating useful systems at scale.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Designing something memorable and impactful",
        description: "You value originality and experience.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Launching something that grows fast",
        description: "You are energized by traction and opportunity.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "Changing lives in a direct, personal way",
        description: "Meaningful human impact matters most to you.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What kind of content do you watch or read most often?",
    prompt: "Pick the content type that pulls you in naturally.",
    options: [
      {
        label: "Tech reviews, coding, science, or how-things-work videos",
        description: "You are curious about systems and innovation.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Design inspiration, art, branding, or storytelling content",
        description: "You are drawn to aesthetics and expression.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Business stories, startups, productivity, or strategy",
        description: "You like performance, growth, and leadership.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "Psychology, health, motivation, or community topics",
        description: "You are interested in people and well-being.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "How do you feel about working with data and evidence?",
    prompt: "Choose the answer closest to your comfort level.",
    options: [
      {
        label: "I enjoy it when it helps me build better systems",
        description: "You use evidence to improve technical solutions.",
        scores: { technology: 1, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "I use it when it helps support creative choices",
        description: "You like balance between intuition and proof.",
        scores: { technology: 0, analytical: 1, creativity: 2, business: 0, social: 0 },
      },
      {
        label: "I like it because it helps make smart strategic decisions",
        description: "You connect evidence with growth and outcomes.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 0 },
      },
      {
        label: "I use it carefully when people depend on the outcome",
        description: "You value evidence when responsibility is high.",
        scores: { technology: 0, analytical: 2, creativity: 0, business: 0, social: 1 },
      },
    ],
  },
  {
    text: "Which future sounds most energizing?",
    prompt: "Pick the vision that feels most motivating.",
    options: [
      {
        label: "Creating the next useful digital product",
        description: "You see yourself building through technology.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Designing experiences people love to use",
        description: "You want creativity to improve everyday life.",
        scores: { technology: 1, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Starting something of my own and leading it",
        description: "You want ownership and growth.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "Helping people through expert knowledge and care",
        description: "You want to be useful in a direct and meaningful way.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What is your strongest edge when learning something new?",
    prompt: "Think about how you become good at unfamiliar things.",
    options: [
      {
        label: "I break it into systems and learn by building",
        description: "You like structure plus hands-on practice.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "I connect it to ideas, visuals, or stories",
        description: "You learn through imagination and expression.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "I look for the fastest path to useful results",
        description: "You are practical and outcome-focused.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 0 },
      },
      {
        label: "I learn best when I can discuss and apply it with people",
        description: "You absorb ideas through connection and communication.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "Which work environment sounds best?",
    prompt: "Select the setting where you would likely perform best.",
    options: [
      {
        label: "A product team solving technical challenges",
        description: "You like focused problem-solving with clear goals.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "A creative studio or design team shaping experiences",
        description: "You want imagination and collaboration together.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "A fast-growing company where strategy matters daily",
        description: "You enjoy pace, ownership, and momentum.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "A mission-driven environment centered on people",
        description: "You want your work to feel meaningful and personal.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What kind of challenge would you volunteer for first?",
    prompt: "Pick the task you would actually raise your hand for.",
    options: [
      {
        label: "Fixing a broken process or system",
        description: "You like logic and improvement.",
        scores: { technology: 1, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "Reimagining the look, feel, or message",
        description: "You enjoy creative transformation.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Finding a better strategy to reach the goal",
        description: "You focus on smart execution and results.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "Talking with people to understand what they need",
        description: "You want clarity through human connection.",
        scores: { technology: 0, analytical: 0, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "Which statement sounds most like you?",
    prompt: "Choose the sentence that feels the most true.",
    options: [
      {
        label: "I enjoy mastering complex tools and solving hard problems",
        description: "Challenge and systems motivate you.",
        scores: { technology: 2, analytical: 2, creativity: 0, business: 0, social: 0 },
      },
      {
        label: "I notice details others miss in visuals and experiences",
        description: "You have a sharp eye and creative awareness.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "I naturally think about opportunities, leadership, and growth",
        description: "You are drawn to momentum and direction.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "I care deeply about helping people solve real problems",
        description: "You are grounded in empathy and contribution.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
  {
    text: "What would make a career feel meaningful to you long term?",
    prompt: "Choose the answer that best captures your deeper motivation.",
    options: [
      {
        label: "Building useful tools that improve how people live or work",
        description: "You want impact through systems and products.",
        scores: { technology: 2, analytical: 1, creativity: 0, business: 0, social: 1 },
      },
      {
        label: "Creating work that inspires, delights, or feels beautifully crafted",
        description: "You care about creativity with emotional impact.",
        scores: { technology: 0, analytical: 0, creativity: 2, business: 0, social: 1 },
      },
      {
        label: "Growing something valuable and leading it successfully",
        description: "You are motivated by ownership and strategic wins.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 2, social: 1 },
      },
      {
        label: "Being trusted to help people when it matters most",
        description: "You want significance through service and responsibility.",
        scores: { technology: 0, analytical: 1, creativity: 0, business: 0, social: 2 },
      },
    ],
  },
];
