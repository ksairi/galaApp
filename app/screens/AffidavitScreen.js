import React, {useCallback, useState, useEffect} from "react";
import {View, Text, Switch} from "react-native";
import RootWrapper from "components/presentationals/RootWrapper";
import GScrollView from "components/presentationals/GenericScrollView";
import LoadingSpinner from "components/presentationals/LoadingSpinner";
import {Screens} from "config/settings";
import Button from "components/presentationals/GenericButton";
import * as ApiHelper from "helpers/ApiHelper";
import Alert from "components/presentationals/Alert";

const styles = {
  wrapper: {flex: 0.5, justifyContent: "center", alignItems: "center"},
  questionItem: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    width: 350,
    paddingRight: 10,
  },
  questionText: {
    fontFamily: "lato-regular",
    fontSize: 18,
    alignSelf: "flex-start",
    color: "white",
    flex: 1,
  },
  switchLabels: {
    fontFamily: "lato-regular",
    fontSize: 12,
    alignSelf: "flex-start",
    color: "white",
    flex: 1,
  },
};
export default function AffidavitScreen({navigation}) {
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAffidavitQuestions = async () => {
      try {
        setLoading(true);
        const {questions} = await ApiHelper.getAffidavitQuestions();
        setQuestions(questions);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    getAffidavitQuestions();
  }, []);

  const onValueChange = useCallback(
    (value, index) => {
      if (!value) {
        setResponses(responses.filter((item) => item.index !== index));
      } else {
        setResponses((arr) => [...arr, {index, value}]);
      }
    },
    [responses]
  );

  return (
    <GScrollView>
      <RootWrapper>
        <View style={styles.wrapper}>
          {loading ? (
            <LoadingSpinner visible={true} />
          ) : (
            questions.map((question, index) => (
              <View key={index} style={styles.questionItem}>
                <Text style={styles.questionText}>{question}</Text>
                <View>
                  <View style={{flexDirection: "row"}}>
                    <Text style={styles.switchLabels}>Si</Text>
                    <Text> </Text>
                    <Text style={styles.switchLabels}>No</Text>
                  </View>
                  <Switch
                    style={{alignSelf: "flex-end"}}
                    trackColor={{false: "grey", true: "green"}}
                    value={!!responses.find((item) => item.index === index)}
                    ios_backgroundColor="grey"
                    onValueChange={(value) => {
                      onValueChange(value, index);
                    }}
                  />
                </View>
              </View>
            ))
          )}
        </View>
        {questions.length === responses.length && (
          <Button
            containerStyle={{flex: 0.5}}
            text={"Firmar"}
            onPress={() => navigation.navigate(Screens.ClassesToBook)}
          />
        )}
        <Alert
          show={!!error}
          message={error}
          onConfirmPressed={() => {
            setError(null);
          }}
        />
      </RootWrapper>
    </GScrollView>
  );
}
