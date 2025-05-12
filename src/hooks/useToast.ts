import { Id, toast } from "react-toastify";
import { useRef } from "react";

import Notification from "../components/Notification";

const useToast = () => {
    const toastId = useRef<Id>(0);

    const notify = () => toastId.current = toast(Notification, { 
        data: {
            content: 'Agregando personaje...'
        },
        autoClose: false,
        toastId: toastId.current
    });

    const updateSuccess = () => toast.update(toastId.current, { 
        render: Notification,
        data: {
            content: "Personaje agregado correctamente",
            isSuccess: true
        },
        type: "success",
        autoClose: 3000 
    });


    const updateError = (message: string) => toast.update(toastId.current, { 
        render: Notification,
        data: {
            content: message,
            isSuccess: false
        },
        type: "error",
        autoClose: 3000 
    });


    return {
        notify,
        updateSuccess,
        updateError
    }
}
 
export default useToast;