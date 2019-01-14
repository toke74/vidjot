import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getUserIdeas } from "../../actions/ideaAcions";
import { editIdea } from "../../actions/ideaAcions";

export class EditIdea extends Component {
  state = {
    title: "",
    details: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getUserIdeas();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.ideas.ideas) {
      // if(nextProps.ideas.ideas)
      const idea = this.props.ideas.ideas.ideas;
      idea.map(idea => {
        if (idea._id === this.props.match.params.id) {
          // Set component fields state
          this.setState({
            title: idea.title,
            details: idea.details
          });
        }
        return 0;
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    console.log(id);
    const userIdea = {
      title: this.state.title,
      details: this.state.details
    };
    console.log(userIdea + " " + id);
    this.props.editIdea(userIdea, id, this.props.history);
  };

  render() {
    return (
      <div className="container card card-body">
        <div className="mb-3 mr-3">
          <Link to="/ideas" className="btn  btn-light">
            Go Back
          </Link>
        </div>
        <div className=" ">
          <h3>Edit Video Idea</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="details">Details</label>
              <textarea
                className="form-control"
                name="details"
                value={this.state.details}
                onChange={this.onChange}
              >
                text
              </textarea>
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
EditIdea.propTypes = {
  getUserIdeas: PropTypes.func.isRequired,
  editIdea: PropTypes.func.isRequired,
  ideas: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ideas: state.ideas,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getUserIdeas,
    editIdea
  }
)(withRouter(EditIdea));
