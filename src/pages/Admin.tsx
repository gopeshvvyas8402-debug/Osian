import { useState } from 'react';
import { useCourseContext, Course } from '../context/CourseContext';
import {
  Plus, Edit, Trash2, LogOut, Lock, Eye, EyeOff,
  Monitor, BarChart3, GraduationCap, Code, Terminal,
  PenTool, Globe, FileSpreadsheet, Smartphone,
  Database, Layers, ArrowLeft
} from 'lucide-react';

const categories = ["Computer Basics", "Accounting", "Programming", "Design", "Office", "Advanced"];

const iconOptions = [
  "Monitor", "BarChart3", "GraduationCap", "Code", "Terminal",
  "PenTool", "Globe", "FileSpreadsheet", "Smartphone", "Database", "Layers"
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
  PenTool, Globe, FileSpreadsheet, Smartphone, Database, Layers
};

export function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
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

  const { courses, addCourse, updateCourse, deleteCourse } = useCourseContext();

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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Management</h2>
          <p className="text-gray-600">Manage your courses here. Add, edit, or delete courses.</p>
        </div>

        {/* Course Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
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

        {/* Courses Table */}
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
              {/* Form fields */}
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
              {/* Same form fields as add course */}
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