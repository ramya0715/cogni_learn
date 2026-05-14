import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import AnalyticsTypes "../types/analytics";
import CognitiveTypes "../types/cognitive";
import QuizTypes "../types/quiz";
import CommonTypes "../types/common";

module {
  public type AnalyticsSummary = AnalyticsTypes.AnalyticsSummary;
  public type Recommendation = AnalyticsTypes.Recommendation;
  public type DashboardData = AnalyticsTypes.DashboardData;
  public type CognitiveLoadEntry = CognitiveTypes.CognitiveLoadEntry;
  public type UserId = CommonTypes.UserId;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func getSummary(
    sessions : List.List<QuizTypes.QuizSession>,
    cognitiveEntries : List.List<CognitiveLoadEntry>,
    caller : Principal,
    daysBack : Nat
  ) : Result<AnalyticsSummary, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    let cutoff = Time.now() - (Int.fromNat(daysBack) * 24 * 60 * 60 * 1_000_000_000);
    let userSessions = sessions.filter(func(s) {
      Principal.equal(s.userId, caller) and s.startTime >= cutoff
    });
    let totalQuizzes = userSessions.size();
    var totalCorrect = 0;
    var totalQuestions = 0;
    // Accumulate per-subject stats using a Map
    let subjectCorrect = Map.empty<Text, Nat>();
    let subjectTotal = Map.empty<Text, Nat>();
    userSessions.forEach(func(s) {
      totalCorrect += s.score;
      totalQuestions += s.answers.size();
      let prevC = switch (subjectCorrect.get(s.subject)) { case (?n) n; case null 0 };
      let prevT = switch (subjectTotal.get(s.subject)) { case (?n) n; case null 0 };
      subjectCorrect.add(s.subject, prevC + s.score);
      subjectTotal.add(s.subject, prevT + s.answers.size());
    });
    let subjectAccuracy = List.empty<(Text, Float)>();
    subjectCorrect.forEach(func(subj, correct) {
      let total = switch (subjectTotal.get(subj)) { case (?n) n; case null 1 };
      let acc = if (total == 0) 0.0
                else Int.toFloat(correct) / Int.toFloat(total);
      subjectAccuracy.add((subj, acc));
    });
    let overallAcc = if (totalQuestions == 0) 0.0
                    else Int.toFloat(totalCorrect) / Int.toFloat(totalQuestions);
    let cogTrend = cognitiveEntries.filter(func(e) {
      Principal.equal(e.userId, caller) and e.timestamp >= cutoff
    });
    // Build weeklyStudyDays: count distinct days in last 7 days per day slot
    let weeklyArr : [var Nat] = [var 0, 0, 0, 0, 0, 0, 0];
    let oneDayNs : Int = 24 * 60 * 60 * 1_000_000_000;
    let now = Time.now();
    userSessions.forEach(func(s) {
      let daysAgo = (now - s.startTime) / oneDayNs;
      if (daysAgo >= 0 and daysAgo < 7) {
        let idx = Int.toNat(daysAgo);
        weeklyArr[idx] += 1;
      };
    });
    #ok({
      userId = caller;
      totalQuizzes = totalQuizzes;
      totalCorrect = totalCorrect;
      totalQuestions = totalQuestions;
      overallAccuracy = overallAcc;
      subjectAccuracy = subjectAccuracy.toArray();
      cognitiveLoadTrend = cogTrend.toArray();
      weeklyStudyDays = Array.fromVarArray<Nat>(weeklyArr);
    });
  };

  public func getRecommendations(
    recommendations : List.List<Recommendation>,
    sessions : List.List<QuizTypes.QuizSession>,
    cognitiveEntries : List.List<CognitiveLoadEntry>,
    caller : Principal
  ) : Result<[Recommendation], Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    let now = Time.now();
    let sevenDaysNs : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let userSessions = sessions.filter(func(s) { Principal.equal(s.userId, caller) });
    // Compute per-subject stats
    let subjectCorrect = Map.empty<Text, Nat>();
    let subjectTotal = Map.empty<Text, Nat>();
    let subjectLastAccess = Map.empty<Text, Int>();
    userSessions.forEach(func(s) {
      let prevC = switch (subjectCorrect.get(s.subject)) { case (?n) n; case null 0 };
      let prevT = switch (subjectTotal.get(s.subject)) { case (?n) n; case null 0 };
      let prevA = switch (subjectLastAccess.get(s.subject)) { case (?t) t; case null 0 };
      subjectCorrect.add(s.subject, prevC + s.score);
      subjectTotal.add(s.subject, prevT + s.answers.size());
      if (s.startTime > prevA) {
        subjectLastAccess.add(s.subject, s.startTime);
      };
    });
    let result = List.empty<Recommendation>();
    var recCounter = 0;
    var lowestAccSubject = "";
    var lowestAcc : Float = 1.1;
    subjectCorrect.forEach(func(subj, correct) {
      let total = switch (subjectTotal.get(subj)) { case (?n) n; case null 1 };
      let acc = if (total == 0) 0.0 else Int.toFloat(correct) / Int.toFloat(total);
      // Weak subject recommendation
      if (acc < 0.70) {
        recCounter += 1;
        let recId = "rec-weak-" # subj # "-" # Int.toText(recCounter);
        let rec : Recommendation = {
          recId = recId;
          userId = caller;
          recType = "weak";
          targetSubject = subj;
          targetTopic = "All topics";
          reason = "Your accuracy in " # subj # " is " # Int.toText(Int.fromNat(Int.toNat(Float.toInt(acc * 100.0)))) # "%. Focus on weak areas to improve.";
          createdAt = now;
        };
        result.add(rec);
      };
      if (acc < lowestAcc) {
        lowestAcc := acc;
        lowestAccSubject := subj;
      };
      // Not accessed in 7 days
      let lastAccess = switch (subjectLastAccess.get(subj)) { case (?t) t; case null 0 };
      if (now - lastAccess > sevenDaysNs) {
        recCounter += 1;
        let recId = "rec-rev-" # subj # "-" # Int.toText(recCounter);
        let rec : Recommendation = {
          recId = recId;
          userId = caller;
          recType = "revision";
          targetSubject = subj;
          targetTopic = "All topics";
          reason = "You haven't practiced " # subj # " in over 7 days. Review key concepts.";
          createdAt = now;
        };
        result.add(rec);
      };
    });
    // Next topic recommendation for lowest accuracy subject
    if (lowestAccSubject != "") {
      recCounter += 1;
      let nextRec : Recommendation = {
        recId = "rec-next-" # Int.toText(recCounter);
        userId = caller;
        recType = "nextTopic";
        targetSubject = lowestAccSubject;
        targetTopic = "Foundation concepts";
        reason = "Start with fundamentals in " # lowestAccSubject # " to build a stronger base.";
        createdAt = now;
      };
      result.add(nextRec);
    };
    // Always add a learning path recommendation
    recCounter += 1;
    let pathRec : Recommendation = {
      recId = "rec-path-" # Int.toText(recCounter);
      userId = caller;
      recType = "learning-path";
      targetSubject = "All";
      targetTopic = "Placement Preparation";
      reason = "Follow the recommended learning path: Aptitude → OOPS → DBMS → System Design → Technical MCQs for optimal placement preparation.";
      createdAt = now;
    };
    result.add(pathRec);
    #ok(result.toArray());
  };
};
