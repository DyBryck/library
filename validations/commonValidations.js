export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return "trop court, doit contenir au moins 2 caractères";
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Adresse email invalide";
  }
  return null;
};
