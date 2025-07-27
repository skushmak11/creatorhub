import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { initiatePasswordReset } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<ForgotPasswordFormData>({
    initialValues: {
      email: ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof ForgotPasswordFormData, string>> = {};
      
      if (!values.email?.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = 'Please enter a valid email address';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setError('');
        await initiatePasswordReset(values.email.trim());
        setSuccess(true);
      } catch (err) {
        console.error('Password reset error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to send reset email. Please try again.');
        }
      }
    }
  });

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-4 rounded-full"></div>
            </motion.div>
            <h2 className="text-xl text-gray-600 font-medium">Check your email</h2>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Reset link sent!</h3>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                  <p className="text-sm text-blue-800 mb-2">
                    We've sent a password reset link to:
                  </p>
                  <p className="text-sm font-semibold text-blue-900 break-all">
                    {values.email}
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Please check your email and follow the instructions to reset your password.
                </p>
                
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-6">
                  <p className="text-xs text-yellow-800 font-medium mb-1">
                    ⏰ Important:
                  </p>
                  <p className="text-xs text-yellow-700">
                    The reset link will expire in 1 hour. If you don't see the email, check your spam folder.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Back to sign in
                  </Link>
                  
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setError('');
                    }}
                    className="w-full flex justify-center py-2 px-4 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    Try different email
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-4 rounded-full"></div>
          </motion.div>
          <h2 className="text-xl text-gray-600 font-medium">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Don't worry, we'll help you get back into your account.
          </p>
        </div>

        <div className="mt-8 bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">How it works:</h3>
            <ol className="text-xs text-blue-700 space-y-1">
              <li>1. Enter your email address below</li>
              <li>2. We'll send you a secure reset link</li>
              <li>3. Click the link to create a new password</li>
            </ol>
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
            <Input
              label="Email address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending reset link...</span>
                </div>
              ) : (
                'Send reset link'
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Remember your password?</span>
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

          {/* Help section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Still having trouble? Contact our support team at{' '}
              <a href="mailto:support@creatorhub.com" className="text-purple-600 hover:text-purple-500 font-medium">
                support@creatorhub.com
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
