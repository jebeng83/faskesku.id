export const toastBus = {
    listeners: new Set(),
    on(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    },
    emit(payload) {
        this.listeners.forEach((l) => l(payload));
    },
};

export function toast(message, type = "success", options = {}) {
    toastBus.emit({ message, type, ...options });
}
