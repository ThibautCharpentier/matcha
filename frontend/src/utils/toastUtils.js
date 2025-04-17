import { toast } from 'react-toastify';

export const showSuccess = (msg) => toast.success(msg);
export const showErrorServer = () => toast.error("Oups ! Le serveur a rencontré un problème. Réessaie un peu plus tard.");
export const showErrorData= () => toast.error("Oups ! Certaines données sont incorrectes. Vérifie et réessaie.");
export const showInfo = (msg) => toast.info(msg);
export const showWarning = (msg) => toast.warn(msg);
