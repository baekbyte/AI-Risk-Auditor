# AI Risk Auditor: EU AI Act Compliance Classifier

A comprehensive web application that helps organizations assess their AI systems for compliance with the [EU AI Act](https://artificialintelligenceact.eu/). This project provides a user-friendly interface to classify AI systems according to the EU AI Act's risk-based framework and generates tailored compliance recommendations.

## 🎯 Overview

The EU AI Act categorizes AI systems into different risk levels:
- **Prohibited AI Systems**: Systems that pose unacceptable risks and are not allowed
- **High-Risk AI Systems**: Systems that require strict compliance measures
- **Limited Risk AI Systems**: Systems with specific transparency requirements  
- **Minimal Risk AI Systems**: Systems with minimal regulatory obligations

## ✨ Key Features

### 🧠 Intelligent Risk Classification Engine
- **Multi-factor Analysis**: Evaluates AI systems using both text analysis and structured questionnaires
- **Prohibited Practice Detection**: Identifies systems that fall under prohibited practices according to the EU AI Act
- **Risk Category Assignment**: Automatically categorizes systems into appropriate risk levels
- **Real-time Assessment**: Provides instant classification results with detailed explanations

### 📋 Comprehensive Assessment Process
The application guides users through a structured assessment covering:

**Prohibited AI Practices Assessment:**
- Subliminal or manipulative techniques
- Exploitation of vulnerabilities in specific groups
- Social scoring of individuals
- Real-time biometric identification in public spaces
- Emotion recognition in workplaces/educational institutions
- Facial recognition database creation
- Predictive policing based on profiling

**High-Risk AI Practices Assessment:**
- Biometric identification and categorization
- Critical infrastructure applications
- Education and vocational training
- Employment and worker management
- Essential services (credit scoring, social benefits)
- Law enforcement applications
- Migration and border control
- Justice and democratic processes
- Safety components of regulated products

**Transparency Requirements Assessment:**
- Human interaction capabilities (chatbots, virtual assistants)
- Content generation (deepfakes, synthetic media)
- Emotion recognition and biometric categorization

### 📊 Detailed Results & Recommendations
- **Risk Category Display**: Clear visual indication of the assigned risk level
- **Compliance Status**: Shows whether the system is "Allowed" or "Prohibited"
- **Tailored Recommendations**: Provides specific compliance measures based on risk category
- **Export Functionality**: Download assessment results as a detailed text report

### 🎨 Modern User Interface
- **React Frontend**: Built with TypeScript and modern React patterns
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress indicator through the assessment steps
- **Loading Animations**: Professional loading states during assessment processing
- **Accessibility**: Designed with accessibility best practices

## 🏗️ Technical Architecture

### Backend (Java Spring Boot)
- **RESTful API**: Clean, documented API endpoints for classification
- **Service Layer**: Business logic for risk assessment and classification
- **Data Models**: Structured request/response models with validation
- **File Export**: Generates detailed compliance reports in text format

### Frontend (React + TypeScript)
- **Component-Based Architecture**: Modular, reusable components
- **Type Safety**: Full TypeScript implementation for better development experience
- **State Management**: Efficient state handling with React hooks
- **API Integration**: Seamless communication with the backend service
- **Local Storage**: Persistent form data and results storage

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup
```bash
# Navigate to the project directory
cd AI-Use-Case-Classifier

# Build the project
mvn clean compile

# Run the Spring Boot application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## 📖 How to Use

1. **Start Assessment**: Navigate to the application and click "Start Assessment"
2. **System Information**: Enter your AI system's name and purpose
3. **Complete Questionnaire**: Answer questions about prohibited practices, high-risk domains, and transparency requirements
4. **Review Results**: View your system's risk category, compliance status, and recommendations
5. **Export Report**: Download a detailed compliance report for your records

## 🔧 API Endpoints

- `POST /api/classify` - Classify an AI system
- `POST /api/classify/download` - Download assessment results as text file

## 📁 Project Structure

```
AI-Use-Case-Classifier/
├── src/main/java/com/euaiact/classifier/
│   ├── controller/          # REST API controllers
│   ├── model/              # Data models and DTOs
│   ├── service/            # Business logic and classification engine
│   └── ClassifierApplication.java
├── frontend/
│   ├── src/components/     # React components
│   ├── src/services/       # API service layer
│   ├── src/styles/         # CSS stylesheets
│   └── public/             # Static assets
├── legacy/                 # Original Java console application
└── README.md
```

## 🤝 Contributing

This project is designed to help organizations navigate the complex landscape of AI regulation. Contributions are welcome to improve accuracy, add new features, or enhance the user experience.

## ⚖️ Legal Disclaimer

This tool is provided for informational purposes only and should not be considered legal advice. The classification results and recommendations are based on the EU AI Act framework but may not capture all nuances of your specific use case. Always consult with legal experts for comprehensive compliance assessment.

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ to help organizations navigate AI regulation responsibly.**
