"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const ReservationContext = createContext(undefined);

export function ReservationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // useCallback keeps these functions stable between renders, so effects
  // that depend on them (like the Esc key listener) don't re-run every time.
  const openReservation = useCallback(() => setIsOpen(true), []);
  const closeReservation = useCallback(() => setIsOpen(false), []);

  // useMemo stops consumers from re-rendering unless something changed.
  const value = useMemo(
    () => ({ isOpen, openReservation, closeReservation }),
    [isOpen, openReservation, closeReservation]
  );

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error(
      "useReservation must be used within a ReservationProvider"
    );
  }
  return ctx;
}