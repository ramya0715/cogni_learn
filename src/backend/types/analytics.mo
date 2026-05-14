import CommonTypes "common";
import CognitiveTypes "cognitive";

module {
  public type UserId = CommonTypes.UserId;
  public type CognitiveLoadEntry = CognitiveTypes.CognitiveLoadEntry;

  public type AnalyticsSummary = {
    userId : UserId;
    totalQuizzes : Nat;
    totalCorrect : Nat;
    totalQuestions : Nat;
    overallAccuracy : Float;
    subjectAccuracy : [(Text, Float)];
    cognitiveLoadTrend : [CognitiveLoadEntry];
    weeklyStudyDays : [Nat];
  };

  public type Recommendation = {
    recId : Text;
    userId : UserId;
    recType : Text;
    targetSubject : Text;
    targetTopic : Text;
    reason : Text;
    createdAt : Int;
  };

  public type DashboardData = {
    profile : { id : UserId; name : Text; email : Text; joinDate : Int; studyGoalHours : Nat; preferredDifficulty : Text; themePreference : Text; notificationsEnabled : Bool; cognitiveLoadBaseline : Float };
    currentCognitiveLoad : CognitiveLoadEntry;
    learningProgressAll : [{ userId : UserId; subject : Text; completedTopics : [Text]; progressPercentage : Float; lastAccessDate : Int; studyStreak : Nat; lastStreakDate : Int }];
    streakDays : Nat;
    recentQuizSessions : [{ sessionId : Text; userId : UserId; subject : Text; difficulty : Text; startTime : Int; endTime : Int; answers : [(Text, Text)]; score : Nat; accuracy : Float; timePerQuestion : [Float] }];
    recommendations : [Recommendation];
    weeklyStudySessions : [Nat];
  };
};
