import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  CheckCircle,
  Chrome,
  Phone,
  MapPin,
  Building,
  Users,
} from "lucide-react";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "donor";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: userType,
    location: "",
    organizationName: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType }));
  }, [userType]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (formData.userType === "ngo" && !formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // TODO: Implement actual registration
      console.log("Registration attempted:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect on success
      window.location.href = "/sign-in?registered=true";
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth
      console.log("Google sign up attempted");
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      setErrors({ general: "Google sign up failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeInfo = () => {
    switch (formData.userType) {
      case "donor":
        return {
          title: "Food Donor Registration",
          description:
            "Join as a food donor to share surplus food from your events",
          icon: Heart,
          color: "text-orange-600",
        };
      case "volunteer":
        return {
          title: "Volunteer Registration",
          description:
            "Become a volunteer to help collect and deliver food donations",
          icon: User,
          color: "text-blue-600",
        };
      case "ngo":
        return {
          title: "NGO Partnership Registration",
          description:
            "Register your NGO to receive food donations for distribution",
          icon: Building,
          color: "text-green-600",
        };
      default:
        return {
          title: "Registration",
          description: "Create your account to get started",
          icon: User,
          color: "text-gray-600",
        };
    }
  };

  const userTypeInfo = getUserTypeInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg">
              <Heart className="h-8 w-8 text-white" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">Annadaan</span>
              <span className="text-sm text-gray-500">
                Because Someone Is Hungry
              </span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join Our Mission
          </h2>
          <p className="text-gray-600">
            Create your account and start making a difference today
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { type: "donor", label: "Donor", icon: Heart },
            { type: "volunteer", label: "Volunteer", icon: User },
            { type: "ngo", label: "NGO", icon: Building },
          ].map((option) => (
            <button
              key={option.type}
              onClick={() => handleInputChange("userType", option.type)}
              className={`p-3 rounded-lg border text-center transition-all ${
                formData.userType === option.type
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
              }`}
            >
              <option.icon className="h-5 w-5 mx-auto mb-1" />
              <p className="text-xs font-medium">{option.label}</p>
            </button>
          ))}
        </div>

        {/* Sign Up Form */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-orange-100">
          <CardHeader className="space-y-1">
            <CardTitle className={`text-2xl text-center ${userTypeInfo.color}`}>
              <div className="flex items-center justify-center space-x-2">
                <userTypeInfo.icon className="h-6 w-6" />
                <span>{userTypeInfo.title}</span>
              </div>
            </CardTitle>
            <CardDescription className="text-center">
              {userTypeInfo.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Display */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600">{errors.general}</span>
              </div>
            )}

            {/* Google Sign Up */}
            <Button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full border-gray-300 hover:bg-gray-50"
            >
              <Chrome className="mr-2 h-4 w-4" />
              {isLoading ? "Creating account..." : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={errors.firstName ? "border-red-300" : ""}
                    disabled={isLoading}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={errors.lastName ? "border-red-300" : ""}
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-red-300" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-10 ${errors.phone ? "border-red-300" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className={`pl-10 ${errors.location ? "border-red-300" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-xs text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Organization Name (NGO only) */}
              {formData.userType === "ngo" && (
                <div>
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="organizationName"
                      placeholder="Your NGO Name"
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleInputChange("organizationName", e.target.value)
                      }
                      className={`pl-10 ${errors.organizationName ? "border-red-300" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.organizationName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.organizationName}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`pl-10 pr-10 ${errors.password ? "border-red-300" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-300" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptTerms", checked as boolean)
                  }
                  disabled={isLoading}
                  className={errors.acceptTerms ? "border-red-300" : ""}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-4"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-orange-600 hover:text-orange-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-orange-600 hover:text-orange-500"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-xs text-red-600">{errors.acceptTerms}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
