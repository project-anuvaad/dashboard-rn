import React, { Component } from 'react'
import { View, Dimensions, } from 'react-native'
import Spinner from '../../common/components/loadingIndicator';
import FilterComponent from '../components/FilterComponent'
import HeaderComponent from '../../common/components/HeaderComponent'
import APITransport from '../../../flux/actions/transport/apiTransport'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetChartDataCountAction } from '../../../flux/actions/apis/getChartDataCountAction'
import { GetChartDataAction } from '../../../flux/actions/apis/getChartDataAction'
// import Content from '../../../data'
import _ from 'lodash'
const { height, width } = Dimensions.get('window')

class FilterContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doc_courts: [],
            xValueFormatter: [],
            getDocCountPerCourt: [],
            getUsersCountPerCourt: [],
            getSentenceCount: [],
            getwordCount: [],
            getTargetlanguages: [],
            getLanguagesByCourt: [],
            isLoading: false
        }
    }

    componentDidMount() {
        let apiObj = new GetChartDataCountAction();
        this.setState({
            isLoading: true
        }, () => {
            this.props.APITransport(apiObj);
        })
        // let data = Content.hits
        // let sourceArray = data.hits


    }
    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            const { getChartDataCount, getChartData, apiStatus } = this.props
            if (getChartDataCount && prevProps.getChartDataCount != getChartDataCount && !apiStatus.error) {
                this.setState({ isLoading: true })
                let apiObj = new GetChartDataAction(getChartDataCount);
                this.props.APITransport(apiObj);
            }
            if (getChartData && prevProps.getChartData != getChartData && !apiStatus.error) {
                this.setState({ isLoading: false })
            }
            if (apiStatus && prevProps.apiStatus != apiStatus && apiStatus.error) {
                this.setState({ isLoading: false })
                alert('apiStatus  ' + apiStatus.message)
            }
        }
    }
    

    handleFilterClicked(range, startDate, endDate) {
        this.props.navigation.navigate('chartScreen', { selectedRange: range, startDate, endDate })
    }

    
    render() {
        const { isLoading } = this.state
        return (
            <View>
                <HeaderComponent title='Filter Dashboard' />
                <FilterComponent
                    filterClickedHandler={this.handleFilterClicked.bind(this)}
                    {...this.props}
                />
                {isLoading && <Spinner animating={isLoading} />}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apiStatus: state.apiStatus,
        getChartData: state.getChartData,
        getChartDataCount: state.getChartDataCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default (connect(mapStateToProps, mapDispatchToProps)(FilterContainer));
