import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import LearningTypes "../types/learning";
import CommonTypes "../types/common";

module {
  public type LearningProgress = LearningTypes.LearningProgress;
  public type UserId = CommonTypes.UserId;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  let subjectTopicCounts : [(Text, Float)] = [
    ("Aptitude", 20.0),
    ("DBMS", 20.0),
    ("OOPS", 20.0),
    ("System Design", 20.0),
    ("Technical MCQs", 20.0),
  ];

  func totalTopicsForSubject(subject : Text) : Float {
    let found = Array.find<(Text, Float)>(subjectTopicCounts, func(pair) { pair.0 == subject });
    switch (found) {
      case (?(_, n)) n;
      case null 20.0;
    };
  };

  func progressKey(caller : Principal, subject : Text) : Text {
    Principal.toText(caller) # ":" # subject;
  };

  public func updateProgress(
    progressMap : Map.Map<Text, LearningProgress>,
    caller : Principal,
    subject : Text,
    completedTopic : Text
  ) : Result<LearningProgress, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    let key = progressKey(caller, subject);
    let now = Time.now();
    let existing = progressMap.get(key);
    let currentTopics = switch (existing) {
      case (?prog) prog.completedTopics;
      case null [];
    };
    let alreadyDone = Array.find<Text>(currentTopics, func(t) { t == completedTopic });
    let newTopics = switch (alreadyDone) {
      case (?_) currentTopics;
      case null Array.concat<Text>(currentTopics, [completedTopic]);
    };
    let total = totalTopicsForSubject(subject);
    let pct = if (total == 0.0) 0.0
              else (List.fromArray<Text>(newTopics).size() |> Int.toFloat(Int.fromNat(_))) / total * 100.0;
    let prevStreak = switch (existing) {
      case (?prog) prog.studyStreak;
      case null 0;
    };
    let prevStreakDate = switch (existing) {
      case (?prog) prog.lastStreakDate;
      case null 0;
    };
    let oneDayNs : Int = 24 * 60 * 60 * 1_000_000_000;
    let twoDayNs : Int = 2 * oneDayNs;
    let timeSinceLast = now - prevStreakDate;
    let newStreak = if (prevStreakDate == 0) 1
                   else if (timeSinceLast <= oneDayNs and timeSinceLast >= 0) prevStreak
                   else if (timeSinceLast > oneDayNs and timeSinceLast <= twoDayNs) prevStreak + 1
                   else 1;
    let updated : LearningProgress = {
      userId = caller;
      subject = subject;
      completedTopics = newTopics;
      progressPercentage = pct;
      lastAccessDate = now;
      studyStreak = newStreak;
      lastStreakDate = now;
    };
    progressMap.add(key, updated);
    #ok(updated);
  };

  public func getProgress(
    progressMap : Map.Map<Text, LearningProgress>,
    caller : Principal,
    subject : Text
  ) : Result<LearningProgress, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    let key = progressKey(caller, subject);
    switch (progressMap.get(key)) {
      case (?prog) #ok(prog);
      case null {
        let empty : LearningProgress = {
          userId = caller;
          subject = subject;
          completedTopics = [];
          progressPercentage = 0.0;
          lastAccessDate = 0;
          studyStreak = 0;
          lastStreakDate = 0;
        };
        #ok(empty);
      };
    };
  };

  public func getAllProgress(
    progressMap : Map.Map<Text, LearningProgress>,
    caller : Principal
  ) : [LearningProgress] {
    if (Principal.isAnonymous(caller)) return [];
    let callerText = Principal.toText(caller);
    let result = List.empty<LearningProgress>();
    progressMap.forEach(func(k, v) {
      if (Text.startsWith(k, #text (callerText # ":"))) {
        result.add(v);
      };
    });
    result.toArray();
  };

  public func getStudyStreak(
    progressMap : Map.Map<Text, LearningProgress>,
    caller : Principal
  ) : Nat {
    if (Principal.isAnonymous(caller)) return 0;
    let callerText = Principal.toText(caller);
    var maxStreak = 0;
    progressMap.forEach(func(k, v) {
      if (Text.startsWith(k, #text (callerText # ":"))) {
        if (v.studyStreak > maxStreak) {
          maxStreak := v.studyStreak;
        };
      };
    });
    maxStreak;
  };
};
