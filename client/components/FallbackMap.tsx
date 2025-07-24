import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  User,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Donation, Volunteer } from "./DonationMap";

interface FallbackMapProps {
  donations: Donation[];
  volunteers: Volunteer[];
  selectedDonation?: string;
  onDonationSelect: (donationId: string) => void;
  className?: string;
}

const FallbackMap: React.FC<FallbackMapProps> = ({
  donations,
  volunteers,
  selectedDonation,
  onDonationSelect,
  className,
}) => {
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
        return <Clock className="h-4 w-4" />;
      case "assigned":
        return <User className="h-4 w-4" />;
      case "in_transit":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
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

  const getTimeRemaining = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      {/* Fallback Map Display */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold">
              Tracking Interface
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                Simplified Mode
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border overflow-hidden">
              {/* Header */}
              <div className="absolute top-4 left-4 right-4 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Live Tracking Overview
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          "https://console.cloud.google.com/google/maps-apis",
                          "_blank",
                        )
                      }
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Get Maps API
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure Google Maps API for full interactive map
                    experience
                  </p>
                </div>
              </div>

              {/* Map Content Area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md mx-4">
                  {/* Geographic Overview */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                    <div className="text-center mb-4">
                      <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">
                        Delhi NCR Region
                      </h4>
                      <p className="text-sm text-gray-600">
                        Food Donation Network
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-700">
                          {
                            donations.filter((d) => d.status === "pending")
                              .length
                          }
                        </div>
                        <div className="text-xs text-yellow-600">Pending</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-700">
                          {
                            donations.filter((d) => d.status === "assigned")
                              .length
                          }
                        </div>
                        <div className="text-xs text-blue-600">Assigned</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-orange-700">
                          {
                            donations.filter((d) => d.status === "in_transit")
                              .length
                          }
                        </div>
                        <div className="text-xs text-orange-600">
                          In Transit
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-700">
                          {
                            donations.filter((d) => d.status === "delivered")
                              .length
                          }
                        </div>
                        <div className="text-xs text-green-600">Delivered</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                      <span>Pending Pickup</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                      <span>Assigned</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                      <span>In Transit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Details Panel */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Donations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className={cn(
                  "p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                  selectedDonation === donation.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200",
                )}
                onClick={() => onDonationSelect(donation.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        getStatusColor(donation.status),
                      )}
                    ></div>
                    <span className="font-medium text-sm">
                      {donation.donorName}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="flex items-center text-xs"
                  >
                    {getStatusIcon(donation.status)}
                    <span className="ml-1 capitalize">
                      {donation.status.replace("_", " ")}
                    </span>
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Package className="h-3 w-3 mr-1" />
                    <span>{donation.foodQuantity}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">
                      {donation.location.address}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      Expires in {getTimeRemaining(donation.expiryTime)}
                    </span>
                  </div>
                </div>

                {donation.volunteer && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                    <div className="font-medium">
                      Volunteer: {donation.volunteer.name}
                    </div>
                    {donation.volunteer.estimatedArrival && (
                      <div className="text-gray-600">
                        ETA:{" "}
                        {new Date(
                          donation.volunteer.estimatedArrival,
                        ).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Network Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {donations.length}
                </div>
                <div className="text-xs text-gray-600">Total Donations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {volunteers.filter((v) => v.isAvailable).length}
                </div>
                <div className="text-xs text-gray-600">
                  Available Volunteers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {donations.filter((d) => d.status === "in_transit").length}
                </div>
                <div className="text-xs text-gray-600">Active Deliveries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    (donations.filter((d) => d.status === "delivered").length /
                      donations.length) *
                      100,
                  ) || 0}
                  %
                </div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FallbackMap;
