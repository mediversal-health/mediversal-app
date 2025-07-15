# Mediversal-App

![Mediversal Logo](link-to-your-logo-if-any.png) ## Empowering Health, Enhancing Lives.

Mediversal-App is a comprehensive healthcare platform designed to bring a wide range of essential health services directly to your fingertips. Our mission is to make healthcare accessible, convenient, and reliable for everyone.

### Services Offered:

* **Pharmacy:** Order medications and health products with ease.
* **Homecare:** Professional care services delivered to your home.
* **Eldercare:** Specialized support and services for senior citizens.
* **Online Consultation:** Connect with healthcare professionals remotely.
* **Lab Tests:** Schedule and access results for various diagnostic tests.
* **Health Checkups:** Comprehensive health assessments and preventive care.
* **And Many More:** Constantly expanding our offerings to meet diverse health needs.

---

## 🚀 Getting Started

Follow these steps to set up and run the Mediversal-App on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: `v18` or higher (as specified in `package.json`).
    * [Download Node.js](https://nodejs.org/en/download/)
* **npm**: Comes with Node.js.
* **React Native CLI**:
    ```bash
    npm install -g react-native-cli
    ```
* **JDK (Java Development Kit)**:
    * For Android development. Recommended: JDK 17.
    * [Android Studio](https://developer.android.com/studio) usually includes the necessary JDK.
* **Android Studio**: For Android emulator and SDKs.
    * [Download Android Studio](https://developer.android.com/studio)
* **Xcode**: For iOS development (macOS only).
    * [Download Xcode from App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
* **CocoaPods**: (macOS only)
    ```bash
    sudo gem install cocoapods
    ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Mediversal/Mediversal-app.git](https://github.com/Mediversal/Mediversal-app.git) # After transfer
    cd Mediversal-app
    ```
    * **Note:** If you cloned before the transfer, you'll need to update your remote:
        ```bash
        git remote rm origin
        git remote add origin [https://github.com/Mediversal/Mediversal-app.git](https://github.com/Mediversal/Mediversal-app.git)
        git pull origin main
        ```

2.  **Install dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **For iOS Development (macOS only):**
    Navigate to the `ios` directory and install pods:
    ```bash
    cd ios
    pod install
    cd ..
    ```

### Running the App

#### Android

```bash
npm run android
