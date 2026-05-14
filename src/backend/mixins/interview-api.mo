import Debug "mo:core/Debug";
import List "mo:core/List";
import InterviewTypes "../types/interview";
import CommonTypes "../types/common";

mixin (
  interviewQuestions : List.List<InterviewTypes.MockInterviewQuestion>,
  interviewSessions : List.List<InterviewTypes.MockInterviewSession>
) {
  public shared query ({ caller }) func getMockInterviewQuestions(mode : Text) : async CommonTypes.Result<[InterviewTypes.MockInterviewQuestion], Text> {
    Debug.todo();
  };

  public shared ({ caller }) func submitMockInterview(mode : Text, answers : [(Text, Text)]) : async CommonTypes.Result<InterviewTypes.MockInterviewResult, Text> {
    Debug.todo();
  };
};
