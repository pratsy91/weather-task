# Qodex Weather Dashboard

A modern, responsive weather dashboard built with React that provides real-time weather information with an elegant user interface. The application features user authentication, location-based weather data, and temperature unit conversion.

## Features

- **User Authentication**
  - Secure email/password authentication
  - Persistent user sessions
  - Protected routes for authenticated users

- **Weather Information**
  - Real-time weather data
  - Temperature unit conversion (Celsius/Fahrenheit)
  - Detailed weather metrics (temperature, humidity, wind speed)
  - Location-based weather search

- **Modern UI/UX**
  - Responsive design for all devices
  - Glass-morphism effects
  - Dynamic backgrounds
  - Smooth animations and transitions
  - Metallic button styling

## Tech Stack

- **Frontend**: React.js
- **Styling**: CSS Modules
- **Authentication**: Supabase Auth
- **State Management**: Redux Toolkit
- **Weather Data**: OpenWeather API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- OpenWeather API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pratsy91/weather-task.git
cd weather-task
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React context providers
├── services/          # API and external service integrations
├── store/             # Redux store configuration and slices
└── supabase/            # Supabase Client
```

## Implementation Approach

### Architecture

The application follows a modular architecture with clear separation of concerns:

1. **Component Structure**
   - Atomic design principles
   - Reusable components with focused responsibilities
   - Consistent styling patterns

2. **State Management**
   - Redux Toolkit for global state
   - React Context for theme and auth state
   - Local state for component-specific data

3. **Authentication Flow**
   - Protected routes using React Router
   - Persistent sessions with Supabase
   - Secure token management

4. **Styling Strategy**
   - CSS Modules for component isolation
   - Glass-morphism effects for modern UI
   - Responsive design with mobile-first approach
   - Custom button styling with metallic effects

### Design Decisions

1. **User Experience**
   - Intuitive navigation
   - Immediate feedback on user actions
   - Smooth transitions between states
   - Consistent visual language

2. **Performance**
   - Lazy loading of routes
   - Optimized re-renders
   - Efficient state updates
   - Cached weather data

3. **Security**
   - Environment variables for sensitive data
   - Protected API endpoints
   - Secure authentication flow
   - Input validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenWeather API for weather data
- Supabase for authentication services
- React community for excellent tools and libraries
