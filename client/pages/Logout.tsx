import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, LogOut, CheckCircle, ArrowLeft } from "lucide-react";

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // TODO: Implement actual logout logic
      console.log("User logging out...");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear user session/tokens
      localStorage.removeItem("authToken");
      sessionStorage.clear();

      setIsLoggedOut(true);

      // Redirect after showing success message
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Auto-logout if accessed directly
  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogout();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoggedOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg">
                <Heart className="h-8 w-8 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  Annadaan
                </span>
                <span className="text-sm text-gray-500">
                  Because Someone Is Hungry
                </span>
              </div>
            </Link>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-green-100">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-green-600">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-6 w-6" />
                  <span>Logged Out Successfully</span>
                </div>
              </CardTitle>
              <CardDescription className="text-center">
                You have been safely signed out of your Annadaan account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 mb-2">
                  Thank you for using Annadaan to make a difference
                </p>
                <p className="text-sm text-green-600">
                  Redirecting you to the homepage...
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <Link to="/">Continue to Homepage</Link>
                </Button>
                <Button
                  asChild
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  <Link to="/sign-in">Sign In Again</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-orange-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-orange-600">
              <div className="flex items-center justify-center space-x-2">
                <LogOut className="h-6 w-6" />
                <span>Signing Out</span>  
              </div>
            </CardTitle>
            <CardDescription className="text-center">
              {isLoggingOut
                ? "Please wait while we sign you out..."
                : "Confirm you want to sign out of your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            {isLoggingOut ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                  <p className="text-orange-800">Signing you out safely...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to sign out of your Annadaan account?
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Yes, Sign Me Out
                  </Button>

                  <Button
                    asChild
                    className="w-full border-gray-300"
                  >
                    <Link to="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Cancel
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>
            Your session will be cleared and you'll be safely signed out of all
            devices
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
