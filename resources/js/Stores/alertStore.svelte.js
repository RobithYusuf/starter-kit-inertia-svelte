// Alert Store - Svelte 5 Runes version
let nextId = 1;

// Using $state for reactive alerts array
let alerts = $state([]);

// Alert position - persisted in localStorage
let position = $state(
    (typeof localStorage !== 'undefined' && localStorage.getItem('alertPosition')) || 'top-center'
);

function add(message, type = 'info', duration = 5000) {
    const id = nextId++;
    const alert = { id, message, type, timestamp: Date.now() };
    
    alerts.push(alert);

    if (duration > 0) {
        setTimeout(() => {
            remove(id);
        }, duration);
    }

    return id;
}

function remove(id) {
    const index = alerts.findIndex(alert => alert.id === id);
    if (index > -1) {
        alerts.splice(index, 1);
    }
}

function clear() {
    alerts.length = 0;
}

function setPosition(newPosition) {
    position = newPosition;
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('alertPosition', newPosition);
    }
}

// Export reactive state and methods
export const alertStore = {
    get alerts() {
        return alerts;
    },
    get position() {
        return position;
    },
    add,
    remove,
    clear,
    setPosition,
    success: (message, duration) => add(message, 'success', duration),
    error: (message, duration) => add(message, 'error', duration),
    warning: (message, duration) => add(message, 'warning', duration),
    info: (message, duration) => add(message, 'info', duration),
};

export default alertStore;
