import { NfeCompany } from '../entities';
import WebmaniaBR from './webmaniabr-emitter';

export function getEmitter(nfeCompany: NfeCompany): WebmaniaBR {
    return new WebmaniaBR(nfeCompany);
}
