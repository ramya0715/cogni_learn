import Map "mo:core/Map";
import Principal "mo:core/Principal";
import UserTypes "../types/user";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type UserProfile = UserTypes.UserProfile;
  public type UserId = CommonTypes.UserId;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func register(
    users : Map.Map<UserId, UserProfile>,
    caller : Principal,
    name : Text,
    email : Text
  ) : Result<UserProfile, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous callers cannot register");
    };
    switch (users.get(caller)) {
      case (?_existing) { #err("User already registered") };
      case null {
        let profile : UserProfile = {
          id = caller;
          name = name;
          email = email;
          joinDate = Time.now();
          studyGoalHours = 2;
          preferredDifficulty = "Intermediate";
          themePreference = "dark";
          notificationsEnabled = true;
          cognitiveLoadBaseline = 50.0;
        };
        users.add(caller, profile);
        #ok(profile);
      };
    };
  };

  public func getProfile(
    users : Map.Map<UserId, UserProfile>,
    caller : Principal
  ) : Result<UserProfile, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    switch (users.get(caller)) {
      case (?profile) { #ok(profile) };
      case null { #err("User not found") };
    };
  };

  public func updateProfile(
    users : Map.Map<UserId, UserProfile>,
    caller : Principal,
    name : Text,
    email : Text,
    studyGoal : Nat,
    difficulty : Text,
    theme : Text,
    notifications : Bool
  ) : Result<UserProfile, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Not authenticated");
    };
    switch (users.get(caller)) {
      case null { #err("User not found") };
      case (?existing) {
        let updated : UserProfile = {
          existing with
          name = name;
          email = email;
          studyGoalHours = studyGoal;
          preferredDifficulty = difficulty;
          themePreference = theme;
          notificationsEnabled = notifications;
        };
        users.add(caller, updated);
        #ok(updated);
      };
    };
  };
};
