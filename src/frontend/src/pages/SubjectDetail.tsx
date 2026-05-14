import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetLearningProgress,
  useUpdateLearningProgress,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  Code2,
  Cpu,
  Database,
  Dumbbell,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ─── Types ─── */
interface NotesContent {
  easy: string;
  medium: string;
  advanced: string;
}
interface VideoEntry {
  title: string;
  duration: string;
  topic: string;
  thumbnail: string;
}
interface ExampleProblem {
  title: string;
  problem: string;
  steps: string[];
  answer: string;
}
interface Exercise {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  answer: string;
}
interface SummaryContent {
  points: string[];
  tips: string[];
  mistakes: string[];
}
interface SampleMCQ {
  question: string;
  options: string[];
  correctIndex: number;
}

interface SubjectData {
  name: string;
  displayName: string;
  icon: React.ElementType;
  color: string;
  gradientFrom: string;
  description: string;
  notes: NotesContent;
  videos: VideoEntry[];
  examples: ExampleProblem[];
  exercises: Exercise[];
  summary: SummaryContent;
  sampleMCQs: SampleMCQ[];
}

/* ─── Content Database ─── */
const SUBJECT_DATA: Record<string, SubjectData> = {
  aptitude: {
    name: "aptitude",
    displayName: "Aptitude",
    icon: Calculator,
    color: "text-[oklch(0.72_0.22_200)]",
    gradientFrom: "from-[oklch(0.72_0.22_200)]/20",
    description:
      "Master quantitative reasoning and logical thinking for placement tests",
    notes: {
      easy: `Aptitude tests evaluate your ability to reason with numbers and logic. Key areas:\n\n• Percentages: A percentage is a fraction with denominator 100. To find X% of Y: (X/100) × Y. Example: 20% of 500 = 100.\n\n• Ratios & Proportions: A ratio a:b means for every 'a' units of one, there are 'b' units of another. If ratio is 3:2 and total is 50, first part = (3/5)×50 = 30.\n\n• Averages: Average = Sum of all values ÷ Count. Weighted average = Σ(value × weight) / Σ(weights).\n\n• Profit & Loss: Profit % = (Profit/Cost Price) × 100. Loss % = (Loss/Cost Price) × 100. Selling Price = Cost Price + Profit.`,
      medium: `Intermediate aptitude concepts frequently tested in placements:\n\n• Time & Work: If A does a job in 'a' days and B in 'b' days, together they finish in (ab)/(a+b) days. Work = Rate × Time.\n\n• Time, Speed & Distance: Distance = Speed × Time. For trains: Relative speed when moving in same direction = |S1-S2|; opposite directions = S1+S2.\n\n• Permutations & Combinations: nPr = n!/(n-r)! | nCr = n!/[r!(n-r)!]. Rule: Use P when order matters (arrangements), C when order doesn't (selections).\n\n• Probability: P(E) = Favourable outcomes / Total outcomes. P(A∪B) = P(A) + P(B) - P(A∩B). Mutually exclusive: P(A∪B) = P(A)+P(B).`,
      advanced:
        "Advanced aptitude topics for top-tier placements (Google, Amazon, etc.):\n\n• Number Theory: LCM × HCF = Product of two numbers. Divisibility rules — for 9: digit sum divisible by 9; for 11: alternating digit sum difference divisible by 11.\n\n• Data Interpretation: Read bar/pie/line charts accurately. Calculate percentage change: [(New-Old)/Old] × 100. CAGR = [(End/Start)^(1/n)] - 1.\n\n• Sequences & Series: AP: Tn = a+(n-1)d, Sum = n/2[2a+(n-1)d]. GP: Tn = ar^(n-1), Sum = a(r^n - 1)/(r-1). Number series: identify the pattern (difference, ratio, prime, squares).\n\n• Clocks & Calendars: Minute hand moves 6°/min, hour hand 0.5°/min. Angle between hands at H:M = |30H - 5.5M|.",
    },
    videos: [
      {
        title: "Percentages & Ratios — Complete Placement Guide",
        duration: "38 min",
        topic: "Percentages & Ratios",
        thumbnail: "📊",
      },
      {
        title: "Time & Work Tricks for TCS, Infosys, Wipro",
        duration: "42 min",
        topic: "Time & Work",
        thumbnail: "⏱️",
      },
      {
        title: "Permutation, Combination & Probability — Full Concept",
        duration: "55 min",
        topic: "PnC & Probability",
        thumbnail: "🎲",
      },
    ],
    examples: [
      {
        title: "Profit & Loss — Classic Problem",
        problem:
          "A shopkeeper buys an article for ₹800 and sells it for ₹1000. Find the profit percentage.",
        steps: [
          "Cost Price (CP) = ₹800",
          "Selling Price (SP) = ₹1000",
          "Profit = SP - CP = ₹1000 - ₹800 = ₹200",
          "Profit % = (Profit / CP) × 100 = (200/800) × 100 = 25%",
        ],
        answer: "Profit percentage = 25%",
      },
      {
        title: "Time & Work — Two People",
        problem:
          "A can complete a task in 12 days, B in 18 days. How long do they take working together?",
        steps: [
          "A's one day work = 1/12",
          "B's one day work = 1/18",
          "Combined work = 1/12 + 1/18 = 3/36 + 2/36 = 5/36",
          "Time together = 36/5 = 7.2 days",
        ],
        answer: "7.2 days (7 days 4 hours 48 minutes)",
      },
      {
        title: "Probability — Card Drawing",
        problem:
          "A card is drawn from a standard 52-card deck. Find the probability of drawing a face card.",
        steps: [
          "Total cards = 52",
          "Face cards = Jack, Queen, King × 4 suits = 12",
          "P(face card) = 12/52 = 3/13",
        ],
        answer: "Probability = 3/13 ≈ 0.231",
      },
    ],
    exercises: [
      {
        question: "If 15% of a number is 45, what is 30% of that number?",
        difficulty: "Easy",
        answer: "30% of the number = 90. [15% = 45 → 100% = 300 → 30% = 90]",
      },
      {
        question:
          "A train 180m long passes a pole in 9 seconds. At the same speed, how long does it take to cross a 270m platform?",
        difficulty: "Medium",
        answer:
          "22.5 seconds. [Speed = 180/9 = 20 m/s. Distance = 180+270 = 450m. Time = 450/20 = 22.5s]",
      },
      {
        question:
          "In how many ways can 4 boys and 3 girls be arranged in a row such that all girls are always together?",
        difficulty: "Hard",
        answer: "720. [(4+1)! × 3! = 5! × 6 = 120 × 6 = 720]",
      },
      {
        question:
          "The average of 5 consecutive odd numbers is 31. Find the largest number.",
        difficulty: "Easy",
        answer: "35. [Numbers are 27,29,31,33,35]",
      },
      {
        question:
          "Two pipes A and B can fill a tank in 20 and 30 minutes. Pipe C can empty it in 15 minutes. All three open simultaneously — when will tank fill?",
        difficulty: "Hard",
        answer:
          "Never fills — net rate = 1/20+1/30-1/15 = 1/60 per minute, but C empties faster. Adjust: net = -1/60 (empties).",
      },
    ],
    summary: {
      points: [
        "Percentages, ratios, and proportions form 30-40% of aptitude tests",
        "Time & Work problems: always find individual rates first (work/day)",
        "Speed-Distance-Time: keep units consistent (km/hr or m/s)",
        "Probability: P(A) + P(A') = 1 always; use complementary counting",
        "Permutations use P (order matters), Combinations use C (order doesn't)",
        "Data Interpretation: read axes carefully, don't assume scales",
      ],
      tips: [
        "Practice mental math — companies like TCS allow no calculators",
        "Learn shortcut multiplication tables up to 20×20",
        "For percentages, memorize decimal equivalents (1/8 = 12.5%)",
        "Set 60-second time limits per question during practice",
      ],
      mistakes: [
        "Confusing percentage change with absolute change",
        "Forgetting to add the lengths of both objects when calculating crossing time",
        "Using Permutation instead of Combination for unordered selections",
        "Not checking units in speed-distance problems",
      ],
    },
    sampleMCQs: [
      {
        question: "If A:B = 2:3 and B:C = 4:5, then A:B:C equals?",
        options: ["8:12:15", "2:3:5", "4:6:5", "6:9:10"],
        correctIndex: 0,
      },
      {
        question:
          "What is the simple interest on ₹4000 at 8% per annum for 3 years?",
        options: ["₹960", "₹1280", "₹720", "₹860"],
        correctIndex: 0,
      },
      {
        question:
          "A number is increased by 25%, then decreased by 20%. Net change is?",
        options: ["0%", "+5%", "-5%", "+2%"],
        correctIndex: 0,
      },
    ],
  },

  dbms: {
    name: "dbms",
    displayName: "DBMS",
    icon: Database,
    color: "text-[oklch(0.68_0.20_262)]",
    gradientFrom: "from-[oklch(0.68_0.20_262)]/20",
    description:
      "Database concepts essential for technical interviews and placements",
    notes: {
      easy: "Databases store and organize data. A DBMS (Database Management System) allows users to create, read, update, and delete data efficiently.\n\nKey concepts:\n• Tables (Entities): Represent a collection of related data. E.g., Students table.\n• Rows (Records/Tuples): Each row represents one instance of the entity.\n• Columns (Attributes): Properties of the entity — e.g., Name, Age, RollNo.\n• Primary Key: A unique identifier for each row. Cannot be NULL. E.g., RollNo.\n• Foreign Key: A column that references the Primary Key of another table. Creates a relationship between tables.\n• SQL: Structured Query Language used to interact with databases. Basic commands: SELECT, INSERT, UPDATE, DELETE.",
      medium:
        "Normalization and advanced SQL concepts:\n\nNormalization eliminates redundancy and dependency anomalies:\n• 1NF (First Normal Form): Atomic values only, no repeating groups, each column has unique name.\n• 2NF: Must be in 1NF + every non-key attribute fully dependent on entire primary key (removes partial dependencies).\n• 3NF: Must be in 2NF + no transitive dependencies (non-key attribute depending on another non-key attribute).\n• BCNF: Stricter 3NF — every determinant must be a candidate key.\n\nJoins: INNER JOIN returns matching rows from both tables. LEFT JOIN returns all rows from left + matching from right. RIGHT JOIN is the reverse. FULL JOIN returns all rows from both tables.\n\nIndexing: B-tree index improves SELECT speed but slows INSERT/UPDATE. Clustered index physically orders rows; only one per table.",
      advanced: `ACID properties ensure database reliability:\n• Atomicity: Transaction is all-or-nothing (COMMIT or ROLLBACK).\n• Consistency: Every transaction takes DB from one valid state to another.\n• Isolation: Concurrent transactions don't interfere (levels: READ UNCOMMITTED → SERIALIZABLE).\n• Durability: Once committed, data survives crashes (implemented via WAL — Write-Ahead Logging).\n\nConcurrency Problems: Dirty Read, Non-Repeatable Read, Phantom Read — solved by higher isolation levels.\n\nTwo-Phase Locking (2PL): Growing phase (acquire locks), Shrinking phase (release locks). Ensures serializability.\n\nDistributed Transactions: Two-Phase Commit (2PC) protocol — Phase 1 (Prepare): Coordinator asks all nodes to vote. Phase 2 (Commit/Abort): Commit if all vote Yes, else Abort.\n\nCAP Theorem (for distributed DBs): Cannot guarantee Consistency, Availability, and Partition Tolerance simultaneously.`,
    },
    videos: [
      {
        title: "DBMS Fundamentals — ER Diagrams, Normalization & SQL",
        duration: "52 min",
        topic: "Fundamentals",
        thumbnail: "🗄️",
      },
      {
        title: "SQL Joins Explained with Real Examples",
        duration: "35 min",
        topic: "SQL Joins",
        thumbnail: "🔗",
      },
      {
        title: "ACID Properties & Transaction Management",
        duration: "40 min",
        topic: "Transactions",
        thumbnail: "⚡",
      },
    ],
    examples: [
      {
        title: "Normalization — Removing Redundancy",
        problem:
          "Table: StudentCourses(StudentID, StudentName, CourseID, CourseName, Grade). Normalize to 3NF.",
        steps: [
          "Identify functional dependencies: StudentID→StudentName, CourseID→CourseName, (StudentID,CourseID)→Grade",
          "1NF: Already atomic values — ✓",
          "2NF: StudentName depends only on StudentID (partial dependency) → Separate. CourseName depends only on CourseID → Separate.",
          "Create: Students(StudentID,StudentName), Courses(CourseID,CourseName), Enrollments(StudentID,CourseID,Grade)",
          "3NF: Check transitive dependencies — none remain → 3NF achieved ✓",
        ],
        answer:
          "Three tables: Students, Courses, Enrollments — fully normalized to 3NF",
      },
      {
        title: "SQL JOIN Query",
        problem:
          "Find all students and their enrolled courses (include students with no courses).",
        steps: [
          "Use LEFT JOIN to include students with no courses",
          "SELECT s.Name, c.CourseName",
          "FROM Students s",
          "LEFT JOIN Enrollments e ON s.StudentID = e.StudentID",
          "LEFT JOIN Courses c ON e.CourseID = c.CourseID",
        ],
        answer:
          "LEFT JOIN returns all students; NULL for CourseName if not enrolled",
      },
    ],
    exercises: [
      {
        question: "What anomaly does 2NF solve?",
        difficulty: "Easy",
        answer:
          "Partial dependency anomaly — where a non-key attribute depends on only part of a composite primary key.",
      },
      {
        question:
          "Write a SQL query to find the second highest salary from an Employee table.",
        difficulty: "Medium",
        answer:
          "SELECT MAX(Salary) FROM Employee WHERE Salary < (SELECT MAX(Salary) FROM Employee); — or use DENSE_RANK().",
      },
      {
        question: "Explain the difference between DELETE, TRUNCATE, and DROP.",
        difficulty: "Medium",
        answer:
          "DELETE: Removes specific rows, supports WHERE, logged, can rollback. TRUNCATE: Removes all rows, faster, minimal logging, cannot rollback easily. DROP: Removes entire table structure and data.",
      },
      {
        question: "What is a deadlock in DBMS? How is it prevented?",
        difficulty: "Hard",
        answer:
          "Deadlock: Two transactions each waiting for locks held by the other. Prevention: Wait-Die (older waits, younger dies) or Wound-Wait scheme. Detection + Recovery via timeout or deadlock detection algorithm.",
      },
      {
        question: "What is denormalization and when is it used?",
        difficulty: "Hard",
        answer:
          "Deliberately introducing redundancy for performance. Used in OLAP/data warehouse scenarios where read speed > write consistency. Trade-off: faster reads, slower writes, possible update anomalies.",
      },
    ],
    summary: {
      points: [
        "Primary Key = unique + not null; Foreign Key = references another table's PK",
        "1NF→2NF: Remove partial dependencies; 2NF→3NF: Remove transitive dependencies",
        "INNER JOIN: only matching rows; LEFT JOIN: all left + matching right",
        "ACID guarantees are the foundation of reliable database transactions",
        "Indexes speed up reads but slow down writes — use selectively",
        "CAP Theorem: distributed systems can only guarantee 2 of 3 properties",
      ],
      tips: [
        "Always explain normalization with an example in interviews",
        "Know all 4 JOIN types and be able to draw Venn diagrams for them",
        "Practice writing complex SQL queries with GROUP BY, HAVING, subqueries",
        "Be able to explain ACID with real-world transaction examples",
      ],
      mistakes: [
        "Confusing DELETE (DML) with DROP (DDL)",
        "Forgetting that TRUNCATE cannot be rolled back in most DBs",
        "Thinking clustered and non-clustered index are the same",
        "Confusing isolation levels and which anomalies they prevent",
      ],
    },
    sampleMCQs: [
      {
        question: "Which normal form removes transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctIndex: 2,
      },
      {
        question: "Which JOIN returns only matching records from both tables?",
        options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
        correctIndex: 2,
      },
      {
        question: "The 'D' in ACID stands for?",
        options: ["Data integrity", "Durability", "Dependency", "Distribution"],
        correctIndex: 1,
      },
    ],
  },

  oops: {
    name: "oops",
    displayName: "OOPS",
    icon: Code2,
    color: "text-[oklch(0.72_0.18_145)]",
    gradientFrom: "from-[oklch(0.72_0.18_145)]/20",
    description: "Object-oriented programming principles for technical rounds",
    notes: {
      easy: `Object-Oriented Programming (OOP) models real-world entities as objects with state and behavior.\n\n4 Core Pillars:\n• Encapsulation: Bundling data (fields) and methods (behavior) into a class, and hiding internal details. Achieved via private/protected access modifiers + getter/setter methods.\n• Inheritance: A class (child) can acquire properties and methods of another class (parent) using 'extends'. Promotes code reuse. E.g., Dog extends Animal.\n• Polymorphism: One interface, multiple implementations. Method Overloading (compile-time): same method name, different parameters. Method Overriding (runtime): child class redefines parent method.\n• Abstraction: Hiding implementation details and showing only functionality. Achieved via abstract classes and interfaces.`,
      medium: `Design Patterns & SOLID Principles:\n\nSOLID Principles:\n• S — Single Responsibility: A class should have only one reason to change.\n• O — Open/Closed: Open for extension, closed for modification (use interfaces/abstract classes).\n• L — Liskov Substitution: Subclass should be substitutable for parent without breaking program.\n• I — Interface Segregation: Many specific interfaces better than one general interface.\n• D — Dependency Inversion: High-level modules shouldn't depend on low-level modules; both depend on abstractions.\n\nCommon Design Patterns:\n• Singleton: Only one instance of a class. Thread-safe via double-checked locking or enum.\n• Factory: Create objects without specifying exact class. Decouples object creation.\n• Observer: One-to-many dependency; observers notified when subject changes (Event listeners, MVC pattern).`,
      advanced: `Advanced OOP — Interfaces, Generics & Composition:\n\nInterface vs Abstract Class:\n• Interface: 100% abstract (pre-Java 8), multiple inheritance supported, all methods public by default.\n• Abstract Class: Can have concrete methods, single inheritance, can have constructors.\nRule of thumb: Use interface for "can do" (Flyable, Serializable); abstract class for "is a" hierarchy.\n\nGenerics: Type-safe containers. List<T> ensures compile-time type checking. Bounded wildcards: <? extends T> for reading (producer), <? super T> for writing (consumer) — PECS principle.\n\nComposition vs Inheritance: "Favor composition over inheritance" — HAS-A relationship is more flexible than IS-A. Avoids fragile base class problem and diamond problem.\n\nDecorator Pattern: Attaches additional responsibilities dynamically. E.g., Java I/O streams — BufferedReader wraps FileReader.\n\nDependency Injection: Objects receive dependencies from outside rather than creating them. Enables easy unit testing and loose coupling. Frameworks: Spring (Java), Angular (TS).`,
    },
    videos: [
      {
        title: "OOP Concepts — Encapsulation, Inheritance, Polymorphism",
        duration: "48 min",
        topic: "Core Pillars",
        thumbnail: "🧩",
      },
      {
        title: "SOLID Principles with Java Examples",
        duration: "44 min",
        topic: "SOLID",
        thumbnail: "🏗️",
      },
      {
        title: "Design Patterns — Singleton, Factory, Observer, Decorator",
        duration: "60 min",
        topic: "Design Patterns",
        thumbnail: "🎨",
      },
    ],
    examples: [
      {
        title: "Polymorphism — Runtime vs Compile Time",
        problem:
          "Show the difference between method overloading and method overriding in Java.",
        steps: [
          "Overloading (compile-time): same class, same method name, different params — add(int,int), add(double,double)",
          "Overriding (runtime): child class redefines parent method — Animal.speak() vs Dog.speak()",
          "Binding: overloading uses static binding (resolved at compile time), overriding uses dynamic dispatch (resolved at runtime via vtable)",
          "Key rule: @Override annotation catches overriding mistakes at compile time",
        ],
        answer:
          "Overloading = same class, different signatures. Overriding = different classes, same signature.",
      },
      {
        title: "Singleton Pattern",
        problem: "Implement a thread-safe Singleton in Java.",
        steps: [
          "private static volatile DatabaseConnection instance;",
          "private constructor to prevent external instantiation",
          "public static synchronized getInstance() { if(instance==null) instance = new DatabaseConnection(); return instance; }",
          "Better: use enum Singleton — guarantees single instance even with reflection & serialization",
        ],
        answer:
          "Thread-safe Singleton via double-checked locking or enum (preferred)",
      },
    ],
    exercises: [
      {
        question:
          "What is the difference between abstract class and interface in Java 8+?",
        difficulty: "Medium",
        answer:
          "Abstract class: can have state (fields), constructors, concrete/abstract methods, single inheritance. Interface: no state (only constants), no constructors, default/static methods allowed (Java 8+), multiple inheritance supported.",
      },
      {
        question: "Explain the 'O' in SOLID with an example.",
        difficulty: "Medium",
        answer:
          "Open/Closed Principle: A class is open for extension but closed for modification. Example: Instead of modifying a Shape class for each new shape, create a Shape interface with area() method and implement it in Circle, Rectangle, etc.",
      },
      {
        question: "What is the diamond problem and how does Java solve it?",
        difficulty: "Hard",
        answer:
          "Diamond problem: Class D inherits from B and C, both inherit from A. Which A method does D get? Java solves it by not allowing multiple class inheritance; interfaces with default methods require explicit override.",
      },
      {
        question: "When would you choose composition over inheritance?",
        difficulty: "Hard",
        answer:
          "When the relationship is HAS-A not IS-A; when you want to reuse behavior without exposing the full API; when the parent class may change; to avoid fragile base class problem. Rule: prefer composition as default.",
      },
      {
        question: "What is method hiding vs method overriding?",
        difficulty: "Medium",
        answer:
          "Overriding: instance methods — dynamic dispatch based on actual object type. Hiding: static methods — compile-time resolution based on reference type. Static methods cannot be overridden, only hidden.",
      },
    ],
    summary: {
      points: [
        "4 OOP pillars: Encapsulation, Inheritance, Polymorphism, Abstraction",
        "SOLID = S(ingle), O(pen-closed), L(iskov), I(nterface segregation), D(ependency inversion)",
        "Overloading = compile-time polymorphism; Overriding = runtime polymorphism",
        "Interface: multiple inheritance, no state. Abstract: single inheritance, can have state",
        "Composition over inheritance — favor HAS-A over IS-A",
        "Dependency Injection enables loose coupling and testability",
      ],
      tips: [
        "Always relate SOLID to real code examples in interviews",
        "Know when to use Factory vs Abstract Factory vs Builder patterns",
        "Practice whiteboard coding for Singleton, Observer, Strategy patterns",
        "Be ready to explain dynamic dispatch and vtable mechanism",
      ],
      mistakes: [
        "Thinking overloading is 'runtime polymorphism' — it's compile-time",
        "Using inheritance when composition is more appropriate",
        "Confusing interface and abstract class — especially post Java 8",
        "Forgetting that static methods are hidden, not overridden",
      ],
    },
    sampleMCQs: [
      {
        question: "Which OOP concept hides internal implementation details?",
        options: [
          "Inheritance",
          "Encapsulation",
          "Polymorphism",
          "Abstraction",
        ],
        correctIndex: 3,
      },
      {
        question: "Method overriding represents which type of polymorphism?",
        options: ["Compile-time", "Runtime", "Static", "Ad-hoc"],
        correctIndex: 1,
      },
      {
        question:
          "Which SOLID principle says a class should have only one reason to change?",
        options: [
          "Open/Closed",
          "Liskov Substitution",
          "Single Responsibility",
          "Interface Segregation",
        ],
        correctIndex: 2,
      },
    ],
  },

  "system-design": {
    name: "system-design",
    displayName: "System Design",
    icon: Layers,
    color: "text-[oklch(0.75_0.16_85)]",
    gradientFrom: "from-[oklch(0.75_0.16_85)]/20",
    description: "High-level system architecture for senior-level interviews",
    notes: {
      easy: "System Design is about designing scalable, reliable, and maintainable systems. Key concepts:\n\n• Scalability: Ability to handle increasing load. Vertical scaling (bigger server) vs Horizontal scaling (more servers).\n• Load Balancing: Distribute incoming traffic across multiple servers. Algorithms: Round Robin, Least Connections, IP Hash. Tools: Nginx, AWS ALB, HAProxy.\n• Caching: Store frequently accessed data in fast storage (memory). Cache hit = data found; cache miss = must fetch from DB. Cache strategies: Cache-aside, Write-through, Write-back.\n• CDN (Content Delivery Network): Serves static assets (images, JS, CSS) from servers geographically close to users. Reduces latency.",
      medium:
        "Distributed systems fundamentals:\n\nCAP Theorem: A distributed system can guarantee at most 2 of: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network splits). Since network partitions always occur in practice, you choose CP (Zookeeper, HBase) or AP (Cassandra, DynamoDB).\n\nMicroservices Architecture: Application split into small, independently deployable services. Benefits: independent scaling, technology diversity, team autonomy. Challenges: network latency, distributed transactions, service discovery.\n\nMessage Queues: Asynchronous communication between services. RabbitMQ, Apache Kafka. Use cases: event streaming, decoupling producers/consumers, background jobs.\n\nDatabase Sharding: Horizontal partitioning of data across multiple databases. Shard key selection is critical. Consistent hashing minimizes resharding impact.",
      advanced:
        "Advanced distributed systems design:\n\nConsistency Models: Strong Consistency (read always reflects latest write). Eventual Consistency (replicas converge over time). Causal Consistency (causally related operations seen in order).\n\nSaga Pattern: Manages distributed transactions without 2PC. Choreography: services react to events. Orchestration: central saga coordinator.\n\nCircuit Breaker Pattern: Prevents cascading failures. States: Closed (normal) → Open (failing, fast-fail) → Half-Open (testing recovery). Libraries: Hystrix, Resilience4j.\n\nRate Limiting: Token Bucket (allows bursts), Leaky Bucket (smooth output), Fixed Window, Sliding Window algorithms.\n\nConsistent Hashing: Maps servers and keys to a ring. Adding/removing servers only affects neighboring keys — O(K/N) keys moved (K=keys, N=nodes).\n\nBack-of-envelope estimation: Clarify requirements → Estimate scale (DAU, QPS, Storage) → Identify bottlenecks → Design + trade-offs.",
    },
    videos: [
      {
        title: "System Design Fundamentals — Load Balancer, Cache, CDN",
        duration: "58 min",
        topic: "Fundamentals",
        thumbnail: "🏛️",
      },
      {
        title: "Design Twitter/URL Shortener — Full Interview Walkthrough",
        duration: "65 min",
        topic: "Case Studies",
        thumbnail: "🐦",
      },
      {
        title: "Microservices vs Monolith — When to Use Which",
        duration: "45 min",
        topic: "Microservices",
        thumbnail: "⚙️",
      },
    ],
    examples: [
      {
        title: "Design a URL Shortener (bit.ly)",
        problem:
          "Design a URL shortening service that handles 100M URLs/day, with 5-year storage.",
        steps: [
          "Estimates: 100M/day ≈ 1200 writes/sec; 10:1 read/write ratio = 12,000 reads/sec",
          "Storage: avg URL 100 bytes → 100M × 100B = 10GB/day → 18TB/5years",
          "Shorten: Base62 encoding of auto-increment ID → 6 chars = 62^6 ≈ 56B unique URLs",
          "Architecture: API servers → Redis cache (hot URLs) → NoSQL DB (DynamoDB for scale)",
          "Cache: 20% hot URLs serve 80% traffic (Pareto principle). Cache TTL = 24 hours.",
        ],
        answer:
          "Horizontally scalable API + Redis cache + NoSQL DB + Base62 encoding",
      },
      {
        title: "Load Balancer Algorithms",
        problem:
          "When would you choose IP Hash load balancing over Round Robin?",
        steps: [
          "Round Robin: Distributes evenly, good for stateless services",
          "IP Hash: Maps client IP to specific server, provides session affinity (sticky sessions)",
          "Use IP Hash when: sessions stored server-side, WebSocket connections, stateful services",
          "Better solution: Use stateless auth (JWT) + Round Robin + centralized session store (Redis)",
        ],
        answer:
          "Use IP Hash for stateful sessions, but prefer stateless design + Round Robin",
      },
    ],
    exercises: [
      {
        question:
          "What is the difference between horizontal and vertical scaling?",
        difficulty: "Easy",
        answer:
          "Vertical (scale-up): Add more CPU/RAM to one server. Limited by hardware ceiling. Horizontal (scale-out): Add more servers. Nearly unlimited scalability, requires load balancer.",
      },
      {
        question: "Explain the CAP theorem with a practical example.",
        difficulty: "Medium",
        answer:
          "CP system (e.g., Zookeeper): Prioritizes consistency over availability — returns error when partition occurs. AP system (e.g., Cassandra): Prioritizes availability — may return stale data. Banks → CP. Social media → AP.",
      },
      {
        question: "When would you use a message queue like Kafka?",
        difficulty: "Medium",
        answer:
          "Async processing (email sending, notifications), event streaming, decoupling microservices, handling traffic spikes (queue absorbs bursts), audit logs, and real-time analytics pipelines.",
      },
      {
        question: "Design the data model for a Twitter-like feed system.",
        difficulty: "Hard",
        answer:
          "Push model: On tweet, write to all followers' feeds (fanout on write). Good for reads. Bad for users with many followers. Pull model: On read, fetch from followed users' timelines. Good for celebrities. Hybrid: push for most users, pull for celebrities.",
      },
      {
        question: "What is consistent hashing and why is it used?",
        difficulty: "Hard",
        answer:
          "Maps both servers and keys to a hash ring. When a server is added/removed, only its immediate neighbors' keys are redistributed — O(K/N) instead of O(K). Used in distributed caches (Redis Cluster, Memcached) and DHTs.",
      },
    ],
    summary: {
      points: [
        "Horizontal scaling + load balancing = core of any scalable system",
        "CAP Theorem: choose 2 of Consistency, Availability, Partition Tolerance",
        "Caching reduces DB load — 20% of data serves 80% of traffic",
        "Microservices: independent deployment, but complex distributed transactions",
        "Message queues decouple systems and absorb traffic spikes",
        "Database sharding: spread data across nodes; choose shard key carefully",
      ],
      tips: [
        "Always start with requirements clarification in system design interviews",
        "Draw the architecture diagram — visualize data flow",
        "Discuss trade-offs explicitly — no perfect solution exists",
        "Back-of-envelope calculation shows analytical thinking",
      ],
      mistakes: [
        "Jumping to solution without clarifying requirements and scale",
        "Over-engineering — starting with microservices for small scale",
        "Forgetting to discuss failure scenarios and recovery",
        "Not mentioning monitoring, alerting, and observability",
      ],
    },
    sampleMCQs: [
      {
        question:
          "Which algorithm minimizes key movement when nodes are added/removed?",
        options: [
          "Round Robin",
          "Consistent Hashing",
          "Random",
          "Least Connections",
        ],
        correctIndex: 1,
      },
      {
        question: "Cassandra is an example of which CAP combination?",
        options: ["CP", "CA", "AP", "All three"],
        correctIndex: 2,
      },
      {
        question: "What pattern prevents cascading failures in microservices?",
        options: ["Singleton", "Circuit Breaker", "Decorator", "Observer"],
        correctIndex: 1,
      },
    ],
  },

  "technical-mcqs": {
    name: "technical-mcqs",
    displayName: "Technical MCQs",
    icon: Cpu,
    color: "text-[oklch(0.65_0.22_25)]",
    gradientFrom: "from-[oklch(0.65_0.22_25)]/20",
    description:
      "Core CS fundamentals: algorithms, data structures, OS, networking",
    notes: {
      easy: "Core Computer Science fundamentals every software engineer must know:\n\nData Structures:\n• Array: Fixed size, O(1) random access, O(n) insert/delete. Best for indexed access.\n• Linked List: Dynamic size, O(n) access, O(1) insert/delete at head. Best for frequent insert/delete.\n• Stack: LIFO (Last In, First Out). Operations: push(), pop(), peek(). Use: function call stack, undo operations.\n• Queue: FIFO (First In, First Out). Operations: enqueue(), dequeue(). Use: BFS, job scheduling.\n• HashMap/HashTable: O(1) average for get/put. Collision handling: Chaining or Open Addressing.",
      medium:
        "Intermediate DSA and OS concepts:\n\nSorting Algorithms:\n• Merge Sort: O(n log n) always, stable, O(n) space. Divide and conquer.\n• Quick Sort: O(n log n) average, O(n²) worst, O(log n) space (in-place). Pivot selection matters.\n• Heap Sort: O(n log n) always, O(1) space, not stable.\n• For interviews: know which is stable (Merge, Bubble, Insertion) vs not.\n\nTrees:\n• BST: Left < Root < Right. O(log n) search/insert in balanced tree, O(n) worst.\n• AVL Tree: Self-balancing BST, height difference ≤ 1. O(log n) guaranteed.\n• B-Tree: Used in databases — nodes have multiple keys, keeps tree short and wide.\n\nOS Scheduling: FCFS, SJF (Shortest Job First), Round Robin (time quantum), Priority Scheduling.",
      advanced: `Advanced algorithms and systems:\n\nGraph Algorithms:\n• BFS: Level-order traversal, shortest path in unweighted graph, O(V+E).\n• DFS: Topological sort, cycle detection, connected components, O(V+E).\n• Dijkstra's: Shortest path with non-negative weights. O((V+E)log V) with priority queue.\n• Bellman-Ford: Handles negative weights, detects negative cycles. O(VE).\n• Kruskal's/Prim's: Minimum Spanning Tree. Kruskal = edge-based (Union-Find), Prim = vertex-based.\n\nDynamic Programming:\nMemoization (top-down) vs Tabulation (bottom-up). State: current position + remaining choices. Recurrence relation: T(n) = T(n-1) + T(n-2) for Fibonacci.\n\nOS Concepts: Deadlock (mutual exclusion, hold-and-wait, no preemption, circular wait) — prevent by eliminating one condition. Virtual Memory: page tables, TLB, page replacement algorithms (LRU, FIFO, Optimal).\n\nNetworking: OSI 7 layers. TCP vs UDP. HTTP/HTTPS. DNS resolution. Load balancer algorithms. CDN.`,
    },
    videos: [
      {
        title: "Data Structures — Arrays, Trees, Graphs with Code",
        duration: "70 min",
        topic: "Data Structures",
        thumbnail: "🌲",
      },
      {
        title: "Sorting & Searching Algorithms — Visual Explanation",
        duration: "50 min",
        topic: "Algorithms",
        thumbnail: "🔢",
      },
      {
        title: "OS & Networking — Must Know for Placements",
        duration: "55 min",
        topic: "OS & Networking",
        thumbnail: "🖥️",
      },
    ],
    examples: [
      {
        title: "Binary Search — Iterative Implementation",
        problem:
          "Implement binary search on a sorted array and find index of target, or return -1.",
        steps: [
          "Initialize left=0, right=arr.length-1",
          "While left <= right: mid = left + (right-left)/2",
          "If arr[mid] == target: return mid",
          "If arr[mid] < target: left = mid+1 (search right half)",
          "If arr[mid] > target: right = mid-1 (search left half)",
          "If loop exits: return -1 (not found)",
        ],
        answer:
          "O(log n) time, O(1) space — most efficient search on sorted arrays",
      },
      {
        title: "Dynamic Programming — Longest Common Subsequence",
        problem:
          "Find the length of the longest common subsequence of strings 'ABCBDAB' and 'BDCABA'.",
        steps: [
          "Create dp[m+1][n+1] matrix (m,n = string lengths)",
          "Base case: dp[0][j]=0, dp[i][0]=0 (empty string)",
          "If chars match: dp[i][j] = dp[i-1][j-1] + 1",
          "If not match: dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
          "Answer at dp[m][n]",
        ],
        answer: "LCS length = 4 (BCBA or BDAB). O(mn) time and space.",
      },
    ],
    exercises: [
      {
        question:
          "What is the time complexity of inserting into a balanced BST?",
        difficulty: "Easy",
        answer:
          "O(log n) — height of balanced BST is log n. In worst case (unbalanced/degenerate), it becomes O(n).",
      },
      {
        question:
          "Explain the difference between BFS and DFS. When would you use each?",
        difficulty: "Medium",
        answer:
          "BFS: Uses queue, explores level-by-level, finds shortest path in unweighted graphs. DFS: Uses stack/recursion, explores as deep as possible, good for topological sort, cycle detection, path existence.",
      },
      {
        question: "What are the four conditions for a deadlock?",
        difficulty: "Medium",
        answer:
          "1. Mutual Exclusion: Resource held exclusively. 2. Hold and Wait: Process holds resource while waiting. 3. No Preemption: Resources not forcibly taken. 4. Circular Wait: Chain of processes each waiting for next.",
      },
      {
        question: "What is the difference between process and thread?",
        difficulty: "Easy",
        answer:
          "Process: Independent execution unit with its own memory space. Thread: Lightweight unit within a process, shares memory with other threads. Threads communicate via shared memory; processes via IPC (pipes, sockets).",
      },
      {
        question: "Explain cache coherence and how MESI protocol solves it.",
        difficulty: "Hard",
        answer:
          "Cache coherence: Multiple CPU caches must agree on values. MESI states: Modified (dirty, exclusive), Exclusive (clean, exclusive), Shared (multiple caches), Invalid (stale). State transitions ensure consistency on reads/writes.",
      },
    ],
    summary: {
      points: [
        "Know Big-O for all standard data structures and sorting algorithms",
        "BFS = shortest path (unweighted), DFS = topological sort, cycle detection",
        "Deadlock conditions: Mutual Exclusion, Hold-and-Wait, No Preemption, Circular Wait",
        "TCP = reliable, ordered, connection-oriented; UDP = fast, unreliable, connectionless",
        "Virtual memory allows processes to use more memory than physically available",
        "Dynamic programming = recursion + memoization — identify overlapping subproblems",
      ],
      tips: [
        "Master Merge Sort and Quick Sort — always asked in interviews",
        "Practice graph problems: BFS/DFS, shortest path, minimum spanning tree",
        "Know the OSI layers: Physical, Data Link, Network, Transport, Session, Presentation, Application",
        "Understand TCP three-way handshake: SYN → SYN-ACK → ACK",
      ],
      mistakes: [
        "Forgetting to handle edge cases: empty arrays, single elements, cycles in graphs",
        "Confusing stability of sorting algorithms (Quick Sort is NOT stable)",
        "Mixing up stack (DFS) and queue (BFS) usage",
        "Thinking O(n log n) is always better than O(n²) for small inputs",
      ],
    },
    sampleMCQs: [
      {
        question: "Which data structure does BFS use?",
        options: ["Stack", "Queue", "Heap", "Tree"],
        correctIndex: 1,
      },
      {
        question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correctIndex: 2,
      },
      {
        question:
          "Which sorting algorithm is always O(n log n) regardless of input?",
        options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
        correctIndex: 2,
      },
    ],
  },
};

