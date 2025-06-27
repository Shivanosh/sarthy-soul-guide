
# Sarthi App - Guide to Your Soul 🕉️

A comprehensive spiritual super app built with React + Express + SQLite featuring AI-powered mood meditation, sacred media library, and ritual booking system.

## 🌟 Features

### 👥 Dual Authentication System
- **User Login**: Spiritual seekers can access personalized content
- **Admin Login**: Temple administrators manage content and bookings

### 🧠 AI-Powered Features
- **Narad AI**: Mood-based meditation recommendations
- Personalized spiritual practice suggestions
- Intelligent content categorization

### 📱 Core Functionality
- **Mood Selection**: AI analyzes your emotional state and suggests appropriate practices
- **Media Library**: Extensive collection of bhajans, mantras, chants, and instrumental music
- **Ritual Booking**: Schedule authentic poojas and ceremonies with verified priests
- **Admin Dashboard**: Content management and booking approval system

### 🎨 Design Features
- Mobile-responsive design with TailwindCSS
- Sacred color palette (saffron, orange, blue, purple)
- Smooth animations and transitions
- Intuitive navigation and user experience

## 🚀 Quick Start

### Demo Credentials
**User Login:**
- Email: `user@example.com`
- Password: `password`

**Admin Login:**
- Email: `admin@example.com`
- Password: `admin123`

## 🛠️ Full Stack Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- SQLite3

### 1. Project Structure Setup
```bash
# Create project directory
mkdir aapkasarthy-fullstack
cd aapkasarthy-fullstack

# Create client and server directories
mkdir client server

# Setup React client
cd client
npx create-react-app . --template typescript
npm install @tanstack/react-query lucide-react sonner
npm install -D tailwindcss

# Setup Express server
cd ../server
npm init -y
npm install express sqlite3 bcryptjs jsonwebtoken cors helmet dotenv
npm install -D nodemon concurrently
```

### 2. Database Setup (SQLite)

Create `server/database.sql`:
```sql
-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Moods table
CREATE TABLE moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    mood VARCHAR(100) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Media table
CREATE TABLE media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    type VARCHAR(100) NOT NULL,
    language VARCHAR(100),
    mood_tag VARCHAR(100),
    duration VARCHAR(20),
    file_path VARCHAR(500),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rituals table
CREATE TABLE rituals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    ritual_type VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(100),
    participants VARCHAR(50),
    address TEXT NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, password_hash, role) VALUES
('Spiritual Seeker', 'user@example.com', '$2b$10$hash', 'user'),
('Temple Administrator', 'admin@example.com', '$2b$10$hash', 'admin');

INSERT INTO media (title, artist, type, language, mood_tag, duration, description) VALUES
('Om Namah Shivaya', 'Spiritual Voices', 'mantra', 'Sanskrit', 'peaceful', '21:00', 'Sacred mantra for inner peace'),
('Hanuman Chalisa', 'Pandit Jasraj', 'chant', 'Hindi', 'strength', '15:30', 'Traditional chant for courage'),
('Krishna Bhajans', 'Anup Jalota', 'bhajan', 'Hindi', 'joyful', '32:45', 'Beautiful devotional songs');
```

### 3. Backend Setup (Express)

Create `server/index.js`:
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database('./spiritual_app.db');

