import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import { Card, Icon } from 'react-native-elements';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      image_path: '',
      url: `http://127.0.0.1:5000/star_search=${this.props.navigation.getParam(
        'star_name'
      )}`,
    };
  }
  componenetDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        this.setState(response.data.data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  render() {
    const { details, image_path } = this.state;
    if (details.specifications) {
      return (
        <View>
          <Card>
            <View>
              <Text
                style={
                  styles.cardItem
                }>{`Distance from Earth : ${details.distance_from_earth}`}</Text>
              <Text
                style={styles.cardItem}>{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`star Mass : ${details.star_mass}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`star Radius : ${details.star_radius}`}</Text>
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardItem: { marginBottom: 10 },
});
