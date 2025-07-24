import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Clock,
  User,
  Star,
  Award,
  CheckCircle,
  AlertCircle,
  Navigation,
  Phone,
  Package,
  Heart,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";

interface DonationRequest {
  id: string;
  donorName: string;
  eventType: string;
  foodQuantity: string;
  location: string;
  distance: string;
  expiryTime: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "available" | "accepted" | "completed";
}

interface VolunteerStats {
  totalDeliveries: number;
  points: number;
  rank: number;
  rating: number;
  joinDate: string;
}

const Volunteer = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [volunteerRegistered, setVolunteerRegistered] = useState(true); // Set to false to show registration form

  // Mock data
  const [volunteerStats] = useState<VolunteerStats>({
    totalDeliveries: 23,
    points: 1150,
    rank: 12,
    rating: 4.8,
    joinDate: "March 2024",
  });

  const [donationRequests] = useState<DonationRequest[]>([
    {
      id: "1",
      donorName: "Sharma Wedding Hall",
      eventType: "Wedding",
      foodQuantity: "100+ people",
      location: "Collage More ,Sector-V Kolkata",
      distance: "2.3 km",
      expiryTime: "2024-01-15T20:00",
      description:
        "Freshly prepared vegetarian meals, traditional sweets, and assorted snacks from a grand wedding celebration — available for immediate sharing with those in need",
      priority: "high",
      status: "available",
    },
    {
      id: "2",
      donorName: "Tech Corp Office",
      eventType: "Corporate",
      foodQuantity: "50-100 people",
      location: "Cyber City, kolkata",
      distance: "5.1 km",
      expiryTime: "2024-01-15T18:30",
      description: "Leftover catered lunch featuring a variety of freshly prepared vegetarian and non-vegetarian dishes — perfect for a hearty meal.",
      priority: "medium",
      status: "available",
    },
    {
      id: "3",
      donorName: "Kumar Family",
      eventType: "Pooja",
      foodQuantity: "25-50 people",
      location: "Dum Dum Park, Kolkata",
      distance: "3.7 km",
      expiryTime: "2024-01-15T19:00",
      description: "Traditional prasadam and a wholesome vegetarian feast, freshly prepared and blessed — ready to be shared with those in need.",
      priority: "medium",
      status: "accepted",
    },
  ]);

  const handleAcceptTask = (requestId: string) => {
    console.log("Accepting task:", requestId);
    // TODO: Implement task acceptance logic
  };

  const handleCompleteDelivery = (requestId: string) => {
    console.log("Completing delivery:", requestId);
    // TODO: Implement delivery completion logic
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatTimeRemaining = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  if (!volunteerRegistered) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Become a Food Hero
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Step up, take action, and bring smiles to those in need. <br />
              Join our growing network of volunteers and help rescue surplus food, one meal at a time — right in your neighborhood.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">
                Volunteer Registration
              </CardTitle>
              <CardDescription>
                Sign up to start making a difference in your community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>

                <div>
                  <Label htmlFor="location">Your Location</Label>
                  <Input id="location" placeholder="Enter your city or area" />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setVolunteerRegistered(true);
                  }}
                >
                  Register as Volunteer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Volunteer Dashboard
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Welcome back, Food Hero! 🌟<br />
            Your actions create real impact — ready to rescue food, serve the community, and fight hunger today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Deliveries</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {volunteerStats.totalDeliveries}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-amber-100 rounded-full p-3 mr-4">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Points Earned</p>
                  <p className="text-2xl font-bold text-amber-700">
                    {volunteerStats.points}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Leaderboard Rank</p>
                  <p className="text-2xl font-bold text-green-700">
                    #{volunteerStats.rank}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {volunteerStats.rating}/5
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Available Tasks</TabsTrigger>
            <TabsTrigger value="active">Active Tasks</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Donation Requests
              </h2>
              <Button
                className="border border-orange-300 text-orange-700 hover:bg-orange-50 bg-white"
              >
                <Navigation className="mr-2 h-4 w-4" />
                Refresh Location
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {donationRequests
                .filter((request) => request.status === "available")
                .map((request) => (
                  <Card
                    key={request.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {request.donorName}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.location} • {request.distance} away
                          </CardDescription>
                        </div>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority} priority
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Event Type:</span>
                          <span className="font-medium">
                            {request.eventType}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Food Quantity:</span>
                          <span className="font-medium">
                            {request.foodQuantity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Best Before:
                          </span>
                          <span className="font-medium text-red-600">
                            {formatTimeRemaining(request.expiryTime)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {request.description}
                        </p>
                        <div className="flex space-x-2 pt-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                            onClick={() => handleAcceptTask(request.id)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept Task
                          </Button>
                          <Button className="border border-gray-300 bg-white p-2 rounded-full">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Active Tasks
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {donationRequests
                .filter((request) => request.status === "accepted")
                .map((request) => (
                  <Card
                    key={request.id}
                    className="border-orange-200 bg-orange-50"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-orange-800">
                            {request.donorName}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1 text-orange-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.location} • {request.distance} away
                          </CardDescription>
                        </div>
                        <Badge className="bg-orange-200 text-orange-800 border-orange-300">
                          In Progress
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-orange-700">
                            Food Quantity:
                          </span>
                          <span className="font-medium text-orange-800">
                            {request.foodQuantity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-orange-700 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Time Remaining:
                          </span>
                          <span className="font-medium text-red-600">
                            {formatTimeRemaining(request.expiryTime)}
                          </span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleCompleteDelivery(request.id)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </Button>
                          <Button className="border border-gray-300 bg-white p-2 rounded-full">
                            <Navigation className="h-4 w-4" />
                          </Button>
                          <Button className="border border-gray-300 bg-white p-2 rounded-full">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {donationRequests.filter((request) => request.status === "accepted")
              .length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Active Tasks
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You don't have any active delivery tasks at the moment.
                    </p>
                    <Button
                      onClick={() => setActiveTab("dashboard")}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      View Available Tasks
                    </Button>
                  </CardContent>
                </Card>
              )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Delivery History
            </h2>

            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 rounded-full p-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-800">
                            Wedding at Lotus Temple
                          </h4>
                          <p className="text-sm text-green-600">
                            Delivered to Mother Teresa NGO • 50+ meals
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600">+50 points</p>
                        <p className="text-xs text-green-500">
                          Jan {15 - i}, 2024
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Volunteer Leaderboard
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Volunteers This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          rank: 1,
                          name: "Faraj Khan",
                          points: 1850,
                          deliveries: 37,
                        },
                        {
                          rank: 2,
                          name: "Sreoshi",
                          points: 1720,
                          deliveries: 34,
                        },
                        {
                          rank: 3,
                          name: "Om Raj Pal",
                          points: 1650,
                          deliveries: 33,
                        },
                        {
                          rank: 4,
                          name: "Bittu Kumar",
                          points: 1580,
                          deliveries: 31,
                        },
                        {
                          rank: 5,
                          name: "You",
                          points: volunteerStats.points,
                          deliveries: volunteerStats.totalDeliveries,
                        },
                      ].map((volunteer, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-3 rounded-lg ${volunteer.name === "You"
                            ? "bg-orange-50 border-2 border-orange-200"
                            : "bg-gray-50"
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${volunteer.rank <= 3
                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                            >
                              {volunteer.rank}
                            </div>
                            <div>
                              <p
                                className={`font-semibold ${volunteer.name === "You" ? "text-orange-700" : "text-gray-900"}`}
                              >
                                {volunteer.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {volunteer.deliveries} deliveries
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-bold ${volunteer.name === "You" ? "text-orange-700" : "text-gray-900"}`}
                            >
                              {volunteer.points} pts
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">
                      Your Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm">First Delivery</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-silver-500" />
                        <span className="text-sm">10 Deliveries</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">Food Hero</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">
                      Monthly Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Deliveries</span>
                          <span>23/30</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "77%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Points</span>
                          <span>1150/1500</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "77%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Volunteer;
