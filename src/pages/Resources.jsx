import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Star, ArrowLeft, FileText, Brain, Headphones, Heart, User, GraduationCap } from "lucide-react";
import { useLocation } from "react-router-dom";
import SettingsModal from "@/components/SettingsModal";
import Navigation from "@/components/Navigation";
import WelcomeModal from "@/components/WelcomeModal";

const Resources = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userPrefs, setUserPrefs] = useState(null);
  const [currentView, setCurrentView] = useState('subjects'); // 'subjects' | 'modules' | 'materials'
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const prefs = localStorage.getItem('studentClubPrefs');
    if (prefs) {
      setUserPrefs(JSON.parse(prefs));
    } else {
      setShowWelcomeModal(true);
    }

    const favs = localStorage.getItem('userFavorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  const handlePreferencesSaved = (branch, semester) => {
    const prefs = { branch, semester };
    setUserPrefs(prefs);
    localStorage.setItem('studentClubPrefs', JSON.stringify(prefs));
  };

  // Enhanced mock data with drive links and contributors
  const mockData = {
    S1: {
      CSE: [
        {
          name: 'Algorithmic Thinking with Python',
          code: 'ATP',
          modules: [
            {
              number: 1,
              title: 'Introduction to Programming',
              contributors: [{ name: 'Evan Biju', class: 'S3 CSE' }, { name: 'Sarah Kumar', class: 'S3 CSE' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1xyz/view',
                notes: 'https://drive.google.com/file/d/2abc/view',
                mindMap: 'https://drive.google.com/file/d/3def/view',
                audio: null
              }
            },
            {
              number: 2,
              title: 'Control Structures',
              contributors: [{ name: 'Priya Sharma', class: 'S3 CSE' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/4ghi/view',
                notes: 'https://drive.google.com/file/d/5jkl/view',
                mindMap: null,
                audio: 'https://drive.google.com/file/d/6mno/view'
              }
            },
            {
              number: 3,
              title: 'Functions and Modules',
              contributors: [{ name: 'Arjun Kumar', class: 'S3 CSE' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/7pqr/view',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 4,
              title: 'Data Structures in Python',
              contributors: [{ name: 'Sneha Reddy', class: 'S3 CSE' }, { name: 'Rahul Verma', class: 'S3 CSE' }],
              materials: {
                answerKey: null,
                notes: 'https://drive.google.com/file/d/8stu/view',
                mindMap: 'https://drive.google.com/file/d/9vwx/view',
                audio: 'https://drive.google.com/file/d/10yz/view'
              }
            }
          ]
        },
        {
          name: 'Mathematics',
          code: 'MATH',
          modules: [
            {
              number: 1,
              title: 'Differential Calculus',
              contributors: [{ name: 'Anita Raj', class: 'S3 CSE' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/11abc/view',
                notes: 'https://drive.google.com/file/d/12def/view',
                mindMap: 'https://drive.google.com/file/d/13ghi/view',
                audio: null
              }
            },
            {
              number: 2,
              title: 'Integral Calculus',
              contributors: [{ name: 'Vikram Singh', class: 'S3 CSE' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/14jkl/view',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 3,
              title: 'Differential Equations',
              contributors: [{ name: 'Meera Nair', class: 'S3 CSE' }],
              materials: {
                answerKey: null,
                notes: 'https://drive.google.com/file/d/15mno/view',
                mindMap: null,
                audio: 'https://drive.google.com/file/d/16pqr/view'
              }
            },
            {
              number: 4,
              title: 'Linear Algebra',
              contributors: [{ name: 'Kiran Patel', class: 'S3 CSE' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/17stu/view',
                notes: 'https://drive.google.com/file/d/18vwx/view',
                mindMap: 'https://drive.google.com/file/d/19yz/view',
                audio: 'https://drive.google.com/file/d/20abc/view'
              }
            }
          ]
        },
        { name: 'Physics', code: 'PHY' },
        { name: 'Chemistry', code: 'CHEM' },
        { name: 'Graphics', code: 'GFX' },
        { name: 'Introduction to Electronics', code: 'ELEC' }
      ],
      EC: [
        { name: 'Circuit Analysis', code: 'CA' },
        { name: 'Mathematics', code: 'MATH' },
        { name: 'Physics', code: 'PHY' },
        { name: 'Electronics Basics', code: 'EB' }
      ]
    },
    S2: {
      CSE: [
        { name: 'Mathematics', code: 'MATH' },
        { name: 'Physics', code: 'PHY' },
        { name: 'Chemistry', code: 'CHEM' },
        { name: 'C Programming', code: 'CPROG' },
        { name: 'FOC', code: 'FOC' },
        { name: 'IPR', code: 'IPR' }
      ]
    },
    S3: {
      CSE: [
        {
          name: 'Object Oriented Programming',
          code: 'OOP',
          modules: [
            {
              number: 1,
              title: 'Introduction to OOP',
              contributors: [{ name: 'Ashin chacko', class: 'S3 CSE A' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1GBzLYHNVZ2GNpyTRu3Vp1YH62oHSSzFn/view?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 2,
              title: 'Inheritance and Polymorphism',
              contributors: [{ name: 'Basith', class: 'S3 CSE B' }],
              materials: {
                answerKey: 'https://docs.google.com/document/d/16MSHlXABdSHJ6wN2lVlDEllnx6HoXpJ9S5dqhbp0a-Y/edit?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 3,
              title: 'Inheritance and Polymorphism',
              contributors: [{ name: 'jiswin', class: 'S3 CSE A' },{ name: 'Basith', class: 'S3 CSE B' }],
              materials: {
                answerKey: 'https://docs.google.com/document/d/1eDtYvc_x34lzSb7dF3EgQMDe6KyMOeKmUIAX0a3BhJc/edit?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 4,
              title: 'awt,swing,jdbc',
              contributors: [{ name: 'Ashin chacko', class: 'S3 CSE A' }],
              materials: {
                answerKey: 'https://docs.google.com/document/d/1BGBKn5knZM7jVEQXcVpm5YDRWWVMdU9ZR7nFaZNKXlA/edit?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            }
          ]
        },
        {
          name: 'Data Structures and Algorithms',
          code: 'DSA',
          modules: [
            {
              number: 1,
              title: 'Arrays and Linked Lists',
              contributors: [{ name: 'Basith', class: 'S3 CSE B' },
              { name: 'Annliya', class: 'S3 CSE B' },
              { name: 'jiswin', class: 'S3 CSE A' }
              ],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1PicP60UjXSVvPD60FZnA4xpn55YqC5Uh/view?usp=sharing',
                notes: 'https://drive.google.com/file/d/1ZX0zl5a4fPsy6aaSCIody0iq91KJB_hH/view?usp=sharing',
                mindMap: 'https://drive.google.com/file/d/1tv0-qnQ5yK5kJcai-psGffakzLRlpYYl/view?usp=sharing',
                audio: 'https://drive.google.com/file/d/1HXRKXmPfyWHj6yZMibjCtr1e_yQeq9ek/view?usp=sharing'
              }
            },
            {
              number: 2,
              title: 'Stacks and Queues',
              contributors: [
                { name: 'Wafa ', class: 'S3 CSE B' },
                { name: 'Basith', class: 'S3 CSE B' }
              ],
              materials: {
                answerKey: 'https://docs.google.com/document/d/1puXociWZTK3tCJ_LviCz0z8enrWQfojlPewAPNkOgVM/edit?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 3,
              title: 'Trees and Graphs',
              contributors: [{ name: 'Basith', class: 'S3 CSE B' }],
              materials: {
                answerKey: null,
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 4,
              title: 'Sorting and Searching',
              contributors: [{ name: 'Basith', class: 'S3 CSE B' },
              { name: 'Annliya', class: 'S3 CSE B' },
              { name: 'jiswin', class: 'S3 CSE A' }],
              materials: {
                answerKey: null,
                notes: null,
                mindMap: null,
                audio: null
              }
            }
          ]
        },

        {
          name: 'Engineering Ethics and Sustainable Development',
          code: 'EESD',
          modules: [
            {
              number: 1,
              title: 'Introduction to Engineering Ethics',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                },
                {
                  name: 'Annliya',
                  class: 'S3 CSE -B'
                }
              ],
              materials: {
                answerKey: 'https://drive.google.com/drive/folders/1zDuBDNAcbvHVPplJ-f2iNTmf2hqyH57N?usp=sharing',
                notes: 'https://drive.google.com/file/d/1V4PH81zLoQycUP1ngFd9YodwdovAESlJ/view?usp=sharing',
                mindMap: 'https://drive.google.com/file/d/15aBWVLk5vcVS00gH2WT2ldSggqVKheSn/view?usp=sharing',
                audio: 'https://drive.google.com/file/d/EESD-M1-Audio/view'
              }
            },
            {
              number: 2,
              title: 'I. INTRODUCTION TO ENVIRONMENTAL ETHICS',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                }

              ],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1em31Fi3DRbVPkL3Gj-LnEK0Ln2I2emxv/view?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 3,
              title: 'Hydrology and Water Management',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                }
              ],
              materials: {
                answerKey: null,
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 4,
              title: 'Environmental Ethics and Engineering',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                }
              ],
              materials: {
                answerKey: null,
                notes: null,
                mindMap: null,
                audio: null
              }
            }
          ]
        },
        {
          name: 'Mathematics',
          code: 'MATH',
          modules: [
            {
              number: 1,
              title: 'Module 1',
              contributors: [
                {
                  name: 'Milan',
                  class: 'S3 CSE B'
                },
                {name:'Sangeeth',
                  class: 'S3 CSCY'
                },
                {
                  name:'ashin',
                  class:'S3 CSE A'

                }
              ],
              materials: {
                answerKey: 'https://drive.google.com/file/d/16HAed57BXaXy6q0RC-_GRsmQtbMzpEa6/view?usp=sharing',
                notes: 'https://drive.com/placeholder',
                mindMap: 'https://drive.com/placeholder',
                audio: 'https://drive.com/placeholder'
              }
            },
            {
              number: 2,
              title: 'Module 2',
              contributors: [
                {
                  name: 'Milan',
                  class: 'S3 CSE B'
                }
              ],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1dG026OJWGmuyBgIoFmNAKlNF3XRH9L91/view?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 3,
              title: 'Module 3',
              contributors: [
                {
                  name: 'Unknown',
                  class: 'Unknown'
                }
              ],
              materials: {
                answerKey: 'https://drive.com/placeholder',
                notes: 'https://drive.com/placeholder',
                mindMap: 'https://drive.com/placeholder',
                audio: 'https://drive.com/placeholder'
              }
            },
            {
              number: 4,
              title: 'Module 4',
              contributors: [
                {
                  name: 'Unknown',
                  class: 'Unknown'
                }
              ],
              materials: {
                answerKey: 'https://drive.com/placeholder',
                notes: 'https://drive.com/placeholder',
                mindMap: 'https://drive.com/placeholder',
                audio: 'https://drive.com/placeholder'
              }
            }
          ]
        },
        { name: 'Digital Electronics', code: 'DE'},
        { name: 'Theory of Computation', code: 'TOC',
          modules: [
            {
              number: 1,
              title: 'Module 1',
              contributors: [
                {
                  name: 'Joann',
                  class: 'S3 CSE A'
                },
                {name:'Niya Jose',
                  class: 'S3 CSE B'
                },
                {
                  name:'Juliya',
                  class: 'S3 CSE B'
                },
                {name:'Mitu Krishna',
                  class: 'S3 CSE A'
                },
                {name:'Navaneeth',
                  class: 'S3 CSE B'
                },
                {
                  name:'Vinny Shaju',
                  class:'S3 CSE A'

                }
              ],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1jDW3DjftCYnaQ2TlkuifQvv3qpdV7qiN/view?usp=sharing',
                notes: 'https://drive.com/placeholder',
                mindMap: 'https://drive.com/placeholder',
                audio: 'https://drive.com/placeholder'
              }
            },
            {
              number: 2,
              title: 'Module 2',
              contributors: [
                {
                  name: 'Unknown',
                  class: 'Unknown'
                }
              ],
              materials: {
                answerKey: 'https://drive.com/placeholder',
                notes: 'https://drive.com/placeholder',
                mindMap: 'https://drive.com/placeholder',
                audio: 'https://drive.com/placeholder'
              }
            },
            {
              number: 3,
              title: 'Module 3',
              contributors: [
                {
                  name: 'Unknown',
                  class: 'Unknown'
                }
              ],
              materials: {
                answerKey: 'https://drive.com/placeholder',
                notes: 'https://drive.com/placeholder',
                mindMap: 'https://drive.com/placeholder',
                audio: 'https://drive.com/placeholder'
              }
            },
            {
              number: 4,
              title: 'Module 4',
              contributors: [
                {
                  name: 'Unknown',
                  class: 'Unknown'
                }
              ],
              materials: {
                answerKey: 'https://drive.com/placeholder',
                notes: 'https://drive.com/placeholder',
                mindMap: 'https://drive.com/placeholder',
                audio: 'https://drive.com/placeholder'
              }
            }
          ]
         }
      ],
      ADS: [
        {
          name: 'Data Structures and Algorithms',
          code: 'DSA',
          modules: [
            {
              number: 1,
              title: 'Arrays and Linked Lists',
              contributors: [{ name: 'Basith', class: 'S3 CSE B' },
              { name: 'Annliya', class: 'S3 CSE B' },
              { name: 'jiswin', class: 'S3 CSE A' }
              ],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1PicP60UjXSVvPD60FZnA4xpn55YqC5Uh/view?usp=sharing',
                notes: 'https://drive.google.com/file/d/1ZX0zl5a4fPsy6aaSCIody0iq91KJB_hH/view?usp=sharing',
                mindMap: 'https://drive.google.com/file/d/1tv0-qnQ5yK5kJcai-psGffakzLRlpYYl/view?usp=sharing',
                audio: 'https://drive.google.com/file/d/1HXRKXmPfyWHj6yZMibjCtr1e_yQeq9ek/view?usp=sharing'
              }
            },
            {
              number: 2,
              title: 'Stacks and Queues',
              contributors: [
                { name: 'Wafa ', class: 'S3 CSE B' },
                { name: 'Basith', class: 'S3 CSE B' }
              ],
              materials: {
                answerKey: 'https://docs.google.com/document/d/1puXociWZTK3tCJ_LviCz0z8enrWQfojlPewAPNkOgVM/edit?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 3,
              title: 'Trees and Graphs',
              contributors: [{ name: 'Basith', class: 'S3 CSE B' },
              { name: 'Annliya', class: 'S3 CSE B' },
              { name: 'jiswin', class: 'S3 CSE A' }],
              materials: {
                answerKey: null,
                notes: 'https://drive.google.com/file/d/36vwx/view',
                mindMap: 'https://drive.google.com/file/d/37yz/view',
                audio: 'https://drive.google.com/file/d/38abc/view'
              }
            },
            {
              number: 4,
              title: 'Sorting and Searching',
              contributors: [{ name: 'Basith', class: 'S3 CSE B' },
              { name: 'Annliya', class: 'S3 CSE B' },
              { name: 'jiswin', class: 'S3 CSE A' }],
              materials: {
                answerKey: 'https://drive.google.com/file/d/39def/view',
                notes: 'https://drive.google.com/file/d/40ghi/view',
                mindMap: null,
                audio: null
              }
            }
          ]
        },

        {
          name: 'Engineering Ethics and Sustainable Development',
          code: 'EESD',
          modules: [
            {
              number: 1,
              title: 'Introduction to Engineering Ethics',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                },
                {
                  name: 'Annliya',
                  class: 'S3 CSE -B'
                }
              ],
              materials: {
                answerKey: 'https://drive.google.com/drive/folders/1zDuBDNAcbvHVPplJ-f2iNTmf2hqyH57N?usp=sharing',
                notes: 'https://drive.google.com/file/d/1V4PH81zLoQycUP1ngFd9YodwdovAESlJ/view?usp=sharing',
                mindMap: 'https://drive.google.com/file/d/15aBWVLk5vcVS00gH2WT2ldSggqVKheSn/view?usp=sharing',
                audio: 'https://drive.google.com/file/d/EESD-M1-Audio/view'
              }
            },
            {
              number: 2,
              title: 'I. INTRODUCTION TO ENVIRONMENTAL ETHICS',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                }

              ],
              materials: {
                answerKey: 'https://drive.google.com/file/d/1em31Fi3DRbVPkL3Gj-LnEK0Ln2I2emxv/view?usp=sharing',
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 3,
              title: 'Hydrology and Water Management',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                }
              ],
              materials: {
                answerKey: null,
                notes: null,
                mindMap: null,
                audio: null
              }
            },
            {
              number: 4,
              title: 'Environmental Ethics and Engineering',
              contributors: [
                {
                  name: 'Sangeeth',
                  class: 'S3 CSCY'
                }
              ],
              materials: {
                answerKey: null,
                notes: null,
                mindMap: null,
                audio: null
              }
            }
          ]
        }
        ,
        { name: 'Mathematics', code: 'MATH' },
        { name: 'Digital Electronics', code: 'DE' },
        { name: 'Theory of Computation', code: 'TOC' }
      ]
    },
    S4: {
      CSE: [
        { name: 'Microprocessors', code: 'MP' },
        { name: 'Computer Networks', code: 'CN' },
        { name: 'Database Systems', code: 'DBMS' },
        { name: 'Software Engineering', code: 'SE' },
        { name: 'Operating Systems', code: 'OS' }
      ]
    },

  };

  const getCurrentSubjects = () => {
    if (!userPrefs?.semester || !userPrefs?.branch) return [];
    return mockData[userPrefs.semester]?.[userPrefs.branch] || [];
  };

  const handleSubjectClick = (subject) => {
    if (subject.modules) {
      setSelectedSubject(subject);
      setCurrentView('modules');
    }
  };

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setCurrentView('materials');
  };

  const handleBackClick = () => {
    if (currentView === 'materials') {
      setCurrentView('modules');
      setSelectedModule('');
    } else if (currentView === 'modules') {
      setCurrentView('subjects');
      setSelectedSubject('');
    }
  };

  const toggleFavorite = (itemId) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    setFavorites(newFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
  };

  const handleMaterialAccess = (url, type) => {
    if (url) {
      window.open(url, '_blank');
      // Track recent downloads
      const recent = JSON.parse(localStorage.getItem('recentDownloads') || '[]');
      const newItem = {
        id: `${selectedSubject.code}-${selectedModule.number}-${type}`,
        subject: selectedSubject.name,
        module: selectedModule.title,
        type,
        timestamp: Date.now()
      };
      const updatedRecent = [newItem, ...recent.filter(item => item.id !== newItem.id)].slice(0, 10);
      localStorage.setItem('recentDownloads', JSON.stringify(updatedRecent));
    }
  };

  const renderBreadcrumb = () => {
    const items = [];
    if (currentView === 'subjects') {
      items.push('Subjects');
    } else if (currentView === 'modules') {
      items.push('Subjects', selectedSubject.name);
    } else if (currentView === 'materials') {
      items.push('Subjects', selectedSubject.name, `Module ${selectedModule.number}`);
    }

    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        {items.map((item, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <span className={index === items.length - 1 ? 'font-medium text-gray-900' : ''}>
              {item}
            </span>
          </span>
        ))}
      </div>
    );
  };

  const renderSubjectsView = () => (
    <div className="space-y-6">
      {/* Subjects Grid */}
      {getCurrentSubjects().length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentSubjects().map((subject, index) => (
            <Card
              key={index}
              className={`bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${subject.modules ? 'cursor-pointer' : 'opacity-60'}`}
              onClick={() => handleSubjectClick(subject)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {subject.name}
                    </CardTitle>
                    <Badge variant="outline" className="mb-2">
                      {subject.code}
                    </Badge>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {userPrefs?.semester}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {subject.modules ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{subject.modules.length} modules available</p>
                    <Button variant="outline" className="w-full">
                      View Modules
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Materials will be uploaded soon</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Subjects Found</h3>
          <p className="text-gray-600">
            Subjects for your selected branch and semester will be available soon.
          </p>
        </div>
      )}
    </div>
  );

  const renderModulesView = () => (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border-0 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedSubject.name}</h2>
        <p className="text-gray-600">Select a module to access study materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedSubject.modules.map((module) => (
          <Card
            key={module.number}
            className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => handleModuleClick(module)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    Module {module.number}
                  </CardTitle>
                  <p className="text-gray-600">{module.title}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(`${selectedSubject.code}-${module.number}`);
                  }}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(`${selectedSubject.code}-${module.number}`) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Available Materials */}
                <div className="flex flex-wrap gap-2">
                  {module.materials.answerKey && <Badge variant="secondary">Answer Key</Badge>}
                  {module.materials.notes && <Badge variant="secondary">Notes</Badge>}
                  {module.materials.mindMap && <Badge variant="secondary">Mind Map</Badge>}
                  {module.materials.audio && <Badge variant="secondary">Audio</Badge>}
                </div>

                {/* Contributors */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Contributors:</p>
                  {module.contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="w-3 h-3" />
                      <span>{contributor.name}</span>
                      <GraduationCap className="w-3 h-3" />
                      <span>{contributor.class}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMaterialsView = () => {
    const materials = [
      {
        type: 'answerKey',
        label: 'Answer Key',
        icon: BookOpen,
        color: 'bg-blue-500',
        url: selectedModule.materials.answerKey
      },
      {
        type: 'notes',
        label: 'Quick Revision Notes',
        icon: FileText,
        color: 'bg-green-500',
        url: selectedModule.materials.notes
      },
      {
        type: 'mindMap',
        label: 'Mind Map',
        icon: Brain,
        color: 'bg-purple-500',
        url: selectedModule.materials.mindMap
      },
      {
        type: 'audio',
        label: 'Audio Revision',
        icon: Headphones,
        color: 'bg-orange-500',
        url: selectedModule.materials.audio
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border-0 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedSubject.name} - Module {selectedModule.number}
          </h2>
          <p className="text-gray-600 mb-4">{selectedModule.title}</p>

          {/* Contributors */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Contributors:</p>
            <div className="flex flex-wrap gap-4">
              {selectedModule.contributors.map((contributor, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                  <User className="w-3 h-3 text-gray-600" />
                  <span className="text-sm text-gray-700">{contributor.name}</span>
                  <GraduationCap className="w-3 h-3 text-gray-600" />
                  <span className="text-sm text-gray-600">{contributor.class}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materials.map((material) => (
            <Card
              key={material.type}
              className={`bg-white/70 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${material.url ? 'hover:shadow-xl cursor-pointer' : 'opacity-50'
                }`}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${material.color} rounded-lg flex items-center justify-center`}>
                    <material.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {material.label}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {material.url ? (
                  <Button
                    onClick={() => handleMaterialAccess(material.url, material.type)}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Access {material.label}</span>
                  </Button>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Not available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      <Navigation
        userPrefs={userPrefs}
        onSettingsClick={() => setShowSettingsModal(true)}
        showBackButton={currentView !== 'subjects'}
        onBackClick={handleBackClick}
      />

      {/* Page Content */}
      <div className="bg-muted/20 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Study Resources</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access answer keys, notes, mind maps, and audio revisions for all your subjects
            </p>
            {userPrefs && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Resources for {userPrefs.branch} - {userPrefs.semester}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        {renderBreadcrumb()}

        {/* Content based on current view */}
        {currentView === 'subjects' && renderSubjectsView()}
        {currentView === 'modules' && renderModulesView()}
        {currentView === 'materials' && renderMaterialsView()}
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

export default Resources;