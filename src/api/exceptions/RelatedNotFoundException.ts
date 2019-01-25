import { Exception } from '../../core/api/Exception';


export class RelatedNotFoundException extends Exception {
    constructor(id: number | string, className: string, relatedClassName: string) {
        super(404, `${className} related to ${relatedClassName} with id ${id} could not be found`);
    }
}
