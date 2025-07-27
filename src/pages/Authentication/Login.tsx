import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, authError } = useAuth();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormData, string>> = {};
      
      if (!values.email?.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!values.password?.trim()) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await login(values.email.trim(), values.password);
        navigate('/', { replace: true });
      } catch {
        // Error handled in authError from context
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-4 rounded-full"></div>
          </motion.div>
          <h2 className="text-xl text-gray-600 font-medium">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Please enter your details to continue.
          </p>
        </div>

        <div className="mt-8 bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
          {authError && (
            <motion.div 
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <span className="text-red-500 font-bold">⚠</span>
              </div>
              <div className="text-sm font-medium">{authError}</div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
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
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">New to CreatorHub?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-3 px-4 border-2 border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-600">
              Email: demo@creatorhub.com<br />
              Password: password123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
