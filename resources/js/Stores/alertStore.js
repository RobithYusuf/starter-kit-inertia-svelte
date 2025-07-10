import { writable } from 'svelte/store';

function createAlertStore() {
    const { subscribe, set, update } = writable([]);

    let nextId = 1;

    const add = (message, type = 'info', duration = 5000) => {
        const id = nextId++;
        const alert = { id, message, type, timestamp: Date.now() };
        
        update(alerts => [...alerts, alert]);

        if (duration > 0) {
            setTimeout(() => {
                remove(id);
            }, duration);
        }

        return id;
    };

    const remove = (id) => {
        update(alerts => alerts.filter(alert => alert.id !== id));
    };

    const clear = () => {
        set([]);
    };

    return {
        subscribe,
        add,
        remove,
        clear,
        success: (message, duration) => add(message, 'success', duration),
        error: (message, duration) => add(message, 'error', duration),
        warning: (message, duration) => add(message, 'warning', duration),
        info: (message, duration) => add(message, 'info', duration),
    };
}

export default createAlertStore();