import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Int "mo:core/Int";
import InterviewTypes "../types/interview";
import CommonTypes "../types/common";

module {
  public type MockInterviewQuestion = InterviewTypes.MockInterviewQuestion;
  public type MockInterviewSession = InterviewTypes.MockInterviewSession;
  public type MockInterviewResult = InterviewTypes.MockInterviewResult;
  public type UserId = CommonTypes.UserId;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  let seedQuestions : [MockInterviewQuestion] = [
    // ── Technical Questions (15) ────────────────────────────────────────────
    {
      questionId = "ti-001";
      mode = "technical";
      question = "Explain the SOLID principles and give an example of how you would apply the Single Responsibility Principle in a real project.";
      keyPoints = ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion", "Each class has one reason to change"];
      difficulty = "Intermediate";
      category = "OOP Design";
    },
    {
      questionId = "ti-002";
      mode = "technical";
      question = "How would you design a URL shortening service like bit.ly? Describe the data model, API endpoints, and scalability considerations.";
      keyPoints = ["Hash generation", "Database choice (NoSQL)", "Redirection logic", "Caching with Redis", "Load balancing", "Analytics tracking"];
      difficulty = "Advanced";
      category = "System Design";
    },
    {
      questionId = "ti-003";
      mode = "technical";
      question = "What is the difference between a process and a thread? When would you use multi-threading vs multi-processing?";
      keyPoints = ["Memory isolation", "Shared memory for threads", "Context switching cost", "GIL in Python", "Use threads for I/O-bound tasks", "Use processes for CPU-bound tasks"];
      difficulty = "Intermediate";
      category = "Operating Systems";
    },
    {
      questionId = "ti-004";
      mode = "technical";
      question = "Explain database normalization. What are 1NF, 2NF, and 3NF? Give an example of a table that violates 3NF and how you would fix it.";
      keyPoints = ["Eliminate redundancy", "1NF: atomic values", "2NF: no partial dependency", "3NF: no transitive dependency", "BCNF", "Denormalization tradeoffs"];
      difficulty = "Intermediate";
      category = "Databases";
    },
    {
      questionId = "ti-005";
      mode = "technical";
      question = "What is the difference between TCP and UDP? In which scenarios would you prefer UDP over TCP?";
      keyPoints = ["TCP: reliable, ordered, connection-based", "UDP: unreliable, connectionless, faster", "Use UDP for video streaming", "DNS uses UDP", "Gaming uses UDP", "Three-way handshake in TCP"];
      difficulty = "Easy";
      category = "Networking";
    },
    {
      questionId = "ti-006";
      mode = "technical";
      question = "Implement a function to detect a cycle in a linked list. What is the time and space complexity of your solution?";
      keyPoints = ["Floyd's cycle detection", "Two-pointer (slow and fast)", "O(n) time complexity", "O(1) space complexity", "Hashing approach O(n) space", "Return meeting point"];
      difficulty = "Intermediate";
      category = "Data Structures";
    },
    {
      questionId = "ti-007";
      mode = "technical";
      question = "What is polymorphism in OOP? Explain the difference between compile-time and runtime polymorphism with examples.";
      keyPoints = ["Compile-time: method overloading", "Runtime: method overriding", "Virtual functions", "Dynamic dispatch", "vtable", "Duck typing in dynamic languages"];
      difficulty = "Easy";
      category = "OOP Design";
    },
    {
      questionId = "ti-008";
      mode = "technical";
      question = "Explain the CAP theorem. Can a distributed system guarantee all three properties? Give examples of systems that prioritize different properties.";
      keyPoints = ["Consistency", "Availability", "Partition tolerance", "CP: HBase, ZooKeeper", "AP: Cassandra, DynamoDB", "CA: single-node RDBMS"];
      difficulty = "Advanced";
      category = "System Design";
    },
    {
      questionId = "ti-009";
      mode = "technical";
      question = "What is a deadlock? What are the four necessary conditions (Coffman conditions) for a deadlock to occur? How can deadlocks be prevented?";
      keyPoints = ["Mutual exclusion", "Hold and wait", "No preemption", "Circular wait", "Prevention: break one condition", "Banker's algorithm for avoidance"];
      difficulty = "Intermediate";
      category = "Operating Systems";
    },
    {
      questionId = "ti-010";
      mode = "technical";
      question = "What is the difference between SQL and NoSQL databases? When would you choose one over the other?";
      keyPoints = ["SQL: structured schema, ACID", "NoSQL: flexible schema, scalable", "Vertical vs horizontal scaling", "Use SQL for complex queries", "Use NoSQL for high volume", "Examples: MongoDB, Cassandra, Redis"];
      difficulty = "Easy";
      category = "Databases";
    },
    {
      questionId = "ti-011";
      mode = "technical";
      question = "Explain the concept of Big O notation. What is the time complexity of binary search, and why?";
      keyPoints = ["Asymptotic analysis", "Worst-case scenario", "O(log n) for binary search", "Divide and conquer", "Requires sorted array", "Common complexities: O(1), O(n), O(n log n), O(n²)"];
      difficulty = "Easy";
      category = "Algorithms";
    },
    {
      questionId = "ti-012";
      mode = "technical";
      question = "What is a RESTful API? Explain the key principles of REST and the difference between PUT and PATCH.";
      keyPoints = ["Stateless", "Client-server", "Uniform interface", "PUT: full resource update", "PATCH: partial update", "Cacheable responses", "HTTP status codes"];
      difficulty = "Easy";
      category = "Web Development";
    },
    {
      questionId = "ti-013";
      mode = "technical";
      question = "Explain dynamic programming. How would you solve the 0/1 Knapsack problem using dynamic programming?";
      keyPoints = ["Optimal substructure", "Overlapping subproblems", "Memoization vs tabulation", "Bottom-up table construction", "Time complexity O(nW)", "Space optimization to O(W)"];
      difficulty = "Advanced";
      category = "Algorithms";
    },
    {
      questionId = "ti-014";
      mode = "technical";
      question = "What is an index in a database? Explain B-tree indexes and hash indexes. When would you use each?";
      keyPoints = ["Speeds up SELECT queries", "Slows down INSERT/UPDATE", "B-tree: range queries", "Hash: equality queries", "Composite indexes", "Covering indexes"];
      difficulty = "Intermediate";
      category = "Databases";
    },
    {
      questionId = "ti-015";
      mode = "technical";
      question = "Design a notification system that can handle millions of users. How would you ensure scalability and reliability?";
      keyPoints = ["Message queues (Kafka/RabbitMQ)", "Fan-out pattern", "Push vs pull", "Retry with exponential backoff", "Dead letter queues", "Microservices per notification channel"];
      difficulty = "Advanced";
      category = "System Design";
    },
    // ── HR Questions (15) ────────────────────────────────────────────────────
    {
      questionId = "hr-001";
      mode = "hr";
      question = "Tell me about yourself. Walk me through your background and why you're interested in this role.";
      keyPoints = ["Brief academic background", "Technical skills highlight", "Key projects/internships", "Why this company", "Passion for the role", "Forward-looking statement"];
      difficulty = "Easy";
      category = "Introduction";
    },
    {
      questionId = "hr-002";
      mode = "hr";
      question = "What is your greatest strength, and how have you demonstrated it in a project or team setting?";
      keyPoints = ["Pick a relevant strength", "Provide specific example", "Quantify impact if possible", "Link to job requirements", "Avoid generic answers", "Show self-awareness"];
      difficulty = "Easy";
      category = "Self-Assessment";
    },
    {
      questionId = "hr-003";
      mode = "hr";
      question = "What is your greatest weakness? How are you actively working to improve it?";
      keyPoints = ["Be honest but strategic", "Choose a real weakness", "Show self-awareness", "Describe improvement steps", "Give evidence of progress", "Avoid clichés like 'perfectionist'"];
      difficulty = "Easy";
      category = "Self-Assessment";
    },
    {
      questionId = "hr-004";
      mode = "hr";
      question = "Describe a situation where you had a conflict with a team member. How did you handle it, and what was the outcome?";
      keyPoints = ["Use STAR method", "Acknowledge both perspectives", "Focus on resolution", "What you learned", "Positive outcome", "Communication skills"];
      difficulty = "Intermediate";
      category = "Conflict Resolution";
    },
    {
      questionId = "hr-005";
      mode = "hr";
      question = "Where do you see yourself in 5 years? What are your career goals?";
      keyPoints = ["Align with company growth", "Show ambition but realism", "Technical or leadership path", "Commitment to learning", "Contribution to company", "Don't say 'your position'"];
      difficulty = "Easy";
      category = "Career Goals";
    },
    {
      questionId = "hr-006";
      mode = "hr";
      question = "Tell me about a time you worked under a tight deadline. How did you prioritize your tasks?";
      keyPoints = ["STAR method", "Prioritization framework", "Communication with team", "Time management skills", "Result achieved", "Lessons learned"];
      difficulty = "Intermediate";
      category = "Time Management";
    },
    {
      questionId = "hr-007";
      mode = "hr";
      question = "Why do you want to work at our company specifically? What do you know about our products and culture?";
      keyPoints = ["Research the company", "Products/services knowledge", "Company culture fit", "Recent news or milestones", "Specific value alignment", "Long-term vision"];
      difficulty = "Easy";
      category = "Company Knowledge";
    },
    {
      questionId = "hr-008";
      mode = "hr";
      question = "Describe a time when you took initiative on a project or task that wasn't assigned to you.";
      keyPoints = ["Show proactiveness", "Describe the situation", "Actions taken", "Positive impact", "Leadership qualities", "Alignment with company values"];
      difficulty = "Intermediate";
      category = "Leadership";
    },
    {
      questionId = "hr-009";
      mode = "hr";
      question = "How do you handle working in a team with people who have different working styles or opinions?";
      keyPoints = ["Adaptability", "Active listening", "Compromise and negotiation", "Respect for diversity", "Team over ego", "Real example"];
      difficulty = "Easy";
      category = "Teamwork";
    },
    {
      questionId = "hr-010";
      mode = "hr";
      question = "Describe a project you are most proud of. What was your role, and what challenges did you overcome?";
      keyPoints = ["Pick a significant project", "Describe your contribution", "Technical challenges", "Problem-solving approach", "Outcome and impact", "Teamwork aspects"];
      difficulty = "Intermediate";
      category = "Achievements";
    },
    {
      questionId = "hr-011";
      mode = "hr";
      question = "How do you stay updated with new technologies and industry trends in software engineering?";
      keyPoints = ["Reading blogs and papers", "Online courses", "Side projects", "Open source contributions", "Communities and meetups", "Continuous learning mindset"];
      difficulty = "Easy";
      category = "Learning & Growth";
    },
    {
      questionId = "hr-012";
      mode = "hr";
      question = "Have you ever failed at something? What did you learn from that failure?";
      keyPoints = ["Honest example", "Ownership of failure", "Root cause analysis", "Corrective actions", "Growth mindset", "Positive outcome from learning"];
      difficulty = "Intermediate";
      category = "Resilience";
    },
    {
      questionId = "hr-013";
      mode = "hr";
      question = "How do you handle receiving critical feedback on your work?";
      keyPoints = ["Open to feedback", "Don't take it personally", "Ask clarifying questions", "Action plan to improve", "Thank the reviewer", "Give an example"];
      difficulty = "Easy";
      category = "Self-Improvement";
    },
    {
      questionId = "hr-014";
      mode = "hr";
      question = "What motivates you most in your work? What makes you go above and beyond?";
      keyPoints = ["Intrinsic vs extrinsic motivation", "Solving difficult problems", "Impact and purpose", "Learning new things", "Team success", "Align with company mission"];
      difficulty = "Easy";
      category = "Motivation";
    },
    {
      questionId = "hr-015";
      mode = "hr";
      question = "Do you have any questions for us? What would you like to know about the team or the role?";
      keyPoints = ["Always have questions", "Ask about team culture", "Ask about tech stack", "Ask about growth opportunities", "Ask about challenges", "Shows genuine interest"];
      difficulty = "Easy";
      category = "Engagement";
    },
  ];

  public func seedInterviewQuestions(questions : List.List<MockInterviewQuestion>) {
    if (questions.size() == 0) {
      questions.addAll(Array.values<MockInterviewQuestion>(seedQuestions));
    };
  };

  public func getQuestions(
    questions : List.List<MockInterviewQuestion>,
    mode : Text
  ) : Result<[MockInterviewQuestion], Text> {
    let filtered = questions.filter(func(q) { q.mode == mode });
    let arr = filtered.toArray();
    let take = if (arr.size() > 10) Array.sliceToArray<MockInterviewQuestion>(arr, 0, 10) else arr;
    #ok(take);
  };

  public func submitSession(
    questions : List.List<MockInterviewQuestion>,
    sessions : List.List<MockInterviewSession>,
    caller : Principal,
    mode : Text,
    answers : [(Text, Text)]
  ) : Result<MockInterviewResult, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    let now = Time.now();
    let sessionId = "interview-" # Int.toText(now) # "-" # Principal.toText(caller);
    let totalQs = answers.size();
    let wordCount = Array.foldLeft<(Text, Text), Nat>(
      answers, 0,
      func(acc, pair) {
        let words = pair.1.size();
        acc + words;
      }
    );
    let rawScore = if (totalQs == 0) 0
                  else {
                    let avgWords = wordCount / totalQs;
                    if (avgWords >= 200) 10
                    else if (avgWords >= 150) 9
                    else if (avgWords >= 100) 8
                    else if (avgWords >= 70) 7
                    else if (avgWords >= 50) 6
                    else if (avgWords >= 30) 5
                    else if (avgWords >= 20) 4
                    else 3
                  };
    let score = if (rawScore > 10) 10 else rawScore;
    let feedback = if (score >= 9)
      "Excellent performance! Your answers demonstrated deep knowledge, clear communication, and strong problem-solving skills. You are well-prepared for placements."
    else if (score >= 7)
      "Good performance! You showed solid understanding and communicated your ideas well. Focus on adding more specific examples and quantifiable results to your answers."
    else if (score >= 5)
      "Average performance. Your answers covered the basics but lacked depth. Practice the STAR method for behavioral questions and study more technical concepts."
    else
      "Needs improvement. Your answers were too brief. Work on elaborating your responses, providing concrete examples, and demonstrating technical depth.";
    let strengths = if (score >= 7)
      ["Clear communication", "Technical knowledge", "Structured responses"]
    else
      ["Attempted all questions", "Basic understanding shown"];
    let improvements = if (score < 7)
      ["Use STAR method", "Add quantifiable examples", "Elaborate technical answers", "Research company background"]
    else
      ["Add more metrics to answers", "Practice concise delivery"];
    let breakdown : [(Text, Float)] = [
      ("Communication", if (score >= 7) 0.8 else 0.5),
      ("Technical Depth", if (score >= 8) 0.85 else 0.6),
      ("Problem Solving", if (score >= 7) 0.75 else 0.55),
      ("Clarity", if (score >= 6) 0.7 else 0.45),
    ];
    let session : MockInterviewSession = {
      sessionId = sessionId;
      userId = caller;
      mode = mode;
      startTime = now;
      score = score;
      answers = answers;
    };
    sessions.add(session);
    #ok({
      score = score;
      totalQuestions = totalQs;
      performanceFeedback = feedback;
      categoryBreakdown = breakdown;
      strengths = strengths;
      improvements = improvements;
    });
  };
};
