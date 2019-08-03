import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 15000,
  draggable: false,
});

const notifyToast = (msg, options) => {
  let type;
  switch (options.type) {
    case 'error': type = toast.TYPE.ERROR; break;
    case 'info': type = toast.TYPE.INFO; break;
    default: type = toast.TYPE.SUCCESS;
  }
  toast(msg, { type });
};

export default notifyToast;
