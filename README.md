# Mediversal-APP

![Mediversal Logo](https://www.mediversal.in/logo.png)

> ## Empowering Health, Enhancing Lives.

Mediversal-App is a comprehensive healthcare platform designed to bring a wide range of essential health services directly to your fingertips. Our mission is to make healthcare accessible, convenient, and reliable for everyone across diverse services.

---

## 🌟 Core Services

- **Pharmacy**: Seamlessly order medications, health supplements, and wellness products with home delivery options.
- **Homecare**: Access professional healthcare services in the comfort of your home, including nursing, physiotherapy, and elder care assistance.
- **Eldercare**: Dedicated support and specialized services tailored to the unique needs of senior citizens, promoting their well-being and independence.
- **Online Consultation**: Connect instantly with certified doctors and specialists via secure video or chat for expert medical advice and prescriptions.
- **Lab Tests**: Conveniently book a wide array of diagnostic lab tests with home sample collection, and receive timely, accurate results.
- **Health Checkups**: Comprehensive health assessment packages designed for preventive care, early detection, and personalized health insights.
- **And Many More**: We are continuously expanding our offerings to include specialized therapies, medical equipment rentals, and integrated health solutions.

---

## 🚀 Getting Started

Follow these instructions to set up and run the Mediversal-App on your local development environment.

### 🔧 Prerequisites

Ensure your system meets the following requirements:

- **Node.js**: `v18` or higher
  [Download Node.js](https://nodejs.org/en/download/current/)
- **npm**: Comes bundled with Node.js
- **React Native CLI**: Install globally

  ```bash
  npm install -g react-native-cli
  ```

- **JDK (Java Development Kit)**: Recommended version: JDK 17
  [Download via Android Studio](https://developer.android.com/studio)
- **Android Studio**: Required for Android development
  [Download Android Studio](https://developer.android.com/studio)
- **Xcode** (macOS only): Required for iOS development
  [Download from Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- **CocoaPods** (macOS only):

  ```bash
  sudo gem install cocoapods
  ```

---

## 🏠 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mediversal/Mediversal-app.git
cd Mediversal-app
```

> 💡 **Note**: If you cloned the repository _before_ it was transferred to the `Mediversal` organization:

```bash
git remote set-url origin https://github.com/Mediversal/Mediversal-app.git
git pull origin main
```

### 2. Install JavaScript dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Install iOS dependencies (macOS only)

```bash
cd ios
pod install
cd ..
```

---

## ▶️ Running the App

### Android

Make sure an Android device or emulator is connected and run:

```bash
npm run android
```

### iOS (macOS only)

Ensure an iOS device or simulator is connected and run:

```bash
npm run ios
```

### Starting the Metro Bundler (Optional)

```bash
npm start
```

---

## 🛠️ Development Workflow

### Available Scripts

| Script                  | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `npm run android`       | Builds and runs the app on Android devices/emulators           |
| `npm run ios`           | Builds and runs the app on iOS devices/simulators (macOS only) |
| `npm start`             | Starts the Metro Bundler                                       |
| `npm test`              | Runs all Jest unit tests                                       |
| `npm run test:coverage` | Runs tests with coverage report                                |
| `npm run lint`          | Lints all code files using ESLint                              |
| `npm run lint:fix`      | Lints and auto-fixes issues                                    |
| `npm run format`        | Formats code using Prettier                                    |

### Code Quality & Standards

We enforce consistency and quality using the following tools:

- **ESLint**: Enforces JavaScript/TypeScript best practices
- **Prettier**: Code formatting for consistency

---

## 📦 Key Dependencies & Technologies

- **React Native**: Core framework for building native mobile apps
- **React Navigation**: Handles app navigation
- **Axios**: HTTP client for API integration
- **Zustand**: Lightweight state management
- **@notifee/react-native**: Local/remote notifications
- **react-native-onesignal**: Push notifications via OneSignal
- **react-native-razorpay**: Payment gateway integration
- **Lottie React Native**: Rich animations
- **Google Sign-In**: Authentication with Google
- **React Native Maps**: Map view and geolocation
- **React Native FS**: File system access
- **Image Picker & Crop Picker**: For prescription and report uploads
- **Socket.IO Client**: Real-time communication (e.g., consultations)
- **React Native Config / dotenv**: Secure environment variable management

---

## 🛡️ Security & Data Privacy

We take healthcare data seriously. Our app complies with:

- **Encrypted API Communication**: HTTPS, TLS for all endpoints
- **Data Minimization**: Collecting only essential data
- **Secure Authentication**

---

## 📝 License

This project, "Mediversal-App," is Proprietary and Confidential to Mediversal.

All rights, including intellectual property rights, copyrights, and trade secrets, are exclusively reserved by Mediversal. This software, its source code, documentation, and any related materials are provided solely for internal use by authorized Mediversal personnel for the development and operation of Mediversal services.

Unauthorized access, reproduction, distribution, modification, reverse engineering, decompilation, or disclosure of this software, in whole or in part, to any third party is strictly prohibited without the express written consent of Mediversal.

Any violation of these terms will be met with appropriate legal action.

© 2025 Mediversal. All rights reserved.
