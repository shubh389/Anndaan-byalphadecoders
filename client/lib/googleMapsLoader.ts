// Global Google Maps loader to prevent duplicate script loading
class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private isLoading: boolean = false;
  private isLoaded: boolean = false;
  private loadPromise: Promise<void> | null = null;
  private callbacks: Array<{
    resolve: () => void;
    reject: (error: Error) => void;
  }> = [];
  private apiKey: string = "";

  public static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  public async load(): Promise<void> {
    // If already loaded, resolve immediately
    if (this.isLoaded && window.google && window.google.maps) {
      return Promise.resolve();
    }

    // If currently loading, return the existing promise
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    // Check if API key is configured
    if (!this.apiKey || this.apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
      throw new Error("Google Maps API key not configured");
    }

    // Check if Google Maps is already loaded by another script
    if (window.google && window.google.maps) {
      this.isLoaded = true;
      return Promise.resolve();
    }

    // Check if script already exists in DOM
    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com"]`,
    );
    if (existingScript) {
      // Wait for existing script to load
      return this.waitForExistingScript();
    }

    // Start loading
    this.isLoading = true;
    this.loadPromise = this.loadScript();

    return this.loadPromise;
  }

  private waitForExistingScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          this.isLoaded = true;
          this.isLoading = false;
          resolve();
        }
      }, 100);

      // Timeout after 15 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.google || !window.google.maps) {
          reject(new Error("Google Maps failed to load from existing script"));
        }
      }, 15000);
    });
  }

  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Create unique callback name
      const callbackName = `googleMapsCallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Set up callback
      (window as any)[callbackName] = () => {
        this.isLoaded = true;
        this.isLoading = false;
        delete (window as any)[callbackName];
        console.log("Google Maps loaded successfully");
        resolve();
      };

      // Set up global error handler
      const originalAuthFailure = (window as any).gm_authFailure;
      (window as any).gm_authFailure = () => {
        this.isLoading = false;
        delete (window as any)[callbackName];
        const error = new Error(
          "Google Maps API authentication failed. Please enable the Maps JavaScript API in Google Cloud Console.",
        );
        reject(error);
        if (originalAuthFailure) originalAuthFailure();
      };

      // Create and append script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${callbackName}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.setAttribute("data-callback", callbackName);

      script.onerror = (error) => {
        this.isLoading = false;
        delete (window as any)[callbackName];
        console.error("Google Maps script loading error:", error);
        reject(
          new Error(
            "Failed to load Google Maps API. Please check your internet connection and API key.",
          ),
        );
      };

      console.log("Loading Google Maps script...");
      document.head.appendChild(script);

      // Cleanup on timeout
      setTimeout(() => {
        if (!this.isLoaded) {
          this.isLoading = false;
          delete (window as any)[callbackName];
          reject(new Error("Google Maps loading timeout"));
        }
      }, 30000); // 30 second timeout
    });
  }

  public isGoogleMapsLoaded(): boolean {
    return this.isLoaded && !!(window.google && window.google.maps);
  }

  public isValidMapInstance(map: any): boolean {
    return !!(
      map &&
      window.google &&
      window.google.maps &&
      map instanceof window.google.maps.Map
    );
  }
}

export default GoogleMapsLoader;
