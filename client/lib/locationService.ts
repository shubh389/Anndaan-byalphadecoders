export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  formatted: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface LocationResult {
  coordinates: Coordinates;
  address: Address;
  accuracy?: number;
}

export interface GeolocationError {
  code: number;
  message: string;
  type:
    | "PERMISSION_DENIED"
    | "POSITION_UNAVAILABLE"
    | "TIMEOUT"
    | "GEOCODING_ERROR";
}

// Default coordinates for Delhi, India
const DEFAULT_COORDINATES: Coordinates = {
  lat: 28.6139,
  lng: 77.209,
};

export class LocationService {
  private static instance: LocationService;
  private watchId: number | null = null;

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Get current user location using browser geolocation API
   */
  public async getCurrentLocation(): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({
          code: 0,
          message: "Geolocation is not supported by this browser",
          type: "POSITION_UNAVAILABLE",
        } as GeolocationError);
        return;
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000, // Cache for 1 minute
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          try {
            const address = await this.reverseGeocode(coordinates);
            resolve({
              coordinates,
              address,
              accuracy: position.coords.accuracy,
            });
          } catch (error) {
            // If reverse geocoding fails, still return coordinates
            resolve({
              coordinates,
              address: {
                formatted: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
              },
            });
          }
        },
        (error) => {
          let errorType: GeolocationError["type"];
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorType = "PERMISSION_DENIED";
              break;
            case error.POSITION_UNAVAILABLE:
              errorType = "POSITION_UNAVAILABLE";
              break;
            case error.TIMEOUT:
              errorType = "TIMEOUT";
              break;
            default:
              errorType = "POSITION_UNAVAILABLE";
          }

          reject({
            code: error.code,
            message: error.message,
            type: errorType,
          } as GeolocationError);
        },
        options,
      );
    });
  }

  /**
   * Watch user location for real-time tracking
   */
  public watchLocation(
    onLocationUpdate: (result: LocationResult) => void,
    onError: (error: GeolocationError) => void,
  ): () => void {
    if (!navigator.geolocation) {
      onError({
        code: 0,
        message: "Geolocation is not supported by this browser",
        type: "POSITION_UNAVAILABLE",
      });
      return () => {};
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000, // Cache for 30 seconds for real-time tracking
    };

    this.watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const coordinates: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        try {
          const address = await this.reverseGeocode(coordinates);
          onLocationUpdate({
            coordinates,
            address,
            accuracy: position.coords.accuracy,
          });
        } catch (error) {
          onLocationUpdate({
            coordinates,
            address: {
              formatted: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
            },
          });
        }
      },
      (error) => {
        let errorType: GeolocationError["type"];
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorType = "PERMISSION_DENIED";
            break;
          case error.POSITION_UNAVAILABLE:
            errorType = "POSITION_UNAVAILABLE";
            break;
          case error.TIMEOUT:
            errorType = "TIMEOUT";
            break;
          default:
            errorType = "POSITION_UNAVAILABLE";
        }

        onError({
          code: error.code,
          message: error.message,
          type: errorType,
        });
      },
      options,
    );

    // Return cleanup function
    return () => {
      if (this.watchId !== null) {
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
      }
    };
  }

  /**
   * Convert address string to coordinates (Forward Geocoding)
   * Using a simplified mock implementation - in production, use a real geocoding service
   */
  public async geocodeAddress(address: string): Promise<LocationResult> {
    try {
      // Mock geocoding service - replace with real API (Google Maps, Mapbox, etc.)
      const mockResults = this.getMockGeocodingResults(address);

      if (mockResults.length === 0) {
        throw new Error("No results found for the given address");
      }

      return mockResults[0];
    } catch (error) {
      throw {
        code: 0,
        message: error instanceof Error ? error.message : "Geocoding failed",
        type: "GEOCODING_ERROR",
      } as GeolocationError;
    }
  }

  /**
   * Convert coordinates to address (Reverse Geocoding)
   * Using a simplified mock implementation - in production, use a real geocoding service
   */
  public async reverseGeocode(coordinates: Coordinates): Promise<Address> {
    try {
      // Mock reverse geocoding - replace with real API
      return this.getMockReverseGeocodingResult(coordinates);
    } catch (error) {
      throw {
        code: 0,
        message: "Reverse geocoding failed",
        type: "GEOCODING_ERROR",
      } as GeolocationError;
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  public calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(coord2.lat - coord1.lat);
    const dLng = this.deg2rad(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(coord1.lat)) *
        Math.cos(this.deg2rad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Get estimated travel time between two coordinates
   */
  public getEstimatedTravelTime(
    coord1: Coordinates,
    coord2: Coordinates,
  ): number {
    const distance = this.calculateDistance(coord1, coord2);
    // Assume average speed of 25 km/h in urban areas
    const averageSpeed = 25;
    const timeInHours = distance / averageSpeed;
    return Math.ceil(timeInHours * 60); // Return time in minutes, rounded up
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private getMockGeocodingResults(address: string): LocationResult[] {
    // Mock data for common Delhi addresses
    const mockLocations: { [key: string]: LocationResult } = {
      "connaught place": {
        coordinates: { lat: 28.6315, lng: 77.2167 },
        address: {
          formatted: "Connaught Place, New Delhi, Delhi 110001, India",
          street: "Connaught Place",
          city: "New Delhi",
          state: "Delhi",
          country: "India",
          postalCode: "110001",
        },
      },
      "india gate": {
        coordinates: { lat: 28.6129, lng: 77.2295 },
        address: {
          formatted: "India Gate, Rajpath, New Delhi, Delhi 110004, India",
          street: "Rajpath",
          city: "New Delhi",
          state: "Delhi",
          country: "India",
          postalCode: "110004",
        },
      },
      "red fort": {
        coordinates: { lat: 28.6562, lng: 77.241 },
        address: {
          formatted:
            "Red Fort, Netaji Subhash Marg, Chandni Chowk, New Delhi, Delhi 110006, India",
          street: "Netaji Subhash Marg",
          city: "New Delhi",
          state: "Delhi",
          country: "India",
          postalCode: "110006",
        },
      },
      "laxmi nagar": {
        coordinates: { lat: 28.6692, lng: 77.4538 },
        address: {
          formatted: "Laxmi Nagar, Delhi 110092, India",
          street: "Laxmi Nagar",
          city: "Delhi",
          state: "Delhi",
          country: "India",
          postalCode: "110092",
        },
      },
      noida: {
        coordinates: { lat: 28.5355, lng: 77.391 },
        address: {
          formatted: "Noida, Uttar Pradesh, India",
          city: "Noida",
          state: "Uttar Pradesh",
          country: "India",
        },
      },
    };

    const normalizedAddress = address.toLowerCase().trim();

    // Check for exact matches first
    for (const [key, location] of Object.entries(mockLocations)) {
      if (normalizedAddress.includes(key)) {
        return [location];
      }
    }

    // If no matches found, return a random Delhi location
    return [
      {
        coordinates: {
          lat: DEFAULT_COORDINATES.lat + (Math.random() - 0.5) * 0.1,
          lng: DEFAULT_COORDINATES.lng + (Math.random() - 0.5) * 0.1,
        },
        address: {
          formatted: `${address}, Delhi, India`,
          street: address,
          city: "Delhi",
          state: "Delhi",
          country: "India",
        },
      },
    ];
  }

  private getMockReverseGeocodingResult(coordinates: Coordinates): Address {
    // Simple mock reverse geocoding
    const areas = [
      "Connaught Place",
      "Karol Bagh",
      "Lajpat Nagar",
      "Khan Market",
      "Saket",
      "Vasant Kunj",
      "Dwarka",
      "Rohini",
      "Pitampura",
      "Janakpuri",
    ];

    const randomArea = areas[Math.floor(Math.random() * areas.length)];

    return {
      formatted: `Near ${randomArea}, New Delhi, Delhi, India`,
      street: randomArea,
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      postalCode: `1100${Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, "0")}`,
    };
  }
}

// Hook for using location service in React components
export const useLocationService = () => {
  return LocationService.getInstance();
};
