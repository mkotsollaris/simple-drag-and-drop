import React, { useContext } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import SimpleDragAndDrop from "./SimpleDragAndDrop";
import { connect } from "react-redux";
import { getFields } from "./actions";
import styled from "@emotion/styled";
import { FieldsProvider, FieldsContext } from "./Context";
import { Button } from "reactstrap";
import discordSvg from "./trulioo_logo.png";

//let logo = require('./trulioo_logo.png')

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
    let StyledContainer = styled.div`
      display: grid;
      text-align: center;
      padding: 3rem;
    `;

    let HeaderContainer = styled.div`
      display: grid;
      grid-template-columns: 50% 50%;
    `;

    return (
      <div>
        <StyledContainer>
          <h2>🚀 Trulioo Marketplace 🚀</h2>
          <SimpleDragAndDrop fields={fields} />
          <Button color="info" className="btn btn-primary">
            Proceed to checkout
          </Button>
        </StyledContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fields: state.fields
  };
};
export default connect(
  mapStateToProps,
  { getFields }
)(App);
