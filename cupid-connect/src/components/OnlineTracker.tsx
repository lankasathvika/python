"use client";

import { useEffect } from "react";
import { trackUserOnlineStatus } from "../lib/trackUserOnlineStatus";

export const OnlineTracker = () => {
  useEffect(() => {
    trackUserOnlineStatus(); 
  }, []);

  return null;
};
