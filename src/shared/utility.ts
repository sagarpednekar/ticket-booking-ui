
import { v4 as uuidv4 } from 'uuid';

export function generateUUID() {
    return 'BID-'+uuidv4().toUpperCase();
}