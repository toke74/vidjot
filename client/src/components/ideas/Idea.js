import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteIdea, getUserIdeas } from "../../actions/ideaAcions";
import Moment from "react-moment";

export class Idea extends Component {
  componentDidMount() {
    this.props.getUserIdeas();
  }
  componentWillReceiveProps(nextProps) {
    this.props.getUserIdeas();
  }

  onDeleteClick = id => {
    console.log(id);

    this.props.deleteIdea(id, this.props.history);
  };
  render() {
    const ideaContent = this.props.ideas ? (
      this.props.ideas.map(idea => (
        <div key={idea._id} className="card card-body mb-3">
          <h4>{idea.title}</h4>
          <p>{idea.details}</p>
          <p>
            created Date: <Moment format="DD/MM/YYYY">{idea.date}</Moment>
          </p>
          <Link
            className="btn btn-dark btn-block mb-2"
            to={`/ideas/edit/${idea._id}`}
          >
            Edit
          </Link>
          <button
            // onClick={this.onDeleteClick.bind(this, idea._id)}
            onClick={() => this.onDeleteClick(idea._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      ))
    ) : (
      <div>
        <p>no Idea found</p>
      </div>
    );
    return <div>{ideaContent}</div>;
  }
}
Idea.propTypes = {
  deleteIdea: PropTypes.func.isRequired,
  getUserIdeas: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteIdea, getUserIdeas }
)(withRouter(Idea));
