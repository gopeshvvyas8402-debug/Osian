import { useState } from 'react';
import { useCourseContext, Course } from '../context/CourseContext';
import { useSiteContext } from '../context/SiteContext';
import {
  Plus, Edit, Trash2, LogOut, Lock, Eye, EyeOff,
  Monitor, BarChart3, GraduationCap, Code, Terminal,
  PenTool, Globe, FileSpreadsheet, Smartphone,
  Database, Layers, ArrowLeft, Settings, Home,
  Users, BookOpen, Award, Briefcase, Target, Shield,
  Clock, Zap, Lightbulb, TrendingUp, Heart, ThumbsUp,
  Save, RefreshCw, CheckCircle2, Camera, Upload
} from 'lucide-react';

const categories = ["Computer Basics", "Accounting", "Programming", "Design", "Office", "Advanced"];

const iconOptions = [
  "Monitor", "BarChart3", "GraduationCap", "Code", "Terminal",
  "PenTool", "Globe", "FileSpreadsheet", "Smartphone", "Database", "Layers",
  "Users", "BookOpen", "Award", "Briefcase", "Target", "Shield",
  "Clock", "Zap", "Lightbulb", "TrendingUp", "Heart", "ThumbsUp"
];

const colorOptions = [
  "from-blue-500 to-blue-700", "from-green-500 to-green-700",
  "from-purple-500 to-purple-700", "from-indigo-500 to-indigo-700",
  "from-cyan-500 to-cyan-700", "from-yellow-500 to-yellow-700",
  "from-pink-500 to-pink-700", "from-teal-500 to-teal-700",
  "from-emerald-500 to-emerald-700", "from-orange-500 to-orange-700",
  "from-rose-500 to-rose-700", "from-amber-500 to-amber-700"
];

const iconMap = {
  Monitor, BarChart3, GraduationCap, Code, Terminal,
  PenTool, Globe, FileSpreadsheet, Smartphone, Database, Layers,
  Users, BookOpen, Award, Briefcase, Target, Shield,
  Clock, Zap, Lightbulb, TrendingUp, Heart, ThumbsUp
};

type Section = 'courses' | 'hero' | 'stats' | 'about' | 'features' | 'testimonials' | 'cta' | 'aboutPage' | 'milestones' | 'team' | 'values' | 'contact' | 'gallery' | 'siteInfo' | 'socialLinks';

