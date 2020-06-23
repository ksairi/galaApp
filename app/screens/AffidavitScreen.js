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
  wrapper: {flex: 1, justifyContent: "center", alignItems: "center"},
  questionItem: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  questionText: {
    fontFamily: "lato-regular",
    fontSize: 18,
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
                <Switch
                  style={{alignSelf: "flex-end"}}
                  value={!!responses.find((item) => item.index === index)}
                  ios_backgroundColor="grey"
                  trackColor="green"
                  onValueChange={(value) => {
                    onValueChange(value, index);
                  }}
                />
              </View>
            ))
          )}
        </View>
        {questions.length === responses.length && (
          <Button
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