// Initialize database tables
db.serialize(() => {
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Add more table creation queries...
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.JWT_SECRET || 'spiritual_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            function(err) {
                if (err) {
                    res.status(400).json({ error: 'User already exists' });
                } else {
                    const token = jwt.sign(
                        { userId: this.lastID, email, role: 'user' },
                        process.env.JWT_SECRET || 'spiritual_secret'
                    );
                    res.json({ token, user: { id: this.lastID, name, email, role: 'user' } });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err || !user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            const validPassword = await bcrypt.compare(password, user.password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET || 'spiritual_secret'
            );
            
            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/mood', authenticateToken, (req, res) => {
    const { mood } = req.body;
    const userId = req.user.userId;
    
    db.run(
        'INSERT INTO moods (user_id, mood) VALUES (?, ?)',
        [userId, mood],
        function(err) {
            if (err) {
                res.status(500).json({ error: 'Failed to save mood' });
            } else {
                res.json({ message: 'Mood saved successfully' });
            }
        }
    );
});

app.get('/api/media', (req, res) => {
    const { type, language, mood } = req.query;
    let query = 'SELECT * FROM media WHERE 1=1';
    const params = [];
    
    if (type && type !== 'all') {
        query += ' AND type = ?';
        params.push(type);
    }
    
    if (language && language !== 'all') {
        query += ' AND language = ?';
        params.push(language);
    }
    
    if (mood && mood !== 'all') {
        query += ' AND mood_tag = ?';
        params.push(mood);
    }
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch media' });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/rituals', (req, res) => {
    const {
        name, email, phone, ritual, date, time,
        participants, address, specialRequests
    } = req.body;
    
    db.run(
        `INSERT INTO rituals (
            customer_name, email, phone, ritual_type, preferred_date,
            preferred_time, participants, address, special_requests
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, ritual, date, time, participants, address, specialRequests],
        function(err) {
            if (err) {
                res.status(500).json({ error: 'Failed to book ritual' });
            } else {
                res.json({ message: 'Ritual booked successfully', id: this.lastID });
            }
        }
    );
});

app.get('/api/admin/rituals', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    
    db.all('SELECT * FROM rituals ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch rituals' });
        } else {
            res.json(rows);
        }
    });
});

app.listen(PORT, () => {
    console.log(`🕉️  AapkaSarthy API Server running on port ${PORT}`);
});
```

### 4. Environment Configuration

Create `server/.env`:
```env
PORT=5000
JWT_SECRET=your_spiritual_jwt_secret_key_here
DB_PATH=./spiritual_app.db
NODE_ENV=development
```

Create `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

### 5. Package.json Scripts

Update `server/package.json`:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "init-db": "sqlite3 spiritual_app.db < database.sql"
  }
}
```

Update `client/package.json`:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "dev": "react-scripts start"
  }
}
```

## 🎯 Running the Application

### Development Mode
```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start React client
cd client
npm start
```

### Production Build
```bash
# Build React app
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 📊 Database Schema

### Users Table
- `id`: Primary key
- `name`: User's full name
- `email`: Unique email address
- `password_hash`: Bcrypt hashed password
- `role`: 'user' or 'admin'
- `created_at`: Registration timestamp

### Moods Table
- `id`: Primary key
- `user_id`: Foreign key to users table
- `mood`: Selected mood string
- `timestamp`: When mood was recorded

### Media Table
- `id`: Primary key  
- `title`: Content title
- `artist`: Artist/creator name
- `type`: Content type (bhajan, mantra, etc.)
- `language`: Content language
- `mood_tag`: Associated mood
- `duration`: Content duration
- `file_path`: Path to audio file
- `description`: Content description

### Rituals Table
- `id`: Primary key
- `customer_name`: Booking customer name
- `email`: Customer email
- `phone`: Customer phone
- `ritual_type`: Type of ritual requested
- `preferred_date`: Requested date
- `preferred_time`: Requested time slot
- `participants`: Number of participants
- `address`: Ceremony location
- `special_requests`: Additional requirements
- `status`: 'pending', 'approved', or 'rejected'

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User/admin login

### User Features
- `POST /api/mood` - Save user mood (authenticated)
- `GET /api/media` - Get spiritual media content
- `POST /api/rituals` - Book ritual ceremony

### Admin Features
- `GET /api/admin/rituals` - Get all ritual bookings (admin only)
- `PUT /api/admin/rituals/:id` - Update ritual status (admin only)
- `POST /api/admin/media` - Upload new media content (admin only)

## 🧪 Testing

### Test User Scenarios
1. **User Registration & Login**
2. **Mood Selection & AI Recommendations**
3. **Media Library Browsing**
4. **Ritual Booking Process**

### Test Admin Scenarios
1. **Admin Login**
2. **Media Upload Management**
3. **Ritual Booking Approval**
4. **Dashboard Analytics**

## 🛠️ Troubleshooting

### Common Issues

**Database Connection Error:**
```bash
# Initialize database
cd server
npm run init-db
```

**Port Already in Use:**
```bash
# Kill process on port 5000
sudo lsof -ti:5000 | xargs kill -9

# Or change port in .env file
PORT=5001
```

**CORS Issues:**
- Ensure CORS is properly configured in server
- Check API_URL in client environment

**Authentication Issues:**
- Verify JWT_SECRET in server .env
- Check token storage in localStorage

### Development Tips
- Use browser dev tools to debug API calls
- Check server logs for database errors
- Verify environment variables are loaded
- Test API endpoints with Postman

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy ./build directory
```

### Backend Deployment (Heroku/Railway)
```bash
cd server
# Add production environment variables
# Deploy with SQLite database
```

## 📱 Mobile Responsiveness

The app is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones
- Progressive Web App (PWA) ready

## 🎨 Customization

### Color Scheme
- Primary: Orange (#FF6600)
- Secondary: Blue (#4A90E2)
- Accent: Purple (#8B5CF6)
- Sacred: Saffron (#FF9933)

### Adding New Features
1. Create new React components
2. Add corresponding API endpoints
3. Update database schema if needed
4. Test on both user and admin roles

## 📖 Documentation

- **API Documentation**: Check `/docs` endpoint when server is running
- **Component Documentation**: JSDoc comments in React components
- **Database Schema**: ERD available in `/docs/database.md`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Sacred geometry and design inspiration from traditional Indian art
- Meditation and spiritual practices from ancient Vedic traditions
- Modern web technologies for seamless user experience

---

**Built with 🕉️ for spiritual seekers worldwide**

For support, email: dev@aapkasarthy.com
