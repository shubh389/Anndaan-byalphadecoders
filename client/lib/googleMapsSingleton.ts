// Global singleton to prevent any duplicate Google Maps API loading
declare global {
  interface Window {
    __GOOGLE_MAPS_LOADING__?: boolean;
    __GOOGLE_MAPS_LOADED__?: boolean;
    __GOOGLE_MAPS_CALLBACKS__?: Array<() => void>;
    __GOOGLE_MAPS_ERROR_CALLBACKS__?: Array<(error: string) => void>;
  }
}

class GoogleMapsSingleton {
  private static instance: GoogleMapsSingleton;

  public static getInstance(): GoogleMapsSingleton {
    if (!GoogleMapsSingleton.instance) {
      GoogleMapsSingleton.instance = new GoogleMapsSingleton();
    }
    return GoogleMapsSingleton.instance;
  }

  public async loadGoogleMaps(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // If already loaded, resolve immediately
      if (
        window.__GOOGLE_MAPS_LOADED__ &&
        window.google &&
        window.google.maps
      ) {
        resolve();
        return;
      }

      // If currently loading, add to callbacks
      if (window.__GOOGLE_MAPS_LOADING__) {
        window.__GOOGLE_MAPS_CALLBACKS__ =
          window.__GOOGLE_MAPS_CALLBACKS__ || [];
        window.__GOOGLE_MAPS_ERROR_CALLBACKS__ =
          window.__GOOGLE_MAPS_ERROR_CALLBACKS__ || [];

        window.__GOOGLE_MAPS_CALLBACKS__.push(resolve);
        window.__GOOGLE_MAPS_ERROR_CALLBACKS__.push(reject);
        return;
      }

      // Check if API key is valid
      if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
        reject(new Error("Google Maps API key not configured"));
        return;
      }

      // Check for existing script (safety check)
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]',
      );
      if (existingScript) {
        console.warn("Google Maps script already exists in DOM");
        // Wait for it to load instead of adding another
        this.waitForExistingLoad(resolve, reject);
        return;
      }

      // Mark as loading
      window.__GOOGLE_MAPS_LOADING__ = true;
      window.__GOOGLE_MAPS_CALLBACKS__ = [resolve];
      window.__GOOGLE_MAPS_ERROR_CALLBACKS__ = [reject];

      // Create global callback
      const callbackName = "initGoogleMapsGlobal";
      (window as any)[callbackName] = () => {
        window.__GOOGLE_MAPS_LOADED__ = true;
        window.__GOOGLE_MAPS_LOADING__ = false;

        // Execute all callbacks
        const callbacks = window.__GOOGLE_MAPS_CALLBACKS__ || [];
        window.__GOOGLE_MAPS_CALLBACKS__ = [];
        window.__GOOGLE_MAPS_ERROR_CALLBACKS__ = [];

        callbacks.forEach((callback) => {
          try {
            callback();
          } catch (error) {
            console.error("Error in Google Maps callback:", error);
          }
        });

        // Clean up callback
        delete (window as any)[callbackName];
        console.log("Google Maps loaded globally");
      };

      // Create script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.id = "google-maps-api-script"; // Give it a unique ID

      script.onerror = (error) => {
        window.__GOOGLE_MAPS_LOADING__ = false;
        const errorCallbacks = window.__GOOGLE_MAPS_ERROR_CALLBACKS__ || [];
        window.__GOOGLE_MAPS_CALLBACKS__ = [];
        window.__GOOGLE_MAPS_ERROR_CALLBACKS__ = [];

        const errorMessage = "Failed to load Google Maps API";
        errorCallbacks.forEach((callback) => {
          try {
            callback(errorMessage);
          } catch (err) {
            console.error("Error in Google Maps error callback:", err);
          }
        });

        delete (window as any)[callbackName];
        console.error("Google Maps script loading failed:", error);
      };

      console.log("Loading Google Maps API globally...");
      document.head.appendChild(script);
    });
  }

  private waitForExistingLoad(
    resolve: () => void,
    reject: (error: Error) => void,
  ): void {
    const maxWait = 30000; // 30 seconds
    const interval = 100;
    let waited = 0;

    const checkLoad = () => {
      if (window.google && window.google.maps) {
        window.__GOOGLE_MAPS_LOADED__ = true;
        resolve();
        return;
      }

      waited += interval;
      if (waited >= maxWait) {
        reject(
          new Error("Timeout waiting for existing Google Maps script to load"),
        );
        return;
      }

      setTimeout(checkLoad, interval);
    };

    checkLoad();
  }

  public isLoaded(): boolean {
    return !!(
      window.__GOOGLE_MAPS_LOADED__ &&
      window.google &&
      window.google.maps
    );
  }

  public isLoading(): boolean {
    return !!window.__GOOGLE_MAPS_LOADING__;
  }

  public isValidMapInstance(map: any): boolean {
    return !!(map && this.isLoaded() && map instanceof window.google.maps.Map);
  }
}

export default GoogleMapsSingleton;
