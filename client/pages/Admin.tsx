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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Users,
  Package,
  AlertTriangle,
  Shield,
  Settings,
  Download,
  Search,
  MoreVertical,
  Eye,
  Ban,
  Trash2,
  Edit,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Activity,
  TrendingUp,
  FileText,
  Building,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DonationRecord {
  id: string;
  donorName: string;
  donorId: string;
  eventType: string;
  foodQuantity: string;
  location: string;
  volunteerName: string;
  volunteerId: string;
  ngoName: string;
  status: "pending" | "collected" | "delivered" | "cancelled";
  createdAt: string;
  deliveredAt?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: "active" | "suspended" | "pending";
  role: "donor" | "volunteer" | "ngo" | "admin";
  totalDonations?: number;
  totalDeliveries?: number;
  rating?: number;
  avatar?: string;
}

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  avatar?: string;
  permissions: string[];
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // Mock admin profile
  const [adminProfile] = useState<AdminProfile>({
    id: "admin-001",
    name: "Sumeet Kumar",
    email: "sumeet.kumar@annadaan.org",
    phone: "+91 6207651819",
    role: "Super Administrator",
    department: "Operations",
    joinDate: "January 2025",
    avatar: "/api/placeholder/100/100",
    permissions: [
      "view_all",
      "edit_users",
      "delete_records",
      "export_data",
      "system_settings",
    ],
  });

  // Mock data
  const [donations] = useState<DonationRecord[]>([
    {
      id: "DON-001",
      donorName: "Sharma Wedding Hall",
      donorId: "USR-101",
      eventType: "Wedding",
      foodQuantity: "100+ people",
      location: "Collage More ,Sector-V Kolkata",
      volunteerName: "Shadab Khan",
      volunteerId: "USR-201",
      ngoName: "Mother Teresa NGO",
      status: "delivered",
      createdAt: "2024-01-15T10:00:00Z",
      deliveredAt: "2024-01-15T14:30:00Z",
    },
    {
      id: "DON-002",
      donorName: "Tech Corp Office",
      donorId: "USR-102",
      eventType: "Corporate",
      foodQuantity: "50-100 people",
      location: "Cyber City, kolkata",
      volunteerName: "Om Raj Pal",
      volunteerId: "USR-202",
      ngoName: "Hope Foundation",
      status: "collected",
      createdAt: "2024-01-15T11:30:00Z",
    },
    {
      id: "DON-003",
      donorName: "Kumar Family",
      donorId: "USR-103",
      eventType: "Pooja",
      foodQuantity: "25-50 people",
      location: "Dum Dum Park, Kolkata",
      volunteerName: "Pending Assignment",
      volunteerId: "",
      ngoName: "Pending",
      status: "pending",
      createdAt: "2024-01-15T12:00:00Z",
    },
  ]);

  const [users] = useState<UserProfile[]>([
    {
      id: "USR-101",
      name: "Faraj Khan",
      email: "faraj.khan@email.com",
      phone: "+91 7007651819",
      location: "Kolkata",
      joinDate: "December 2024",
      status: "active",
      role: "donor",
      totalDonations: 12,
      rating: 4.8,
    },
    {
      id: "USR-102",
      name: "Sreoshi Das",
      email: "sreoshi.nath@gmail.com",
      phone: "+91 9330754432",
      location: "Kolkata",
      joinDate: "November 2024",
      status: "active",
      role: "donor",
      totalDonations: 8,
      rating: 4.9,
    },
    {
      id: "USR-201",
      name: "Om Raj Pal",
      email: "om.rajpal@email.com",
      phone: "+91 7651819700",
      location: "New Garia ,kolkata",
      joinDate: "October 2024",
      status: "active",
      role: "volunteer",
      totalDeliveries: 23,
      rating: 4.7,
    },
    {
      id: "USR-202",
      name: "Shadab Khan",
      email: "shadab.khan@email.com",
      phone: "+91 7007651819",
      location: "Patna",
      joinDate: "September 2024",
      status: "active",
      role: "volunteer",
      totalDeliveries: 18,
      rating: 4.9,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "collected":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
    // TODO: Implement user actions
  };

  const handleExportData = () => {
    console.log("Exporting donation data...");
    // TODO: Implement data export
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Manage donations, users, and platform operations with ease. <br />
            Track food rescue activities in real-time, oversee volunteer efforts, and ensure smooth coordination across all teams. <br />
            Your control center for driving impact, ensuring transparency, and scaling our mission to feed more people.
          </p>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {donations.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-700">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-orange-700">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <AlertTriangle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {donations.filter((d) => d.status === "pending").length}
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>
                    Latest food donation requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donations.slice(0, 3).map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">{donation.donorName}</p>
                          <p className="text-sm text-gray-600">
                            {donation.eventType} • {donation.foodQuantity}
                          </p>
                        </div>
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity</CardTitle>
                  <CardDescription>Real-time system status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Volunteers</span>
                      <span className="font-semibold text-green-600">
                        12 online
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending Assignments</span>
                      <span className="font-semibold text-yellow-600">
                        3 waiting
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Today's Deliveries</span>
                      <span className="font-semibold text-blue-600">
                        8 completed
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Health</span>
                      <span className="font-semibold text-green-600">
                        All systems operational
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                All Donations
              </h2>
              <div className="flex space-x-2">
                <Button onClick={handleExportData} className="border border-gray-300 bg-white hover:bg-gray-100">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="collected">Collected</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Volunteer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donations.map((donation) => (
                        <tr key={donation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {donation.id}
                              </p>
                              <p className="text-sm text-gray-500">
                                {donation.eventType} • {donation.foodQuantity}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {donation.donorName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {donation.location}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">
                              {donation.volunteerName}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(donation.status)}>
                              {donation.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(donation.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="bg-transparent hover:bg-gray-100 p-2 h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                User Management
              </h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="donor">Donors</SelectItem>
                    <SelectItem value="volunteer">Volunteers</SelectItem>
                    <SelectItem value="ngo">NGOs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-4 p-6">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {user.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {user.email}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className="text-xs border border-gray-300 bg-white">
                                  {user.role}
                                </Badge>
                                <Badge
                                  className={getUserStatusColor(user.status)}
                                >
                                  {user.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              className="border border-gray-300 bg-white hover:bg-gray-100 px-3 py-1 text-sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="p-2 h-8 w-8 bg-transparent hover:bg-gray-100">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUserAction("edit", user.id)
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUserAction("suspend", user.id)
                                  }
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                        -         Suspend User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleUserAction("delete", user.id)
                                  }
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Profile Sidebar */}
              <div>
                {selectedUser ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        User Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <Avatar className="w-20 h-20 mx-auto mb-4">
                          <AvatarImage src={selectedUser.avatar} />
                          <AvatarFallback className="text-lg">
                            {selectedUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">
                          {selectedUser.name}
                        </h3>
                        <Badge
                          className={getUserStatusColor(selectedUser.status)}
                        >
                          {selectedUser.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedUser.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedUser.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {selectedUser.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            Joined {selectedUser.joinDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-gray-400" />
                          <span className="text-sm capitalize">
                            {selectedUser.role}
                          </span>
                        </div>
                      </div>

                      {selectedUser.role === "donor" && (
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">
                            Donor Stats
                          </h4>
                          <div className="space-y-1">
                            <p className="text-sm">
                              Total Donations:{" "}
                              <span className="font-semibold">
                                {selectedUser.totalDonations}
                              </span>
                            </p>
                            <p className="text-sm">
                              Rating:{" "}
                              <span className="font-semibold">
                                {selectedUser.rating}/5
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedUser.role === "volunteer" && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">
                            Volunteer Stats
                          </h4>
                          <div className="space-y-1">
                            <p className="text-sm">
                              Total Deliveries:{" "}
                              <span className="font-semibold">
                                {selectedUser.totalDeliveries}
                              </span>
                            </p>
                            <p className="text-sm">
                              Rating:{" "}
                              <span className="font-semibold">
                                {selectedUser.rating}/5
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button className="flex-1 px-3 py-1 text-sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button className="flex-1 border border-gray-300 bg-white hover:bg-gray-100 px-3 py-1 text-sm">
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64">
                      <div className="text-center text-gray-500">
                        <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a user to view their profile</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Profile</CardTitle>
                    <CardDescription>
                      Manage your administrator account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={adminProfile.avatar} />
                          <AvatarFallback className="text-xl">
                            {adminProfile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Button className="border border-gray-300 bg-white hover:bg-gray-100 px-3 py-1 text-sm">
                            Change Photo
                          </Button>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={adminProfile.name} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={adminProfile.email}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue={adminProfile.phone} />
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            defaultValue={adminProfile.department}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          defaultValue={adminProfile.role}
                          disabled
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                          Save Changes
                        </Button>
                        <Button className="border border-gray-300 bg-white hover:bg-gray-100">Cancel</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Account ID</p>
                      <p className="font-semibold">{adminProfile.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-semibold">{adminProfile.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Login</p>
                      <p className="font-semibold">Today, 2:30 PM</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {adminProfile.permissions.map((permission, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm capitalize">
                            {permission.replace("_", " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-100">
                      <Shield className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-100">
                      <Activity className="mr-2 h-4 w-4" />
                      Enable 2FA
                    </Button>
                    <Button className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-100">
                      <FileText className="mr-2 h-4 w-4" />
                      Activity Log
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure platform-wide settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Disabled" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All enabled" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All enabled</SelectItem>
                        <SelectItem value="critical">Critical only</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="autoAssign">Auto-assign Volunteers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Enabled" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export and backup options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-100">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Data
                  </Button>
                  <Button className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-100">
                    <Download className="mr-2 h-4 w-4" />
                    Export User Data
                  </Button>
                  <Button className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-100">
                    <Download className="mr-2 h-4 w-4" />
                    Export Donation Records
                  </Button>
                  <Button className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-100">
                    <Building className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
