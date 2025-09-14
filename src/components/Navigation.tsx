import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Settings, Menu, Moon, Sun, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

interface NavigationProps {
  userPrefs?: { branch: string; semester: string } | null;
  onSettingsClick: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Navigation = ({ userPrefs, onSettingsClick, showBackButton, onBackClick }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { to: "/resources", label: "Resources" },
    // { to: "/projects", label: "Projects" },
    { to: "/calendar", label: "Calendar" },
    { to: "/team", label: "Team" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleBackClick = () => {
    if (typeof onBackClick === 'function') {
      onBackClick();
    } else {
      navigate(-1);
    }
  }

  return (
    <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
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
                <span className="text-sm text-muted-foreground">
                  {userPrefs.branch} - {userPrefs.semester}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${
                  isActive(item.to)
                    ? "text-primary font-medium border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-primary"
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Settings Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              className="hidden sm:flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`${
                        isActive(item.to)
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      } hover:text-primary transition-colors text-lg py-2`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <hr className="my-4" />
                  
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onSettingsClick();
                      setIsOpen(false);
                    }}
                    className="justify-start text-lg py-2"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  
                  {userPrefs && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Current: {userPrefs.branch} - {userPrefs.semester}
                      </p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;