import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type LearningProgress = {
    userId : UserId;
    subject : Text;
    completedTopics : [Text];
    progressPercentage : Float;
    lastAccessDate : Int;
    studyStreak : Nat;
    lastStreakDate : Int;
  };
};
