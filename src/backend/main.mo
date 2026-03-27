import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type Booking = {
    name : Text;
    age : Nat;
    uniqueId : Text;
    isPriority : Bool;
    timestamp : Int;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Text.compare(booking1.uniqueId, booking2.uniqueId);
    };
  };

  // Persistent storage
  let bookings = List.empty<Booking>();

  public shared ({ caller }) func addAppointment(booking : Booking) : async () {
    if (bookings.any(func(existing) { existing.uniqueId == booking.uniqueId })) {
      Runtime.trap("Booking with this unique ID already exists");
    };
    bookings.add(booking);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.toArray().sort();
  };
};
