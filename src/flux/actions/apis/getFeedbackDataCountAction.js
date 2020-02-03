/**
 * Feedback Data Count API
 */
import API from './api';
import C from '../constants';

export class GetFeedbacktDataCountAction extends API {
    constructor(dateObj, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.GET_FEEDBACK_DATA_COUNT;
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
        return `${super.apiEndPoint()}/feedback_report/_search?pretty=true`;
    }

    getHeaders() {
        return {
            headers: {}
        }
    }

    getBody() {
        return {
            params: {
                source_content_type: 'application/json',
                source: JSON.stringify(this.dateObj)
            }
        };
    }

    getPayload() {
        return this.chartData;
    }
}