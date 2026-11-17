export interface ProjectItem {
  slug: string;
  title: string;
  shortTitle: string;
  category: 'AI & ML' | 'Full-Stack';
  year: string;
  summary: string;
  highlights: string[];
  architectureNote: string;
  stack: string[];
  metrics?: string[];
  githubUrl: string;
  liveUrl?: string;
  previewKind: 'rag' | 'cnn' | 'tank' | 'eshop' | 'campus';
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  type: 'Teaching' | 'Leadership' | 'Certification';
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
  coursework?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const profile = {
  name: 'Nur Hossain Nazim',
  firstName: 'Nur Hossain',
  lastName: 'Nazim',
  headline: 'Signal from data.',
  role: 'Final-Year B.Sc. CSE Student · AI, Machine Learning & Data Science',
  availability: 'Open to AI / ML & Data Science Internships',
  location: 'Dhaka, Bangladesh',
  coordinates: '23.81° N / 90.41° E',
  timezone: 'UTC+06:00',
  email: 'nnazim223296@bscse.uiu.ac.bd',
  phone: '+880 1954900122',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://nurnazim.vercel.app',
  version: '2026.11',
  portraitPath:
    '/assets/aistudio/493328250_4060941407558796_3474560319503407751_n-Picsart-AiImageEnhancer_fe35681c.jpg',
  cvPath: '/assets/aistudio/Nazim_CV_6f90c2d5.pdf',
  links: {
    github: 'https://github.com/NurNazim21',
    linkedin: 'https://www.linkedin.com/in/nur-hossain-nazim/',
    eshopRepo: 'https://github.com/NurNazim21/Web-lab-Team_Dhumketu71',
  },
  summary:
    'Final-year B.Sc. Computer Science and Engineering student at United International University (UIU) with research interest in data science, AI and machine learning. Built full-stack and real-time applications (Java/Spring Boot, PHP/MySQL) and AI projects including a multimodal RAG pipeline and a CNN-based classifier. Currently researching myocardial infarction detection from echocardiography for the Final Year Design Project.',
  seo: {
    title: 'Nur Hossain Nazim — AI & Machine Learning Engineer',
    description:
      'Portfolio of Nur Hossain Nazim, final-year B.Sc. CSE student at United International University, Dhaka. Projects in Multimodal RAG, CNNs, echocardiography ML research, and full-stack systems.',
    keywords: [
      'Nur Hossain Nazim',
      'Nur Nazim',
      'United International University',
      'UIU CSE',
      'AI Engineer Bangladesh',
      'Machine Learning Portfolio',
      'Data Science Intern Dhaka',
      'Echocardiography Myocardial Infarction HMC-QU',
      'Multimodal RAG Pipeline',
    ],
  },
  research: {
    title: 'Myocardial Infarction Detection using Echocardiography',
    subtitle: 'Final Year Design Project (FYDP)',
    status: 'Ongoing — FYDP',
    supervisor: 'Ohidujjaman Tuhin',
    dataset: 'HMC-QU Dataset',
    baseline: 'Multiview 1D-CNN / LSTM',
    summary:
      'Researching deep learning methods to detect myocardial infarction from echocardiography videos using the HMC-QU dataset.',
    points: [
      'Researching deep learning methods to detect myocardial infarction from echocardiography videos, using the HMC-QU dataset under the supervision of Ohidujjaman Tuhin.',
      'Building on a published multiview echocardiography MI-detection baseline (1D-CNN/LSTM), aiming to improve its efficiency and accuracy.',
      'Planning to extend training with additional echocardiography datasets and a stronger model/pipeline, with the goal of a publishable research paper.',
    ],
    focusAreas: [
      'HMC-QU Multiview Echocardiography',
      '1D-CNN / LSTM Baseline Optimization',
      'Temporal Wall-Motion Feature Extraction',
      'Cross-Dataset Generalization Planning',
    ],
  },
  projects: [
    {
      slug: 'multimodal-rag-pipeline',
      title: 'Multimodal RAG Pipeline',
      shortTitle: 'Multimodal RAG',
      category: 'AI & ML',
      year: '2025',
      summary:
        'Built a retrieval system combining hybrid BM25 and vector search with vision-language model image analysis for document understanding.',
      highlights: [
        'Combines sparse lexical retrieval (BM25) with dense semantic vector search to improve recall across technical documents.',
        'Integrates vision-language model (VLM) image analysis so diagrams, figures, and scanned pages contribute directly to grounded answers.',
        'Designed modular indexing and retrieval stages to keep text and visual evidence traceable per query.',
      ],
      architectureNote:
        'Document Ingestion -> Chunking & Image Extraction -> Hybrid BM25 + Vector Index -> Vision-Language Synthesis -> Grounded Answer',
      stack: ['Python', 'BM25', 'Vector Search', 'Vision-Language Models'],
      metrics: ['Hybrid BM25 + Dense Vector', 'VLM Document Parsing'],
      githubUrl: 'https://github.com/NurNazim21',
      previewKind: 'rag',
    },
    {
      slug: 'plant-disease-cnn',
      title: 'Plant Disease Detection using CNN',
      shortTitle: 'Plant Disease CNN',
      category: 'AI & ML',
      year: '2025',
      summary:
        'Trained a convolutional neural network to classify plant leaf diseases, reaching 97% accuracy on 87,867 images across 38 classes.',
      highlights: [
        'Trained and evaluated a deep convolutional neural network across 87,867 leaf images spanning 38 distinct plant disease classes.',
        'Achieved 97% classification accuracy through structured preprocessing and multi-class convolutional feature extraction.',
        'Built a repeatable TensorFlow training and inference workflow suitable for rapid leaf pathology screening.',
      ],
      architectureNote:
        '87,867 Leaf Images -> Normalization & Augmentation -> Multi-Layer Conv2D Feature Extractor -> 38-Class Softmax Classifier (97% Accuracy)',
      stack: ['Python', 'CNN', 'TensorFlow'],
      metrics: ['97% Accuracy', '87,867 Images', '38 Classes'],
      githubUrl: 'https://github.com/NurNazim21',
      previewKind: 'cnn',
    },
    {
      slug: 'tank-arena',
      title: 'Tank Arena: Real-Time Multiplayer 2D Tank Battle Game',
      shortTitle: 'Tank Arena',
      category: 'Full-Stack',
      year: '2024',
      summary:
        'Built a real-time multiplayer game where players battle in a shared arena, using WebSocket with STOMP/SockJS messaging on a Spring Boot backend.',
      highlights: [
        'Architected a Spring Boot backend with WebSocket and STOMP/SockJS messaging for low-latency multiplayer arena rooms.',
        'Developed the browser game client with Phaser 3, synchronizing tank coordinates, turrets, and combat state across connected clients.',
        'Handled bidirectional event broadcasting for movement, projectiles, and shared arena state updates.',
      ],
      architectureNote:
        'Phaser 3 Browser Client <-> SockJS / STOMP WebSocket Broker <-> Spring Boot Authoritative Arena State',
      stack: ['Java', 'Spring Boot', 'WebSocket', 'STOMP', 'SockJS', 'Phaser 3'],
      metrics: ['Real-Time State Sync', 'STOMP / SockJS'],
      githubUrl: 'https://github.com/NurNazim21',
      previewKind: 'tank',
    },
    {
      slug: 'eshop-bd',
      title: 'E-Shop BD: Multi-Vendor Marketplace',
      shortTitle: 'E-Shop BD',
      category: 'Full-Stack',
      year: '2024',
      summary:
        'Implemented role-based access control across four user types in a multi-vendor e-commerce platform with an integrated LLM chatbot and courier logistics.',
      highlights: [
        'Implemented role-based access control across four distinct user types in a multi-vendor e-commerce architecture.',
        'Integrated an LLM-powered customer assistant chatbot for product discovery and support workflows.',
        'Connected external courier logistics APIs for automated order dispatch and delivery tracking.',
      ],
      architectureNote:
        '4-Role RBAC Gateways -> PHP Core & MySQL Catalog -> LLM Assistant API + Courier Logistics API',
      stack: ['PHP', 'MySQL', 'LLM API', 'Courier API'],
      metrics: ['4-Role RBAC', 'LLM + Courier APIs'],
      githubUrl: 'https://github.com/NurNazim21/Web-lab-Team_Dhumketu71',
      previewKind: 'eshop',
    },
    {
      slug: 'campus-guide-platform',
      title: 'Campus Guide Platform',
      shortTitle: 'Campus Guide',
      category: 'Full-Stack',
      year: '2025',
      summary:
        'Designed a platform where students get academic help from seniors and find the resources they need on campus.',
      highlights: [
        'Structured peer mentorship pathways connecting junior students with senior mentors for coursework and lab guidance.',
        'Organized searchable campus academic resources backed by Prisma ORM and PostgreSQL.',
        'Built responsive interfaces using Next.js, TypeScript, and Tailwind CSS.',
      ],
      architectureNote:
        'Next.js App Router UI -> TypeScript Domain Layer -> Prisma ORM -> PostgreSQL Campus Resource Graph',
      stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      metrics: ['Senior-Junior Mentorship', 'Prisma + PostgreSQL'],
      githubUrl: 'https://github.com/NurNazim21',
      previewKind: 'campus',
    },
  ] as ProjectItem[],
  education: [
    {
      institution: 'United International University (UIU)',
      degree: 'B.Sc. in Computer Science and Engineering',
      period: '2022 – Expected 2027',
      score: 'CGPA: 3.14 / 4.00',
      coursework: [
        'Data Structures & Algorithms',
        'Database Systems',
        'Operating Systems',
        'Computer Networks',
        'Machine Learning',
        'Software Engineering',
      ],
    },
    {
      institution: 'Dhaka Imperial College',
      degree: 'Higher Secondary Certificate (HSC)',
      period: '2021',
      score: 'GPA: 5.00 / 5.00',
    },
    {
      institution: 'Motijheel Model High School and College',
      degree: 'Secondary School Certificate (SSC)',
      period: '2019',
      score: 'GPA: 4.63 / 5.00',
    },
  ] as EducationItem[],
  experience: [
    {
      role: 'Teaching Assistant',
      organization: 'United International University',
      period: '2024',
      type: 'Teaching',
      bullets: [
        'Assisted undergraduate students in Object-Oriented Programming (OOP) Lab and Structured Programming Language (SPL) Lab.',
        'Supported weekly lab sessions, debugging exercises, and algorithmic problem-solving.',
      ],
    },
    {
      role: 'Motivational Speaker & Peer Mentor',
      organization: 'Student Community & Project Teams',
      period: '2019 – 2025',
      type: 'Leadership',
      bullets: [
        'Supported teammates and peers through academic and project challenges, helping keep teams focused and on track.',
        'Encouraged and guided friends and juniors on study plans, career choices, and goal setting.',
      ],
    },
    {
      role: 'Class Captain',
      organization: 'School & College',
      period: 'Class 2 – HSC',
      type: 'Leadership',
      bullets: [
        'Led and represented classmates continuously from Class 2 through HSC, coordinating between students and teachers.',
      ],
    },
    {
      role: 'CV Development & Professional Skills Training',
      organization: 'Grameenphone Academy',
      period: '2025',
      type: 'Certification',
      bullets: [
        'Completed structured career readiness, professional communication, and technical CV development training.',
      ],
    },
  ] as ExperienceItem[],
  skillGroups: [
    {
      label: 'Languages',
      items: ['Python', 'Java', 'C', 'PHP', 'JavaScript', 'TypeScript', 'SQL', 'Bash', 'HTML'],
    },
    {
      label: 'AI / ML',
      items: [
        'Convolutional Neural Networks',
        'Retrieval-Augmented Generation (RAG)',
        'Hybrid Search (BM25 + Vector)',
        'Vision-Language Models',
        'LLM Integration',
        'TensorFlow',
      ],
    },
    {
      label: 'Frameworks & Databases',
      items: ['Spring Boot', 'Next.js', 'React', 'Phaser 3', 'WebSocket / STOMP', 'MySQL', 'PostgreSQL', 'Prisma'],
    },
    {
      label: 'Tools & Platforms',
      items: ['Git', 'Linux', 'VS Code', 'Jupyter Notebook', 'MatLab'],
    },
  ] as SkillGroup[],
  spokenLanguages: [
    { language: 'Bangla', level: 'Native' },
    { language: 'English', level: 'Professional working proficiency' },
  ],
  softSkills: [
    'Leadership & Teamwork',
    'Communication',
    'Problem Solving',
    'Time Management',
  ],
};
