import { Control, Controller } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  type?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  control,
  placeholder,
  type = 'text', // Default input type is text
  label,
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              className={styles.input} // Apply CSS Module styling
              {...field}
            />
            {error && (
              <p className={styles.errorMessage}>{error.message?.toString()}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Input;
