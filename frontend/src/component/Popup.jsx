import React, {useState , useEffect} from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";


const Popup = ({ status , message }) => {

    const [visible , setVisible] = useState(false);
    const [mounted , setMounted] = useState(false);

    useEffect(()=>{
         setMounted(true);
    },[]);

    useEffect(()=>{
        if(!message)return;

        setVisible(true);
        if(status == "success" || status == "error"){
              const timer = setTimeout(()=>{
                  setVisible(false);
              },3000);

              return ()  => clearTimeout(timer);
        }

    },[message, status]);

    if(!mounted || !visible || !message)return null;

    const styles = {
        loading: {
          bar: "w-2/3 bg-blue-500",
          border: "border-blue-200",
          bg: "bg-blue-50",
          text: "text-blue-800",
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
        },
        success: {
          bar: "w-full bg-green-500",
          border: "border-green-200",
          bg: "bg-green-50",
          text: "text-green-800",
          icon: <CheckCircle className="w-4 h-4" />,
        },
        error: {
          bar: "w-full bg-red-500",
          border: "border-red-200",
          bg: "bg-red-50",
          text: "text-red-800",
          icon: <XCircle className="w-4 h-4" />,
        },
     };

     const current = styles[status] || styles.loading;

    return createPortal(
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md pointer-events-none">
           <div
             className={`rounded-xl border ${current.border} ${current.bg}
                          backdrop-blur-md shadow-lg px-4 py-3 animate-toast`}
           >

             <div className="flex items-center gap-2 mb-2">
                 {current.icon}
                 <p className={`text-sm font-medium ${current.text}`}>{message}</p>
             </div>

             <div className={`h-1 w-full bg-black/10 rounded-full overflow-hidden`}>
                <div className={`h-full transition-all duration-700 ease-out ${current.bar}`} />
             </div>
           </div>
        </div>,
        document.body
    );
};

export default Popup;