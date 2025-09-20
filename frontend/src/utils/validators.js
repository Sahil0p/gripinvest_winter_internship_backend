// Validators for inputs such as email, password, name

export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  export function isStrongPassword(password) {
    // Example: password must be at least 8 characters, contain at least one uppercase, one number.
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  }
  
  export function isNotEmpty(value) {
    return value && value.trim().length > 0;
  }
  