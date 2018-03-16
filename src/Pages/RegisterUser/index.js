import React, {Component} from 'react';
import {Button, Card, Container, Form, Icon, Input, Label, List, Message} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class RegisterUserForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        username: '',
        realname: '',
        address: '',
        photoUrl: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, { value, name }) {
  
  }

  handleSubmit(event){
      alert('user submitted');
      event.preventDefault();
  }

  render() {
    return (
      <Container>
        <Card centered fluid raised>
          <Card.Content>
            <Card.Header>
              Register new user
            </Card.Header>
            <Form>
                <Form.Input 
                    name="username" 
                    value={this.state.username} 
                    onChange={this.handleChange}
                    label='Username' 
                    type='text'/>
                            
                <Form.Input 
                    name="realname" 
                    value={this.state.realname} 
                    onChange={this.handleChange}
                    label='Real name' 
                    type='text'/>

                <Form.TextArea 
                    name={"address"}
                    value={this.state.address}
                    onChange={this.handleChange} label='Address'/>
                 
                 <Form.Input 
                    name="photoUrl" 
                    value={this.state.realname} 
                    onChange={this.handleChange}
                    label='Photo Url' 
                    type='text'/>
                <Form.Button 
                    positive 
                    content={'Submit Item'} 
                    onClick={this.handleSubmit}/>
            </Form>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default RegisterUserForm;
