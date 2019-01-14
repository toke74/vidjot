import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserIdeas } from "../../actions/ideaAcions";
import Spinner from "../../helper/Spinner";
import Idea from "./Idea";

export class Ideas extends Component {
  componentDidMount() {
    this.props.getUserIdeas();
  }

  render() {
    const { ideas, loading } = this.props.ideas;
    const { user } = this.props.auth;

    let IdeasContent;

    if (ideas === null || loading) {
      IdeasContent = <Spinner />;
    } else {
      // Check if logged in user has ideas data
      if (Object.keys(ideas).length > 0) {
        // if (ideas.ideas.length > 0) {
        const ideaArray = this.props.ideas.ideas.ideas;
        // console.log(ideaArray.map(i => i));

        //  const content ideas.
        IdeasContent = (
          <div>
            <p className="lead display-4 text-muted">
              Welcome <Link to={`/`}>{user.name}</Link>
            </p>
            <Idea ideas={ideaArray} />
          </div>
        );
      } else {
        // User is logged in but has no idea
        IdeasContent = (
          <div>
            <p className="lead display-4 text-muted">
              Welcome <Link to={`/`}>{user.name}</Link>
            </p>
            <p>
              You have not yet added Video idea, please add ideas for future
              Youtube videos{" "}
            </p>
            <Link to="/ideas/add" className="btn btn-lg btn-info">
              Add Video Idea
            </Link>
          </div>
        );
      }
    }

    return <div className="container">{IdeasContent}</div>;
  }
}

Ideas.propTypes = {
  getUserIdeas: PropTypes.func.isRequired
  //   ideas: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  ideas: state.ideas,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserIdeas }
)(Ideas);
