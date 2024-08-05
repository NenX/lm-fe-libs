import React from 'react';
export default (WrappedComponent) => {
  class WrapperComponent extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WrapperComponent;
};
