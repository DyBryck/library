export const validateName = (name) => {
    if (!name || name.trim().length < 2) {
        return "Trop court, doit contenir au moins 2 caractères";
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
export const validateNumber = (num) => {
    if (typeof num === "string" && num.trim().length === 0) {
        return `Le champ est vide`;
    }
    const parsed = Number(num);
    if (Number.isNaN(parsed)) {
        return `${num} n'est pas un nombre`;
    }
    return null;
};
export const validateDate = (date) => {
    const errors = [];
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(dateRegex);
    if (!match) {
        errors.push("Format de date invalide, attendu YYYY-MM-DD");
    }
    else {
        const [, yearStr, monthStr, dayStr] = match;
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);
        if (month < 1 || month > 12) {
            errors.push("Mois invalide (1–12)");
        }
        if (day < 1 || day > 31) {
            errors.push("Jour invalide (1–31)");
        }
    }
    return errors;
};
//# sourceMappingURL=commonValidations.js.map