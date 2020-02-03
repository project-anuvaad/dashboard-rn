import React from 'react';
import { View, TouchableOpacity, Text,  } from 'react-native';

const QuestionCard = ({
    QuestionLabel,
    Question,
    onClickCard,
    chart,
    rating,
    noCount,
    yesCount
}) => {
    const sum = noCount+yesCount
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={{ height: '100%', justifyContent: 'center'}}
                onPress={onClickCard}
                activeOpacity={1}
            >   
                <View style={styles.questionContainer}>
                    <Text style={styles.titleLabelTextStyle}>{'Question:'}</Text>
                    <Text style={styles.titleTextStyle}>{Question}</Text>
                </View>
                {chart ? 
                <View style={styles.questionContainer}>
                    <Text style={styles.titleLabelTextStyle}>{'Average Rating: '}</Text>
                    <Text style={styles.titleTextStyle}>{rating}</Text>
                </View> :
                <View style={styles.questionContainer}>
                    <Text style={styles.titleLabelTextStyle}>{'No:'}</Text>
                    <Text style={styles.titleTextStyle}>{((noCount/sum)*100).toFixed(2)+'%'}</Text>
                    <Text style={[styles.titleLabelTextStyle, {paddingLeft: '6%'}]}>{'Yes:'}</Text>
                    <Text style={styles.titleTextStyle}>{((yesCount/sum)*100).toFixed(2)+'%'}</Text>
                </View>
            }
            </TouchableOpacity>
        </View>
    )
}

const styles = { 
    container: {
        height: 120,
        width: '100%',
        elevation: 8,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#409DD6'
    },
    questionContainer: {
        flexDirection: 'row', 
        paddingTop: '2%'
    },
    titleLabelTextStyle: {
        fontWeight: 'bold', 
        fontSize: 16, 
        color: '#e6ebf2', 
        paddingRight: '2%'
    },
    titleTextStyle: {
        fontWeight: 'bold', 
        fontSize: 16 ,
        color: '#e6ebf2'
    }

}

export default QuestionCard;