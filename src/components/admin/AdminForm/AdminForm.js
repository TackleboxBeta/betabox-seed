import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import _ from 'lodash';

export default class AdminForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  @autobind
  handleSubmit(inputs, seEvent, event) {
    event.preventDefault();
    event.stopPropagation();
    event.preventBubble();
    this.props.onSubmit(_.reduce(inputs, (acc, input, key) => {
      acc[key] = _.get(input, 'value');
      return acc;
    }, {}));
  }

  render() {
    const { fields, data } = this.props;
    const fieldElements = {};

    return (
      <form>
        {_.map(fields, (field) => {
          return (
            <div className="form-group">
              <label>{field.name}</label>
              <input defaultValue={_.get(data, field.key)}
                     ref={(input) => fieldElements[field.key] = input}
                     className="form-control"
                     key={_.get(data, field.key) || field.key} />
            </div>
          );
        })}
        <div className="form-group">
          <button className="btn btn-block btn-primary"
                  onClick={_.partial(this.handleSubmit, fieldElements)}>
            Update
          </button>
        </div>
      </form>
    );
  }
}
