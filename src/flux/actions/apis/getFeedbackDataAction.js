/**
 * Feedback Data API
 */
import API from '../apis/api';
import C from '../constants';

export class GetFeedbackDataAction extends API {
    constructor(size, dateObj, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.GET_FEEDBACK_DATA;
        this.size = size,
        this.dateObj = dateObj
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res);
        this.chartData = res;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/feedback_report/_search?pretty=true&size=${this.size}`;
    }

    getHeaders() {
        return {
            headers: {
            }
        }
    }
    
    getBody() {
        return {
            params: {
                source_content_type: 'application/json',
                source: JSON.stringify(this.dateObj)
            }
        }
    }

    getPayload() {
        return this.chartData;
    }
}