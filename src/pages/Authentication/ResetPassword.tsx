import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<ResetPasswordFormData>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof ResetPasswordFormData, string>> = {};
      
      if (!values.password?.trim()) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      
      if (!values.confirmPassword?.trim()) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      if (!token) {
        setError('Invalid reset token');
        return;
      }

      try {
        setError('');
        await resetPassword(token, values.password);
        setSuccess(true);
      } catch (err) {
        console.error('Password reset error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to reset password. Please try again.');
        }
      }
    }
  });

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">CreatorHub</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-pink-600 mx-auto mb-4 rounded-full"></div>
            </motion.div>
            <h2 className="text-xl text-red-600 font-medium">Invalid Reset Link</h2>
          </div>

          <div className="mt-8 bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <div className="h-8 w-8 text-red-600 font-bold text-2xl">✕</div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Link Expired or Invalid</h3>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                <p className="text-sm text-red-800 mb-2">
                  This password reset link is either:
                </p>
                <ul className="text-xs text-red-700 text-left space-y-1">
                  <li>• Expired (links are valid for 1 hour)</li>
                  <li>• Already used</li>
                  <li>• Invalid or corrupted</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  to="/forgot-password"
                  className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Request new reset link
                </Link>
                
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">CreatorHub</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-4 rounded-full"></div>
            </motion.div>
            <h2 className="text-xl text-gray-600 font-medium">Password reset successful</h2>
          </div>

          <div className="mt-8 bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
            <div className="text-center">
              <motion.div 
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="h-8 w-8 text-green-600 font-bold text-2xl">✓</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Password Updated!</h3>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    🎉 Success!
                  </p>
                  <p className="text-sm text-green-700">
                    Your password has been successfully reset. You can now sign in with your new password.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Sign in to your account
                  </Button>
                  
                  <p className="text-xs text-gray-500">
                    Make sure to keep your new password secure and don't share it with anyone.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">CreatorHub</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-600 mx-auto mb-4 rounded-full"></div>
          </motion.div>
          <h2 className="text-xl text-gray-600 font-medium">Set new password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Choose a strong password to keep your account secure.
          </p>
        </div>

        <div className="mt-8 bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
          <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="text-sm font-semibold text-orange-800 mb-2">Password Requirements:</h3>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• At least 6 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Avoid using personal information</li>
            </ul>
          </div>

          {error && (
            <motion.div 
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <span className="text-red-500 font-bold">⚠</span>
              </div>
              <div className="text-sm font-medium">{error}</div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <Input
                label="New password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                required
                autoComplete="new-password"
                placeholder="Enter your new password"
                helperText="Must be at least 6 characters with uppercase, lowercase, and number"
                disabled={isSubmitting}
              />

              <Input
                label="Confirm new password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
                placeholder="Confirm your new password"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating password...</span>
                </div>
              ) : (
                'Update password'
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Need help?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border-2 border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Back to sign in
              </Link>
            </div>
          </div>

          {/* Security tip */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <span className="font-medium">💡 Security Tip:</span> Use a unique password that you don't use for other accounts. 
              Consider using a password manager to generate and store strong passwords.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
