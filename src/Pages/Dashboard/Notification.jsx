import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const Notification = ({ userEmail }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`https://click-n-cash-server.vercel.app/notifications/${userEmail}`);
        setNotifications(res.data.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userEmail]);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`https://click-n-cash-server.vercel.app/notifications/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, status: 'read' } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-teal-700 hover:text-teal-900 relative"
      >
        <FaBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-teal-200 rounded-lg shadow-lg">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-teal-700">Notifications</h3>
            <ul className="mt-2">
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`p-2 hover:bg-teal-50 ${
                    notification.status === 'unread' ? 'font-bold' : ''
                  }`}
                  onClick={() => markAsRead(notification._id)}
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;