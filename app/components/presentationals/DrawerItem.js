import React from "react";
import {TouchableOpacity, Text, Platform} from "react-native";
import Icon from "helpers/ImageHelper";

const styles = {
  drawerItem: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 3,
  },
  activeItem: {
    backgroundColor: "#12194d",
  },
  drawerItemIcon: {
    color: "white",
    width: 60,
  },
  drawerItemLabel: {
    flex: 2.5,
    color: "white",
    fontSize: 20,
    fontFamily: "brother-1816-bold",
  },
};

export default class DrawerItem extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.drawerItem,
          this.props.active ? styles.activeItem : null,
        ]}
        onPress={this.props.onPress}
      >
        {this.props.IconComponent ? (
          <this.props.IconComponent
            name={this.props.icon}
            style={[
              styles.drawerItemIcon,
              {fontSize: 35},
              this.props.style.icon,
            ]}
          />
        ) : (
          <Icon
            name={this.props.icon}
            style={[
              styles.drawerItemIcon,
              {fontSize: 35},
              this.props.style.icon,
            ]}
          />
        )}
        <Text style={[styles.drawerItemLabel, this.props.style.label]}>
          {this.props.label} {this.props.labelExtraData}
        </Text>
        {Platform.OS !== "web" && (
          <Icon
            name="arrow-navigation-white-right"
            size={17}
            style={[styles.drawerItemIcon, {flex: 0.4}, this.props.style.arrow]}
          />
        )}
      </TouchableOpacity>
    );
  }
}
