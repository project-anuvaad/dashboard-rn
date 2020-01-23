/**
 * File Upload API
 */
import API from '../apis/api';
import C from '../constants';

export class GetChartDataCountAction extends API {
    constructor(timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.GET_CHART_DATA_COUNT;
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res);
        this.chartData = res.hits.total.value;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/doc_report/_search?pretty=true`;
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