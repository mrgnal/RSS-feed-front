import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './passwordInput.module.css'; // Assuming you create a separate CSS module for this component

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder: string;
  name: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, error, placeholder, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.passwordInputWrapper}>
    <input
      id={name} 
      name={name}
      type={showPassword ? "text" : "password"}
      className={styles.inputField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <button
      type="button"
      className={styles.passwordToggle}
      onClick={togglePasswordVisibility}
      tabIndex={-1}
    >
      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
    </button>
    {error && <p className={styles.errorText}>{error}</p>}
  </div>
  );
};

export default PasswordInput;
