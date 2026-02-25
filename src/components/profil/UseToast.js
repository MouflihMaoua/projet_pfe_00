// ============================================================
// hooks/useToast.js
// Hook custom pour gérer les notifications toast
// ============================================================

import { useState, useCallback } from "react";

let toastId = 0;

/**
 * Hook custom pour les toasts
 * @returns {{ toasts, addToast, removeToast }}
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  /**
   * Ajoute un toast
   * @param {Object} toast - { message, type: 'success'|'error'|'warning'|'info', duration }
   */
  const addToast = useCallback(({ message, type = "success", duration = 3500 }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  /**
   * Supprime un toast par ID
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Raccourcis sémantiques
  const toast = {
    success: (message) => addToast({ message, type: "success" }),
    error: (message) => addToast({ message, type: "error" }),
    warning: (message) => addToast({ message, type: "warning" }),
    info: (message) => addToast({ message, type: "info" }),
  };

  return { toasts, addToast, removeToast, toast };
};