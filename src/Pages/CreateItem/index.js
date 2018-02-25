import React, {Component} from 'react';
import {Card, Container, Form, Icon, Input, Label, List, Message, Button} from 'semantic-ui-react';
import shortid from 'shortid';
import {isDecimal, isLength} from 'validator';
import Geocoder from './Geocoder';
import ConfirmedGeocoder from './ConfirmedGeocoder';

const Filter = require('bad-words'), filter = new Filter();
filter.removeWords('hell');
filter.removeWords('hello');


class CreateItemForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fieldStates: {
        name: '',
        description: '',
        tagText: '',
        tags: [],
        pricePerDay: 0,
        pricePerHire: 0,
        deposit: 0,
        geolocation: {},
      },
      formSubmittedOnce: false,
      tagErrorMessages: [],
      formErrorMessages: [],
      formErrorFields: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTagTextSubmit = this.handleTagTextSubmit.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTagErrDismiss = this.onTagErrDismiss.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.resetLocation = this.resetLocation.bind(this);

  }

  // noinspection JSUnusedLocalSymbols
  handleChange(event, { value, name }) {
    const fieldStates = { ...this.state.fieldStates };
    fieldStates[name] = value;
    this.setState({
      fieldStates
    }, () => {

      if (this.state.formSubmittedOnce) {
        this.validateForm();

      }
    });

  }

  handleTagTextSubmit(event) {
    event.preventDefault();
    const tagText = this.state.fieldStates.tagText;
    if (!this.validateTag(tagText)) {
      return;
    }
    this.setState((prevState) => {
      const { tagText, tags } = prevState.fieldStates;
      const fieldStates = { ...prevState.fieldStates };
      const newTag = {
        text: tagText,
        id: shortid.generate(),
      };
      const newTags = [...tags, newTag];
      fieldStates.tagText = '';
      fieldStates.tags = newTags;
      return {
        fieldStates
      }
    })
  }

  validateTag(tag) {
    this.setState({tagErrorMessages:[]});
    const pushTagErr = (message) => this.setState((prevState) => {
      if (!prevState.tagErrorMessages.includes(message)) {
        return { tagErrorMessages: [...prevState.tagErrorMessages, message] }
      }
    });
    if (filter.isProfaneLike(tag)) {

      pushTagErr(`This tag contains profane language and can not be submitted`);
      return false;
    }
    else if (!isLength(tag, { min: '2', max: '16' })) {
      pushTagErr(`Tags must be between 2 and 20 characters long`);
      return false;
    } else {
      return true;
    }
  }

  deleteTag(event) {
    const { id } = event.target.parentElement.parentElement;

    this.setState((prevState) => {
      const fieldStates = { ...prevState.fieldStates };
      const { tags } = prevState.fieldStates;
      const newTags = [...tags];
      const pos = newTags.findIndex((tag) => tag.id === id);
      newTags.splice(pos, 1);
      fieldStates.tags = newTags;
      return {
        fieldStates
      }
    })
  }

  addError(field, message) {
    this.setState((prevState) => {
      const { formErrorMessages, formErrorFields } = prevState;
      const newFormErrorMessages = [...formErrorMessages, message];
      const newFormErrorFields = [...formErrorFields, field];
      return {
        formErrorMessages: newFormErrorMessages,
        formErrorFields: newFormErrorFields
      }
    })
  }

  validateForm() {
    this.setState({ formErrorMessages: [], formErrorFields: [] });
    const { status, name, pricePerDay, pricePerHire, deposit } = this.state.fieldStates;
    const nameOK = isLength(name, { min: 3, max: 50 });
    if (!nameOK) {
      this.addError(`name`, `The name '${name}' is shorter than 3 characters or longer than 50 characters`)
    }
    if (filter.isProfane(name)) {
      this.addError(`name`, `This name contains inappropriate or offensive terms`)
    }

    const PPHOK = isDecimal(pricePerHire + '', { decimal_digits: '0,2', locale: 'en-GB' });
    if (!PPHOK) {
      this.addError('pricePerHire', `Price Per Hour should be a valid monetary amount`)
    }

    const PPDOK = isDecimal(pricePerDay + '', { decimal_digits: '0,2', locale: 'en-GB' });
    if (!PPDOK) {
      this.addError('pricePerDay', `Price Per Day should be a valid monetary amount`)
    }

    const depositOK = isDecimal(deposit + '', { decimal_digits: '0,2', locale: 'en-GB' });
    if (!depositOK) {
      this.addError('deposit', `Deposit should be a valid monetary amount`)
    }

    const statusOK = (status === 'DRAFT' || status === 'PUBLISHED' || status === 'DISABLED');
    if (!statusOK) {
      this.addError('status', `You must select an initial status for this item.  This can be changed later by editing the item`)
    }
  }

  onTagErrDismiss() {
    this.setState(({ fieldStates }) => {
      const tagText = '';
      const newFieldStates = { ...fieldStates, tagText };
      return {
        fieldStates: newFieldStates,
        tagErrorMessages: []
      }
    })
  }

  setLocation(newGeolocation, inputtedLocation) {
    this.setState((prevState) => {
      const newState = {...prevState};
      newState.fieldStates.geolocation = newGeolocation;
      newState.fieldStates.inputtedLocation = inputtedLocation;
      return newState;
    })
  }

  resetLocation() {
    this.setState((prevState) => {
      const newState = {...prevState};
      newState.fieldStates.geolocation = {};
      newState.fieldStates.inputtedLocation = '';
      return newState;
    })
  }

  handleSubmit() {
    this.validateForm();
    this.setState({
      formSubmittedOnce: true,
    })
  }

  render() {
    const currencyOptions = [
      { text: 'GBP', value: 'GBP' },
      { text: 'USD', value: 'USD' },
      { text: 'EUR', value: 'EUR' }
    ];

    const statusOptions = [
      { text: 'DRAFT', value: 'DRAFT' },
      { text: 'PUBLISHED', value: 'PUBLISHED' },
      { text: 'DISABLED', value: 'DISABLED' }
    ];

    const tagList = this.state.fieldStates.tags.map((tag) =>
      <List.Item key={tag.id} id={tag.id}>
        <Label tag>
          {tag.text + ' '}
          <Icon onClick={this.deleteTag} name={"close"}/>
        </Label>
      </List.Item>);

    let currencyIcon;
    switch (this.state.fieldStates.currency) {
      case 'GBP':
        currencyIcon = 'pound';
        break;
      case 'USD':
        currencyIcon = 'dollar';
        break;
      case 'EUR':
        currencyIcon = 'euro';
        break;
      default:
        currencyIcon = null;
    }

    return (
      <Container>
        <Card centered fluid raised>
          <Card.Content>
            <Card.Header>
              Add a New Item
            </Card.Header>
            <div>
              <Message attached negative hidden={this.state.formErrorMessages.length === 0}
                       header='There were some errors in your submission'
                       list={this.state.formErrorMessages}/>
              <Form>
                <Form.Field>
                  <label>Item Status</label>
                  <Form.Select error={this.state.formErrorFields.includes('status')}
                               placeholder="Select the item's status..." name="status"
                               onChange={this.handleChange}
                               value={this.state.fieldStates.status}
                               options={statusOptions}/>
                </Form.Field>
                <Form.Input name="name" error={this.state.formErrorFields.includes('name')}
                            value={this.state.fieldStates.name} onChange={this.handleChange}
                            label='Item Name' type='text'/>
                <Form.TextArea name={"description"} value={this.state.fieldStates.description}
                               onChange={this.handleChange} label='Item Description'/>
                <div>
                    <Form.Field error={this.state.tagErrorMessages.length > 0} inline>
                      <label>Tags </label>
                      <Input name="tagText" value={this.state.fieldStates.tagText}
                             onChange={this.handleChange}
                             type='text' action={<Button content={'Add Tag'} onClick={this.handleTagTextSubmit}/>}/>
                    </Form.Field>
                  <Message attached={"bottom"} onDismiss={this.onTagErrDismiss} negative
                           hidden={this.state.tagErrorMessages.length === 0}
                           header={'There was an error regarding this tag'}
                           list={this.state.tagErrorMessages}/>
                </div>

                {this.state.fieldStates.tags.length > 0 &&
                <List horizontal>
                  {tagList};
                </List>
                }

                <Form.Select placeholder="Select the currency for your transactions..."
                             name="currency"
                             onChange={this.handleChange}
                             value={this.state.fieldStates.currency}
                             options={currencyOptions}/>
                <Form.Input error={this.state.formErrorFields.includes('pricePerHire')}
                            icon={currencyIcon} iconPosition={"left"} name="pricePerHire"
                            value={this.state.fieldStates.pricePerHire}
                            onChange={this.handleChange}
                            label='Price Per Hire' type='number'/>
                <Form.Input icon={currencyIcon} iconPosition={"left"}
                            error={this.state.formErrorFields.includes('pricePerDay')}
                            name="pricePerDay" value={this.state.fieldStates.pricePerDay}
                            onChange={this.handleChange}
                            label='Price Per Day' type='number'/>
                <Form.Input icon={currencyIcon} iconPosition={"left"}
                            error={this.state.formErrorFields.includes('deposit')} name="deposit"
                            value={this.state.fieldStates.deposit}
                            onChange={this.handleChange}
                            label='Deposit for Item' type='number'/>
                {this.state.fieldStates.geolocation.lat!==undefined ? <ConfirmedGeocoder resetLocation = {this.resetLocation} location={this.state.fieldStates.inputtedLocation}/> : <Geocoder setLocation = {this.setLocation} /> }
                <Form.Button positive content={'Submit Item'} onClick={this.handleSubmit}/>
              </Form>
            </div>
          </Card.Content>
        </Card>
      </Container>
    );


    // const tagList = () => this.state.fieldStates.tags.map((tag, index) => <li key={index}>{tag}<button style={{marginLeft:"5px"}} id={`tag:${index}`} onClick={this.deleteTag}>X</button>
    // </li>);
    // return (
    //
    //   <div>
    //     <label htmlFor="status">Item Title</label>
    //     <br/>
    //     <select onChange={this.handleChange} value={this.state.status} name="status">
    //       <option value="DRAFT">"Draft"</option>
    //       <option value="PUBLISHED">"Published"</option>
    //       <option value="DISABLED">"Disabled"</option>
    //     </select>
    //     <br/><br/>
    //
    //     <label htmlFor="name">Item Title</label>
    //     <br/>
    //     <input onChange={this.handleChange} type="text" name="name"/>
    //     <br/><br/>
    //
    //     <label htmlFor="description">Item Description</label>
    //     <br/>
    //     <textarea onChange={this.handleChange} name="description"/>
    //     <br/><br/>
    //
    //     <form onSubmit={this.handleTagTextSubmit}>
    //       <label htmlFor="tagText">Tags</label>
    //       <br/>
    //       <input type="text" onChange={this.handleChange} value={this.state.tagText}  name="tagText"/>
    //       <input type="submit" value="Add Tag"/>
    //       <br/><br/>
    //     </form>
    //
    //     <ul style={{ listStyle: "none" }}>
    //       {tagList()}
    //     </ul>
    //
    //     <label htmlFor="currency">Currency</label>
    //     <br/>
    //     <select value={this.state.currency} onChange={this.handleChange} name="currency">
    //       <option value="GBP">"GBP"</option>
    //       <option value="USD">"USD"</option>
    //       <option value="EUR">"EUR"</option>
    //     </select>
    //     <br/><br/>
    //
    //     <label htmlFor="pricePerHireAmount">Price Per Hire</label>
    //     <br/>
    //     <input onChange={this.handleChange} type="number" name="pricePerHireAmount"/>
    //     <br/><br/>
    //
    //     <label htmlFor="pricePerDayAmount">Price Per Day</label>
    //     <br/>
    //     <input onChange={this.handleChange} type="number" name="pricePerDayAmount"/>
    //     <br/><br/>
    //
    //     <label htmlFor="deposit">Deposit for Item</label>
    //     <br/>
    //     <input onChange={this.handleChange} type="number" name="deposit"/>
    //     <br/><br/>
    //
    //     <label htmlFor="location">Item Location (Postcode, Town or City)</label>
    //     <br/>
    //     <input onChange={this.handleChange} type="text" name="location"/>
    //   </div>

    // );
  }
}

CreateItemForm.propTypes = {};
CreateItemForm.defaultProps = {};

export default CreateItemForm;