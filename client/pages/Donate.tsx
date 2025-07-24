import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Users,
  Utensils,
  Navigation2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useLocationService } from "@/lib/locationService";

const Donate = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    eventType: "",
    foodQuantity: "",
    expiryTime: "",
    location: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const locationService = useLocationService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.contact ||
      !formData.eventType ||
      !formData.foodQuantity ||
      !formData.expiryTime ||
      !formData.location
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      toast.success(
        "Donation request submitted successfully! Visit the Track page to monitor your donation progress.",
      );

      // Reset form
      setFormData({
        name: "",
        contact: "",
        eventType: "",
        foodQuantity: "",
        expiryTime: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast.error("Failed to submit donation request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);

    try {
      const result = await locationService.getCurrentLocation();
      setCurrentLocation(result.coordinates);
      handleInputChange("location", result.address.formatted);
      toast.success("Location detected successfully!");
    } catch (error) {
      console.error("Error getting location:", error);
      toast.error("Unable to get your location. Please enter it manually.");
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F837ca86e721243b8a2189f35e3fd15fa?format=webp&width=800)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Donate Food & Make a Difference
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Have surplus food from an event? Don't let it go to waste. Help us
            feed those in need in your community by sharing details about your
            food donation.
          </p>
        </div>
      </section>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">
                  Food Donation Form
                </CardTitle>
                <CardDescription>
                  Fill out the details below and we'll connect you with
                  volunteers to collect the food.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact Number *</Label>
                      <Input
                        id="contact"
                        value={formData.contact}
                        onChange={(e) =>
                          handleInputChange("contact", e.target.value)
                        }
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("eventType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="pooja">
                          Pooja/Religious Ceremony
                        </SelectItem>
                        <SelectItem value="party">
                          Birthday/Anniversary Party
                        </SelectItem>
                        <SelectItem value="corporate">
                          Corporate Event
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="foodQuantity">Food Quantity *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("foodQuantity", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Estimate serving size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10-25">10-25 people</SelectItem>
                          <SelectItem value="25-50">25-50 people</SelectItem>
                          <SelectItem value="50-100">50-100 people</SelectItem>
                          <SelectItem value="100+">100+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expiryTime">Best Before *</Label>
                      <Input
                        id="expiryTime"
                        type="datetime-local"
                        value={formData.expiryTime}
                        onChange={(e) =>
                          handleInputChange("expiryTime", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Pickup Location *</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        placeholder="Enter complete address"
                        required
                      />
                      <Button
                        type="button"
                        className="shrink-0 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        onClick={handleGetCurrentLocation}
                        disabled={isGettingLocation}
                      >
                        {isGettingLocation ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Navigation2 className="h-4 w-4 mr-2" />
                        )}
                        {isGettingLocation ? "Getting..." : "Use GPS"}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Click "Use GPS" to automatically detect your current
                      location
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description">Food Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Describe the type of food, any dietary restrictions, special instructions..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Donation Request"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <Clock className="h-5 w-5 mr-2" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-sm">Submit your food donation details</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="text-sm">
                      We match you with nearby volunteers
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="text-sm">
                      Volunteer collects and delivers food
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <p className="text-sm">
                      You receive confirmation of delivery
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700">
                    <Users className="h-5 w-5 mr-2" />
                    Impact Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-amber-700">
                        2,500+
                      </div>
                      <div className="text-sm text-amber-600">
                        Meals Donated
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-700">
                        150+
                      </div>
                      <div className="text-sm text-amber-600">Volunteers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-700">
                        50+
                      </div>
                      <div className="text-sm text-amber-600">Events</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-700">
                        25+
                      </div>
                      <div className="text-sm text-amber-600">NGOs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Utensils className="h-5 w-5 mr-2" />
                    Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-red-600">
                    • Food should be fresh and safe for consumption
                  </p>
                  <p className="text-sm text-red-600">
                    • Provide accurate expiry/best before time
                  </p>
                  <p className="text-sm text-red-600">
                    • Ensure proper packaging if possible
                  </p>
                  <p className="text-sm text-red-600">
                    • Be available for volunteer coordination
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Track Your Donation
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                After submitting your donation, you can track its progress in
                real-time. See when volunteers are assigned, food is picked up,
                and successfully delivered.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <Link to="/track">
                  <MapPin className="h-4 w-4 mr-2" />
                  Visit Tracking Page
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
