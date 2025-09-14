import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Calendar, Users, FileText, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import WelcomeModal from "@/components/WelcomeModal";
import SettingsModal from "@/components/SettingsModal";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [userPrefs, setUserPrefs] = useState<{branch: string, semester: string} | null>(null);
  const location = useLocation();

  useEffect(() => {
    const prefs = localStorage.getItem('studentClubPrefs');
    if (prefs) {
      setUserPrefs(JSON.parse(prefs));
    } else {
      setShowWelcomeModal(true);
    }
  }, []);

  const handlePreferencesSaved = (branch: string, semester: string) => {
    const prefs = { branch, semester };
    setUserPrefs(prefs);
    localStorage.setItem('studentClubPrefs', JSON.stringify(prefs));
  };

  const quickAccessCards = [
    {
      title: "Study Resources",
      description: "Access answer keys, notes, mind maps and audio revisions",
      icon: BookOpen,
      link: "/resources",
      color: "from-blue-500 to-blue-600"
    },
    // {
    //   title: "Open Source Projects",
    //   description: "Showcase and explore student projects",
    //   icon: Code,
    //   link: "/projects",
    //   color: "from-purple-500 to-purple-600"
    // },
    {
      title: "Academic Calendar",
      description: "Important dates and academic events",
      icon: Calendar,
      link: "/calendar",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Our Team",
      description: "Meet the team behind this platform",
      icon: Users,
      link: "/team",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const stats = [
    { label: "Total Downloads", value: "1,240+" },
    { label: "Active Projects", value: "45+" },
    { label: "Study Materials", value: "180+" },
    { label: "Team Members", value: "4" }
  ];

  useEffect(() => {
    const prefs = localStorage.getItem('studentClubPrefs');
    if (prefs) {
      setUserPrefs(JSON.parse(prefs));
    } else {
      setShowWelcomeModal(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      <Navigation 
        userPrefs={userPrefs} 
        onSettingsClick={() => setShowSettingsModal(true)} 
      />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              StudyHub
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Created by a team of passionate VJECians, this platform brings together essential tools and resources to simplify your academic journey.
          </p>
          {userPrefs && (
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
              Personalized for {userPrefs.branch} - {userPrefs.semester}
            </div>
          )}
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickAccessCards.map((card, index) => (
              <Link key={index} to={card.link} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-card/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics
      <section className="py-16 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Platform Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Recent Updates */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Recent Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg">Engineering ethics resources added</CardTitle>
                <CardDescription>mindmap , quick notes,audio revision</CardDescription>
              </CardHeader>
            </Card> */}
            {/* <Card className="bg-card/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg">React Todo App</CardTitle>
                <CardDescription>New open-source project by Evan Biju</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg">Internal Exam Schedule</CardTitle>
                <CardDescription>Updated academic calendar for S3</CardDescription>
              </CardHeader>
            </Card> */}
          {/* </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground">StudyHub</h3>
            </div>
            <p className="text-muted-foreground mb-4">Built with ❤️  By VJECians ,For VJECians.</p>
            <p className="text-sm text-muted-foreground/70">© 2025 StudyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onSave={handlePreferencesSaved}
      />
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        currentPrefs={userPrefs}
        onSave={handlePreferencesSaved}
      />
    </div>
  );
};

export default Index;
