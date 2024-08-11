import { useCallback, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { checkUser } from '../../api/mockApi';
import OtpForm from './OtpForm';
import UserInfoForm from './UserInfoForm';
import LoginForm from './LoginForm';

interface LoginProps {
  setAccessToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setAccessToken }) => {
  const { login, register, error } = useAuth();

  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');

  // 1: Enter phone, 2: Enter OTP, 3: If user doesn't exit enter user info
  const [stage, setStage] = useState(1);

  const handleRequestOtp = useCallback(async (contact: string) => {
    try {
      const user = await checkUser(contact);
      setStage(user ? 2 : 3); // Move to OTP or User Info stage
    } catch (err) {
      console.error('Error checking user:', err);
    }
  }, []);

  const handleConfirmOtp = useCallback(
    async (enteredOpt: string) => {
      try {
        const token = await login(contact, enteredOpt);
        if (token) {
          setAccessToken(token); // Set the access token on successful login
        }
      } catch (err) {
        console.error('Error confirming OTP:', err);
      }
    },
    [contact, login, setAccessToken]
  );

  const handleCreateUser = useCallback(
    async (firstName: string, lastName: string) => {
      try {
        await register(contact, firstName, lastName);
        setStage(2); // Go to OTP stage after registration
      } catch (err) {
        console.error('Error creating user:', err);
      }
    },
    [contact, register]
  );

  const renderForm = () => {
    switch (stage) {
      case 1:
        return (
          <LoginForm
            contact={contact}
            setContact={setContact}
            onRequestOtp={handleRequestOtp}
            error={error}
          />
        );
      case 2:
        return (
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            onConfirmOtp={handleConfirmOtp}
            error={error}
          />
        );
      case 3:
        return <UserInfoForm onCreateUser={handleCreateUser} error={error} />;
      default:
        return null;
    }
  };

  return <div>{renderForm()}</div>;
};

export default Login;
