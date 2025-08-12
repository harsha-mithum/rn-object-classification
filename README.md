# 📷 Image Classifier - React Native

[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
![Expo](https://img.shields.io/badge/Expo-~53.0.20-black?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue?logo=typescript)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-3.18.0-orange?logo=tensorflow)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-lightgrey?logo=apple)

A cross-platform mobile application built with React Native and Expo that uses a pre-trained **MobileNet** machine learning model to classify objects from images — either captured by your camera or selected from your gallery. All classification happens **on-device** for speed and privacy.

---

## 📑 Table of Contents
- [Demo](#demo)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Example Output](#-example-output)
- [Known Issues & Roadmap](#-known-issues--roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## Demo

Here’s the app in action:

[<video src="./src/assets/demo.mp4" width="480" autoplay loop muted playsinline></video>](https://github.com/user-attachments/assets/0ddb42f2-b9ec-4019-b709-120d36a89e18)

---

## 🚀 Key Features

- **Image-based Object Classification**: Identify objects in photos from your gallery or directly from your camera.
- **On-Device Machine Learning**: Uses TensorFlow.js with the MobileNet model for fast, private inference.
- **Modern UI**: Smooth, clean, and intuitive interface with engaging Lottie animations.
- **Cross-Platform**: Runs seamlessly on both Android and iOS using Expo.
- **Camera & Gallery Support**: Capture images or select existing ones.
- **Real-Time Feedback**: Instant classification results with confidence scores.

---

## 🛠 Tech Stack

- **Core**: React Native, Expo, TypeScript
- **ML**: [`@tensorflow/tfjs`](https://www.tensorflow.org/js), [`@tensorflow/tfjs-react-native`](https://github.com/tensorflow/tfjs/tree/master/tfjs-react-native), [`@tensorflow-models/mobilenet`](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)
- **UI/UX**: [`lottie-react-native`](https://github.com/lottie-react-native/lottie-react-native), [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/)
- **Image Handling**: [`expo-camera`](https://docs.expo.dev/versions/latest/sdk/camera/), [`expo-image-picker`](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- **File System**: [`expo-file-system`](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- **Image Processing**: [`jpeg-js`](https://www.npmjs.com/package/jpeg-js)
- **Navigation**: [React Navigation](https://reactnavigation.org/)

## 📂 Project Structure

```rn-object-classification/
├── src/
│   ├── assets/           # Static assets like images, icons, and Lottie animations (e.g., loader.json, search-animation.json)
│   ├── components/       # Reusable UI components used across different screens
│   │   ├── CameraControlButton.tsx # Button for camera actions (capture, switch camera, pick from gallery)
│   │   ├── ErrorMessage.tsx        # Component to display error messages
│   │   ├── Footer.tsx              # Application footer
│   │   ├── Header.tsx              # Application header with title and back button functionality
│   │   └── ResultCard.tsx          # Displays a single classification result with label, score, and visual indicators
│   ├── constants/        # Shared constants like colors and styles
│   │   ├── colors.ts             # Defines the color palette used throughout the application
│   │   └── styles.ts             # Contains global and component-specific stylesheets
│   ├── context/          # (Currently empty) Placeholder for React Context API for global state management
│   ├── hooks/            # Custom React hooks for encapsulating reusable logic
│   │   └── useCapture.ts         # Hook for handling camera and image picking logic
│   ├── navigation/       # (Currently empty) Placeholder for navigation setup (e.g., React Navigation stack)
│   ├── screens/          # Application screens, each representing a distinct view
│   │   ├── CameraScreen.tsx      # Screen for capturing images using the device camera
│   │   ├── HomeScreen.tsx        # Initial screen for selecting image source (gallery or camera)
│   │   ├── LoadingScreen.tsx     # Displays while the image is being analyzed by the model
│   │   └── ResultScreen.tsx      # Displays the classification results
│   └── utils/            # Utility functions and helpers
│       ├── imageClassifier.ts    # Contains logic for image preprocessing and classification using TensorFlow.js
│       ├── modelLoader.ts        # Handles loading the TensorFlow.js MobileNet model
│       └── __tests__/            # Unit tests for utility functions
│           └── imageClassifier.test.ts # Tests for image classification logic
├── App.tsx               # Root component of the application, handles overall flow and state
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── babel.config.js       # Babel configuration for JavaScript transpilation
├── eslint.config.js      # ESLint configuration for code linting
├── jest.config.js        # Jest configuration for testing
├── index.ts              # Entry point for the React Native application
├── .gitignore            # Specifies intentionally untracked files to ignore
├── .npmrc                # npm configuration file
├── app.json              # Expo application configuration
└── package-lock.json     # Records the exact versions of dependencies
```

## 🏁 Getting Started

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or yarn
-   Expo Go app on your mobile device or an Android/iOS emulator

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/harsha-mithum/rn-object-classification.git
    cd rn-object-classification
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the Metro server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will start the Expo development server and display a QR code in your terminal.

2.  **Run on your device:**
    -   Scan the QR code displayed in the terminal with the Expo Go app on your Android or iOS device.
    -   Alternatively, you can run the app in an emulator:
        -   Press `a` in the terminal to run on an Android emulator.
        -   Press `i` in the terminal to run on an iOS simulator.

## 🧪 Testing

The project includes unit tests for the `imageClassifier.ts` utility. To run the tests:

```bash
npm test
# or
yarn test
```

## 🛠 Known Issues & Roadmap

**Known Issues**
- Model loading may take a few seconds on first run.
- Accuracy may vary in low-light or blurry images.

**Planned Features**
- [ ] Offline model caching for faster startup.
- [ ] Multi-language support.
- [ ] Batch image classification.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.