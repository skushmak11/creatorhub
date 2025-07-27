import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<RegisterFormData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof RegisterFormData, string>> = {};
      
      if (!values.name?.trim()) {
        errors.name = 'Full name is required';
      } else if (values.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      
      if (!values.email?.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = 'Please enter a valid email address';
      }
      
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
      try {
        setError('');
        await register(values.name.trim(), values.email.trim(), values.password);
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Registration error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    }
  });

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
          <h2 className="text-xl text-gray-600 font-medium">Create your account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Join thousands of creators managing their content with CreatorHub.
          </p>
        </div>

        <div className="mt-8 bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
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
                label="Full name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                required
                autoComplete="name"
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />

              <Input
                label="Email address"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete="email"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                required
                autoComplete="new-password"
                placeholder="Create a strong password"
                helperText="Must be at least 6 characters with uppercase, lowercase, and number"
                disabled={isSubmitting}
              />

              <Input
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
                placeholder="Confirm your password"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border-2 border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign in instead
              </Link>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Features highlight */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-sm font-semibold text-green-800 mb-2">What you'll get:</h3>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Multi-channel YouTube management</li>
              <li>• Advanced analytics and insights</li>
              <li>• Content planning tools</li>
              <li>• Creator community access</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
