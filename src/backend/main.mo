import Map "mo:core/Map";
import List "mo:core/List";
import UserTypes "types/user";
import QuizTypes "types/quiz";
import CognitiveTypes "types/cognitive";
import LearningTypes "types/learning";
import InterviewTypes "types/interview";
import AnalyticsTypes "types/analytics";
import CommonTypes "types/common";
import UserApiMixin "mixins/user-api";
import QuizApiMixin "mixins/quiz-api";
import CognitiveApiMixin "mixins/cognitive-api";
import LearningApiMixin "mixins/learning-api";
import InterviewApiMixin "mixins/interview-api";
import AnalyticsApiMixin "mixins/analytics-api";

actor {
  // ── Stable state ────────────────────────────────────────────────────────
  let users = Map.empty<CommonTypes.UserId, UserTypes.UserProfile>();
  let quizQuestions = List.empty<QuizTypes.QuizQuestion>();
  let quizSessions = List.empty<QuizTypes.QuizSession>();
  let cognitiveEntries = List.empty<CognitiveTypes.CognitiveLoadEntry>();
  let progressMap = Map.empty<Text, LearningTypes.LearningProgress>();
  let interviewQuestions = List.empty<InterviewTypes.MockInterviewQuestion>();
  let interviewSessions = List.empty<InterviewTypes.MockInterviewSession>();
  let recommendations = List.empty<AnalyticsTypes.Recommendation>();

  // ── Mixins ───────────────────────────────────────────────────────────────
  include UserApiMixin(users);
  include QuizApiMixin(quizQuestions, quizSessions, cognitiveEntries);
  include CognitiveApiMixin(cognitiveEntries);
  include LearningApiMixin(progressMap);
  include InterviewApiMixin(interviewQuestions, interviewSessions);
  include AnalyticsApiMixin(users, quizSessions, cognitiveEntries, progressMap, recommendations);
};
