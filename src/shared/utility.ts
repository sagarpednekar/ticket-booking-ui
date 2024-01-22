
import { v4 as uuidv4 } from 'uuid';

export function generateUUID() {
    return 'BID-' + uuidv4().toUpperCase().slice(0, 8);
}

export function generateCartId() {
    return '#' + uuidv4().toUpperCase().slice(0, 8);
}
