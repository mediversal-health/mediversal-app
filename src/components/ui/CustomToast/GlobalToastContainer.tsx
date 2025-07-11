import React from 'react';
import {useToastStore} from '../../../store/toastStore';
import GlobalCustomToast from './index';

const GlobalToastContainer: React.FC = () => {
  const {toast, hideToast} = useToastStore();

  return (
    <GlobalCustomToast
      message={toast.message}
      visible={toast.visible}
      type={toast.type}
      duration={toast.duration}
      onHide={hideToast}
      showIcon={toast.showIcon}
    />
  );
};

export default GlobalToastContainer;
