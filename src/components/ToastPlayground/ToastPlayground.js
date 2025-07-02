import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
	const [variant, setVariant] = React.useState("notice");
	const [message, setMessage] = React.useState("");
	const { toasts, addToast, removeAllToasts } = React.use(ToastContext);

	const variantRef = React.useRef(variant);
	const messageRef = React.useRef(message);

	function handleRadio(event) {
		setVariant(() => event.target.value);
	}

	function changeMessage(event) {
		setMessage(() => event.target.value);
	}

	function handleClick({ variant, message }) {
		if (!message.trim() || !message) {
			console.error("No Messages");
			return;
		}

		addToast({ variant, message });
		setMessage("");
	}

	React.useEffect(() => {
		variantRef.current = variant;
		messageRef.current = message;
	}, [variant, message]);

	React.useEffect(() => {
		function useEnter(event) {
			if (event.code === "Enter") {
				if (!messageRef.current.trim()) {
					console.error("No Messages");
					return;
				}

				event.preventDefault();
				addToast({ variant: variantRef.current, message: messageRef.current });
				setMessage("");
			}
		}

		document.addEventListener("keydown", useEnter);

		return () => {
			document.removeEventListener("keydown", useEnter);
		};
	}, [addToast]);

	React.useEffect(() => {
		function useEscape(event) {
			if (event.code === "Escape") {
				event.preventDefault();
				removeAllToasts();
				setMessage("");
			}
		}
		document.addEventListener("keydown", useEscape);

		return () => {
			document.removeEventListener("keydown", useEscape);
		};
	}, [removeAllToasts]);

	return (
		<div className={styles.wrapper}>
			<header>
				<img alt="Cute toast mascot" src="/toast.png" />
				<h1>Toast Playground</h1>
			</header>

			{toasts.length > 0 && <ToastShelf toasts={toasts} />}

			<div className={styles.controlsWrapper}>
				<div className={styles.row}>
					<label htmlFor="message" className={styles.label} style={{ alignSelf: "baseline" }}>
						Message
					</label>
					<div className={styles.inputWrapper}>
						<textarea id="message" className={styles.messageInput} value={message} onChange={changeMessage} />
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label}>Variant</div>
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						{VARIANT_OPTIONS.map((element) => (
							<label htmlFor={`variant-${element}`} key={element}>
								<input id={`variant-${element}`} type="radio" name="variant" value={element} onChange={handleRadio} checked={variant === element} />
								{element}
							</label>
						))}
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label} />
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						<Button onClick={() => handleClick({ variant, message })}>Pop Toast!</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ToastPlayground;
