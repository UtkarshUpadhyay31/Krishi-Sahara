const config = {
  appId: 'com.krishisahara.app',
  appName: 'Krishi Sahara',
  webDir: 'build',
  bundledWebRuntime: false,
  
  // Server configuration for development
  server: {
    androidScheme: 'https',
    cleartext: true,
    // Uncomment below for live reload during development
    // url: 'http://192.168.1.100:3000',
    // cleartext: true
  },

  // Android specific configuration
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    backgroundColor: '#F5F5F7',
  },

  // Plugin configurations
  plugins: {
    // Status Bar Configuration
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#2d5016',
      overlaysWebView: false,
    },

    // Keyboard Configuration
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true,
    },

    // Push Notifications Configuration
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },

    // Camera Configuration
    Camera: {
      saveToGallery: false,
      correctOrientation: true,
      quality: 90,
    },

    // App Configuration
    App: {
      keepScreenOn: false,
    },

    // Network Configuration
    Network: {
      enabled: true,
    },

    // Geolocation Configuration
    Geolocation: {
      requestPermissions: true,
      accuracy: 'high',
    },

    // Splash Screen Configuration
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 500,
      backgroundColor: '#F5F5F7',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      spinnerColor: '#2d5016',
    },
  },
};

module.exports = config;
