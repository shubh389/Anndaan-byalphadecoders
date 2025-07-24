import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Phone,
  MapPin,
  Star,
  Clock,
  Package,
  Navigation,
  CheckCircle2,
  MessageCircle,
  Route,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Donation, Volunteer } from "@/components/DonationMap";

interface VolunteerCoordinationProps {
  donations: Donation[];
  volunteers: Volunteer[];
  selectedDonation: string | null;
  onAssignVolunteer: (donationId: string, volunteerId: string) => void;
  onUpdateStatus: (donationId: string, status: Donation["status"]) => void;
  className?: string;
}

const VolunteerCoordination: React.FC<VolunteerCoordinationProps> = ({
  donations,
  volunteers,
  selectedDonation,
  onAssignVolunteer,
  onUpdateStatus,
  className,
}) => {
  const [selectedVolunteer, setSelectedVolunteer] = useState<string | null>(
    null,
  );
  const [isAssigning, setIsAssigning] = useState(false);

  const currentDonation = selectedDonation
    ? donations.find((d) => d.id === selectedDonation)
    : null;

  const availableVolunteers = volunteers.filter((v) => v.isAvailable);
  const activeVolunteers = volunteers.filter(
    (v) => !v.isAvailable && v.activeDeliveries > 0,
  );

  const handleAssignVolunteer = async (volunteerId: string) => {
    if (!currentDonation) return;

    setIsAssigning(true);
    try {
      await onAssignVolunteer(currentDonation.id, volunteerId);
      setSelectedVolunteer(null);
    } catch (error) {
      console.error("Failed to assign volunteer:", error);
    } finally {
      setIsAssigning(false);
    }
  };

  const getStatusActions = (donation: Donation) => {
    switch (donation.status) {
      case "pending":
        return availableVolunteers.length > 0
          ? "Assign Volunteer"
          : "No volunteers available";
      case "assigned":
        return "Mark as Picked Up";
      case "in_transit":
        return "Mark as Delivered";
      case "delivered":
        return "Completed";
      default:
        return "Unknown status";
    }
  };

  const getNextStatus = (
    currentStatus: Donation["status"],
  ): Donation["status"] | null => {
    switch (currentStatus) {
      case "assigned":
        return "in_transit";
      case "in_transit":
        return "delivered";
      default:
        return null;
    }
  };

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const getVolunteersNearDonation = (donation: Donation) => {
    return availableVolunteers
      .map((volunteer) => ({
        ...volunteer,
        distance: parseFloat(
          calculateDistance(
            donation.location.lat,
            donation.location.lng,
            volunteer.location.lat,
            volunteer.location.lng,
          ),
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Volunteer Assignment Panel */}
      {currentDonation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Donation Details
              </span>
              <Badge
                className={
                  currentDonation.status === "delivered"
                    ? ""
                    : "bg-gray-200 text-gray-800"
                }
              >
                {currentDonation.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">
                    {currentDonation.donorName}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">
                    {currentDonation.location.address}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">
                    {currentDonation.foodQuantity}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">
                    Expires:{" "}
                    {new Date(currentDonation.expiryTime).toLocaleDateString()}{" "}
                    at{" "}
                    {new Date(currentDonation.expiryTime).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {currentDonation.volunteer && (
                <div className="space-y-2 p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900">
                    Assigned Volunteer
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{currentDonation.volunteer.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{currentDonation.volunteer.phone}</span>
                  </div>
                  {currentDonation.volunteer.estimatedArrival && (
                    <div className="flex items-center text-sm">
                      <Timer className="h-4 w-4 mr-2 text-blue-600" />
                      <span>
                        ETA:{" "}
                        {new Date(
                          currentDonation.volunteer.estimatedArrival,
                        ).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {currentDonation.status === "pending" &&
                availableVolunteers.length > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Assign Volunteer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Select Volunteer</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {getVolunteersNearDonation(currentDonation).map(
                          (volunteer) => (
                            <div
                              key={volunteer.id}
                              className={cn(
                                "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                                selectedVolunteer === volunteer.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200",
                              )}
                              onClick={() => setSelectedVolunteer(volunteer.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${volunteer.name}`}
                                    />
                                    <AvatarFallback>
                                      {volunteer.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">
                                      {volunteer.name}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                      <span>{volunteer.rating}</span>
                                      <span className="mx-2">•</span>
                                      <Navigation className="h-3 w-3 mr-1" />
                                      <span>{volunteer.distance}km away</span>
                                    </div>
                                  </div>
                                </div>
                                <Badge
                                  className="border border-green-600 text-green-600"
                                >
                                  Available
                                </Badge>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button
                          className="border border-gray-300"
                          onClick={() => setSelectedVolunteer(null)}
                          type="button"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="border border-blue-600"
                          onClick={() =>
                            selectedVolunteer &&
                            handleAssignVolunteer(selectedVolunteer)
                          }
                          disabled={!selectedVolunteer || isAssigning}
                          type="button"
                        >
                          {isAssigning ? "Assigning..." : "Assign Volunteer"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

              {getNextStatus(currentDonation.status) && (
                <Button
                  className="flex items-center border border-gray-300"
                  onClick={() => {
                    const nextStatus = getNextStatus(currentDonation.status);
                    if (nextStatus) {
                      onUpdateStatus(currentDonation.id, nextStatus);
                    }
                  }}
                  type="button"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {getStatusActions(currentDonation)}
                </Button>
              )}

              {currentDonation.volunteer && (
                <>
                  <Button className="border border-gray-300 text-sm px-2 py-1" type="button">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Volunteer
                  </Button>
                  <Button className="border border-gray-300 text-sm px-2 py-1" type="button">
                    <Route className="h-4 w-4 mr-2" />
                    Track Route
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Volunteers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Available Volunteers</span>
            <Badge className="bg-gray-200 text-gray-800">
              {availableVolunteers.length} available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {availableVolunteers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No volunteers available at the moment</p>
              <p className="text-sm">
                New volunteers will appear here when they come online
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableVolunteers.map((volunteer) => (
                <div key={volunteer.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${volunteer.name}`}
                        />
                        <AvatarFallback className="text-xs">
                          {volunteer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {volunteer.name}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          <span>{volunteer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="border border-green-600 text-green-600 text-xs flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Online
                    </Badge>
                  </div>
                  {currentDonation && (
                    <div className="text-xs text-gray-500 mt-1">
                      {calculateDistance(
                        currentDonation.location.lat,
                        currentDonation.location.lng,
                        volunteer.location.lat,
                        volunteer.location.lng,
                      )}{" "}
                      km from pickup location
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Deliveries */}
      {activeVolunteers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Active Deliveries</span>
              <Badge className="bg-gray-200 text-gray-800">
                {activeVolunteers.length} in progress
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeVolunteers.map((volunteer) => {
                const volunteerDonations = donations.filter(
                  (d) =>
                    d.volunteer?.id === volunteer.id &&
                    (d.status === "assigned" || d.status === "in_transit"),
                );

                return (
                  <div key={volunteer.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${volunteer.name}`}
                          />
                          <AvatarFallback>
                            {volunteer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{volunteer.name}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            <span>{volunteer.rating}</span>
                            <span className="mx-2">•</span>
                            <span>{volunteer.activeDeliveries} active</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="border border-orange-600 text-orange-600 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                        Active
                      </Badge>
                    </div>
                    {volunteerDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className="ml-12 p-2 bg-gray-50 rounded text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {donation.donorName}
                          </span>
                          <Badge
                            className={
                              "text-xs px-2 py-1 " +
                              (donation.status === "in_transit"
                                ? ""
                                : "bg-gray-200 text-gray-800")
                            }
                          >
                            {donation.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VolunteerCoordination;
