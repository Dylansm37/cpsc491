import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { logout, refreshToken } from "../utils/api";

const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes
const WARNING_TIME = 1 * 60 * 1000; // 1 minute warning

export const useInactivityTimer = () => {
  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const warningShownRef = useRef(false);
  const location = useLocation();

  const resetTimer = async () => {
    console.log("🔄 resetTimer called at", new Date().toLocaleTimeString());
    
    // Reset warning shown flag
    warningShownRef.current = false;
    
    // Clear existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      console.log("⏹️ Cleared existing logout timer");
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      console.log("⏹️ Cleared existing warning timer");
    }

    // Refresh the JWT token on activity
    console.log("🔑 Attempting to refresh token...");
    const refreshed = await refreshToken();
    
    if (!refreshed) {
      console.log("❌ Token refresh failed, logging out");
      logout();
      return;
    }
    
    console.log("✅ Token refreshed, resetting timers");

    // Set warning timer
    warningTimerRef.current = setTimeout(() => {
      if (warningShownRef.current) {
        console.log("⚠️ Warning already shown, skipping");
        return;
      }
      
      warningShownRef.current = true;
      console.log("⚠️ Warning timer triggered!");
      
      const shouldStay = window.confirm(
        "You've been inactive. You'll be logged out in " + (WARNING_TIME / 1000) + " seconds. Click OK to stay logged in."
      );
      
      if (shouldStay) {
        console.log("👤 User chose to stay logged in");
        resetTimer();
      } else {
        console.log("👤 User chose to logout or closed dialog");
      }
    }, TIMEOUT_DURATION - WARNING_TIME);

    console.log(`⏰ Warning timer set for ${(TIMEOUT_DURATION - WARNING_TIME) / 1000} seconds`);

    // Set logout timer
    timerRef.current = setTimeout(() => {
      console.log("🚪 Logout timer triggered - logging out due to inactivity");
      alert("You've been logged out due to inactivity.");
      logout();
    }, TIMEOUT_DURATION);
    
    console.log(`⏰ Logout timer set for ${TIMEOUT_DURATION / 1000} seconds`);
  };

  useEffect(() => {
    console.log("🎯 useInactivityTimer effect running on route:", location.pathname);
    
    // Don't run timer on login/signup pages - use EXACT matches
    const publicRoutes = ["/", "/resetpassword"];
    const isPublicRoute = publicRoutes.includes(location.pathname) || 
                          location.pathname.startsWith("/newpassword/");
    
    if (isPublicRoute) {
      console.log("📍 On public route, skipping inactivity timer");
      return;
    }
    
    // Only start timer if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("❌ No token found, inactivity timer not started");
      return;
    }
    
    console.log("✅ Token found, initializing inactivity timer");

    // Activity events to track
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Throttle the resetTimer to avoid too many refresh calls
    let throttleTimeout;
    const throttledResetTimer = () => {
      if (throttleTimeout) {
        console.log("⏸️ Throttled - skipping token refresh");
        return;
      }
      
      console.log("🎬 Activity detected, scheduling token refresh");
      throttleTimeout = setTimeout(() => {
        resetTimer();
        throttleTimeout = null;
      }, 5000); // Only refresh token at most once every 5 seconds
    };

    // Add event listeners
    activityEvents.forEach((event) => {
      document.addEventListener(event, throttledResetTimer, true);
    });
    
    console.log("👂 Event listeners added for:", activityEvents.join(", "));

    // Initialize timer
    console.log("🚀 Initializing timer on page load");
    resetTimer();

    // Cleanup
    return () => {
      console.log("🧹 Cleaning up inactivity timer");
      activityEvents.forEach((event) => {
        document.removeEventListener(event, throttledResetTimer, true);
      });
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [location.pathname]); // Re-run when route changes

  return null;
};