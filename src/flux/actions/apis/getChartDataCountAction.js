/**
 * Chart Data Count API
 */
import API from '../apis/api';
import C from '../constants';

export class GetChartDataCountAction extends API {
    constructor(dateObj, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.GET_CHART_DATA_COUNT;
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
        return `${super.apiEndPoint()}/doc_report/_search?pretty=true`;
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
        };
    }

    getPayload() {
        return this.chartData;
    }
}