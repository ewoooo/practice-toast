import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([]);

	const value = React.useMemo(() => {
		function addToast({ variant, message }) {
			const data = { variant, message, id: crypto.randomUUID() };
			setToasts((prev) => [...prev, data]);
		}

		function removeToast(id) {
			const nextArray = toasts.filter((toast) => toast.id !== id);
			setToasts(nextArray);
		}

		function removeAllToasts() {
			setToasts([]);
		}

		return { toasts, addToast, removeToast, removeAllToasts };
	}, [toasts]);

	return <ToastContext value={value}> {children}</ToastContext>;
}

export default ToastProvider;
