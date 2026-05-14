import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type UserProfile = {
    id : UserId;
    name : Text;
    email : Text;
    joinDate : Int;
    studyGoalHours : Nat;
    preferredDifficulty : Text;
    themePreference : Text;
    notificationsEnabled : Bool;
    cognitiveLoadBaseline : Float;
  };
};
