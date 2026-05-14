import Debug "mo:core/Debug";
import List "mo:core/List";
import CognitiveTypes "../types/cognitive";
import CommonTypes "../types/common";

mixin (cognitiveEntries : List.List<CognitiveTypes.CognitiveLoadEntry>) {
  public shared ({ caller }) func calculateCognitiveLoad(
    accuracy : Float,
    avgTimeSecs : Float,
    errorCount : Nat,
    stressLevel : Nat,
    confidenceLevel : Nat,
    retryCount : Nat,
    sessionDurationMins : Float,
    topicDifficulty : Text
  ) : async CommonTypes.Result<CognitiveTypes.CognitiveLoadEntry, Text> {
    Debug.todo();
  };
};
