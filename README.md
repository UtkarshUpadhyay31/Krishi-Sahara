## HELLO EVERYONE 

# 🌾 Krishi Sahara - AI-Driven Agricultural Intelligence Platform

## 🎯 Project Overview
Krishi Sahara (कृषि सहारा) is a comprehensive agri-tech platform designed for Smart India Hackathon 2025, providing AI-powered solutions to enhance farmer productivity and profitability through hyper-personalized, multilingual technology.

## ✨ Core Features
1. **Weather Intelligence System** - Real-time micro-climate forecasts
2. **AI-powered Crop Diagnosis** - Camera-enabled disease/pest detection
3. **Soil Health & Crop Recommendation** - AI-based analysis
4. **Fertilizer & Pesticide Predictor** - Personalized input guidance
5. **Knowledge & Skill Hub** - Voice-enabled tutorials
6. **Post-Harvest Storage Guide** - Crop-specific advice
7. **Integrated Agri-Shop** - E-commerce marketplace
8. **Multilingual & Voice Support** - Indic NLP integration
9. **AI Assistant** - Chatbot for farmers
10. **Farmer Dashboard** - Personalized insights and recommendations
11. **Crop Insurance** - Integrated insurance solution
12. **Government Schemes Notification** - Real-time updates on available schemes


## 🛠️ Technology Stack

### Frontend
- React.js 18.2.0
- Tailwind CSS 3.3.0
- Lucide React (Icons)
- Axios (API calls)

### Backend
- Node.js with Express.js
- MongoDB (Database)
- JWT Authentication
- Multer (File uploads)

### APIs
- Google Gemini API (Diagnosis)
- OpenWeather API (Weather data)
- Web Speech API (Voice recognition)
- OpenAgriShop API (Marketplace)
- OpenAI API (Chatbot)
- OpenAI API (Fertilizer Predictor)
- DeepSeek API (AI Assistant)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Frontend Setup
```bash
# Navigate to project directory
cd krishi-sahara

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your API keys to .env
REACT_APP_GEMINI_API_KEY=your_key_here
REACT_APP_ACCUWEATHER_API_KEY=your_key_here

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure MongoDB and API keys in .env

# Seed default users (admin and user accounts)
npm run seed

# Start backend server
npm run dev
```




### Development Mode
```bash
# Terminal 1 - Frontend
npm start

# Terminal 2 - Backend
cd backend
npm run dev
```

