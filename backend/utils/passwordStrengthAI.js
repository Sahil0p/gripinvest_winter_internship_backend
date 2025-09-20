// Simple password strength checker placeholder - integrate real AI later.
exports.check = (password) => {
    const suggestions = [];
    if (password.length < 8) suggestions.push('Password should be at least 8 characters');
    if (!/[A-Z]/.test(password)) suggestions.push('Include an uppercase letter');
    if (!/[a-z]/.test(password)) suggestions.push('Include a lowercase letter');
    if (!/\d/.test(password)) suggestions.push('Include a number');
    if (!/[^A-Za-z0-9]/.test(password)) suggestions.push('Include a special character');
    return {
      strong: suggestions.length === 0,
      suggestions
    };
  };
  