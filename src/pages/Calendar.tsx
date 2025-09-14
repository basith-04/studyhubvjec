import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, CheckCircle, BookOpen, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SettingsModal from "@/components/SettingsModal";

const Calendar = () => {
  const [userPrefs, setUserPrefs] = useState<{branch: string, semester: string} | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const prefs = localStorage.getItem('studentClubPrefs');
    if (prefs) {
      setUserPrefs(JSON.parse(prefs));
    }
  }, []);

  const handlePreferencesSaved = (branch: string, semester: string) => {
    const prefs = { branch, semester };
    setUserPrefs(prefs);
    localStorage.setItem('studentClubPrefs', JSON.stringify(prefs));
  };

  const calculateDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    
    const timeDifference = eventDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysRemaining;
  };

  const calculateDaysForRange = (startDate: string, endDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    
    if (today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) {
      return { status: 'ongoing', daysLeft: Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) };
    } else if (today.getTime() < start.getTime()) {
      return { status: 'upcoming', daysLeft: Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) };
    } else {
      return { status: 'completed', daysLeft: Math.ceil((today.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)) };
    }
  };

  const getEventStatus = (event: any) => {
    if (event.endDate) {
      const rangeInfo = calculateDaysForRange(event.startDate, event.endDate);
      if (rangeInfo.status === 'ongoing') {
        return { status: 'ongoing', daysLeft: rangeInfo.daysLeft, display: `Ongoing - ${rangeInfo.daysLeft} days left` };
      } else if (rangeInfo.status === 'upcoming') {
        return { status: 'upcoming', daysLeft: rangeInfo.daysLeft, display: `Starts in ${rangeInfo.daysLeft} days` };
      } else {
        return { status: 'completed', daysLeft: rangeInfo.daysLeft, display: `Completed ${rangeInfo.daysLeft} days ago` };
      }
    } else {
      const daysLeft = calculateDaysRemaining(event.startDate);
      if (daysLeft > 0) {
        return { status: 'upcoming', daysLeft, display: `${daysLeft} days left` };
      } else if (daysLeft === 0) {
        return { status: 'today', daysLeft: 0, display: 'Today' };
      } else {
        return { status: 'completed', daysLeft: Math.abs(daysLeft), display: `${Math.abs(daysLeft)} days ago` };
      }
    }
  };

  const academicEvents = {
    S3: [
      {
        id: 1,
        title: "First Internal Exam",
        date: "July 21-28, 2025",
        startDate: "2025-07-21",
        endDate: "2025-07-28",
        type: "exam",
        description: "Internal assessment covering module 1 "
      },
      {
        id: 2,
        title: "Result of Internal 1",
        date: "August 7, 2025",
        startDate: "2025-08-07",
        type: "result",
        description: "Publication of first internal exam results"
      },
      {
        id: 3,
        title: "PTA Meeting",
        date: "August 16, 2025",
        startDate: "2025-08-16",
        type: "meeting",
        description: "Parent-Teacher Association meeting"
      },
      {
        id: 4,
        title: "Onam Vacation",
        date: "August 28 - September 7, 2025",
        startDate: "2025-08-28",
        endDate: "2025-09-07",
        type: "holiday",
        description: "Onam festival holidays"
      },
      {
        id: 5,
        title: "Internal Exam 2",
        date: "September 9-11, 2025",
        startDate: "2025-09-09",
        endDate: "2025-09-11",
        type: "exam",
        description: "Second Internal assessment covering modules 2 & 3"
      },
      {
        id: 6,
        title: "Result of Internal 2",
        date: "September 24, 2025",
        startDate: "2025-09-24",
        type: "result",
        description: "Publication of second internal exam results"
      },
      {
        id: 7,
        title: "Internal Exam 3",
        date: "October 15, 2025",
        startDate: "2025-10-15",
        type: "exam",
        description: "Third internal assessment"
      },
      {
        id: 8,
        title: "ESE End Semester Examination",
        date: "November 4-28, 2025",
        startDate: "2025-11-04",
        endDate: "2025-11-28",
        type: "exam",
        description: "End semester examinations"
      },
      {
        id: 9,
        title: "S4 Classes Begin",
        date: "December 1, 2025",
        startDate: "2025-12-01",
        type: "academic",
        description: "Commencement of Semester 4 classes"
      },
      {
        id: 10,
        title: "ESE Result",
        date: "December 12, 2025",
        startDate: "2025-12-12",
        type: "result",
        description: "Publication of end semester exam results"
      },
      {
        id: 11,
        title: "Christmas Vacation",
        date: "December 20-28, 2025",
        startDate: "2025-12-20",
        endDate: "2025-12-28",
        type: "holiday",
        description: "Christmas and New Year holidays"
      }
    ],
    S1: [
      {
        id: 1,
        title: "Orientation Program",
        date: "August 1-3, 2025",
        startDate: "2025-08-01",
        endDate: "2025-08-03",
        type: "academic",
        description: "Welcome program for new students"
      },
      {
        id: 2,
        title: "First Internal Exam",
        date: "September 15-20, 2025",
        startDate: "2025-09-15",
        endDate: "2025-09-20",
        type: "exam",
        description: "First internal assessment"
      }
    ]
  };

  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      exam: "bg-red-100 text-red-800",
      result: "bg-blue-100 text-blue-800",
      holiday: "bg-green-100 text-green-800",
      meeting: "bg-purple-100 text-purple-800",
      academic: "bg-orange-100 text-orange-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <CalendarIcon className="w-5 h-5" />;
      case 'result':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <CalendarIcon className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'ongoing':
        return '⏳';
      case 'today':
        return '📅';
      default:
        return '📅';
    }
  };

  const currentEvents = userPrefs?.semester ? 
    (academicEvents as any)[userPrefs.semester] || [] : 
    academicEvents.S3;

  const eventsWithStatus = currentEvents.map((event: any) => ({
    ...event,
    statusInfo: getEventStatus(event)
  }));

  const upcomingEvents = eventsWithStatus.filter((event: any) => 
    event.statusInfo.status === 'upcoming' || event.statusInfo.status === 'today' || event.statusInfo.status === 'ongoing'
  );
  const completedEvents = eventsWithStatus.filter((event: any) => event.statusInfo.status === 'completed');

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
              {/* <Link to="/projects" className={`${location.pathname === '/projects' ? 'text-blue-600 font-medium border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>Projects</Link> */}
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Calendar</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with important academic dates, exam schedules, and college events
            </p>
            {userPrefs && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Academic calendar for {userPrefs.semester} - 2025
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event: any) => (
                <Card key={event.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      <div className="flex items-center text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.statusInfo.display}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                      <div className="mr-3 p-2 bg-blue-100 rounded-lg">
                        <span className="text-lg mr-2">{getStatusIcon(event.statusInfo.status)}</span>
                        {getEventIcon(event.type)}
                      </div>
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-medium text-blue-600">{event.date}</p>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Events */}
        {completedEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Events</h2>
            <div className="space-y-4">
              {completedEvents.map((event: any) => (
                <Card key={event.id} className="bg-white/50 backdrop-blur-sm border-0 shadow-md opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <span className="text-lg mr-2">✅</span>
                          <CheckCircle className="w-5 h-5 text-green-600 inline" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        <p className="text-sm text-gray-500">{event.date}</p>
                        <p className="text-xs text-gray-400">{event.statusInfo.display}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600">
              Academic calendar for your semester will be updated soon.
            </p>
          </div>
        )}
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

export default Calendar;
