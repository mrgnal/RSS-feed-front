import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from '@nextui-org/react';
import PasswordInput from '@/app/components/Auth/passwordInput/passwordInput';
import styles from './userProfile.module.css';
import Image from 'next/image';

interface UserData {
  username: string;
  email: string;
  access_token: string;
  refresh_token: string;
  user_id: string;
  groups: string[];
  status_code: number;
}

interface UpdateAccountData {
  email?: string;
  username?: string;
  old_password?: string;
  new_password?: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const API_URL = 'http://127.0.0.1:8000/api';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
          <p className="text-gray-600 mb-8">Your account will be permanently deleted</p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm}
              className="px-8 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="px-8 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

async function updateAccountData(data: UpdateAccountData) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${API_URL}/change_account_data/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Update Error:', error);
    throw error;
  }
}

const ProfileForm = () => {
  const [initialData, setInitialData] = useState({
    username: '',
    email: '',
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    repeatPassword: ''
  });

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        const userData: UserData = JSON.parse(storedUserData);
        setInitialData({
          username: userData.username,
          email: userData.email
        });
        
        setFormData(prev => ({
          ...prev,
          username: userData.username,
          email: userData.email
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const isModified = 
      formData.username !== initialData.username ||
      formData.email !== initialData.email ||
      formData.oldPassword !== '' ||
      formData.newPassword !== '' ||
      formData.repeatPassword !== '';
    
    setIsFormChanged(isModified);
  }, [formData, initialData]);

  useEffect(() => {
    if (formData.newPassword || formData.repeatPassword) {
      if (formData.newPassword !== formData.repeatPassword) {
        setErrors(prev => ({
          ...prev,
          repeatPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          repeatPassword: ''
        }));
      }
    }
  }, [formData.newPassword, formData.repeatPassword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData: UpdateAccountData = {};
      
      if (formData.username !== initialData.username) {
        updateData.username = formData.username;
      }
      if (formData.email !== initialData.email) {
        updateData.email = formData.email;
      }
      if (formData.oldPassword && formData.repeatPassword) {
        updateData.old_password = formData.oldPassword;
        updateData.new_password = formData.repeatPassword;
      }

      if (Object.keys(updateData).length > 0) {
        const response = await updateAccountData(updateData);
        
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const userData: UserData = JSON.parse(storedUserData);
          const updatedUserData = {
            ...userData,
            username: formData.username,
            email: formData.email
          };
          localStorage.setItem('user', JSON.stringify(updatedUserData));
        }

        setInitialData({
          username: formData.username,
          email: formData.email
        });

        setFormData(prev => ({
          ...prev,
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        }));

        console.log('Account updated successfully:', response);
      }
    } catch (error) {
      console.error('Failed to update account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(`${API_URL}/delete_profile/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      window.location.href = '/';
      
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const isPasswordsMatch = formData.newPassword === formData.repeatPassword || (!formData.newPassword && !formData.repeatPassword);
  const isDisabled = !isFormChanged || !isPasswordsMatch || isLoading;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
                <Image
                    src="/defaultProfile-icon.svg"
                    alt="Profile"
                    width={60}
                    height={60}
                    className={styles.userIcon}
                />
                <span className={styles.verifiedBadge}></span>
            </div>
            <div className={styles.userInfo}>
              <span className={styles.username}>{initialData.username}</span>
              <span className={styles.email}>{initialData.email}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username">User name</label>
            <input
  
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Change email</label>
            <p className={styles.emailNote}>
              A confirmation email will be sent to your new email address
            </p>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter new email"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Set password</label>
            <p className={styles.forgotPassword}>
                Forgot or never set up your password?{" "}
                <Link href="/pages/Auth/restorePassword" className={styles.restoreLink}>
                    Request password
                </Link>
            </p>
            
            <PasswordInput
              value={formData.oldPassword}
              onChange={handleInputChange}
              error={errors.oldPassword}
              placeholder="Enter old password"
              name="oldPassword"
            />

            <PasswordInput
              value={formData.newPassword}
              onChange={handleInputChange}
              error={errors.newPassword}
              placeholder="Enter new password"
              name="newPassword"
            />

            <PasswordInput
              value={formData.repeatPassword}
              onChange={handleInputChange}
              error={errors.repeatPassword}
              placeholder="Repeat new password"
              name="repeatPassword"
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.saveButton} ${isDisabled ? styles.saveButtonDisabled : ''}`}
            disabled={isDisabled}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>

        <div className={styles.deleteSection}>
          <span>Delete account?</span>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProfileForm;