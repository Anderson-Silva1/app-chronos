import { toast } from "react-toastify";

export const showMessage = {
  success: (msg: string) => toast.success(msg),
  info: (msg: string) => toast.info(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  warning: (msg: string) => toast.warning(msg),
  dismiss: () => toast.dismiss(),
};
