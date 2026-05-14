import Debug "mo:core/Debug";
import List "mo:core/List";
import QuizTypes "../types/quiz";
import CognitiveTypes "../types/cognitive";
import CommonTypes "../types/common";

mixin (
  questions : List.List<QuizTypes.QuizQuestion>,
  sessions : List.List<QuizTypes.QuizSession>,
  cognitiveEntries : List.List<CognitiveTypes.CognitiveLoadEntry>
) {
  public shared query ({ caller }) func getQuizQuestions(subject : Text, difficulty : Text) : async CommonTypes.Result<[QuizTypes.QuizQuestion], Text> {
    Debug.todo();
  };

  public shared ({ caller }) func submitQuizSession(
    subject : Text,
    difficulty : Text,
    answers : [(Text, Text)],
    timePerQuestion : [Float],
    stressLevel : Nat,
    confidenceLevel : Nat,
    sessionDurationSecs : Nat
  ) : async CommonTypes.Result<QuizTypes.QuizResultSummary, Text> {
    Debug.todo();
  };

  public shared query ({ caller }) func getQuizHistory() : async CommonTypes.Result<[QuizTypes.QuizSession], Text> {
    Debug.todo();
  };

  public shared ({ caller }) func seedQuizData() : async CommonTypes.Result<Text, Text> {
    Debug.todo();
  };
};
