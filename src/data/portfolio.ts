export interface SocialLink {
  name: string;
  label: string;
  url: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'scholar';
}

export interface ExperienceItem {
  company: string;
  role: string;
  domain: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
}

export interface PublicationItem {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  doi?: string;
  url?: string;
  type: 'Conference Paper' | 'Defensive Publication';
  summary?: string;
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  category: 'Open Source / LLM Infrastructure' | 'Distributed Systems' | 'Machine Learning & Software Systems' | 'Machine Learning & NLP' | 'Software Systems';
  description: string;
  tags: string[];
  repoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
}

export const portfolioData = {
  profile: {
    name: 'Devanshu Jain',
    title: 'Staff Software Engineer, Machine Learning',
    organization: 'Google Cloud',
    tagline:
      'Architecting high-throughput LLM inference systems on TPUs and large-scale deep learning recommendation engines.',
    location: 'Mountain View, CA',
    email: 'jndevanshu@gmail.com',
    resumeNotice: 'Resume available upon request.',
    bioParagraphs: [
      'I am a Staff Machine Learning Engineer at Google Cloud with 8 years of industry experience in recommendation systems and large-scale retrieval and ranking, currently focused on open-source LLM inference on TPUs.',
      'Outside of work, I am an avid smart home and IoT enthusiast who enjoys experimenting with all kinds of smart lighting setups at home. When I am unplugged, I love long-distance running and exploring the underwater world as an Advanced Open Water certified scuba diver.'
    ]
  },

  socials: [
    {
      name: 'LinkedIn',
      label: 'linkedin.com/in/jndevanshu',
      url: 'https://www.linkedin.com/in/jndevanshu/',
      handle: 'in/jndevanshu',
      icon: 'linkedin'
    },
    {
      name: 'GitHub',
      label: 'github.com/jndevanshu',
      url: 'https://github.com/jndevanshu',
      handle: '@jndevanshu',
      icon: 'github'
    },
    {
      name: 'Google Scholar',
      label: 'Google Scholar Profile',
      url: 'https://scholar.google.com/scholar?q=author%3A%22Devanshu+Jain%22',
      handle: 'Devanshu Jain',
      icon: 'scholar'
    }
  ] satisfies SocialLink[],

  experience: [
    {
      company: 'Google Cloud',
      role: 'Staff Software Engineer, Machine Learning',
      domain: 'Core ML — LLM Inference on TPUs',
      location: 'Mountain View, CA',
      period: 'June 2026 — Present',
      current: true,
      description:
        'Core contributor to the TPU-native KV-cache transfer and offloading library (tpu-sync) and the PyTorch-native TPU backend for SGLang.'
    },
    {
      company: 'YouTube',
      role: 'Staff Software Engineer, Machine Learning',
      domain: 'Growth — Recommendations Quality',
      location: 'San Bruno, CA',
      period: 'Aug 2018 — May 2026',
      description:
        'Tech Lead for YouTube Recommendations ML retrieval, architecting foundational long form Videos and Shorts recommendation models.'
    },
    {
      company: 'Uber',
      role: 'Software Engineer Intern',
      domain: 'Piper — Workflow Management System',
      location: 'San Francisco, CA',
      period: 'May 2017 — Aug 2017',
      description:
        'Improved the logging infrastructure of Piper (Uber\'s Apache Airflow fork) by migrating from MySQL to Cassandra and integrating Elasticsearch, eliminating database write contention and enabling fast, full-text log search at scale.'
    },
    {
      company: 'Amazon',
      role: 'Software Engineer Intern',
      domain: 'Value Added Services (VAS) — Amazon Home Services',
      location: 'Bengaluru, India',
      period: 'May 2015 — Jul 2015',
      description:
        'Enhanced the seller onboarding experience on the Value Added Services platform by delivering dynamic image transformation tools and custom map-based boundary management for localized service fulfillment.'
    }
  ] satisfies ExperienceItem[],

  publications: [
    {
      title: 'Space Efficient Item Embeddings for Large Recommender Systems',
      authors: ['T. D. Nguyen', 'D. Jain', 'M. Lawrence', 'S. Rendle', 'K. Su', 'A. Subbiah'],
      venue: 'ACM RecSys',
      year: '2026',
      doi: '10.1145/3773078.3831890',
      url: 'https://doi.org/10.1145/3773078.3831890',
      type: 'Conference Paper',
      summary: 'Novel parameter-efficient embedding representations enabling massive item vocabularies within strict accelerator memory budgets.'
    },
    {
      title: 'Distributed Serving of Partitioned Machine Learning Models Across Heterogeneous Hardware Resources',
      authors: ['V. Gatto', 'J. Li', 'C. Chen', 'H. Fu', 'B. Froehle', 'S. Hinsu', 'D. Jain', 'et al.'],
      venue: 'Technical Disclosure Commons (TD Commons)',
      year: '2025',
      url: 'https://www.tdcommons.org/',
      type: 'Defensive Publication',
      summary: 'System architecture for disaggregating and routing partitioned deep neural network submodels across heterogeneous CPU/GPU/TPU pools.'
    },
    {
      title: 'Off-Policy Actor-Critic for Recommender Systems',
      authors: ['M. Chen', 'C. Xu', 'V. Gatto', 'D. Jain', 'A. Kumar', 'E. Chi'],
      venue: 'ACM RecSys',
      year: '2022',
      doi: '10.1145/3523227.3546758',
      url: 'https://doi.org/10.1145/3523227.3546758',
      type: 'Conference Paper',
      summary: 'Production-scale reinforcement learning framework introducing a temporal-difference critic network to mitigate off-policy bias and optimize long-term user satisfaction.'
    },
    {
      title: 'Simple Features for Strong Performance on Named Entity Recognition in Code-Switched Twitter Data',
      authors: ['D. Jain', 'M. Kustikova', 'M. Darbari', 'R. Gupta', 'S. Mayhew'],
      venue: 'ACL (CALCS Workshop)',
      year: '2018',
      doi: '10.18653/v1/W18-3213',
      url: 'https://doi.org/10.18653/v1/W18-3213',
      type: 'Conference Paper',
      summary: 'Demonstrated strong named entity recognition baselines on noisy multilingual code-switched social media streams.'
    }
  ] satisfies PublicationItem[],

  projects: [
    {
      title: 'tpu-sync',
      subtitle: 'google/tpu-sync — TPU-Native KV Cache Transfer & Offloading',
      category: 'Open Source / LLM Infrastructure',
      description:
        'Core contributor to Google’s open-source C++ and Python library for high-performance Key-Value (KV) cache orchestration, multi-tiered memory management (HBM/DRAM), and zero-copy cross-node DMA data transfers on Google Cloud TPUs.',
      tags: ['C++', 'Python', 'Cloud TPU', 'KV-Cache', 'DMA / Zero-Copy', 'LLM Inference'],
      repoUrl: 'https://github.com/google/tpu-sync',
      featured: true
    },
    {
      title: 'sgl-project/sglang-torchtpu',
      subtitle: 'PyTorch-Native TPU Backend for SGLang',
      category: 'Open Source / LLM Infrastructure',
      description:
        'Core contributor to the PyTorch-native TPU backend and plugin for SGLang, enabling high-concurrency LLM and VLM serving on Google TPUs with unified KV-cache pooling, prefix caching, and disaggregated prefill/decode execution.',
      tags: ['PyTorch', 'SGLang', 'TorchTPU', 'XLA / Pallas', 'Prefix Caching'],
      repoUrl: 'https://github.com/sgl-project/sglang-torchtpu',
      featured: true
    },
    {
      title: 'private-cloud',
      subtitle: 'Distributed Fault-Tolerant Cloud Platform (PennCloud)',
      category: 'Distributed Systems',
      description:
        'Designed and implemented a fault-tolerant distributed cloud platform in C++ featuring a replicated key-value tablet datastore with master-node coordination, checkpointing, and write-ahead logging, backing load-balanced webmail and cloud drive services.',
      tags: ['C++', 'Distributed Systems', 'Fault Tolerance', 'Key-Value Store', 'Load Balancing'],
      repoUrl: 'https://github.com/jndevanshu/private-cloud'
    },
    {
      title: 'distributed-chat-system',
      subtitle: 'Replicated Multi-Node Multicast Chat Server',
      category: 'Distributed Systems',
      description:
        'Built a replicated distributed chat server in C++ supporting concurrent multi-room communication across nodes using UDP multicast, implementing unordered, FIFO, and total ordering message delivery protocols.',
      tags: ['C++', 'UDP Multicast', 'Total Ordering', 'FIFO', 'Distributed Protocols'],
      repoUrl: 'https://github.com/jndevanshu/distributed-chat-system'
    },
    {
      title: 'mail-server',
      subtitle: 'Multithreaded SMTP & POP3 Email Server',
      category: 'Distributed Systems',
      description:
        'Implemented an RFC-compliant multithreaded email server in C++ supporting SMTP and POP3 protocols, socket-level connection pooling, per-user mailbox synchronization, and full interoperability with Mozilla Thunderbird.',
      tags: ['C++', 'SMTP / POP3', 'Multithreading', 'Socket Programming', 'Systems'],
      repoUrl: 'https://github.com/jndevanshu/mail-server'
    },
    {
      title: 'text_simplification',
      subtitle: 'Deep Learning-Based Text Simplification',
      category: 'Machine Learning & NLP',
      description:
        'Built a neural text simplification pipeline using attentional bidirectional RNN sequence-to-sequence (Seq2Seq) models on the Newsela dataset, combining named entity anonymization, diverse beam-search clustering, and LSTM language model perplexity reranking evaluated with SARI and BLEU.',
      tags: ['Python', 'PyTorch', 'Seq2Seq / Attention', 'LSTM', 'NLP', 'Text Simplification'],
      repoUrl: 'https://github.com/jndevanshu/text_simplification'
    },
    {
      title: 'recommendation-system-for-adaptive-elearning',
      subtitle: 'Personalized Adaptive E-Learning Recommendation Engine',
      category: 'Machine Learning & Software Systems',
      description:
        'Developed an adaptive e-learning platform and recommendation engine using Python, Django, and Celery that dynamically personalizes educational content and learning pathways based on student proficiency and interaction telemetry.',
      tags: ['Python', 'Django', 'Celery', 'Recommender Systems', 'Adaptive Learning'],
      repoUrl: 'https://github.com/jndevanshu/recommendation-system-for-adaptive-elearning'
    },
    {
      title: 'clinic-management-system',
      subtitle: 'Healthcare & Clinic Workflow Management Application',
      category: 'Software Systems',
      description:
        'Engineered a clinic management application in Java and JavaFX backed by a relational database to manage patient records, doctor scheduling, medical consultations, and automated PDF prescription generation.',
      tags: ['Java', 'JavaFX', 'SQL', 'Healthcare Systems', 'Object-Oriented Design'],
      repoUrl: 'https://github.com/jndevanshu/clinic-management-system'
    }
  ] satisfies ProjectItem[],

  skills: [
    {
      category: 'Domain Focus',
      description: 'Core technical areas across production ML serving and large-scale retrieval.',
      skills: [
        'Machine Learning',
        'LLM Serving Infrastructure',
        'KV-Cache Optimization',
        'Large-Scale Retrieval and Ranking',
        'Reinforcement Learning',
      ]
    },
    {
      category: 'ML Frameworks & Compilers',
      description: 'Accelerator-native training and inference runtimes.',
      skills: [
        'PyTorch',
        'JAX',
        'TensorFlow',
        'SGLang',
        'vLLM',
        'XLA / TPU Optimizations',
      ]
    },
    {
      category: 'Distributed & Serving Systems',
      description: 'High-availability orchestration and disaggregated execution.',
      skills: [
        'Disaggregated Inference',
        'Kubernetes',
      ]
    },
    {
      category: 'Programming Languages',
      description: 'Systems and machine learning languages.',
      skills: ['C++', 'Python', 'C']
    }
  ] satisfies SkillCategory[],

  education: [
    {
      institution: 'University of Pennsylvania',
      degree: 'Master of Science in Engineering (M.S.E.)',
      field: 'Computer and Information Science',
      location: 'Philadelphia, PA, U.S.A.',
      period: 'Aug 2016 — May 2018'
    },
    {
      institution: 'Dhirubhai Ambani University (DA-IICT)',
      degree: 'Bachelor of Technology (B.Tech.)',
      field: 'Information and Communication Technology',
      location: 'Gujarat, India',
      period: 'Jul 2012 — May 2016'
    }
  ] satisfies EducationItem[]
};
