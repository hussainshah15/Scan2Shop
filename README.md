# Scan2Shop - Smart Shopping Assistant

Scan2Shop is a comprehensive mobile shopping application designed to provide users with an enhanced shopping experience. Built using **React Native**, this application allows users to scan products, manage shopping lists, and make seamless purchases. The app is designed for both **users and stores**. Stores can set up their online shops, upload their inventory details, and include **3D models** of their products. When customers scan a product using their inbuilt camera, the system uses **image recognition** to identify the product. The recognized product is then displayed to the user in **augmented reality (AR)** along with its details, allowing users to make instant purchases. This feature enhances both online and in-store shopping experiences, reducing the need for customer service agents in physical stores.

## Features

### Core Features

#### Product Scanning & Recognition
- Real-time product information retrieval
- Smart product categorization
- Image-based product recognition 

#### Shopping List Management
- Create and manage multiple shopping lists
- Add products manually or through scanning
- Cross-platform synchronization with **Firebase Firestore**
- Smart list organization using **ML-based recommendations**

#### Payment Integration
- Secure payment processing via **Stripe**
- Multiple payment method support (Credit/Debit Cards, Digital Wallets)
- Transaction history and receipt generation
- **Payment analytics** for expense tracking

### Technical Features

#### Multi-layered Backend Architecture
- **Node.js + Express** for core backend functionality
- **Flask API** for ML-based services
- **Firebase** for real-time features (authentication, storage, notifications)
- **Stripe** for secure payment processing

#### AR & Machine Learning
- **ViroReact** for AR shopping experiences
- **3D product visualization** in real-world environments
- **ML-powered product recognition**
- Smart product recommendations using **TensorFlow.js**

---

## Project Structure

```
Scan2Shop-main/
├── source/                    # Main application source code
│   ├── API/                  # API integration layer
│   ├── Components/           # Reusable React Native components
│   ├── Navigation/           # Navigation configuration
│   └── Screens/              # Screen components
├── server/                   # Node.js Express server
│   ├── package.json          # Server dependencies
│   └── server.js             # Main server file
├── FlaskApi/                 # Flask API services
│   ├── app.py               # Flask application
│   ├── requirements.txt     # Python dependencies
│   └── templates/           # HTML templates
├── android/                  # Android platform-specific code
└── assets/                   # Static assets
```

---

## Technology Stack

### Frontend
- **React Native**: Cross-platform mobile development framework
- **React Navigation**: Navigation management
- **ViroReact**: Augmented reality features
- **React Native Gesture Handler**: Smooth touch interactions
- **React Native Document Picker & Image Picker**: Handling media files
- **Firebase ML Kit**: Image-based product recognition

### Backend
- **Node.js + Express**: RESTful API development
- **Python Flask**: ML-based functionalities
- **Firebase**: Authentication, database, and cloud storage
- **Stripe API**: Secure payment gateway

### Key Dependencies
- `@react-native-firebase/*` - Firebase integration
- `@stripe/stripe-react-native` - Payment processing
- `@viro-community/react-viro` - AR capabilities
- `react-native-document-picker` - Document handling
- `react-native-image-picker` - Image handling
- `tensorflow.js` - On-device ML processing

---

## Getting Started

### Prerequisites
- Node.js (version specified in `.node-version`)
- Python 3.x
- React Native CLI
- Android Studio (for Android development)
- Firebase account
- Stripe account
- Google Cloud Platform account

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd Scan2Shop-main
```

2. Install frontend dependencies
```bash
npm install
```

3. Install server dependencies
```bash
cd server
npm install
```

4. Install Flask API dependencies
```bash
cd ../FlaskApi
python -m venv myenv
source myenv/bin/activate  # On Windows: myenv\Scripts\activate
pip install -r requirements.txt
```

5. Configure environment
- Copy `.env.example` to `.env` and fill in your credentials
- Configure Firebase in `google-services.json`
- Set up Stripe API keys
- Configure Google Cloud credentials

6. Run the application
```bash
# Start the Flask API
python app.py

# Start the Node.js server
cd server
node server.js

# Start the React Native app
npm start

# For Android
npm run android
```

---

## Project Components

### Source Code Structure
- **API/**: Contains API integration code for external services
- **Components/**: Reusable UI components
- **Navigation/**: Navigation configuration and routing
- **Screens/**: Individual screen components

### Server Components
- **server/**: Node.js Express server handling core functionalities
- **FlaskApi/**: Python Flask API for specialized services

### Platform-Specific Code
- **android/**: Android-specific implementation

---

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
