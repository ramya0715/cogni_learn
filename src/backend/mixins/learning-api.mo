import Debug "mo:core/Debug";
import Map "mo:core/Map";
import LearningTypes "../types/learning";
import CommonTypes "../types/common";

mixin (progressMap : Map.Map<Text, LearningTypes.LearningProgress>) {
  public shared ({ caller }) func updateLearningProgress(subject : Text, completedTopic : Text) : async CommonTypes.Result<LearningTypes.LearningProgress, Text> {
    Debug.todo();
  };

  public shared query ({ caller }) func getLearningProgress(subject : Text) : async CommonTypes.Result<LearningTypes.LearningProgress, Text> {
    Debug.todo();
  };
};
