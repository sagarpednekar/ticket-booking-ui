import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique Booking ID.
 * @returns {string} The generated Booking ID.
 */
export function generateUUID() {
    return 'BID-' + uuidv4().toUpperCase().slice(0, 8);
}

/**
 * Generates a unique Cart ID.
 * @returns {string} The generated Cart ID.
 */
export function generateCartId() {
    // Use a more descriptive prefix for cart IDs
    return 'CART-' + uuidv4().toUpperCase().slice(0, 8);
}
