export const validateUserData = (userData: { name: string; email: string; birthdate: string, password?: string }) => {
    const { name, birthdate, email, password } = userData;
    const errors: string[] = [];
  
    // Check name
    if (name.length < 8) {
      errors.push("Name must be at least 8 characters long.");
    }
  
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format.");
    }
  
    // Check birthdate (age >= 9 años)
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();
  
    if (calculatedAge < 9 || (calculatedAge === 9 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      errors.push("Age must be at least 9 years old.");
    }

     // Check Password
     if (password && password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
  
    return errors;
  };  