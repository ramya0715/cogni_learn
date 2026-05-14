import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type CognitiveLoadEntry = {
    entryId : Text;
    userId : UserId;
    timestamp : Int;
    loadScore : Float;
    accuracy : Float;
    avgTimePerQuestion : Float;
    errorCount : Nat;
    stressLevel : Nat;
    confidenceLevel : Nat;
    category : Text;
  };
};
