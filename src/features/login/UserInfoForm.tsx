import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@components/input/Input';
import { useState } from 'react';

interface UserInfoFormProps {
  onCreateUser: (firstName: string, lastName: string) => Promise<void>;
  error: string | null;
}

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onCreateUser, error }) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { firstName: string; lastName: string }) => {
    setIsLoading(true);
    try {
      await onCreateUser(data.firstName, data.lastName);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter Name</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          control={control}
          placeholder="First Name"
          label="First Name"
        />
        <Input
          name="lastName"
          control={control}
          label="Last Name"
          placeholder="Last Name"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating User...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;
