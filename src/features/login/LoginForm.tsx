import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/input/Input';
import { MOBILE_REGEX } from '../../utils/constants';
import { useState } from 'react';

interface LoginFormProps {
  contact: string;
  setContact: (contact: string) => void;
  onRequestOtp: (contact: string) => void;
  error: string | null;
}

const schema = z.object({
  contact: z.string().regex(MOBILE_REGEX, 'Invalid contact number'),
});

const LoginForm: React.FC<LoginFormProps> = ({
  contact,
  setContact,
  onRequestOtp,
  error,
}) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      contact: contact,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { contact: string }) => {
    setIsLoading(true);
    try {
      setContact(data.contact);
      await onRequestOtp(data.contact);
    } catch (error) {
      console.error('Error requesting OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section aria-labelledby="login-heading">
      <h2 id="login-heading">Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          name="contact"
          control={control}
          placeholder="Enter your mobile number"
          label="Mobile Number"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Request OTP'}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
