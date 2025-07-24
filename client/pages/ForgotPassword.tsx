import { useState } from "react";
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
  Heart,
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Send,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isResetMode = !!token;

  const [step, setStep] = useState<"email" | "sent" | "reset" | "success">(
    () => {
      return isResetMode ? "reset" : "email";
    },
  );

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateEmail = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // TODO: Implement actual password reset email sending
      console.log("Reset email requested for:", formData.email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStep("sent");
    } catch (error) {
      setErrors({ general: "Failed to send reset email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setIsLoading(true);

    try {
      // TODO: Implement actual password reset
      console.log("Password reset attempted with token:", token);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStep("success");
    } catch (error) {
      setErrors({ general: "Failed to reset password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailStep = () => (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-orange-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-orange-600">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we'll send you a link to reset your
          password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-600">{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSendResetEmail} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Reset Link
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            to="/sign-in"
            className="inline-flex items-center text-sm text-orange-600 hover:text-orange-500 font-medium"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  const renderSentStep = () => (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-green-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-green-600">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-6 w-6" />
            <span>Email Sent</span>
          </div>
        </CardTitle>
        <CardDescription className="text-center">
          We've sent a password reset link to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 mb-2">
            Check your email inbox for a message from Annadaan
          </p>
          <p className="text-sm text-green-600">
            The reset link will expire in 1 hour for security reasons
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Didn't receive the email? Check your spam folder or
          </p>
          <Button
            onClick={() => setStep("email")}
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            Try Again
          </Button>
        </div>

        <div className="text-center">
          <Link
            to="/sign-in"
            className="inline-flex items-center text-sm text-orange-600 hover:text-orange-500 font-medium"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  const renderResetStep = () => (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-orange-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-orange-600">
          Reset Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-600">{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className={`pl-10 pr-10 ${errors.newPassword ? "border-red-300" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
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
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 mb-1">Password requirements:</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Resetting...
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderSuccessStep = () => (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-green-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-green-600">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-6 w-6" />
            <span>Password Reset Successfully</span>
          </div>
        </CardTitle>
        <CardDescription className="text-center">
          Your password has been updated successfully
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 mb-2">
            You can now sign in with your new password
          </p>
          <p className="text-sm text-green-600">
            For security, you'll need to sign in on all your devices again
          </p>
        </div>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <Link to="/sign-in">Continue to Sign In</Link>
        </Button>
      </CardContent>
    </Card>
  );

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
        </div>

        {/* Dynamic Content Based on Step */}
        {step === "email" && renderEmailStep()}
        {step === "sent" && renderSentStep()}
        {step === "reset" && renderResetStep()}
        {step === "success" && renderSuccessStep()}

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@annadaan.org"
              className="text-orange-600 hover:text-orange-500"
            >
              support@annadaan.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
