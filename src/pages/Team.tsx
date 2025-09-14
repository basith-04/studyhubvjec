
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Instagram, Users, Star, BookOpen, Settings, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SettingsModal from "@/components/SettingsModal";
import Navigation from "@/components/Navigation";
import WelcomeModal from "@/components/WelcomeModal";

const Team = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userPrefs, setUserPrefs] = useState<{ branch: string, semester: string } | null>(null);
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

  const teamMembers = [
    {
      id: 1,
      name: "Abdul Basith P V",
      batch: "CSE B 24-28 Batch",
      github: "https://github.com/basith-04",
      linkedin: "https://www.linkedin.com/in/abdulbasithpv/",
      instagram: "https://www.instagram.com/ab_bzz_/",
      website: "https://abdulbasith.web.app/"
    },
    {
      id: 2,
      name: "Sangeeth Babu",
      batch: " CSCY 24-28 Batch",
      github: "https://github.com/sangeeth252004",
      linkedin: "https://www.linkedin.com/in/sangeeth-babu-9a4b52337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/sangeeth__babu__?igsh=MWZpYnF6M3RxZjR4bA==",
    },
    {
      id: 3,
      name: "Evan Iwin Biju",
      batch: "CSE C 24-28 Batch",
      github: "https://github.com/evaniwin",
      linkedin: "https://www.linkedin.com/in/evan-iwin-biju-a3036432a/",
      instagram: "https://www.instagram.com/evaniwin?igsh=aHNmMnJ5azE4Ynhr"
    },
    {
      id: 4,
      name: "Harijith T S",
      batch: "CSE D 24-28 Batch",
      github: "https://github.com/AIM-less",
      linkedin: "https://www.linkedin.com/in/harijith-ts/",
      instagram: "https://www.instagram.com/nondom_hic_nunc/"
    },
    {
      id: 5,
      name: "Jiswin Rijo Columbus",
      batch: "CSE A 24-28 Batch",
      gitHub: "https:https://github.com/jiswin17",
      linkedIn: "https://www.linkedin.com/in/jiswin-rijo-columbus-90041832b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/jiswin_r_columbus?igsh=Zm5hc2JhMGh0eWsx"
    },
    {
      id: 6,
      name: "Ashin Chacko",
      batch: "CSE A 24-28 Batch",

      github: "https://github.com/AIM-less",
      instagram: "https://www.instagram.com/nondom_hic_nunc/"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      <Navigation
        userPrefs={userPrefs}
        onSettingsClick={() => setShowSettingsModal(true)}
        showBackButton={true}
      />

      {/* Page Content */}
      <div className="bg-muted/20 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate students behind StudyHub, working together to create better educational resources for everyone.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-card/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-card-foreground">
                  {member.name}
                </CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mx-auto">
                  {member.batch}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(member.github, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(member.linkedin, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(member.instagram, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </Button>
                  {member.website && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(member.website, '_blank')}
                      className="flex items-center space-x-2"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Website</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 text-white">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                We believe in the power of collaboration and knowledge sharing. Our mission is to create
                a comprehensive platform that makes academic resources accessible to all students,
                fostering a community of learners who support each other's growth and success.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Join Our Team */}
        <div className="text-center">
          <Card className="bg-card/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Want to Join Our Team?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for passionate students who want to contribute to the community.
                Whether you're a developer, designer, content creator, or just someone with great ideas,
                we'd love to hear from you!
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-6">
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2">Developers</h4>
                    <p>Help build and maintain the platform</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2">Content Creators</h4>
                    <p>Create and curate academic resources</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2">Contributors</h4>
                    <p>Share ideas and feedback</p>
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                  Get In Touch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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

export default Team;
