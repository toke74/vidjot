import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addIdea } from "../../actions/ideaAcions";

import classnames from "classnames";

export class AddIdea extends Component {
  state = {
    title: "",
    details: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userIdea = {
      title: this.state.title,
      details: this.state.details
    };
    // console.log(userIdea);
    this.props.addIdea(userIdea, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="card card-body">
          <h3>Video Idea</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.title
                })}
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="details">Details</label>
              <textarea
                name="details"
                id="details"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.details
                })}
                value={this.state.details}
                onChange={this.onChange}
              />
              {errors.details && (
                <div className="invalid-feedback">{errors.details}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddIdea.propTypes = {
  addIdea: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addIdea }
)(withRouter(AddIdea));
