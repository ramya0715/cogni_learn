import Debug "mo:core/Debug";
import Map "mo:core/Map";
import UserTypes "../types/user";
import CommonTypes "../types/common";

mixin (users : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>) {
  public shared ({ caller }) func registerUser(name : Text, email : Text) : async CommonTypes.Result<UserTypes.UserProfile, Text> {
    Debug.todo();
  };

  public shared query ({ caller }) func getUserProfile() : async CommonTypes.Result<UserTypes.UserProfile, Text> {
    Debug.todo();
  };

  public shared ({ caller }) func updateUserProfile(
    name : Text,
    email : Text,
    studyGoal : Nat,
    difficulty : Text,
    theme : Text,
    notifications : Bool
  ) : async CommonTypes.Result<UserTypes.UserProfile, Text> {
    Debug.todo();
  };
};
