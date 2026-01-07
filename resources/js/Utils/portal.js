/**
 * Svelte action to teleport an element to document.body
 * This ensures modals render outside of any stacking context
 */
export function portal(node, target = document.body) {
    // Move the node to target (default: body)
    target.appendChild(node);
    
    return {
        destroy() {
            // Remove node when component is destroyed
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    };
}
