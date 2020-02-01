/**
 * Feedback Data API
 */
import API from '../apis/api';
import C from '../constants';

export class GetFeedbackDataAction extends API {
    constructor(timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.GET_FEEDBACK_DATA;
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res);
        this.chartData = res;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/feedback_report/_search`;
    }

    getHeaders() {
        return {
            headers: {
            }
        }
    }

    getPayload() {
        return this.chartData;
    }
}