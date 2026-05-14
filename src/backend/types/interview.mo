import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type MockInterviewQuestion = {
    questionId : Text;
    mode : Text;
    question : Text;
    keyPoints : [Text];
    difficulty : Text;
    category : Text;
  };

  public type MockInterviewSession = {
    sessionId : Text;
    userId : UserId;
    mode : Text;
    startTime : Int;
    score : Nat;
    answers : [(Text, Text)];
  };

  public type MockInterviewResult = {
    score : Nat;
    totalQuestions : Nat;
    performanceFeedback : Text;
    categoryBreakdown : [(Text, Float)];
    strengths : [Text];
    improvements : [Text];
  };
};