### Production Build
```bash
# Build frontend
npm run build

# Start backend in production
cd backend
NODE_ENV=production npm start
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Weather
- `GET /api/weather/current` - Current weather
- `GET /api/weather/forecast` - Weather forecast

### Diagnosis
- `POST /api/diagnosis` - Diagnose crop disease
- `GET /api/diagnosis/history/:userId` - Get diagnosis history

### Recommendations
- `POST /api/recommendations` - Get crop recommendations
- `POST /api/recommendations/fertilizer` - Get fertilizer advice

### Marketplace
- `GET /api/marketplace/products` - List products
- `POST /api/marketplace/orders` - Place order

## 🎨 Project Structure
```
krishi-sahara/
├── public/
│   ├── assets/images/
│   ├── assets/icons/
│   ├── knowledge-hub/
│   │   ├── knowledge.html
│   │   └── logo.png
│   ├── pesticide-predictor/        
│   │   └── [crop images and assets]
│   ├── index.html
│   ├── favicon.ico
│   ├── robots.txt
│   ├── i18n-static.js
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── Knowledge Hub/
│   │   └── knowledge.html
│   ├── components/
│   │   ├── panels/
│   │   │   ├── AdminPanel.jsx
│   │   │   └── UserPortal.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── widgets/
│   │   │   ├── NotificationBar.jsx
│   │   │   └── NotificationBanner.jsx
│   │   ├── soil/
│   │   │   ├── CropRecommendations.jsx
│   │   │   ├── SoilImprovements.jsx
│   │   │   └── SoilQATab.jsx
│   │   ├── weather/
│   │   │   └── WeatherIntelligenceSystem.jsx
│   │   ├── voice/
│   │   │   └── VoiceAssistant.jsx
│   │   ├── ResearchReferences/
│   │   │   └── ResearchReferencesSlider.jsx
│   │   └── LanguageSwitcher.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── ManageNotifications.jsx
│   │   │   ├── ManageOrders.jsx
│   │   │   ├── ManageResearch.jsx
│   │   │   ├── ManageSchemes.jsx
│   │   │   └── ManageUsers.jsx
│   │   ├── agri-shop/
│   │   │   └── AgriShopPage.jsx
│   │   ├── soil-health/
│   │   │   └── SoilHealthPage.jsx
│   │   ├── farmer/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Crops.jsx
│   │   │   ├── Lands.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Consultations.jsx
│   │   │   ├── CropDetail.jsx
│   │   │   ├── Schemes.jsx
│   │   │   └── Finances.jsx
│   │   ├── pesticide/
│   │   │   └── PesticidePredictorPage.jsx
│   │   ├── rent/
│   │   │   └── TractorRentPage.jsx
│   │   ├── warehouse/
│   │   │   └── WarehouseGuidePage.jsx
│   │   ├── CropAnalysisPage.jsx
│   │   └── KnowledgeHubPage.jsx
│   ├── agromarket/
│   │   ├── AgriShopApp.jsx
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   └── data/
│   │       └── products.js
│   ├── services/
│   │   ├── apiService.js
│   │   ├── weatherService.js
│   │   ├── notificationService.js
│   │   └── farmerService.js
│   ├── locales/
│   │   ├── en/translation.json
│   │   ├── hi/translation.json
│   │   ├── bn/translation.json
│   │   ├── ta/translation.json
│   │   └── te/translation.json
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   └── index.js
├── backend/
│   ├── server.js
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── diagnosisController.js
│   │   ├── farmerController.js
│   │   ├── notificationController.js
│   │   ├── recommendationController.js
│   │   ├── soilController.js
│   │   └── weatherController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── weather.js
│   │   ├── diagnosis.js
│   │   ├── recommendations.js
│   │   ├── marketplace.js
│   │   ├── soilHealth.js
│   │   ├── research.js
│   │   ├── notifications.js
│   │   ├── upload.js
│   │   └── farmer.js
│   ├── data/
│   │   ├── crops.json
│   │   ├── diseases.json
│   │   └── fertilizers.json
│   ├── lib/
│   │   └── utils.mjs
│   ├── models/
│   ├── services/
│   │   └── cropAlertScheduler.js
│   ├── scripts/
│   │   ├── generateVAPIDKeys.js
│   │   └── seedUsers.js
│   ├── uploads/
│   │   └── diagnosis/
│   └── public/uploads/
├── package.json
├── .env.example
├── postcss.config.js
├── PROJECT_STRUCTURE.md
├── QUICK_REFERENCE.md
└── README.md
```

## 👥 Team Information
- **Team Name:** Enactus
- **Team ID:** 60496
- **Hackathon:** Smart India Hackathon 2025

## 📊 Impact Metrics
- **+35%** Potential Yield Increase
- **₹1.53 Trillion** Targeted Loss Reduction
- **85.5%** Rural Smartphone Penetration







## 📝 License
This project is developed for Smart India Hackathon 2025.

## 🤝 Contributing
This is a hackathon project. For queries, contact Team Enactus.
---
Built with ❤️ for Indian Farmers | कृषि सहारा

## 🎉 Setup Complete!
All files are now ready. Follow these steps to run the project:

1. Create the folder structure as shown
2. Copy each file content to respective locations
3. Install dependencies: `npm install` (frontend) and `npm install` (backend)
4. Set up MongoDB
5. Configure API keys in .env files
6. Run: `npm start` (frontend) and `npm run dev` (backend)

Your Krishi Sahara platform is ready to deploy! 🚀🌾
