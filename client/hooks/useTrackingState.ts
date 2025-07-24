import { useState, useEffect, useCallback } from "react";
import type { Donation, Volunteer } from "@/components/DonationMap";

export interface TrackingState {
  donations: Donation[];
  volunteers: Volunteer[];
  selectedDonation: string | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface TrackingActions {
  selectDonation: (donationId: string | null) => void;
  assignVolunteer: (donationId: string, volunteerId: string) => Promise<void>;
  updateDonationStatus: (
    donationId: string,
    status: Donation["status"],
  ) => void;
  updateVolunteerLocation: (
    volunteerId: string,
    location: { lat: number; lng: number },
  ) => void;
  addDonation: (
    donation: Omit<Donation, "id" | "createdAt" | "status">,
  ) => void;
  refreshData: () => Promise<void>;
}

// Simulated data for demonstration
const mockDonations: Donation[] = [
  {
    id: "1",
    donorName: "Rajesh Kumar",
    location: {
      lat: 28.6129,
      lng: 77.2295,
      address: "Connaught Place, New Delhi",
    },
    foodQuantity: "50-100 people",
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    status: "assigned",
    eventType: "wedding",
    description: "Fresh vegetarian meals from wedding ceremony",
    volunteer: {
      id: "v1",
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      estimatedArrival: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins
      currentLocation: {
        lat: 28.62,
        lng: 77.23,
      },
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "2",
    donorName: "Mumbai Caterers Ltd",
    location: {
      lat: 28.5355,
      lng: 77.391,
      address: "Sector 18, Noida",
    },
    foodQuantity: "100+ people",
    expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
    status: "in_transit",
    eventType: "corporate",
    description: "Mixed cuisine corporate lunch leftovers",
    volunteer: {
      id: "v2",
      name: "Amit Singh",
      phone: "+91 87654 32109",
      estimatedArrival: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 mins
      currentLocation: {
        lat: 28.54,
        lng: 77.385,
      },
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: "3",
    donorName: "Golden Temple Restaurant",
    location: {
      lat: 28.6692,
      lng: 77.4538,
      address: "Laxmi Nagar, Delhi",
    },
    foodQuantity: "25-50 people",
    expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    status: "pending",
    eventType: "pooja",
    description: "Traditional vegetarian feast from religious ceremony",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
  },
  {
    id: "4",
    donorName: "Delhi University",
    location: {
      lat: 28.6863,
      lng: 77.2217,
      address: "North Campus, Delhi University",
    },
    foodQuantity: "100+ people",
    expiryTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
    status: "delivered",
    eventType: "other",
    description: "Student event catering surplus",
    volunteer: {
      id: "v3",
      name: "Ravi Gupta",
      phone: "+91 76543 21098",
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
];

const mockVolunteers: Volunteer[] = [
  {
    id: "v1",
    name: "Priya Sharma",
    location: { lat: 28.62, lng: 77.23 },
    isAvailable: false,
    activeDeliveries: 1,
    rating: 4.8,
  },
  {
    id: "v2",
    name: "Amit Singh",
    location: { lat: 28.54, lng: 77.385 },
    isAvailable: false,
    activeDeliveries: 1,
    rating: 4.6,
  },
  {
    id: "v3",
    name: "Ravi Gupta",
    location: { lat: 28.6863, lng: 77.2217 },
    isAvailable: true,
    activeDeliveries: 0,
    rating: 4.9,
  },
  {
    id: "v4",
    name: "Sunita Devi",
    location: { lat: 28.6139, lng: 77.209 },
    isAvailable: true,
    activeDeliveries: 0,
    rating: 4.7,
  },
  {
    id: "v5",
    name: "Vikash Kumar",
    location: { lat: 28.5244, lng: 77.1855 },
    isAvailable: true,
    activeDeliveries: 0,
    rating: 4.5,
  },
];

export const useTrackingState = (): TrackingState & TrackingActions => {
  const [state, setState] = useState<TrackingState>({
    donations: mockDonations,
    volunteers: mockVolunteers,
    selectedDonation: null,
    isLoading: false,
    error: null,
    lastUpdated: new Date(),
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const updatedDonations = prev.donations.map((donation) => {
          // Simulate volunteer movement for in-transit deliveries
          if (
            donation.status === "in_transit" &&
            donation.volunteer?.currentLocation
          ) {
            const newLat =
              donation.volunteer.currentLocation.lat +
              (Math.random() - 0.5) * 0.001;
            const newLng =
              donation.volunteer.currentLocation.lng +
              (Math.random() - 0.5) * 0.001;

            return {
              ...donation,
              volunteer: {
                ...donation.volunteer,
                currentLocation: { lat: newLat, lng: newLng },
              },
            };
          }
          return donation;
        });

        // Simulate status changes occasionally
        if (Math.random() < 0.1) {
          // 10% chance every interval
          const pendingDonations = updatedDonations.filter(
            (d) => d.status === "pending",
          );
          if (pendingDonations.length > 0) {
            const randomDonation =
              pendingDonations[
                Math.floor(Math.random() * pendingDonations.length)
              ];
            const availableVolunteers = prev.volunteers.filter(
              (v) => v.isAvailable,
            );

            if (availableVolunteers.length > 0) {
              const assignedVolunteer = availableVolunteers[0];

              return {
                ...prev,
                donations: updatedDonations.map((d) =>
                  d.id === randomDonation.id
                    ? {
                        ...d,
                        status: "assigned" as const,
                        volunteer: {
                          id: assignedVolunteer.id,
                          name: assignedVolunteer.name,
                          phone: "+91 98765 43210",
                          estimatedArrival: new Date(
                            Date.now() + 30 * 60 * 1000,
                          ).toISOString(),
                          currentLocation: assignedVolunteer.location,
                        },
                      }
                    : d,
                ),
                volunteers: prev.volunteers.map((v) =>
                  v.id === assignedVolunteer.id
                    ? {
                        ...v,
                        isAvailable: false,
                        activeDeliveries: v.activeDeliveries + 1,
                      }
                    : v,
                ),
                lastUpdated: new Date(),
              };
            }
          }
        }

        return {
          ...prev,
          donations: updatedDonations,
          lastUpdated: new Date(),
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const selectDonation = useCallback((donationId: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedDonation: donationId,
    }));
  }, []);

  const assignVolunteer = useCallback(
    async (donationId: string, volunteerId: string) => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setState((prev) => {
          const volunteer = prev.volunteers.find((v) => v.id === volunteerId);
          if (!volunteer) throw new Error("Volunteer not found");

          return {
            ...prev,
            donations: prev.donations.map((d) =>
              d.id === donationId
                ? {
                    ...d,
                    status: "assigned" as const,
                    volunteer: {
                      id: volunteer.id,
                      name: volunteer.name,
                      phone: "+91 98765 43210",
                      estimatedArrival: new Date(
                        Date.now() + 30 * 60 * 1000,
                      ).toISOString(),
                      currentLocation: volunteer.location,
                    },
                  }
                : d,
            ),
            volunteers: prev.volunteers.map((v) =>
              v.id === volunteerId
                ? {
                    ...v,
                    isAvailable: false,
                    activeDeliveries: v.activeDeliveries + 1,
                  }
                : v,
            ),
            isLoading: false,
            lastUpdated: new Date(),
          };
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to assign volunteer",
        }));
      }
    },
    [],
  );

  const updateDonationStatus = useCallback(
    (donationId: string, status: Donation["status"]) => {
      setState((prev) => ({
        ...prev,
        donations: prev.donations.map((d) =>
          d.id === donationId ? { ...d, status } : d,
        ),
        lastUpdated: new Date(),
      }));
    },
    [],
  );

  const updateVolunteerLocation = useCallback(
    (volunteerId: string, location: { lat: number; lng: number }) => {
      setState((prev) => ({
        ...prev,
        volunteers: prev.volunteers.map((v) =>
          v.id === volunteerId ? { ...v, location } : v,
        ),
        donations: prev.donations.map((d) =>
          d.volunteer?.id === volunteerId
            ? {
                ...d,
                volunteer: {
                  ...d.volunteer,
                  currentLocation: location,
                },
              }
            : d,
        ),
        lastUpdated: new Date(),
      }));
    },
    [],
  );

  const addDonation = useCallback(
    (donationData: Omit<Donation, "id" | "createdAt" | "status">) => {
      setState((prev) => ({
        ...prev,
        donations: [
          ...prev.donations,
          {
            ...donationData,
            id: Date.now().toString(),
            status: "pending" as const,
            createdAt: new Date().toISOString(),
          },
        ],
        lastUpdated: new Date(),
      }));
    },
    [],
  );

  const refreshData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API refresh
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setState((prev) => ({
        ...prev,
        isLoading: false,
        lastUpdated: new Date(),
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to refresh data",
      }));
    }
  }, []);

  return {
    ...state,
    selectDonation,
    assignVolunteer,
    updateDonationStatus,
    updateVolunteerLocation,
    addDonation,
    refreshData,
  };
};
