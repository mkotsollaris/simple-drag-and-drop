import React from "react";
import SimpleDragAndDrop from "./SimpleDragAndDrop";
import { connect } from "react-redux";
import { getFields } from "./actions";
import styled from "@emotion/styled";
import { Button } from "reactstrap";
import dockerSvg from "./map_revised.gif";

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
      background-image: url(${dockerSvg});
    `;

    let HeaderContainer = styled.div`
      display: grid;
      grid-template-columns: 50% 50%;
    `;

    let StyledButton = styled.div`
      width: 40rem;
      align-self: center;
      justify-self: center;
    `;
    
    return (
      <div>
        <StyledContainer>
          <h2>Simple Drag and Drop Container 🚀</h2>
          <SimpleDragAndDrop fields={fields}/>
          <StyledButton>
            <Button style={{width:"40rem"}} color="info" className="btn btn-primary">
              Proceed to checkout
            </Button>
          </StyledButton>
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
