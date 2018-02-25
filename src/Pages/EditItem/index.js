import React, {Component} from 'react';
import {Button, Card, Container, Form, Icon, Input, Label, List, Message} from 'semantic-ui-react';
import shortid from 'shortid';
import {isDecimal, isLength} from 'validator';
import Geocoder from '../CreateItem/Geocoder';
import ConfirmedGeocoder from '../CreateItem/ConfirmedGeocoder';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import {fragments} from '../Item/index';
import { LIST_ITEMS_QUERY } from '../ListItems';
import { ITEM_QUERY } from '../Item';
import lodash from 'lodash';

const Filter = require('bad-words'), filter = new Filter();
filter.removeWords('hell');
filter.removeWords('hello');


class EditItemForm extends Component {
  constructor(props, context) {
    console.log(props.match);
    super(props, context);
    this.state = {
      fieldStates: {
        name: '',
        status: '',
        description: '',
        tagText: '',
        tags: [],
        currency: '',
        pricePerDay: 0,
        pricePerHire: 0,
        deposit: 0,
        geolocation: {},
      },
      formSubmitAttempted: false,
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
    this.updateStateFields=this.updateStateFields.bind(this);

  }

  // noinspection JSUnusedLocalSymbols
  componentWillReceiveProps({ data }){
    if(data.getItem != this.props.data.getItem) {
      this.updateStateFields(data);
    }
  }

  componentDidMount(){
    console.log(this.props.data);
    if(this.props.data.loading === false) {
      const data = this.props.data;
      this.updateStateFields(data);
    }
  }

  updateStateFields(data){
    const { name, status, description, tags, pricePerHire, pricePerDay, deposit, geolocation } = data.getItem;
    this.setState((prevState) => {
      const newFieldstates = {
        name,
        description,
        status,
        tags: tags.map((tag) => {
          return {
            text: tag.name,
            id: tag.id
          }
        }),
        currency: pricePerHire.currency,
        pricePerHire: pricePerHire.amount,
        pricePerDay: pricePerDay.amount,
        deposit: deposit.amount,
        geolocation,
        inputtedLocation: `${geolocation.lat}, ${geolocation.lng}`
      };
      const fieldStates = lodash.merge(prevState.fieldStates, newFieldstates);
      return {
        fieldStates,
      }
    })
  }

  handleChange(event, { value, name }) {
    const fieldStates = { ...this.state.fieldStates };
    fieldStates[name] = value;
    this.setState({
      fieldStates
    }, () => {
        this.validateForm();
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
    this.setState({ tagErrorMessages: [] });
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
    const { status, description, currency, name, pricePerDay, pricePerHire, deposit } = this.state.fieldStates;
    const nameOK = isLength(name, { min: 3, max: 50 });
    if (!nameOK) {
      this.addError(`name`, `The name '${name}' is shorter than 3 characters or longer than 50 characters`)
    }
    if (filter.isProfane(name)) {
      this.addError(`name`, `This name contains inappropriate or offensive terms`)
    }
    if (filter.isProfane(description)) {
      this.addError(`description`, `This description contains inappropriate or offensive terms`)
    }

    const currOK = currency && (currency === 'GBP' || currency === 'USD' || currency ==='EUR');
    if (!currOK) {
      this.addError('currency', `Please enter a valid currency`);
    }

    const PPHOK = (pricePerHire!=null) && isDecimal(pricePerHire + '', { decimal_digits: '0,2', locale: 'en-GB' });
    if (!PPHOK) {
      this.addError('pricePerHire', `Price Per Hour should be a valid monetary amount`)
    }

    const PPDOK = (pricePerDay!=null) && isDecimal(pricePerDay + '', { decimal_digits: '0,2', locale: 'en-GB' });
    if (!PPDOK) {
      this.addError('pricePerDay', `Price Per Day should be a valid monetary amount`)
    }

    const depositOK = (deposit!=null) && isDecimal(deposit + '', { decimal_digits: '0,2', locale: 'en-GB' });
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
      const newState = { ...prevState };
      newState.fieldStates.geolocation = newGeolocation;
      newState.fieldStates.inputtedLocation = inputtedLocation;
      return newState;
    })
  }

  resetLocation() {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.fieldStates.geolocation = {};
      newState.fieldStates.inputtedLocation = '';
      return newState;
    })
  }

  createSubmissionItem() {
    const { name, status, description, tags, pricePerDay, pricePerHire, deposit, currency, geolocation } = this.state.fieldStates;
    return {
      name,
      description: description.length>0 ? description : null,
      status,
      currency,
      tags: tags.length>0 ? tags.map(tag => tag.text) : null,
      pricePerDay,
      pricePerHire,
      deposit,
      lat: geolocation.lat!=null ? geolocation.lat : null,
      lng: geolocation.lng!=null ? geolocation.lng : null,
    }
  }

  handleSubmit() {
    this.validateForm();
    this.setState({
      formSubmitAttempted: true,
    });
    setTimeout(() => {
      console.log(this.props);
      if (!this.state.formErrorFields.length > 0){
        this.props.mutate({
          variables: {
            id: this.props.match.params.id,
            item: this.createSubmissionItem(),
          }
        }).then(({ data }) => {
          console.log('got data', data);
        }).catch((error) => {
          console.log('there was an error sending the query', error);
        });
        alert('Form Submitted Successfully');
      }
    }, 20);

  }

  render() {
    const itemData = this.props.data.getItem;
    console.log(itemData);

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
              Edit This Item
            </Card.Header>
            <div>
              <Message attached negative hidden={this.state.formErrorMessages.length === 0}
                       header='There were some errors in your submission'
                       list={this.state.formErrorMessages}/>
              <Form>
                <Form.Field>
                  <label>Item Status</label>
                  <Form.Select error={this.state.formErrorFields.includes('status')}
                               placeholder={itemData && itemData.status} name="status"
                               onChange={this.handleChange}
                               value={this.state.fieldStates.status}
                               options={statusOptions}/>
                </Form.Field>
                <Form.Input name="name" error={this.state.formErrorFields.includes('name')}
                            placeholder={itemData && itemData.name}
                            value={this.state.fieldStates.name} onChange={this.handleChange}
                            label='Item Name' type='text'/>
                <Form.TextArea name={"description"} value={this.state.fieldStates.description}
                               onChange={this.handleChange} label='Item Description'/>
                <div>
                  <Form.Field error={this.state.tagErrorMessages.length > 0} inline>
                    <label>Tags </label>
                    <Input name="tagText" value={this.state.fieldStates.tagText}
                           onChange={this.handleChange}
                           type='text' action={<Button content={'Add Tag'}
                                                       onClick={this.handleTagTextSubmit}/>}/>
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

                <Form.Select placeholder={itemData ? itemData.pricePerDay.currency : "Select the currency for your transactions..."}
                             error={this.state.formErrorFields.includes('currency')}
                             name="currency"
                             onChange={this.handleChange}
                             value={this.state.fieldStates.currency}
                             options={currencyOptions}/>
                <Form.Input error={this.state.formErrorFields.includes('pricePerHire')}
                            placeholder={itemData ? itemData.pricePerHire.amount : null}
                            icon={currencyIcon} iconPosition={"left"} name="pricePerHire"
                            value={this.state.fieldStates.pricePerHire}
                            onChange={this.handleChange}
                            label='Price Per Hire' type='number'/>
                <Form.Input icon={currencyIcon} iconPosition={"left"}
                            placeholder={itemData ? itemData.pricePerDay : null}
                            error={this.state.formErrorFields.includes('pricePerDay')}
                            name="pricePerDay" value={this.state.fieldStates.pricePerDay}
                            onChange={this.handleChange}
                            label='Price Per Day' type='number'/>
                <Form.Input icon={currencyIcon} iconPosition={"left"}
                            placeholder={itemData ? itemData.deposit.amount : null}
                            error={this.state.formErrorFields.includes('deposit')} name="deposit"
                            value={this.state.fieldStates.deposit}
                            onChange={this.handleChange}
                            label='Deposit for Item' type='number'/>
                {this.state.fieldStates.geolocation.lat !== undefined ?
                  <ConfirmedGeocoder resetLocation={this.resetLocation}
                                     location={this.state.fieldStates.inputtedLocation}/> :
                  <Geocoder setLocation={this.setLocation}/>}
                <Form.Button positive content={'Submit Item'} onClick={this.handleSubmit}/>
              </Form>
            </div>
          </Card.Content>
        </Card>
      </Container>
    );

  }
}

const EDIT_ITEM_MUTATION = gql`
    mutation editItem($id:ID! $item: ItemInput!) {
        editItem(id: $id, item: $item) {
            ...ItemPageItem
        }
    }
    ${fragments.item}
    ${fragments.price}
    ${fragments.geolocation}
`;


const EditItemFormMutationEnhancer = graphql(EDIT_ITEM_MUTATION, {
  options: ({match}) => ({
    refetchQueries: [{
      query: LIST_ITEMS_QUERY,
    }, {
      query: ITEM_QUERY,
      variables: {
        id: match.params.id
      }
    }],
  })
});

const EditItemFormQueryEnhancer = graphql(ITEM_QUERY, {
  options: (({ match }) => ({ variables: { id: match.params.id } }))
});

const EditItemFormWithData = compose(EditItemFormMutationEnhancer, EditItemFormQueryEnhancer)(EditItemForm);



export default EditItemFormWithData;
