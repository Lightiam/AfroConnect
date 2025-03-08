
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.afroconnect.app',
  appName: 'AfroConnect',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
    scheme: 'AfroConnect',
    backgroundColor: '#355E3B',
    statusBarStyle: 'dark'
  },
  android: {
    backgroundColor: "#355E3B",
    buildOptions: {
      releaseType: 'AAB',
      keystorePath: 'release.keystore',
      keystoreAlias: 'afroconnect',
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#355E3B",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
