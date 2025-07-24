import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // TODO: Implement actual authentication
      console.log("Sign in attempted:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect on success
      window.location.href = "/";
    } catch (error) {
      setErrors({ general: "Invalid email or password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth
      console.log("Google sign in attempted");
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      setErrors({ general: "Google sign in failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

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
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to continue your journey of making a difference
          </p>
        </div>

        {/* Sign In Form */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-orange-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-orange-600">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
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

            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full border-gray-300 hover:bg-gray-50"
            >
              <Chrome className="mr-2 h-4 w-4" />
              {isLoading ? "Signing in..." : "Continue with Google"}
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

            {/* Email & Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`pl-10 pr-10 ${errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
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
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Type Links */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <Link to="/sign-up?type=donor" className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 hover:bg-white/80 transition-colors border border-orange-100">
              <Heart className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                I'm a Donor
              </p>
            </div>
          </Link>
          <Link to="/sign-up?type=volunteer" className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 hover:bg-white/80 transition-colors border border-orange-100">
              <User className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                I'm a Volunteer
              </p>
            </div>
          </Link>
          <Link to="/sign-up?type=ngo" className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 hover:bg-white/80 transition-colors border border-orange-100">
              <CheckCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                I'm an NGO
              </p>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-orange-600 hover:text-orange-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-orange-600 hover:text-orange-500"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
