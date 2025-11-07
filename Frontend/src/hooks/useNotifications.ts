import { useState, useEffect } from 'react';
import type { UserRoleType, Notification } from '../../types';

export const useNotifications = ({ userRole }: { userRole: UserRoleType }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Welcome',
        message: 'Welcome to Food Delivery!',
        type: 'info',
        timestamp: new Date(),
        read: false,
        userRole: userRole,
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, [userRole]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: 'Notification',
      message,
      type,
      timestamp: new Date(),
      read: false,
      userRole: userRole,
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    addNotification,
  };
};