import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type QuizQuestion = {
    questionId : Text;
    subject : Text;
    difficulty : Text;
    questionText : Text;
    optionA : Text;
    optionB : Text;
    optionC : Text;
    optionD : Text;
    correctAnswer : Text;
    explanation : Text;
    topicTag : Text;
  };

  public type QuizSession = {
    sessionId : Text;
    userId : UserId;
    subject : Text;
    difficulty : Text;
    startTime : Int;
    endTime : Int;
    answers : [(Text, Text)];
    score : Nat;
    accuracy : Float;
    timePerQuestion : [Float];
  };

  public type QuizResultSummary = {
    score : Nat;
    accuracy : Float;
    totalQuestions : Nat;
    weakTopics : [Text];
    strongTopics : [Text];
    recommendations : [Text];
    timeTaken : Float;
    cognitiveLoadCategory : Text;
  };
};
