import React, { useContext } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import SimpleDragAndDrop from "./SimpleDragAndDrop";
import { connect } from "react-redux";
import { getFields } from "./actions";
import { FieldsProvider, FieldsContext } from "./Context";
//import truliooLogo from '../src/trulioo_logo.png';

export class App extends React.Component {
  componentDidMount() {
    let getFieldsPromise = this.props.getFields();
    const res = getFieldsPromise.then(r => {
      this.setState({
        fields: r
      });
    });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    let { fields } = this.state;

    return (
      <div>
        <h2> 🚀 My Marketplace 🚀</h2>
        <SimpleDragAndDrop fields={fields} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("@mapstate", state);
  return {
    fields: state.fields
  };
};
export default connect(
  mapStateToProps,
  { getFields }
)(App);

//export default connect(state => ({}))(App);
