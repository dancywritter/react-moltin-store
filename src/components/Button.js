import React, { Component } from 'react';
import classNames from 'classnames';
import ReactLoading from 'react-loading';

class Button extends Component {

  render() {
    const { label, active, loading, onClick } = this.props;

  	const btnClass = classNames({
  		btn: true,
  		active: active,
  	});

    return (
      <button className={btnClass} onClick={onClick}>
        {loading ? (
          <div>
            <ReactLoading
              className="loader"
              type="spin"
              width="13"
              height="13"
            />
            <span>Loading</span>
          </div>
        ) : (
          label
        )}
      </button>
    );
  }
}

export default Button
