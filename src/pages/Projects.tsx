import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Github, ExternalLink, Heart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SettingsModal from "@/components/SettingsModal";

const Projects = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [userPrefs, setUserPrefs] = useState<{branch: string, semester: string} | null>(null);
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const location = useLocation();

  useEffect(() => {
    const prefs = localStorage.getItem('studentClubPrefs');
    if (prefs) {
      setUserPrefs(JSON.parse(prefs));
    }
    
    const liked = localStorage.getItem('likedProjects');
    if (liked) {
      setLikedProjects(JSON.parse(liked));
    }
  }, []);

  const handlePreferencesSaved = (branch: string, semester: string) => {
    const prefs = { branch, semester };
    setUserPrefs(prefs);
    localStorage.setItem('studentClubPrefs', JSON.stringify(prefs));
  };

  const openSourceProjects = [
    {
      id: 1,
      title: "Student Management System",
      description: "A comprehensive web application for managing student records, grades, and attendance",
      author: "Abdul Basith P V",
      semester: "S3",
      techStack: ["React", "Node.js", "MongoDB"],
      likes: 45,
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Library Management System",
      description: "Digital library system with book tracking, user management, and automated notifications",
      author: "Evan Biju",
      semester: "S3",
      techStack: ["Python", "Django", "PostgreSQL"],
      likes: 38,
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Expense Tracker",
      description: "Personal finance management app with budget tracking and expense categorization",
      author: "Sangeeth",
      semester: "S2",
      techStack: ["React Native", "Firebase"],
      likes: 29,
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather monitoring dashboard with forecasts and alerts",
      author: "Harijith",
      semester: "S2",
      techStack: ["Vue.js", "Express.js", "API Integration"],
      likes: 33,
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
      imageUrl: "/placeholder.svg"
    }
  ];

  const handleLike = (projectId: number) => {
    let updatedLikes;
    if (likedProjects.includes(projectId)) {
      updatedLikes = likedProjects.filter(id => id !== projectId);
    } else {
      updatedLikes = [...likedProjects, projectId];
    }
    setLikedProjects(updatedLikes);
    localStorage.setItem('likedProjects', JSON.stringify(updatedLikes));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  StudyHub
                </h1>
              </Link>
              {userPrefs && (
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-600">
                    {userPrefs.branch} - {userPrefs.semester}
                  </span>
                </div>
              )}
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/resources" className={`${location.pathname === '/resources' ? 'text-blue-600 font-medium border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>Resources</Link>
              <Link to="/projects" className={`${location.pathname === '/projects' ? 'text-blue-600 font-medium border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>Projects</Link>
              <Link to="/calendar" className={`${location.pathname === '/calendar' ? 'text-blue-600 font-medium border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>Calendar</Link>
              <Link to="/team" className={`${location.pathname === '/team' ? 'text-blue-600 font-medium border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>Team</Link>
            </nav>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Open Source Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and explore innovative projects created by our talented student community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {openSourceProjects.map((project) => (
            <Card key={project.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-blue-600 font-medium">Project Screenshot</div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-sm text-gray-600">by {project.author}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(project.id)}
                    className={`flex items-center space-x-2 ${
                      likedProjects.includes(project.id) ? 'text-red-600' : 'text-gray-600'
                    }`}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedProjects.includes(project.id) ? 'fill-current' : ''
                      }`} 
                    />
                    <span>{project.likes + (likedProjects.includes(project.id) ? 1 : 0)}</span>
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(project.demoUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        currentPrefs={userPrefs}
        onSave={handlePreferencesSaved}
      />
    </div>
  );
};

export default Projects;
