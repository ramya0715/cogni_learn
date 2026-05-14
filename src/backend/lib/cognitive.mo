import List "mo:core/List";
import Principal "mo:core/Principal";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import CognitiveTypes "../types/cognitive";
import CommonTypes "../types/common";

module {
  public type CognitiveLoadEntry = CognitiveTypes.CognitiveLoadEntry;
  public type UserId = CommonTypes.UserId;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  func floatMin(a : Float, b : Float) : Float {
    if (a < b) a else b
  };

  func categoryFromScore(score : Float) : Text {
    if (score <= 35.0) "Low"
    else if (score <= 65.0) "Moderate"
    else "High"
  };

  public func calculate(
    cognitiveEntries : List.List<CognitiveLoadEntry>,
    caller : Principal,
    accuracy : Float,
    avgTimeSecs : Float,
    errorCount : Nat,
    stressLevel : Nat,
    confidenceLevel : Nat,
    retryCount : Nat,
    sessionDurationMins : Float,
    topicDifficulty : Text
  ) : Result<CognitiveLoadEntry, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    let accuracyComponent = (1.0 - accuracy / 100.0) * 40.0;
    let timeComponent = floatMin(avgTimeSecs / 120.0, 1.0) * 15.0;
    let errorComponent = floatMin(Int.toFloat(errorCount) / 10.0, 1.0) * 15.0;
    let stressComponent = Int.toFloat(stressLevel) / 10.0 * 10.0;
    let confidenceComponent = (1.0 - Int.toFloat(confidenceLevel) / 10.0) * 10.0;
    let retryComponent = floatMin(Int.toFloat(retryCount) / 5.0, 1.0) * 5.0;
    let durationComponent = floatMin(sessionDurationMins / 120.0, 1.0) * 5.0;
    let diffBonus = if (topicDifficulty == "Advanced") 5.0
                   else if (topicDifficulty == "Intermediate") 2.5
                   else 0.0;
    let rawTotal = accuracyComponent + timeComponent + errorComponent +
                   stressComponent + confidenceComponent + retryComponent +
                   durationComponent + diffBonus;
    let total = floatMin(rawTotal, 100.0);
    let category = categoryFromScore(total);
    let now = Time.now();
    let entryId = Int.toText(now) # "-" # Principal.toText(caller);
    let entry : CognitiveLoadEntry = {
      entryId = entryId;
      userId = caller;
      timestamp = now;
      loadScore = total;
      accuracy = accuracy;
      avgTimePerQuestion = avgTimeSecs;
      errorCount = errorCount;
      stressLevel = stressLevel;
      confidenceLevel = confidenceLevel;
      category = category;
    };
    cognitiveEntries.add(entry);
    #ok(entry);
  };

  public func getLatestEntry(
    cognitiveEntries : List.List<CognitiveLoadEntry>,
    caller : Principal
  ) : ?CognitiveLoadEntry {
    if (Principal.isAnonymous(caller)) return null;
    var latest : ?CognitiveLoadEntry = null;
    cognitiveEntries.forEach(func(e) {
      if (Principal.equal(e.userId, caller)) {
        switch (latest) {
          case null { latest := ?e };
          case (?prev) {
            if (e.timestamp > prev.timestamp) {
              latest := ?e;
            };
          };
        };
      };
    });
    latest;
  };

  public func getTrend(
    cognitiveEntries : List.List<CognitiveLoadEntry>,
    caller : Principal,
    daysBack : Nat
  ) : [CognitiveLoadEntry] {
    if (Principal.isAnonymous(caller)) return [];
    let cutoff = Time.now() - (Int.fromNat(daysBack) * 24 * 60 * 60 * 1_000_000_000);
    let filtered = cognitiveEntries.filter(func(e) {
      Principal.equal(e.userId, caller) and e.timestamp >= cutoff
    });
    filtered.toArray();
  };
};
