import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import FallbackMap from "./FallbackMap";
import GoogleMapsSingleton from "@/lib/googleMapsSingleton";
import type { Donation, Volunteer } from "./DonationMap";

interface GoogleMapsTrackerProps {
  donations: Donation[];
  volunteers: Volunteer[];
  selectedDonation?: string;
  onDonationSelect: (donationId: string) => void;
  onVolunteerAssign: (donationId: string, volunteerId: string) => void;
  className?: string;
}

// Google Maps types
declare global {
  interface Window {
    google: any;
    initGoogleMap: () => void;
  }
}

const GoogleMapsTracker: React.FC<GoogleMapsTrackerProps> = ({
  donations,
  volunteers,
  selectedDonation,
  onDonationSelect,
  onVolunteerAssign,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Google Maps API Key - In production, use environment variable
  const GOOGLE_MAPS_API_KEY = "AIzaSyBlrIfMHqq-Pz97wPr1XRGJkxuGBbTmKPs"; // Your actual Google Maps API key

  // Get global maps singleton instance
  const mapsSingleton = GoogleMapsSingleton.getInstance();

  const getStatusColor = (status: Donation["status"]) => {
    switch (status) {
      case "pending":
        return "#eab308"; // yellow-500
      case "assigned":
        return "#3b82f6"; // blue-500
      case "in_transit":
        return "#f97316"; // orange-500
      case "delivered":
        return "#22c55e"; // green-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  const getStatusIcon = (status: Donation["status"]) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "assigned":
        return "👤";
      case "in_transit":
        return "🚚";
      case "delivered":
        return "✅";
      default:
        return "❓";
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

  // Initialize Google Map
  const initializeMap = useCallback(() => {
    if (!mapsSingleton.isLoaded() || !mapRef.current) {
      setMapError("Google Maps API not available");
      setIsLoadingMap(false);
      return;
    }

    try {
      const defaultCenter = userLocation || { lat: 28.6139, lng: 77.209 }; // Delhi default

      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        mapTypeId: "roadmap",
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      setIsMapLoaded(true);
      setIsLoadingMap(false);
      setMapError(null);
      console.log("Google Maps initialized successfully");
    } catch (error: any) {
      console.error("Error initializing Google Maps:", error);

      // Handle specific API errors
      let errorMessage = "Failed to initialize Google Maps";
      if (error.message) {
        if (error.message.includes("ApiNotActivatedMapError")) {
          errorMessage =
            "Google Maps API not activated. Please enable the Maps JavaScript API in Google Cloud Console.";
        } else if (error.message.includes("API key")) {
          errorMessage =
            "Invalid Google Maps API key. Please check your API key configuration.";
        } else {
          errorMessage = `Google Maps error: ${error.message}`;
        }
      }

      setMapError(errorMessage);
      setIsLoadingMap(false);
    }
  }, [userLocation]);

  // Load Google Maps API using singleton
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Use singleton to load Google Maps (prevents all duplicates)
        await mapsSingleton.loadGoogleMaps(GOOGLE_MAPS_API_KEY);

        // Initialize map after successful load
        initializeMap();
      } catch (error) {
        console.error("Google Maps loading error:", error);
        if (error instanceof Error) {
          setMapError(error.message);
        } else {
          setMapError("Failed to load Google Maps API");
        }
        setIsLoadingMap(false);
      }
    };

    // Check if already loaded
    if (mapsSingleton.isLoaded()) {
      initializeMap();
      return;
    }

    // Check if currently loading
    if (mapsSingleton.isLoading()) {
      // Wait for current loading to complete
      const checkInterval = setInterval(() => {
        if (mapsSingleton.isLoaded()) {
          clearInterval(checkInterval);
          initializeMap();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        if (!mapsSingleton.isLoaded()) {
          setMapError("Google Maps loading timeout");
          setIsLoadingMap(false);
        }
      }, 30000);

      return;
    }

    // Start loading
    loadGoogleMaps();

    // Create unique callback name
    const callbackName = `initGoogleMap_${Date.now()}`;
    (window as any)[callbackName] = initializeMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=${callbackName}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-google-maps-loader", "true");
    script.setAttribute("data-loading-handled", "true");
    script.onerror = () => {
      setMapError("Failed to load Google Maps API. Please check your API key.");
      setIsLoadingMap(false);
      console.error("Failed to load Google Maps API");
    };

    document.head.appendChild(script);
  }, [initializeMap]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Error getting location:", error);
        },
      );
    }
  }, []);

  // Update markers when data changes
  useEffect(() => {
    if (!isMapLoaded || !googleMapRef.current) return;

    // Validate that googleMapRef.current is a valid Google Maps instance
    if (!mapsSingleton.isValidMapInstance(googleMapRef.current)) {
      console.error("Invalid Google Maps instance");
      return;
    }

    // Clear existing markers safely
    markersRef.current.forEach((marker) => {
      try {
        if (marker && typeof marker.setMap === "function") {
          marker.setMap(null);
        }
      } catch (error) {
        console.warn("Error clearing marker:", error);
      }
    });
    markersRef.current = [];

    // Add user location marker
    if (userLocation) {
      try {
        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          map: googleMapRef.current,
          title: "Your Location",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#3b82f6",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });
        markersRef.current.push(userMarker);
      } catch (error) {
        console.warn("Error creating user location marker:", error);
      }
    }

    // Add donation markers
    donations.forEach((donation) => {
      try {
        const marker = new window.google.maps.Marker({
          position: { lat: donation.location.lat, lng: donation.location.lng },
          map: googleMapRef.current,
          title: `${donation.donorName} - ${donation.foodQuantity}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: selectedDonation === donation.id ? 12 : 10,
            fillColor: getStatusColor(donation.status),
            fillOpacity: 0.9,
            strokeColor:
              selectedDonation === donation.id ? "#1f2937" : "#ffffff",
            strokeWeight: selectedDonation === donation.id ? 3 : 2,
          },
        });

        // Create info window for donations
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
          <div style="max-width: 250px; padding: 8px;">
            <div style="font-weight: bold; color: #1f2937; margin-bottom: 4px;">
              ${getStatusIcon(donation.status)} ${donation.donorName}
            </div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">
              📦 ${donation.foodQuantity}
            </div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">
              📍 ${donation.location.address}
            </div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
              ⏰ Expires in ${getTimeRemaining(donation.expiryTime)}
            </div>
            <div style="background: ${getStatusColor(donation.status)}20; color: ${getStatusColor(donation.status)}; padding: 4px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              ${donation.status.replace("_", " ")}
            </div>
            ${
              donation.volunteer
                ? `
              <div style="margin-top: 8px; padding: 8px; background: #eff6ff; border-radius: 4px; border-left: 3px solid #3b82f6;">
                <div style="font-size: 12px; font-weight: bold; color: #1e40af;">Volunteer Assigned</div>
                <div style="font-size: 12px; color: #3730a3;">${donation.volunteer.name}</div>
              </div>
            `
                : ""
            }
          </div>
        `,
        });

        marker.addListener("click", () => {
          onDonationSelect(donation.id);
          infoWindow.open(googleMapRef.current, marker);
        });

        markersRef.current.push(marker);
      } catch (error) {
        console.warn(
          `Error creating marker for donation ${donation.id}:`,
          error,
        );
      }
    });

    // Add volunteer markers
    volunteers.forEach((volunteer) => {
      try {
        const marker = new window.google.maps.Marker({
          position: {
            lat: volunteer.location.lat,
            lng: volunteer.location.lng,
          },
          map: googleMapRef.current,
          title: `${volunteer.name} - ${volunteer.isAvailable ? "Available" : "Busy"}`,
          icon: {
            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: volunteer.isAvailable ? "#22c55e" : "#6b7280",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 1,
            rotation: 0,
          },
        });

        // Create info window for volunteers
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
          <div style="max-width: 200px; padding: 8px;">
            <div style="font-weight: bold; color: #1f2937; margin-bottom: 4px;">
              🚶 ${volunteer.name}
            </div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">
              ⭐ Rating: ${volunteer.rating}/5
            </div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
              📦 Active deliveries: ${volunteer.activeDeliveries}
            </div>
            <div style="background: ${volunteer.isAvailable ? "#22c55e" : "#6b7280"}20; color: ${volunteer.isAvailable ? "#22c55e" : "#6b7280"}; padding: 4px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              ${volunteer.isAvailable ? "Available" : "Busy"}
            </div>
          </div>
        `,
        });

        marker.addListener("click", () => {
          infoWindow.open(googleMapRef.current, marker);
        });

        markersRef.current.push(marker);
      } catch (error) {
        console.warn(
          `Error creating marker for volunteer ${volunteer.id}:`,
          error,
        );
      }
    });

    // Add route lines for in-transit deliveries
    donations
      .filter((d) => d.status === "in_transit" && d.volunteer?.currentLocation)
      .forEach((donation) => {
        if (donation.volunteer?.currentLocation) {
          const routePath = new window.google.maps.Polyline({
            path: [
              {
                lat: donation.volunteer.currentLocation.lat,
                lng: donation.volunteer.currentLocation.lng,
              },
              { lat: donation.location.lat, lng: donation.location.lng },
            ],
            geodesic: true,
            strokeColor: "#f97316",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            map: googleMapRef.current,
          });
          markersRef.current.push(routePath);
        }
      });
  }, [
    isMapLoaded,
    donations,
    volunteers,
    selectedDonation,
    userLocation,
    onDonationSelect,
  ]);

  // Auto-fit bounds when donations change
  useEffect(() => {
    if (!isMapLoaded || !googleMapRef.current || donations.length === 0) return;

    // Validate Google Maps is available
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not available for bounds calculation");
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();

    donations.forEach((donation) => {
      bounds.extend(
        new window.google.maps.LatLng(
          donation.location.lat,
          donation.location.lng,
        ),
      );
    });

    volunteers.forEach((volunteer) => {
      bounds.extend(
        new window.google.maps.LatLng(
          volunteer.location.lat,
          volunteer.location.lng,
        ),
      );
    });

    if (userLocation) {
      bounds.extend(
        new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
      );
    }

    // Validate map instance before calling fitBounds
    if (!mapsSingleton.isValidMapInstance(googleMapRef.current)) {
      console.error("Invalid Google Maps instance for fitBounds");
      return;
    }

    try {
      // Only fitBounds if we have valid bounds
      if (!bounds.isEmpty()) {
        googleMapRef.current.fitBounds(bounds);
      }
    } catch (error) {
      console.warn("Error fitting bounds:", error);
    }
  }, [isMapLoaded, donations, volunteers, userLocation]);

  // If there's a map error, use the fallback component
  if (mapError) {
    return (
      <FallbackMap
        donations={donations}
        volunteers={volunteers}
        selectedDonation={selectedDonation}
        onDonationSelect={onDonationSelect}
        className={className}
      />
    );
  }

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      {/* Google Map Display */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold">
              Live Google Maps Tracking
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Google Maps
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 rounded-lg border overflow-hidden">
              {isLoadingMap && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Loading Google Maps...</p>
                  </div>
                </div>
              )}
              <div
                ref={mapRef}
                className="w-full h-full"
                style={{ display: isLoadingMap ? "none" : "block" }}
              />
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
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-green-500 mr-2"></div>
                <span>Available Volunteer</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span>Your Location</span>
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
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: getStatusColor(donation.status),
                      }}
                    ></div>
                    <span className="font-medium text-sm">
                      {donation.donorName}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="flex items-center text-xs"
                  >
                    <span className="mr-1">
                      {getStatusIcon(donation.status)}
                    </span>
                    <span className="capitalize">
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

export default GoogleMapsTracker;
