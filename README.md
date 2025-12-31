<div align="center">
  <img src="YouRMS-banner.png" alt="YouRMS Banner" width="100%">
  
  # YouRMS - Your Routine Making System
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://yourms.netlify.app/)
  [![Netlify Status](https://img.shields.io/badge/netlify-deployed-00C7B7.svg)](https://yourms.netlify.app/)
  
  **A Smart Course Scheduler & Exam Planner for ULAB Students**
  
  [Live Demo](https://yourms.netlify.app/) · [Report Bug](https://github.com/Brother258/YouRMS/issues) · [Request Feature](https://github.com/Brother258/YouRMS/issues)
</div>

---

## 📖 About The Project

YouRMS (Your Routine Making System) is a responsive web application designed specifically for students at the University of Liberal Arts Bangladesh (ULAB). It streamlines academic planning by helping students manage their course schedules, daily timetables, and exam plans efficiently.

### ✨ Key Features

- 📅 **Course Schedule Management** - Add, edit, and organize your courses effortlessly
- ⚠️ **Conflict Detection** - Automatically detect and highlight schedule conflicts
- 📊 **Daily Timetable View** - Get a clear overview of your daily classes
- 📝 **Exam Planner** - Track and organize your exam schedules
- 🔍 **Course Search** - Quickly find and filter courses
- 📤 **Schedule Sharing** - Share your timetable with classmates
- 💾 **Data Export** - Download your schedule as JSON
- 📱 **Progressive Web App (PWA)** - Install and use offline on any device
- 🎨 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🚀 Getting Started

### Prerequisites

YouRMS is a client-side web application that runs entirely in the browser. No special prerequisites are required!

### Installation

You have multiple options to use YouRMS:

#### Option 1: Use Online (Recommended)
Simply visit [https://yourms.netlify.app/](https://yourms.netlify.app/) and start using the app immediately.

#### Option 2: Install as PWA
1. Visit [https://yourms.netlify.app/](https://yourms.netlify.app/)
2. Click the "Install" button in your browser or the install prompt
3. Access YouRMS from your home screen or app drawer

#### Option 3: Run Locally
```bash
# Clone the repository
git clone https://github.com/Brother258/YouRMS.git

# Navigate to the project directory
cd YouRMS

# Open index.html in your browser or use a local server
# Using Python 3:
python -m http.server 8000

# Using Node.js (http-server):
npx http-server

# Then visit http://localhost:8000 in your browser
```

---

## 💻 Usage

### Adding Courses

1. Navigate to the main schedule page
2. Search for your course using the course code (e.g., "BUS 1201")
3. Click "Search" to filter and display course information
4. Add the course to your schedule

### Managing Your Schedule

- **View Daily Schedule**: See all your classes organized by day and time
- **Detect Conflicts**: The app automatically highlights any scheduling conflicts
- **Export Schedule**: Download your schedule data as a JSON file for backup or sharing

### Searching Courses

Use the search bar to quickly find courses:
```
Example: Search "CSE 1101" to find Computer Science courses
```

---

## 🛠️ Built With

- **HTML5** - Semantic markup
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Application logic and interactivity
- **PWA Technologies** - Service Workers for offline functionality
- **JSON** - Data storage and export

### Project Structure

```
YouRMS/
├── 261/                    # Main application directory
│   ├── index.html         # Main application page
│   ├── course_data.js     # Course data
│   ├── course_name.js     # Course name mappings
│   ├── search.js          # Search functionality
│   └── share.js           # Sharing features
├── index.html             # Landing page
├── admin.js               # Admin functionality
├── manifest.json          # PWA manifest
├── installer.js           # PWA installation handler
├── YouRMS-banner.png      # Banner image
├── yourms-icon.png        # App icon
└── README.md              # This file
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Test your changes thoroughly before submitting
- Update documentation as needed
- Write clear commit messages

---

## 📋 Roadmap

- [x] Core schedule management
- [x] Conflict detection
- [x] PWA support
- [x] Course search functionality
- [ ] User authentication
- [ ] Cloud sync
- [ ] Multi-semester support
- [ ] GPA calculator
- [ ] Push notifications for upcoming classes

See the [open issues](https://github.com/Brother258/YouRMS/issues) for a full list of proposed features and known issues.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👤 Author

**Md. Shahriar Alam**

- GitHub: [@Brother258](https://github.com/Brother258)
- Website: [https://yourms.netlify.app/](https://yourms.netlify.app/)

---

## 🙏 Acknowledgments

- Thanks to all ULAB students who provided feedback
- Icons and design inspiration from modern web design practices
- Special thanks to the open-source community

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/Brother258/YouRMS/issues) page
2. Open a new issue if your question hasn't been answered
3. Contact via the website's contact page

---

<div align="center">
  
  **⭐ Star this repo if you find it helpful! ⭐**
  
  Made with ❤️ for ULAB Students
  
</div>