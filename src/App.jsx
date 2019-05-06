import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import SimpleDragAndDrop from "./SimpleDragAndDrop";
import { connect } from "react-redux";
import {getFields} from './actions'

export class App extends React.Component {

  componentDidMount() {
    console.log('he',this.props);
    this.props.dispatch(
      getFields()
    );
  }

  render() {
    return (
      <div>
        <h2>Trulioo Simple Drag and Drop 🚀</h2>
        <SimpleDragAndDrop />
      </div>
    );
  }
}

// TODO
export default connect(state => ({}))(App);
