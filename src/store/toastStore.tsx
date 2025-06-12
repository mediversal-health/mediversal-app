import {create} from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  showIcon: boolean;
}

interface ToastStore {
  toast: ToastState;
  showToast: (
    message: string,
    type?: ToastType,
    duration?: number,
    showIcon?: boolean,
  ) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>(set => ({
  toast: {
    visible: false,
    message: '',
    type: 'success',
    duration: 3000,
    showIcon: true,
  },
  showToast: (
    message: string,
    type: ToastType = 'success',
    duration: number = 3000,
    showIcon: boolean = true,
  ) =>
    set(() => ({
      toast: {
        visible: true,
        message,
        type,
        duration,
        showIcon,
      },
    })),
  hideToast: () =>
    set(state => ({
      toast: {...state.toast, visible: false},
    })),
}));
