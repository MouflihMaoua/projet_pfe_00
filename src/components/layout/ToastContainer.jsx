import React from 'react';

const typeColors = {
	success: 'bg-emerald-500',
	error: 'bg-red-500',
	warning: 'bg-yellow-500',
	info: 'bg-sky-500',
};

const ToastContainer = ({ toasts = [], removeToast = () => {} }) => {
	return (
		<div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
			{toasts.map((t) => (
				<div key={t.id} className={`max-w-sm w-full rounded-lg shadow-lg overflow-hidden flex items-center ${typeColors[t.type] || 'bg-gray-800'}`}>
					<div className="p-3 text-white flex-1 text-sm">{t.message}</div>
					<button
						onClick={() => removeToast(t.id)}
						className="px-3 py-2 bg-white/10 text-white text-xs hover:bg-white/20"
					>
						Fermer
					</button>
				</div>
			))}
		</div>
	);
};

export default ToastContainer;
