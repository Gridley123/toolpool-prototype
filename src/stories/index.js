import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Geocoder from '../CreateItemForm/Geocoder';
import CreateItemForm from '../CreateItemForm';
import 'semantic-ui-css/semantic.min.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Gecoder', module)
  .add('Start', () => <Geocoder setLocation = {(location) => console.log(location)}/>);

storiesOf('Create Item Form', module)
  .add('Start', () => <CreateItemForm/>);

