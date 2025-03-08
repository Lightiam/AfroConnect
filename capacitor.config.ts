
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.afroconnect.app',
  appName: 'AfroConnect',
  webDir: 'dist',
  server: {
    url: 'https://690c52b9-7503-47c2-a008-8f902234b7ec.lovableproject.com?forceHideBadge=true',
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
