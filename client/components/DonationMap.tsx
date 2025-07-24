import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Donation {
  id: string;
  donorName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  foodQuantity: string;
  expiryTime: string;
  status: "pending" | "assigned" | "in_transit" | "delivered";
  eventType: string;
  description: string;
  volunteer?: {
    id: string;
    name: string;
    phone: string;
    estimatedArrival?: string;
    currentLocation?: {
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
}

export interface Volunteer {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  isAvailable: boolean;
  activeDeliveries: number;
  rating: number;
}

interface DonationMapProps {
  donations: Donation[];
  volunteers: Volunteer[];
  selectedDonation?: string;
  onDonationSelect: (donationId: string) => void;
  onVolunteerAssign: (donationId: string, volunteerId: string) => void;
  className?: string;
}

const DonationMap: React.FC<DonationMapProps> = ({
  donations,
  volunteers,
  selectedDonation,
  onDonationSelect,
  onVolunteerAssign,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.209 }); // Delhi default
  const [zoom, setZoom] = useState(12);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Error getting location:", error);
        },
      );
    }
  }, []);

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

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371; // Earth's radius in km
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

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      {/* Map Display */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold">
              Live Tracking Map
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Badge variant="secondary" className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Simplified map representation */}
            <div
              ref={mapRef}
              className="relative w-full h-96 bg-gray-100 rounded-lg border overflow-hidden"
            >
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="#000"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* User Location */}
              {userLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -inset-2 bg-blue-200 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              )}

              {/* Donation Markers */}
              {donations.map((donation, index) => (
                <div
                  key={donation.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  style={{
                    left: `${30 + (index % 3) * 25}%`,
                    top: `${25 + Math.floor(index / 3) * 20}%`,
                  }}
                  onClick={() => onDonationSelect(donation.id)}
                >
                  <div
                    className={cn(
                      "relative group",
                      selectedDonation === donation.id && "scale-110",
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transition-all",
                        getStatusColor(donation.status),
                        selectedDonation === donation.id &&
                          "ring-4 ring-blue-300",
                      )}
                    >
                      <Package className="h-4 w-4" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {donation.donorName} - {donation.foodQuantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Volunteer Markers */}
              {volunteers.map((volunteer, index) => (
                <div
                  key={volunteer.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${70 + Math.floor(index / 4) * 15}%`,
                  }}
                >
                  <div className="relative group">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shadow-lg",
                        volunteer.isAvailable
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-gray-200",
                      )}
                    >
                      <User className="h-3 w-3" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {volunteer.name} -{" "}
                        {volunteer.isAvailable ? "Available" : "Busy"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Route Lines for In-Transit Deliveries */}
              {donations
                .filter(
                  (d) =>
                    d.status === "in_transit" && d.volunteer?.currentLocation,
                )
                .map((donation) => (
                  <svg
                    key={`route-${donation.id}`}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <line
                      x1="40%"
                      y1="60%"
                      x2="60%"
                      y2="40%"
                      stroke="#f97316"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>
                ))}
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Pending Pickup</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Assigned</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span>In Transit</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Delivered</span>
              </div>
              <div className="flex items-center">
                <User className="w-3 h-3 text-green-500 mr-2" />
                <span>Available Volunteer</span>
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
                    <span className="ml-1 capitalize">{donation.status}</span>
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
                  {userLocation && (
                    <div className="flex items-center">
                      <Navigation className="h-3 w-3 mr-1" />
                      <span>
                        {calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          donation.location.lat,
                          donation.location.lng,
                        )}
                        km away
                      </span>
                    </div>
                  )}
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
            <CardTitle className="text-lg">Today's Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {donations.length}
                </div>
                <div className="text-xs text-gray-600">Active Donations</div>
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
                <div className="text-xs text-gray-600">In Transit</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {donations.filter((d) => d.status === "delivered").length}
                </div>
                <div className="text-xs text-gray-600">Delivered</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationMap;