export function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<Section>('courses');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { courses, addCourse, updateCourse, deleteCourse } = useCourseContext();
  const { content, updateContent, resetContent } = useSiteContext();

  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
    icon: 'Monitor',
    title: '',
    category: 'Computer Basics',
    duration: '',
    students: '',
    level: '',
    desc: '',
    topics: [''],
    color: 'from-blue-500 to-blue-700'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSaveContent = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetContent = () => {
    if (window.confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      resetContent();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Courses Management
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      ...newCourse,
      students: newCourse.students || '0+',
      topics: newCourse.topics.filter(topic => topic.trim() !== '')
    });
    setShowAddCourse(false);
    resetForm();
  };

  const handleEditCourse = (index: number) => {
    setEditingIndex(index);
    setNewCourse(courses[index]);
    setShowEditCourse(true);
  };

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex >= 0) {
      updateCourse(editingIndex, {
        ...newCourse,
        topics: newCourse.topics.filter(topic => topic.trim() !== '')
      });
    }
    setShowEditCourse(false);
    resetForm();
    setEditingIndex(-1);
  };

  const handleDeleteCourse = (index: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(index);
    }
  };

  const resetForm = () => {
    setNewCourse({
      icon: 'Monitor',
      title: '',
      category: 'Computer Basics',
      duration: '',
      students: '',
      level: '',
      desc: '',
      topics: [''],
      color: 'from-blue-500 to-blue-700'
    });
  };

  const addTopic = () => {
    setNewCourse(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const updateTopic = (index: number, value: string) => {
    setNewCourse(prev => {
      const newTopics = [...prev.topics];
      newTopics[index] = value;
      return { ...prev, topics: newTopics };
    });
  };

  const removeTopic = (index: number) => {
    if (newCourse.topics.length > 1) {
      setNewCourse(prev => ({
        ...prev,
        topics: prev.topics.filter((_, i) => i !== index)
      }));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-secondary-light/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent input-focus"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-12 input-focus"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-primary to-accent text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all btn-hover"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Default credentials: <span className="font-semibold text-gray-700">admin / admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-2">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveContent}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
              <button
                onClick={handleResetContent}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Reset to Default
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
          {saveSuccess && (
            <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              Changes saved successfully!
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
                Site Management
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSection('courses')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'courses'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  Courses
                </button>
                <button
                  onClick={() => setActiveSection('hero')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'hero'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Hero Section
                </button>
                <button
                  onClick={() => setActiveSection('stats')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'stats'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Stats Section
                </button>
                <button
                  onClick={() => setActiveSection('about')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'about'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  About Section
                </button>
                <button
                  onClick={() => setActiveSection('features')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'features'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Target className="h-4 w-4" />
                  Features
                </button>
                <button
                  onClick={() => setActiveSection('testimonials')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'testimonials'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Testimonials
                </button>
                <button
                  onClick={() => setActiveSection('cta')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'cta'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  CTA Section
                </button>
                <button
                  onClick={() => setActiveSection('aboutPage')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'aboutPage'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  About Page
                </button>
                <button
                  onClick={() => setActiveSection('milestones')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'milestones'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  Milestones
                </button>
                <button
                  onClick={() => setActiveSection('team')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'team'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Team
                </button>
                <button
                  onClick={() => setActiveSection('values')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'values'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  Values
                </button>
                <button
                  onClick={() => setActiveSection('contact')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'contact'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Contact Info
                </button>
                <button
                  onClick={() => setActiveSection('gallery')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'gallery'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Camera className="h-4 w-4" />
                  Gallery
                </button>
                <button
                  onClick={() => setActiveSection('siteInfo')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'siteInfo'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Site Information
                </button>
                <button
                  onClick={() => setActiveSection('socialLinks')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === 'socialLinks'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Social Links
                </button>
              </div>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-6">
            {/* Courses Section */}
            {activeSection === 'courses' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Management</h2>
                  <p className="text-gray-600">Manage your courses here. Add, edit, or delete courses.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowAddCourse(true)}
                        className="flex items-center gap-2 bg-gradient-to-br from-primary to-accent text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
                      >
                        <Plus className="h-4 w-4" />
                        Add New Course
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Total Courses: <span className="font-semibold text-gray-900">{courses.length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course, index) => {
                          const IconComponent = iconMap[course.icon as keyof typeof iconMap] || Monitor;
                          return (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className={`bg-gradient-to-br ${course.color} p-2 rounded-lg`}>
                                    <IconComponent className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{course.title}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{course.desc}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                  {course.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {course.duration}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {course.level}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditCourse(index)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCourse(index)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Section */}
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Hero Section</h2>
                  <p className="text-gray-600">Customize the hero section content.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                    <input
                      type="text"
                      value={content.hero.badge}
                      onChange={(e) => updateContent({ hero: { ...content.hero, badge: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter badge text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
                    <input
                      type="text"
                      value={content.hero.title}
                      onChange={(e) => updateContent({ hero: { ...content.hero, title: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter main title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <textarea
                      value={content.hero.subtitle}
                      onChange={(e) => updateContent({ hero: { ...content.hero, subtitle: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter subtitle"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
                    <input
                      type="text"
                      value={content.hero.cta1}
                      onChange={(e) => updateContent({ hero: { ...content.hero, cta1: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter primary CTA text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={content.hero.cta2}
                      onChange={(e) => updateContent({ hero: { ...content.hero, cta2: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter secondary CTA text"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Stats Section */}
            {activeSection === 'stats' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Stats Section</h2>
                  <p className="text-gray-600">Manage the statistics displayed on the homepage.</p>
                </div>

                <div className="space-y-4">
                  {content.stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Stat {index + 1}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                          <select
                            value={stat.icon}
                            onChange={(e) => {
                              const newStats = [...content.stats];
                              newStats[index] = { ...stat, icon: e.target.value };
                              updateContent({ stats: newStats });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {iconOptions.map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...content.stats];
                              newStats[index] = { ...stat, label: e.target.value };
                              updateContent({ stats: newStats });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter label"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                          <input
                            type="number"
                            value={stat.value}
                            onChange={(e) => {
                              const newStats = [...content.stats];
                              newStats[index] = { ...stat, value: parseInt(e.target.value) };
                              updateContent({ stats: newStats });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter value"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Suffix</label>
                          <input
                            type="text"
                            value={stat.suffix}
                            onChange={(e) => {
                              const newStats = [...content.stats];
                              newStats[index] = { ...stat, suffix: e.target.value };
                              updateContent({ stats: newStats });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter suffix"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Section */}
            {activeSection === 'about' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">About Section</h2>
                  <p className="text-gray-600">Customize the about section content on the homepage.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                    <input
                      type="text"
                      value={content.about.badge}
                      onChange={(e) => updateContent({ about: { ...content.about, badge: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter badge text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={content.about.title}
                      onChange={(e) => updateContent({ about: { ...content.about, title: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description Paragraphs</label>
                    {content.about.description.map((paragraph, index) => (
                      <div key={index} className="mb-3">
                        <textarea
                          value={paragraph}
                          onChange={(e) => {
                            const newDescription = [...content.about.description];
                            newDescription[index] = e.target.value;
                            updateContent({ about: { ...content.about, description: newDescription } });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter paragraph"
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    {content.about.features.map((feature, index) => (
                      <div key={index} className="mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...content.about.features];
                            newFeatures[index] = e.target.value;
                            updateContent({ about: { ...content.about, features: newFeatures } });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter feature"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Features Section */}
            {activeSection === 'features' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Features Section</h2>
                  <p className="text-gray-600">Manage the features displayed on the homepage.</p>
                </div>

                <div className="space-y-4">
                  {content.features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Feature {index + 1}</h3>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <select
                          value={feature.icon}
                          onChange={(e) => {
                            const newFeatures = [...content.features];
                            newFeatures[index] = { ...feature, icon: e.target.value };
                            updateContent({ features: newFeatures });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...content.features];
                            newFeatures[index] = { ...feature, title: e.target.value };
                            updateContent({ features: newFeatures });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={feature.desc}
                          onChange={(e) => {
                            const newFeatures = [...content.features];
                            newFeatures[index] = { ...feature, desc: e.target.value };
                            updateContent({ features: newFeatures });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter description"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Section */}
            {activeSection === 'testimonials' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Testimonials Section</h2>
                  <p className="text-gray-600">Manage the testimonials displayed on the homepage.</p>
                </div>

                <div className="space-y-4">
                  {content.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Testimonial {index + 1}</h3>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => {
                            const newTestimonials = [...content.testimonials];
                            newTestimonials[index] = { ...testimonial, name: e.target.value };
                            updateContent({ testimonials: newTestimonials });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter student name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                        <input
                          type="text"
                          value={testimonial.course}
                          onChange={(e) => {
                            const newTestimonials = [...content.testimonials];
                            newTestimonials[index] = { ...testimonial, course: e.target.value };
                            updateContent({ testimonials: newTestimonials });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter course name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Text</label>
                        <textarea
                          value={testimonial.text}
                          onChange={(e) => {
                            const newTestimonials = [...content.testimonials];
                            newTestimonials[index] = { ...testimonial, text: e.target.value };
                            updateContent({ testimonials: newTestimonials });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter testimonial text"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                        <select
                          value={testimonial.rating}
                          onChange={(e) => {
                            const newTestimonials = [...content.testimonials];
                            newTestimonials[index] = { ...testimonial, rating: parseInt(e.target.value) };
                            updateContent({ testimonials: newTestimonials });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating} Stars</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            {activeSection === 'cta' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">CTA Section</h2>
                  <p className="text-gray-600">Customize the call-to-action section on the homepage.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={content.cta.title}
                      onChange={(e) => updateContent({ cta: { ...content.cta, title: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <textarea
                      value={content.cta.subtitle}
                      onChange={(e) => updateContent({ cta: { ...content.cta, subtitle: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter subtitle"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
                    <input
                      type="text"
                      value={content.cta.cta1}
                      onChange={(e) => updateContent({ cta: { ...content.cta, cta1: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter primary CTA text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={content.cta.cta2}
                      onChange={(e) => updateContent({ cta: { ...content.cta, cta2: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter secondary CTA text"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* About Page Section */}
            {activeSection === 'aboutPage' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">About Page Content</h2>
                  <p className="text-gray-600">Customize the content for the About page.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                    <textarea
                      value={content.aboutPage.mission}
                      onChange={(e) => updateContent({ aboutPage: { ...content.aboutPage, mission: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter mission statement"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
                    <textarea
                      value={content.aboutPage.vision}
                      onChange={(e) => updateContent({ aboutPage: { ...content.aboutPage, vision: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter vision statement"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description Paragraphs</label>
                    {content.aboutPage.description.map((paragraph, index) => (
                      <div key={index} className="mb-3">
                        <textarea
                          value={paragraph}
                          onChange={(e) => {
                            const newDescription = [...content.aboutPage.description];
                            newDescription[index] = e.target.value;
                            updateContent({ aboutPage: { ...content.aboutPage, description: newDescription } });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter paragraph"
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                    {content.aboutPage.highlights.map((highlight, index) => (
                      <div key={index} className="mb-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => {
                            const newHighlights = [...content.aboutPage.highlights];
                            newHighlights[index] = e.target.value;
                            updateContent({ aboutPage: { ...content.aboutPage, highlights: newHighlights } });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter highlight"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Milestones Section */}
            {activeSection === 'milestones' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Milestones Section</h2>
                  <p className="text-gray-600">Manage the milestones displayed on the About page.</p>
                </div>

                <div className="space-y-4">
                  {content.milestones.map((milestone, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Milestone {index + 1}</h3>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <input
                          type="text"
                          value={milestone.year}
                          onChange={(e) => {
                            const newMilestones = [...content.milestones];
                            newMilestones[index] = { ...milestone, year: e.target.value };
                            updateContent({ milestones: newMilestones });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter year"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) => {
                            const newMilestones = [...content.milestones];
                            newMilestones[index] = { ...milestone, title: e.target.value };
                            updateContent({ milestones: newMilestones });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={milestone.desc}
                          onChange={(e) => {
                            const newMilestones = [...content.milestones];
                            newMilestones[index] = { ...milestone, desc: e.target.value };
                            updateContent({ milestones: newMilestones });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter description"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Section */}
            {activeSection === 'team' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Section</h2>
                  <p className="text-gray-600">Manage the team members displayed on the About page.</p>
                </div>

                <div className="space-y-4">
                  {content.team.map((member, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Team Member {index + 1}</h3>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const newTeam = [...content.team];
                            newTeam[index] = { ...member, name: e.target.value };
                            updateContent({ team: newTeam });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => {
                            const newTeam = [...content.team];
                            newTeam[index] = { ...member, role: e.target.value };
                            updateContent({ team: newTeam });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter role"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                        <input
                          type="text"
                          value={member.specialization}
                          onChange={(e) => {
                            const newTeam = [...content.team];
                            newTeam[index] = { ...member, specialization: e.target.value };
                            updateContent({ team: newTeam });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter specialization"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Initials</label>
                        <input
                          type="text"
                          value={member.initial}
                          onChange={(e) => {
                            const newTeam = [...content.team];
                            newTeam[index] = { ...member, initial: e.target.value };
                            updateContent({ team: newTeam });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter initials (e.g., RO)"
                          maxLength={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Values Section */}
            {activeSection === 'values' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Core Values Section</h2>
                  <p className="text-gray-600">Manage the core values displayed on the About page.</p>
                </div>

                <div className="space-y-4">
                  {content.values.map((value, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Value {index + 1}</h3>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <select
                          value={value.icon}
                          onChange={(e) => {
                            const newValues = [...content.values];
                            newValues[index] = { ...value, icon: e.target.value };
                            updateContent({ values: newValues });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={value.title}
                          onChange={(e) => {
                            const newValues = [...content.values];
                            newValues[index] = { ...value, title: e.target.value };
                            updateContent({ values: newValues });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={value.desc}
                          onChange={(e) => {
                            const newValues = [...content.values];
                            newValues[index] = { ...value, desc: e.target.value };
                            updateContent({ values: newValues });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter description"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Section */}
            {activeSection === 'gallery' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery Management</h2>
                  <p className="text-gray-600">Manage the gallery images displayed on the Gallery page.</p>
                </div>

                <div className="space-y-4">
                  {content.gallery.map((image, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Image {index + 1}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <input
                            type="text"
                            value={image.category}
                            onChange={(e) => {
                              const newGallery = [...content.gallery];
                              newGallery[index] = { ...image, category: e.target.value };
                              updateContent({ gallery: newGallery });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter category"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={image.title}
                            onChange={(e) => {
                              const newGallery = [...content.gallery];
                              newGallery[index] = { ...image, title: e.target.value };
                              updateContent({ gallery: newGallery });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                          <select
                            value={image.icon}
                            onChange={(e) => {
                              const newGallery = [...content.gallery];
                              newGallery[index] = { ...image, icon: e.target.value };
                              updateContent({ gallery: newGallery });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {iconOptions.map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gradient</label>
                          <select
                            value={image.gradient}
                            onChange={(e) => {
                              const newGallery = [...content.gallery];
                              newGallery[index] = { ...image, gradient: e.target.value };
                              updateContent({ gallery: newGallery });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {colorOptions.map(color => (
                              <option key={color} value={color}>{color}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={image.imageUrl || ''}
                              onChange={(e) => {
                                const newGallery = [...content.gallery];
                                newGallery[index] = { ...image, imageUrl: e.target.value };
                                updateContent({ gallery: newGallery });
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter image URL (e.g., /images/gallery/image1.jpg)"
                            />
                            <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark cursor-pointer transition-colors">
                              <Upload className="h-4 w-4" />
                              Upload
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const imageUrl = event.target?.result as string;
                                      const newGallery = [...content.gallery];
                                      newGallery[index] = { ...image, imageUrl };
                                      updateContent({ gallery: newGallery });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {image.imageUrl && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                              <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs">
                                <img
                                  src={image.imageUrl}
                                  alt={image.title}
                                  className="w-full h-40 object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={image.desc}
                          onChange={(e) => {
                            const newGallery = [...content.gallery];
                            newGallery[index] = { ...image, desc: e.target.value };
                            updateContent({ gallery: newGallery });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter description"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Site Information Section */}
            {activeSection === 'siteInfo' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Information</h2>
                  <p className="text-gray-600">Manage the basic information about your site.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={content.siteInfo.siteName}
                      onChange={(e) => updateContent({ siteInfo: { ...content.siteInfo, siteName: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter site name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                    <input
                      type="text"
                      value={content.siteInfo.tagline}
                      onChange={(e) => updateContent({ siteInfo: { ...content.siteInfo, tagline: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter tagline"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                    <input
                      type="text"
                      value={content.siteInfo.logo}
                      onChange={(e) => updateContent({ siteInfo: { ...content.siteInfo, logo: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter logo URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                    <input
                      type="text"
                      value={content.siteInfo.copyright}
                      onChange={(e) => updateContent({ siteInfo: { ...content.siteInfo, copyright: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter copyright text"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Links Section */}
            {activeSection === 'socialLinks' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Media Links</h2>
                  <p className="text-gray-600">Manage your social media profiles and links.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                    <input
                      type="url"
                      value={content.socialLinks.facebook}
                      onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, facebook: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter Facebook URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={content.socialLinks.twitter}
                      onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, twitter: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter Twitter URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={content.socialLinks.instagram}
                      onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, instagram: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter Instagram URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={content.socialLinks.linkedin}
                      onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, linkedin: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter LinkedIn URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                    <input
                      type="url"
                      value={content.socialLinks.youtube}
                      onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, youtube: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter YouTube URL"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info Section */}
            {activeSection === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
                  <p className="text-gray-600">Manage the contact information displayed on the site.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={content.contactInfo.phone}
                      onChange={(e) => updateContent({ contactInfo: { ...content.contactInfo, phone: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={content.contactInfo.email}
                      onChange={(e) => updateContent({ contactInfo: { ...content.contactInfo, email: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={content.contactInfo.address}
                      onChange={(e) => updateContent({ contactInfo: { ...content.contactInfo, address: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                    <input
                      type="text"
                      value={content.contactInfo.timings}
                      onChange={(e) => updateContent({ contactInfo: { ...content.contactInfo, timings: e.target.value } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter business hours"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Add New Course</h3>
              <button
                onClick={() => {
                  setShowAddCourse(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <select
                    value={newCourse.icon}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select
                    value={newCourse.color}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {colorOptions.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 3 Months"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCourse.desc}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, desc: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter course description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <input
                    type="text"
                    value={newCourse.level}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Beginner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Students</label>
                  <input
                    type="text"
                    value={newCourse.students}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, students: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 1000+"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Key Topics</label>
                <div className="space-y-2">
                  {newCourse.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => updateTopic(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter topic"
                      />
                      {newCourse.topics.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTopic(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTopic}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add more topics
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCourse(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-br from-primary to-accent text-white rounded-lg font-medium hover:shadow-md transition-all"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Edit Course</h3>
              <button
                onClick={() => {
                  setShowEditCourse(false);
                  resetForm();
                  setEditingIndex(-1);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateCourse} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <select
                    value={newCourse.icon}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select
                    value={newCourse.color}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {colorOptions.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 3 Months"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCourse.desc}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, desc: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter course description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <input
                    type="text"
                    value={newCourse.level}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Beginner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Students</label>
                  <input
                    type="text"
                    value={newCourse.students}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, students: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 1000+"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Key Topics</label>
                <div className="space-y-2">
                  {newCourse.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => updateTopic(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter topic"
                      />
                      {newCourse.topics.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTopic(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTopic}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add more topics
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditCourse(false);
                    resetForm();
                    setEditingIndex(-1);
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-br from-primary to-accent text-white rounded-lg font-medium hover:shadow-md transition-all"
                >
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}