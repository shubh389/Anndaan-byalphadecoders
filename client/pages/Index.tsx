import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  MapPin,
  Clock,
  Utensils,
  TrendingUp,
  Shield,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-red-100"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F59783eec0cc54b9cbbe9b59ff43f4e1e?format=webp&width=800)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Annadaan
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-medium text-white/90">
                Because Someone Is Hungry
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Connecting surplus food from events with those in need. Together,
              we can reduce food waste and create a world where no one goes
              hungry.
            </p> */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Annadaan
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-semibold text-white/90">
                "Every Meal Can Change a Life".
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
              We rescue surplus food from weddings, events, and gatherings —
              and deliver it to those who need it most.
            </p>

            {/* <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed italic">
              "The food you waste could be someone’s hope for the day."
            </p> */}

            {/* <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
              With real-time tech, passionate volunteers, and community partnerships,
              we're turning food waste into nourishment and compassion.
            </p> */}

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed italic">
              "Hunger isn't a lack of food. It's a failure to share."
            </p>
            <br />

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/donate">
                <Button
                  
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 text-lg rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Food
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button
  className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 text-lg rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
>
  <Users className="w-5 h-5" />
  Become a Volunteer
</Button>




              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Food Waste Facts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Reality of Food Waste & Hunger
            </h2>
            <p className="text-xl text-blue-600 max-w-3xl mx-auto leading-relaxed">
              Every day, millions of people go to bed hungry, while perfectly edible food is thrown away from events, homes, and restaurants. This heartbreaking contrast doesn't have to exist.
              <br /><br />
              At Annadaan, we believe in turning excess into impact. Your small action — donating or volunteering — can help rescue meals, reduce waste, and feed someone in need.
              <br /><br />
              <span className="italic text-red-500">
                “Food should nourish lives, not fill landfills.”
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <Card className="text-center border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-6">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-2">40%</h3>
                <p className="text-sm text-gray-600">
                  of all food produced is wasted — enough to feed billions if rescued.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardContent className="p-6">
                <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-amber-700 mb-2">820M+</h3>
                <p className="text-sm text-gray-600">
                  people worldwide go to bed hungry — even as food is thrown away daily.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-2">195M+</h3>
                <p className="text-sm text-gray-600">
                  Indians are undernourished — while thousands of meals are wasted daily.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardContent className="p-6">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-2">1 in 9</h3>
                <p className="text-sm text-gray-600">
                  people worldwide struggle to find their next meal — a crisis we can fix.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              How <span className="text-orange-600">Annadaan</span> Works
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A simple 4-step journey that transforms surplus food into life-saving meals — powered by compassion, driven by technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Step 1: Donate */}
            <div className="text-center bg-white shadow-md rounded-xl p-6 transition duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Donate</h3>
              <p className="text-gray-600 leading-relaxed">
                Event hosts or caterers quickly list surplus food on our platform. It’s fast, safe, and free.
              </p>
            </div>

            {/* Step 2: Match */}
            <div className="text-center bg-white shadow-md rounded-xl p-6 transition duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Match</h3>
              <p className="text-gray-600 leading-relaxed">
                Our smart system instantly connects donors with nearby volunteers ready to help.
              </p>
            </div>

            {/* Step 3: Collect */}
            <div className="text-center bg-white shadow-md rounded-xl p-6 transition duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collect</h3>
              <p className="text-gray-600 leading-relaxed">
                Our volunteers pick up food following hygiene and safety protocols to preserve quality.
              </p>
            </div>

            {/* Step 4: Deliver */}
            <div className="text-center bg-white shadow-md rounded-xl p-6 transition duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Deliver</h3>
              <p className="text-gray-600 leading-relaxed">
                Food is delivered to trusted NGOs, shelters, and hungry individuals — turning waste into hope.
              </p>
            </div>
          </div>

          {/* Optional Inspirational Quote */}
          <div className="text-center mt-16">
            <p className="text-lg italic text-orange-700 font-medium max-w-2xl mx-auto">
              “A single meal may not change the world — but for someone, it changes everything.”
            </p>
          </div>
        </div>
      </section>


      {/* Impact Statistics */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Growing <span className="text-orange-600">Impact</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              With every meal rescued, every delivery made, and every volunteer joined, we move closer to a world without hunger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Meals Saved */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 shadow hover:shadow-md transition duration-300">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-green-700 mb-2">2,500+</h3>
                <p className="text-gray-700 font-medium">
                  Meals Saved from Going to Waste
                </p>
              </div>
            </div>

            {/* Active Volunteers */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 shadow hover:shadow-md transition duration-300">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-blue-700 mb-2">150+</h3>
                <p className="text-gray-700 font-medium">
                  Heroes Volunteering Across Communities
                </p>
              </div>
            </div>

            {/* Partner NGOs */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 shadow hover:shadow-md transition duration-300">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-purple-700 mb-2">25+</h3>
                <p className="text-gray-700 font-medium">
                  Trusted NGO Partners Making a Difference
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Movement Today
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Whether you have surplus food to donate or want to volunteer your
            time, every action counts in our fight against hunger and food
            waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/donate">
              <Button
                
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 text-lg"
              >
                <Heart className="mr-2 h-5 w-5" />
                Start Donating
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button
                
                className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 text-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Volunteer Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}






