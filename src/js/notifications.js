import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const NOTIFICATION_TYPES = {
  error: 'error',
  success: 'success',
};

const THEME = {
  [NOTIFICATION_TYPES.error]: {
    backgroundColor: '#EF4040',
    messageColor: '#FFFFFF',
  },
  [NOTIFICATION_TYPES.success]: {
    backgroundColor: '#59A10D',
    messageColor: '#FFFFFF',
  },
};

export const showNotification = (message, type = NOTIFICATION_TYPES.error) => {
  iziToast.show({
    ...THEME[type],
    message,
    messageSize: '16px',
    position: 'topRight',
    maxWidth: 380,
  });
};
