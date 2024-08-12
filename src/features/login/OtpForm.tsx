import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@components/input/Input';
import { OPT_REGEX } from '@utils/constants';
import { useState } from 'react';

interface OtpFormProps {
  otp: string;
  setOtp: (otp: string) => void;
  onConfirmOtp: (enteredOtp: string) => Promise<void>; // Change to Promise<void> for async handling
  error: string | null;
}

const schema = z.object({
  otp: z
    .string()
    .length(5, 'OTP must be exactly 5 digits')
    .regex(OPT_REGEX, 'OTP must be numeric'),
});

const OtpForm: React.FC<OtpFormProps> = ({
  otp,
  setOtp,
  onConfirmOtp,
  error,
}) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: otp,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { otp: string }) => {
    setIsLoading(true);
    setOtp(data.otp);
    try {
      await onConfirmOtp(data.otp);
    } catch (error) {
      console.error('Error confirming OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="otp"
          control={control}
          placeholder="Enter OTP"
          label="Enter OTP"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Confirm OTP'}
        </button>
      </form>
    </div>
  );
};

export default OtpForm;
