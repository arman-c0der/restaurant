"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ReservationContextType = {
  isOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
};

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReservationContext.Provider
      value={{
        isOpen,
        openReservation: () => setIsOpen(true),
        closeReservation: () => setIsOpen(false),
      }}
    >
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