/* ─── Small Components ─── */
function DifficultyBadge({ level }: { level: "Easy" | "Medium" | "Hard" }) {
  return (
    <span
      className={cn(
        "text-[10px] px-1.5 py-0.5 rounded font-medium",
        level === "Easy" &&
          "bg-[oklch(0.72_0.18_145)]/15 text-[oklch(0.72_0.18_145)]",
        level === "Medium" &&
          "bg-[oklch(0.75_0.16_85)]/15 text-[oklch(0.75_0.16_85)]",
        level === "Hard" &&
          "bg-[oklch(0.65_0.22_25)]/15 text-[oklch(0.65_0.22_25)]",
      )}
    >
      {level}
    </span>
  );
}

function NoteBlock({ content }: { content: string }) {
  return (
    <div className="glass-card p-4 text-sm text-foreground leading-relaxed whitespace-pre-line font-mono text-xs">
      {content}
    </div>
  );
}

function ExampleCard({
  example,
  index,
}: { example: ExampleProblem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-smooth"
        onClick={() => setExpanded((v) => !v)}
        data-ocid={`subject.example.${index + 1}`}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <span className="font-medium text-sm text-foreground">
            {example.title}
          </span>
        </div>
        {expanded ? (
          <ChevronUp
            size={16}
            className="text-muted-foreground flex-shrink-0"
          />
        ) : (
          <ChevronDown
            size={16}
            className="text-muted-foreground flex-shrink-0"
          />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-border">
          <div className="pt-3">
            <p className="text-sm font-medium text-foreground mb-2">Problem:</p>
            <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
              {example.problem}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Step-by-step Solution:
            </p>
            <ol className="space-y-1.5">
              {example.steps.map((step) => (
                <li
                  key={step}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <span className="text-primary font-bold mt-0.5 flex-shrink-0">
                    {example.steps.indexOf(step) + 1}.
                  </span>
                  <span className="font-mono">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex items-start gap-2 bg-[oklch(0.72_0.18_145)]/10 border border-[oklch(0.72_0.18_145)]/20 rounded-lg p-3">
            <Lightbulb
              size={14}
              className="text-[oklch(0.72_0.18_145)] mt-0.5 flex-shrink-0"
            />
            <p className="text-xs text-foreground">{example.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ExerciseCard({
  exercise,
  index,
}: { exercise: Exercise; index: number }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0">
            {index + 1}
          </span>
          <p className="text-sm text-foreground leading-relaxed">
            {exercise.question}
          </p>
        </div>
        <DifficultyBadge level={exercise.difficulty} />
      </div>
      {revealed ? (
        <div className="flex items-start gap-2 bg-[oklch(0.72_0.18_145)]/10 border border-[oklch(0.72_0.18_145)]/20 rounded-lg p-3 animate-slide-up">
          <Lightbulb
            size={13}
            className="text-[oklch(0.72_0.18_145)] mt-0.5 flex-shrink-0"
          />
          <p className="text-xs text-foreground">{exercise.answer}</p>
        </div>
      ) : null}
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="h-7 text-xs"
        onClick={() => setRevealed((v) => !v)}
        data-ocid={`subject.exercise_answer.${index + 1}`}
      >
        {revealed ? (
          <>
            <EyeOff size={12} className="mr-1" />
            Hide Answer
          </>
        ) : (
          <>
            <Eye size={12} className="mr-1" />
            Show Answer
          </>
        )}
      </Button>
    </div>
  );
}

function VideoCard({ video, index }: { video: VideoEntry; index: number }) {
  return (
    <div
      className="glass-card overflow-hidden flex flex-col sm:flex-row gap-0"
      data-ocid={`subject.video.${index + 1}`}
    >
      <div className="relative sm:w-36 h-24 sm:h-auto bg-muted/40 flex items-center justify-center flex-shrink-0 cursor-pointer group">
        <span className="text-4xl">{video.thumbnail}</span>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Play
              size={16}
              className="text-primary-foreground ml-0.5"
              fill="currentColor"
            />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-foreground leading-snug">
            {video.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{video.topic}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {video.duration}
          </Badge>
          <span className="text-[10px] text-muted-foreground">
            Video lesson
          </span>
        </div>
      </div>
    </div>
  );
}

function MCQSampleCard({ mcq, index }: { mcq: SampleMCQ; index: number }) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedIdx = selected !== null ? mcq.options.indexOf(selected) : null;
  return (
    <div
      className="glass-card p-4 space-y-3"
      data-ocid={`subject.mcq_sample.${index + 1}`}
    >
      <p className="text-sm font-medium text-foreground">
        <span className="text-primary mr-1.5">Q{index + 1}.</span>
        {mcq.question}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {mcq.options.map((opt) => {
          const optIdx = mcq.options.indexOf(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setSelected(opt)}
              className={cn(
                "text-left text-xs px-3 py-2 rounded-lg border transition-smooth",
                selectedIdx === null &&
                  "border-border hover:border-primary/50 hover:bg-muted/40",
                selectedIdx !== null &&
                  optIdx === mcq.correctIndex &&
                  "border-[oklch(0.72_0.18_145)] bg-[oklch(0.72_0.18_145)]/10 text-[oklch(0.72_0.18_145)]",
                selectedIdx !== null &&
                  selectedIdx === optIdx &&
                  optIdx !== mcq.correctIndex &&
                  "border-[oklch(0.65_0.22_25)] bg-[oklch(0.65_0.22_25)]/10 text-[oklch(0.65_0.22_25)]",
                selectedIdx !== null &&
                  selectedIdx !== optIdx &&
                  optIdx !== mcq.correctIndex &&
                  "opacity-50",
              )}
            >
              <span className="font-semibold mr-1.5">
                {String.fromCharCode(65 + optIdx)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {selectedIdx !== null && (
        <p
          className={cn(
            "text-xs font-medium",
            selectedIdx === mcq.correctIndex
              ? "text-[oklch(0.72_0.18_145)]"
              : "text-[oklch(0.65_0.22_25)]",
          )}
        >
          {selectedIdx === mcq.correctIndex
            ? "\u2713 Correct!"
            : `\u2717 Incorrect. Correct answer: ${mcq.options[mcq.correctIndex]}`}
        </p>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function SubjectDetail() {
  const { subject: subjectSlug } = useParams({ from: "/modules/$subject" });
  const subjectData = SUBJECT_DATA[subjectSlug] ?? SUBJECT_DATA.dbms;
  const { data: progress, isLoading: progressLoading } = useGetLearningProgress(
    subjectData.displayName,
  );
  const updateProgress = useUpdateLearningProgress();

  // Track visit
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run once on mount
  useEffect(() => {
    updateProgress.mutate({
      subject: subjectData.displayName,
      topic: "Visited",
    });
  }, [subjectData.displayName]);

  const Icon = subjectData.icon;
  const progressPct = progress?.progressPercentage ?? 0;

  return (
    <div className="space-y-6" data-ocid="subject_detail.page">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          to="/dashboard"
          className="hover:text-foreground transition-smooth"
        >
          Dashboard
        </Link>
        <ChevronRight size={12} />
        <Link to="/modules" className="hover:text-foreground transition-smooth">
          Modules
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground">{subjectData.displayName}</span>
      </div>

      {/* Subject Header */}
      <div className="glass-card p-5 md:p-6" data-ocid="subject_detail.header">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl border border-current/20 flex items-center justify-center flex-shrink-0 ${subjectData.gradientFrom} ${subjectData.color}`}
          >
            <Icon size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                {subjectData.displayName}
              </h1>
              <Badge variant="secondary" className="text-xs">
                Placement Prep
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {subjectData.description}
            </p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                {progressLoading ? (
                  <Skeleton className="h-3 w-8" />
                ) : (
                  <span className="font-semibold text-primary">
                    {Math.round(progressPct)}%
                  </span>
                )}
              </div>
              {progressLoading ? (
                <Skeleton className="h-2 w-full" />
              ) : (
                <Progress value={progressPct} className="h-2" />
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              asChild
              size="sm"
              data-ocid="subject_detail.start_quiz_button"
            >
              <Link to="/quiz" search={{ subject: subjectData.displayName }}>
                <ClipboardList size={14} className="mr-1.5" /> Start Quiz
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs defaultValue="notes" className="space-y-4">
        <TabsList
          className="h-auto flex flex-wrap gap-0.5 bg-muted/40 p-1 w-full"
          data-ocid="subject_detail.tabs"
        >
          {[
            { value: "notes", icon: BookOpen, label: "Notes" },
            { value: "videos", icon: Play, label: "Videos" },
            { value: "examples", icon: Lightbulb, label: "Examples" },
            { value: "exercises", icon: Dumbbell, label: "Exercises" },
            { value: "summary", icon: ListChecks, label: "Summary" },
            { value: "mcqs", icon: ClipboardList, label: "MCQs" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 flex-1"
              data-ocid={`subject_detail.tab.${tab.value}`}
            >
              <tab.icon size={13} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* NOTES TAB */}
        <TabsContent value="notes" className="space-y-4">
          <Tabs defaultValue="easy">
            <TabsList
              className="h-8"
              data-ocid="subject_detail.notes_difficulty_tabs"
            >
              <TabsTrigger
                value="easy"
                className="text-xs"
                data-ocid="subject_detail.notes_tab.easy"
              >
                Easy
              </TabsTrigger>
              <TabsTrigger
                value="medium"
                className="text-xs"
                data-ocid="subject_detail.notes_tab.medium"
              >
                Medium
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="text-xs"
                data-ocid="subject_detail.notes_tab.advanced"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
            <TabsContent value="easy">
              <NoteBlock content={subjectData.notes.easy} />
            </TabsContent>
            <TabsContent value="medium">
              <NoteBlock content={subjectData.notes.medium} />
            </TabsContent>
            <TabsContent value="advanced">
              <NoteBlock content={subjectData.notes.advanced} />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* VIDEOS TAB */}
        <TabsContent value="videos">
          <div className="space-y-3" data-ocid="subject_detail.videos_list">
            <div className="flex items-center gap-2 mb-1">
              <FileText size={14} className="text-primary" />
              <p className="text-sm text-muted-foreground">
                Curated video lessons for this subject
              </p>
            </div>
            {subjectData.videos.map((v, i) => (
              <VideoCard key={v.title} video={v} index={i} />
            ))}
          </div>
        </TabsContent>

        {/* EXAMPLES TAB */}
        <TabsContent value="examples">
          <div className="space-y-3" data-ocid="subject_detail.examples_list">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb size={14} className="text-primary" />
              <p className="text-sm text-muted-foreground">
                Solved examples with step-by-step explanations
              </p>
            </div>
            {subjectData.examples.map((ex, i) => (
              <ExampleCard
                key={ex.problem.slice(0, 20)}
                example={ex}
                index={i}
              />
            ))}
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link to="/quiz" search={{ subject: subjectData.displayName }}>
                <ExternalLink size={13} className="mr-1.5" /> Try Similar
                Problems in Quiz
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* EXERCISES TAB */}
        <TabsContent value="exercises">
          <div className="space-y-3" data-ocid="subject_detail.exercises_list">
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell size={14} className="text-primary" />
              <p className="text-sm text-muted-foreground">
                Practice questions with reveal-on-demand answers
              </p>
            </div>
            {subjectData.exercises.map((ex, i) => (
              <ExerciseCard
                key={ex.question.slice(0, 20)}
                exercise={ex}
                index={i}
              />
            ))}
            <Button
              asChild
              className="w-full"
              data-ocid="subject_detail.practice_more_button"
            >
              <Link to="/quiz" search={{ subject: subjectData.displayName }}>
                <ClipboardList size={14} className="mr-1.5" /> Practice More in
                Full Quiz
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* SUMMARY TAB */}
        <TabsContent value="summary">
          <div className="space-y-4" data-ocid="subject_detail.summary_section">
            <div className="glass-card p-4 space-y-3">
              <h3 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                <ListChecks size={15} className="text-primary" /> Key Points
              </h3>
              <ul className="space-y-2">
                {subjectData.summary.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-4 space-y-3">
              <h3 className="font-display text-sm font-bold text-[oklch(0.72_0.18_145)] flex items-center gap-2">
                <Lightbulb size={15} /> Exam Tips
              </h3>
              <ul className="space-y-2">
                {subjectData.summary.tips.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-[oklch(0.72_0.18_145)] mt-1 flex-shrink-0">
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-4 space-y-3">
              <h3 className="font-display text-sm font-bold text-[oklch(0.65_0.22_25)] flex items-center gap-2">
                <span>⚠</span> Common Mistakes
              </h3>
              <ul className="space-y-2">
                {subjectData.summary.mistakes.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-[oklch(0.65_0.22_25)] mt-1 flex-shrink-0">
                      ✗
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* MCQs TAB */}
        <TabsContent value="mcqs">
          <div className="space-y-4" data-ocid="subject_detail.mcqs_section">
            <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-foreground">
                  Full Topic Quiz
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  50 placement-oriented MCQs with timer
                </p>
              </div>
              <Button
                asChild
                className="flex-shrink-0"
                data-ocid="subject_detail.start_full_quiz_button"
              >
                <Link to="/quiz" search={{ subject: subjectData.displayName }}>
                  <ClipboardList size={14} className="mr-1.5" /> Start
                  50-Question Quiz
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground px-1">
              Sample preview — 3 questions:
            </p>
            {subjectData.sampleMCQs.map((mcq, i) => (
              <MCQSampleCard
                key={mcq.question.slice(0, 20)}
                mcq={mcq}
                index={i}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
