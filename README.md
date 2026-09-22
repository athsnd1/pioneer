# Pioneer

A full-stack web application for tracking field ministry reports and Bible student management. Built for Jehovah's Witnesses pioneers to log their monthly field service activity and manage Bible students.

## Features

### Ministry Reports
- **Create Reports** - Log hours, return visits, Bible studies, videos shown, and placements
- **View Reports** - Card and table view with date filtering
- **Edit/Delete Reports** - Full CRUD operations for reports
- **Statistics Dashboard** - Aggregated totals for all metrics
- **Monthly Analytics** - Trend charts showing monthly activity breakdown
- **Report Visualizations** - Pie charts for activity distribution

### Student Management
- **Add Students** - Track name, address, phone, and study details
- **View Students** - List all Bible students
- **Edit/Delete Students** - Full CRUD operations

### Authentication
- **User Registration** - Email/password with bcrypt hashing
- **Secure Login** - JWT tokens with httpOnly cookies
- **Remember Me** - Extended 30-day sessions
- **Password Reset** - Email-based reset flow with Resend
- **Rate Limiting** - Protection on auth endpoints

## Tech Stack

### Frontend
- **React 19** + TypeScript
- **Vite** for development and building
- **React Router v8** for routing
- **TanStack Query** for server state management
- **TailwindCSS v4** for styling
- **Recharts** for data visualization
- **React Hot Toast** for notifications
- **Vitest** for unit testing
- **Playwright** for E2E testing

### Backend
- **Express 5** + TypeScript
- **Prisma ORM** with PostgreSQL
- **JWT** for authentication
- **bcrypt** for password hashing
- **Pino** for structured logging
- **Sentry** for error tracking
- **Resend** for transactional emails
- **Zod** for request validation
- **Vitest** for testing

## Project Structure

```
pioneer/
├── pioneer-frontend/          # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── routes/           # Route definitions
│   │   ├── api/              # API client functions
│   │   ├── hooks/            # Custom React hooks
│   │   ├── contexts/         # React contexts
│   │   ├── providers/        # Context providers
│   │   ├── layouts/          # Page layouts
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── package.json
│   └── vite.config.ts
│
├── pioneer-backend/           # Express backend
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── middleware/       # Express middleware
│   │   ├── lib/              # Library configurations
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   └── tests/            # Unit tests
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- npm or yarn

### Environment Variables

**Frontend** (`pioneer-frontend/.env`):
```env
VITE_BACKEND_URL=http://localhost:3000
```

**Backend** (`pioneer-backend/.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/pioneer
JWT_SECRET=your-secure-random-string
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=re_xxxxxxxxx
NODE_ENV=development
PORT=3000
```

### Installation

1. **Install frontend dependencies:**
```bash
cd pioneer-frontend
npm install
```

2. **Install backend dependencies:**
```bash
cd pioneer-backend
npm install
```

3. **Set up the database:**
```bash
cd pioneer-backend
npx prisma migrate deploy
npx prisma generate
```

### Development

**Start frontend (port 5173):**
```bash
cd pioneer-frontend
npm run dev
```

**Start backend (port 3000):**
```bash
cd pioneer-backend
npm run dev
```

### Build for Production

**Frontend:**
```bash
cd pioneer-frontend
npm run build
```

**Backend:**
```bash
cd pioneer-backend
npm run build
npm start
```

## API Endpoints

### Authentication (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout user |
| GET | `/me` | Get current user |
| POST | `/forgot-password` | Request password reset |
| POST | `/reset-password` | Reset password |

### Reports (`/report`) - *Requires Auth*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all reports |
| GET | `/stats` | Get aggregated statistics |
| GET | `/monthly-stats` | Get monthly trend data |
| GET | `/edit/:id` | Get single report |
| PUT | `/edit/:id` | Update report |
| POST | `/create` | Create new report |
| DELETE | `/delete/:id` | Delete report |

### Students (`/students`) - *Requires Auth*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/all` | Get all students |
| GET | `/some/:id` | Get single student |
| POST | `/add-student` | Create student |
| PUT | `/edit/:id` | Update student |
| DELETE | `/delete/:id` | Delete student |

## Data Models

### User
```typescript
{
  id: string (UUID)
  email: string (unique)
  password: string (hashed)
  createdAt: DateTime
  updatedAt: DateTime
  resetToken: string?
  resetTokenExpiry: DateTime?
}
```

### Report
```typescript
{
  id: string (UUID)
  date: string
  hours: number
  visits: number
  studies: number
  videos: number
  books: number
  comment: string
  userId: string (FK)
}
```

### Student
```typescript
{
  id: string (UUID)
  name: string
  address: string
  phone: string
  details: string
  userId: string (FK)
}
```

## Scripts

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest |
| `npm run test:watch` | Run tests in watch mode |

### Backend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest |
| `npm run migrate` | Run Prisma migrations |
| `npm run postinstall` | Generate Prisma client |

## Deployment

### Frontend (Vercel/Netlify)
1. Connect repository
2. Set `VITE_BACKEND_URL` to production backend URL
3. Build command: `npm run build`
4. Output directory: `dist`

### Backend (Railway/Render/Fly.io)
1. Set environment variables
2. Run `npm run build`
3. Start with `npm start`
4. Run `npm run migrate` on deploy

## Testing

```bash
# Frontend tests
cd pioneer-frontend
npm run test

# Backend tests
cd pioneer-backend
npm run test

# E2E tests (frontend)
cd pioneer-frontend
npx playwright test
```

## License

MIT