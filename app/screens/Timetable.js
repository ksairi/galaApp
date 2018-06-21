import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Messages } from "/config/settings";
import ClassesTimeTable from "/components/presentationals/Table/ClassesTimeTable";
import { GenericText } from "/components/presentationals/Text/";
import { GenericContainer } from "/components/presentationals/View";
import ContainerStyles from "/components/presentationals/View/styles";
import { LoadingSpinner } from "/components/presentationals/Spinner";

@connect(state => ({ timetable: state.timetable }))
export default class TimeTbale extends React.Component {
	state = {
		timetableData: null,
		hasErrors: false
	};

	render() {
		if (this.state.hasErrors) {
			return (
				<GenericText error={true}>{Messages.SYSTEM_READ_ERROR}</GenericText>
			);
		}
		/*const tableHead = ['Hora', 'Lun', 'Mar', 'Miér', 'Jue', 'Vier', 'Sáb']
        , timeTableArray = this.props.timetable*/
		var toReturn = [],
			serverReponseError = false;

		/*timeTableArray.forEach( (venueTimeTable, venueTimeTableIndex) =>{
      var dataRows = []
      
      venueTimeTable.rows.forEach( venueTimeTableRow => {
        if(venueTimeTableRow.classes.length != 6){
           serverReponseError = true
           return 
        }
        const dataRow = [venueTimeTableRow.time, ...venueTimeTableRow.classes]
        dataRows.push(dataRow)
      })

      if(serverReponseError){
        return
      }
      
      toReturn.push(
        <ClassesTimeTable key={venueTimeTableIndex} venueName={venueTimeTable.venue} 
          tableHead={tableHead} dataRows={dataRows}/>
      )
    })*/

		if (serverReponseError) {
			return (
				<GenericContainer style={ContainerStyles.rootContainer}>
					<GenericContainer style={ContainerStyles.centredContainer}>
						<GenericText error={true}>{Messages.SERVER_ERROR}</GenericText>
					</GenericContainer>
				</GenericContainer>
			);
		}

		toReturn = (
			<ScrollView>
				<GenericContainer style={ContainerStyles.rootContainer}>
					{toReturn}
				</GenericContainer>
			</ScrollView>
		);

		return toReturn;
	}
}
