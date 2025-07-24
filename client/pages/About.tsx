import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Users,
  Globe,
  Target,
  Award,
  Lightbulb,
  Shield,
  Zap,
  MapPin,
  Calendar,
  TrendingUp,
  Building,
  Leaf,
  Smartphone,
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Divanshu",
      role: "UI/UX Designer",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F2c7d226c02de4334a92498035b0dd295?format=webp&width=800",
      bio: "Passionate researcher and creative UI/UX designer from Netaji Subhash Engineering College. They specialize in user-centered design and turning research insights into innovative solutions. They've actively contributed ideas for hackathons and love solving real-world problems through thoughtful design and teamwork.",
      linkedin: "https://linkedin.com/in/divanshu",
    },
    {
      name: "Sonali Tiwari",
      role: "UI/UX Designer",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F4bfafce4b183426bb52cb1785bfcc07b?format=webp&width=800",
      bio: "I'm a Second Year student of CSE Department at Netaji Subhash Engineering College. I'm part of the UI/UX and Speech Club, where I focus on designing user-friendly interfaces and improving my public speaking skills. I'm passionate about blending creativity with communication to solve real problems and connect with people.",
      linkedin: "https://linkedin.com/in/sonali",
    },
    {
      name: "Shubham Dev",
      role: "Developer",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F7d29893f93de4797b5d14c89c7e57555?format=webp&width=800",
      bio: "Full-Stack and Blockchain Developer currently studying at Netaji Subhash Engineering College. I'm passionate about building complete web applications—from frontend design to backend systems—and integrating blockchain for transparency and innovation.",
      linkedin: "https://linkedin.com/in/shubham",
    },
    {
      name: "Sumeet Kumar",
      role: "Developer",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F6867435c7b6b431fb4b3549bf6b5254f?format=webp&width=800",
      bio: "Full-stack developer passionate about using technology for social impact. Previously built scalable systems at major tech companies.",
      linkedin: "https://linkedin.com/in/sumeet",
    },
  ];

  const milestones = [
    {
      year: "2025, 30th July",
      title: "Platform Launch",
      description:
        "Annadaan officially launches in kolkata , partnering with 25 NGOs and onboarding 150+ passionate volunteers. With our digital platform live, we begin bridging surplus food from donors to those who need it most—one meal at a time.",
    },
    {
      year: "2025",
      title: "Pilot Program",
      description:
        "Our pilot phase tackled real-world scenarios across 50 food events, successfully rescuing over 1,000 meals in just 6 months. The experience validated our idea and sparked a deeper commitment to fighting food waste through smart tech.",
    },
    {
      year: "2025",
      title: "Team Formation",
      description:
        "We brought together a driven team of student innovators and changemakers with skills in coding, design, logistics, and outreach. United by purpose, we began laying the foundation of what would become Annadaan.",
    },
    {
      year: "2025, 30th july",
      title: "Concept Development",
      description:
        "The journey began with a simple yet powerful observation of food waste at college events. Fueled by empathy and research, the idea of a tech-powered food donation platform was born—Annadaan took its first breath.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We care deeply about people and believe no one should go hungry. Every act of giving creates hope. With every shared meal, we bring smiles, dignity, and comfort to those in need.",
    },
    {
      icon: Shield,
      title: "Trust",
      description:
        "We believe trust is the heart of every strong mission. That’s why we are open, honest, and careful at every step. From collection to delivery, we ensure food safety and transparency.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We are stronger together. We connect donors, volunteers, and NGOs into one united family. By working as a team, we fight hunger and build lasting human bonds.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We use technology to make food donation simple and powerful. Our platform matches food with need in real time. Innovation helps us grow faster and serve better every day.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Food waste hurts both people and the planet. We rescue surplus food to feed others and reduce harm to the environment. Every saved meal supports a healthier, greener Earth",
    },
    {
      icon: Zap,
      title: "Efficiency",
      description:
        "Time matters when it comes to hunger. We act quickly and plan smartly to reach those in need. Our goal is to deliver more meals, with less waste, in less time",
    },
  ];

  const techFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First Platform",
      description:
        "Designed for smooth, on-the-go access with a clean and simple interface. Anyone—donors, volunteers, or NGOs—can quickly take action with just a few taps on their phone.",
    },
    {
      icon: MapPin,
      title: "Real-Time Location Tracking",
      description:
        "Integrated GPS helps us connect the nearest volunteer to the food source instantly. This ensures faster pickups, reduced travel time, and less food waste ,GPS integration for efficient volunteer-donor matching and pickup coordination",
    },
    {
      icon: Shield,
      title: "Blockchain Integration",
      description:
        "All donations are securely logged on the Ethereum testnet. This adds transparency and trust with verified, tamper-proof records visible to everyone in the network.",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description:
        "Smart alerts keep volunteers and NGOs informed in real time. Whether it's a new donation or an urgent pickup, no opportunity to serve is ever missed.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F6ae8da56fa464ae5afcdfaab43b5a1ca?format=webp&width=800)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Annadaan
            </span>
          </h1>
          <div className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed space-y-6">
            <p>
              We're on a mission to eliminate food waste and hunger by connecting surplus food from events with those who need it most — powered by technology and driven by compassion.
            </p>
            <p>We make it easy for people to donate extra food through a mobile-friendly platform.
              Our system matches donations with nearby volunteers and NGOs in real time.
              Every meal rescued means less waste and more hope for someone in need.
              We track every donation with care and honesty to build trust in every step.
              Annadaan brings people together to fight hunger and food waste.</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Annadaan exists</strong> to bridge the gap between <strong>food surplus</strong> and <strong>food insecurity</strong>.
                Every day, millions go hungry while tons of perfectly good food is thrown away at events and gatherings.
                <strong>We believe this is a solvable problem</strong>—and we’re here to solve it.
              </p>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Using our <strong>technology-driven platform</strong>, we make it easy for event organizers to donate surplus food, for volunteers to pick it up, and for trusted NGOs to distribute it to those who need it most.
                Every step is coordinated in real time, with transparency and trust at the core.
              </p>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our mission is simple but powerful: <strong>No one should go hungry, and no good food should go to waste.</strong> We’re building a community where compassion meets action, and where food becomes a force for good.
              </p>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed italic">
                💬 <strong>"If you can't feed a hundred people, then feed just one." – Mother Teresa</strong>
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're a donor, a volunteer, or simply someone who cares — <strong>you are part of this mission</strong>.
                With every meal saved, <strong>we move one step closer to a hunger-free world</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-orange-700 mb-2">
                    Zero Food Waste
                  </h3>
                  <p className="text-sm text-gray-600">
                    "Eliminate food waste from events and gatherings by turning extra food into meals for people who need them the most, ensuring nothing good goes to waste and every plate has a purpose.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                <CardContent className="p-6 text-center">
                  <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-amber-700 mb-2">
                    Feed Everyone
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ensure no one in our community goes hungry by connecting extra food with those who need it most, creating a circle of care, sharing, and support."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-green-700 mb-2">
                    Sustainable Future
                  </h3>
                  <p className="text-sm text-gray-600">
                    "Create environmentally responsible communities by reducing food waste and encouraging sustainable sharing practices that care for both people and the planet."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-blue-700 mb-2">
                    Tech Innovation
                  </h3>
                  <p className="text-sm text-gray-600">
                    "Use technology to scale social impact by making food donation faster, smarter, and more accessible for everyone involved."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              "What began as a simple idea is now a growing platform that's transforming the way we fight food waste and hunger every day — changing how people think, act, and share for a better tomorrow."
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pl-8 text-left" : "pr-8 text-right"}`}
                  >
                    <Card className="bg-white shadow-lg">
                      <CardContent className="p-6">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white mb-3">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              "The core values that inspire every action we take at Annadaan — from rescuing food to reaching those in need."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Platform */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology for Good
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge technology to make food
              donation efficient, transparent, and scalable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals working together to solve hunger and food
              waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg bg-gradient-to-r from-orange-100 to-red-100 text-orange-700">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              With every meal saved and shared, our community is turning compassion into real change. <br />
              From weddings to large events, surplus food now finds its way to those who truly need it. <br />
              Our volunteers and partners work tirelessly to make sure no plate goes to waste. <br />
              Every act of giving creates a ripple — reducing hunger, saving food, and spreading hope. <br />
              Together, we're not just feeding people — we're building a more caring and sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-6">
                <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">2,500+</div>
                <div className="text-orange-100">Meals Saved</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-6">
                <Users className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">150+</div>
                <div className="text-orange-100">Active Volunteers</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-6">
                <Building className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-orange-100">Partner NGOs</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-6">
                <Calendar className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-orange-100">Events Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you're hosting an event, passionate about giving back, or part of a social organization — there's a meaningful role for you at Annadaan. <br />
            Together, we can rescue surplus food, support communities, and create lasting impact. <br />
            Every helping hand, every shared meal, and every act of kindness brings us closer to a hunger-free world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200"
            >
              Start Donating
            </a>
            <a
              href="/volunteer"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
