import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Clock,
  User,
  Phone,
  Package,
  CheckCircle2,
  Truck,
  AlertCircle,
  Navigation2,
  RefreshCw,
  Users,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTrackingState } from "@/hooks/useTrackingState";
import GoogleMapsTracker from "@/components/GoogleMapsTracker";
import GoogleMapsInstructions from "@/components/GoogleMapsInstructions";
import VolunteerCoordination from "@/components/VolunteerCoordination";
import { toast } from "sonner";
import type { Donation } from "@/components/DonationMap";

const TrackDonation: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [searchedDonation, setSearchedDonation] = useState<Donation | null>(
    null,
  );
  const {
    donations,
    volunteers,
    selectedDonation,
    selectDonation,
    assignVolunteer,
    updateDonationStatus,
    refreshData,
    isLoading,
  } = useTrackingState();

  const handleSearch = () => {
    const donation = donations.find(
      (d) =>
        d.id === searchId ||
        d.donorName.toLowerCase().includes(searchId.toLowerCase()) ||
        d.location.address.toLowerCase().includes(searchId.toLowerCase()),
    );
    setSearchedDonation(donation || null);
    if (donation) {
      selectDonation(donation.id);
    }
  };

  const handleDonationSelect = useCallback(
    (donationId: string) => {
      selectDonation(donationId);
      const donation = donations.find((d) => d.id === donationId);
      setSearchedDonation(donation || null);
    },
    [selectDonation, donations],
  );

  const handleVolunteerAssign = useCallback(
    async (donationId: string, volunteerId: string) => {
      try {
        await assignVolunteer(donationId, volunteerId);
        toast.success("Volunteer assigned successfully!");
      } catch (error) {
        console.error("Error assigning volunteer:", error);
        toast.error("Failed to assign volunteer. Please try again.");
      }
    },
    [assignVolunteer],
  );

  const getStatusColor = (status: Donation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "assigned":
        return "bg-blue-500";
      case "in_transit":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: Donation["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "assigned":
        return <User className="h-5 w-5" />;
      case "in_transit":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusDescription = (status: Donation["status"]) => {
    switch (status) {
      case "pending":
        return "Your donation request has been received and is waiting for volunteer assignment.";
      case "assigned":
        return "A volunteer has been assigned and will arrive shortly for pickup.";
      case "in_transit":
        return "Your donation has been picked up and is on the way to those in need.";
      case "delivered":
        return "Your donation has been successfully delivered. Thank you for making a difference!";
      default:
        return "Status unknown";
    }
  };

  const getTimeRemaining = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const Timeline: React.FC<{ donation: Donation }> = ({ donation }) => {
    const steps = [
      {
        id: "submitted",
        label: "Donation Submitted",
        description: "Request received",
        completed: true,
        timestamp: donation.createdAt,
      },
      {
        id: "assigned",
        label: "Volunteer Assigned",
        description: donation.volunteer
          ? `${donation.volunteer.name} assigned`
          : "Waiting for volunteer",
        completed: ["assigned", "in_transit", "delivered"].includes(
          donation.status,
        ),
        timestamp: donation.volunteer ? donation.createdAt : null,
      },
      {
        id: "pickup",
        label: "Food Picked Up",
        description: "Volunteer collected the donation",
        completed: ["in_transit", "delivered"].includes(donation.status),
        timestamp: null,
      },
      {
        id: "delivered",
        label: "Successfully Delivered",
        description: "Food reached those in need",
        completed: donation.status === "delivered",
        timestamp: null,
      },
    ];

    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium",
                  step.completed ? "bg-green-500" : "bg-gray-300",
                )}
              >
                {step.completed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 h-12 mt-2",
                    step.completed ? "bg-green-500" : "bg-gray-300",
                  )}
                ></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "font-medium",
                  step.completed ? "text-green-700" : "text-gray-500",
                )}
              >
                {step.label}
              </div>
              <div className="text-sm text-gray-600">{step.description}</div>
              {step.timestamp && (
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(step.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Real-time Donation Tracking
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search for specific donations, view live tracking on the map, and
            coordinate volunteer assignments. Monitor the complete journey from
            submission to delivery.
          </p>
        </div>

        {/* Google Maps Integration Notice */}
        <GoogleMapsInstructions />

        {/* Main Tracking Interface */}
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="search" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Search Donations
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Live Tracking Map
            </TabsTrigger>
            <TabsTrigger value="coordination" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Volunteer Coordination
            </TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search Donation
                  </span>
                  <Badge className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {donations.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter donation ID, donor name, or address..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} disabled={!searchId.trim()}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button
                    onClick={refreshData}
                    disabled={isLoading}
                    className="border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <RefreshCw
                      className={cn(
                        "h-4 w-4 mr-2",
                        isLoading && "animate-spin",
                      )}
                    />
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchedDonation ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Donation Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Package className="h-5 w-5 mr-2" />
                        Donation Details
                      </span>
                      <Badge className="flex items-center">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            getStatusColor(searchedDonation.status),
                          )}
                        ></div>
                        {searchedDonation.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center text-sm">
                        <strong className="w-24">ID:</strong>
                        <span className="text-gray-600">
                          #{searchedDonation.id}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <strong className="w-24">Donor:</strong>
                        <span className="text-gray-600">
                          {searchedDonation.donorName}
                        </span>
                      </div>
                      <div className="flex items-start text-sm">
                        <strong className="w-24">Location:</strong>
                        <span className="text-gray-600">
                          {searchedDonation.location.address}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <strong className="w-24">Quantity:</strong>
                        <span className="text-gray-600">
                          {searchedDonation.foodQuantity}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <strong className="w-24">Event:</strong>
                        <span className="text-gray-600 capitalize">
                          {searchedDonation.eventType}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <strong className="w-24">Expires:</strong>
                        <span
                          className={cn(
                            "text-gray-600",
                            getTimeRemaining(
                              searchedDonation.expiryTime,
                            ).includes("Expired") && "text-red-600 font-medium",
                          )}
                        >
                          {getTimeRemaining(searchedDonation.expiryTime)}
                        </span>
                      </div>
                      {searchedDonation.description && (
                        <div className="flex items-start text-sm">
                          <strong className="w-24">Notes:</strong>
                          <span className="text-gray-600">
                            {searchedDonation.description}
                          </span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Status Information */}
                    <div className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center mb-2">
                        <div
                          className={cn(
                            "p-2 rounded-full text-white mr-3",
                            getStatusColor(searchedDonation.status),
                          )}
                        >
                          {getStatusIcon(searchedDonation.status)}
                        </div>
                        <div>
                          <div className="font-medium capitalize">
                            {searchedDonation.status.replace("_", " ")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {getStatusDescription(searchedDonation.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Volunteer Information */}
                    {searchedDonation.volunteer && (
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="font-medium text-blue-900 mb-3">
                          Assigned Volunteer
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{searchedDonation.volunteer.name}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{searchedDonation.volunteer.phone}</span>
                          </div>
                          {searchedDonation.volunteer.estimatedArrival && (
                            <div className="flex items-center text-sm">
                              <Timer className="h-4 w-4 mr-2 text-blue-600" />
                              <span>
                                Estimated arrival:{" "}
                                {new Date(
                                  searchedDonation.volunteer.estimatedArrival,
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          )}
                          {searchedDonation.status === "in_transit" && (
                            <div className="flex items-center text-sm text-orange-600 font-medium">
                              <Navigation2 className="h-4 w-4 mr-2" />
                              <span>
                                Currently en route to delivery location
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Donation Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline donation={searchedDonation} />
                  </CardContent>
                </Card>
              </div>
            ) : (
              searchId && (
                <Card>
                  <CardContent className="text-center py-12">
                    <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No donation found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find a donation matching "{searchId}". Please
                      check your donation ID, name, or address and try again.
                    </p>
                    <Button onClick={() => setSearchId("")}>
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              )
            )}

            {/* Recent Donations */}
            {!searchedDonation && !searchId && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donations.slice(0, 5).map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setSearchId(donation.id);
                          setSearchedDonation(donation);
                          selectDonation(donation.id);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full",
                              getStatusColor(donation.status),
                            )}
                          ></div>
                          <div>
                            <div className="font-medium">
                              {donation.donorName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {donation.foodQuantity}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className="text-xs capitalize"
                          >
                            {donation.status.replace("_", " ")}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            #{donation.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Live Map Tab */}
          <TabsContent value="map" className="space-y-4">
            <GoogleMapsTracker
              donations={donations}
              volunteers={volunteers}
              selectedDonation={selectedDonation}
              onDonationSelect={handleDonationSelect}
              onVolunteerAssign={handleVolunteerAssign}
            />
          </TabsContent>

          {/* Volunteer Coordination Tab */}
          <TabsContent value="coordination" className="space-y-4">
            <VolunteerCoordination
              donations={donations}
              volunteers={volunteers}
              selectedDonation={selectedDonation}
              onAssignVolunteer={handleVolunteerAssign}
              onUpdateStatus={updateDonationStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrackDonation;
