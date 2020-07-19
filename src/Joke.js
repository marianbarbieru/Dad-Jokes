import React, { Component } from 'react';
import './css/Joke.css';

export default class Joke extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
		};
		this.getColor = this.getColor.bind(this);
		// this.decreaseScore = this.decreaseScore.bind(this);
	}

	getColor() {
		let votes = this.props.votes;
		if (votes > 15) {
			return '#4caf50';
		} else if (votes > 10) {
			return '#8bbc34a';
		} else if (votes > 7) {
			return '#cddc39';
		} else if (votes > 5) {
			return '#ffeb3b';
		} else if (votes > 2) {
			return '#ffc107';
		} else if (votes > 0) {
			return '#ff9800';
		} else {
			return '#f44336';
		}
	}

	getEmoji() {
		let votes = this.props.votes;
		if (votes > 9) {
			return 'em em-rolling_on_the_floor_laughing';
		} else if (votes > 6) {
			return 'em em-laughing';
		} else if (votes > 3) {
			return 'em em-smiley';
		} else if (votes > 1) {
			return 'em em-slightly_smiling_face';
		} else if (votes > 0) {
			return 'em em-confused';
		} else if (votes > -1) {
			return 'em em-neutral_face';
		} else {
			return 'em em-angry';
		}
	}

	render() {
		return (
			<div className='Joke'>
				<div className='Joke-btns'>
					<div className='Joke-btn' onClick={this.props.upvote}>
						<i className='far fa-thumbs-up'></i>
					</div>
					<div className='Joke-score' style={{ borderColor: this.getColor() }}>
						{' '}
						{this.props.votes}
					</div>
					<div className='Joke-btn' onClick={this.props.downvote}>
						<i className='far fa-thumbs-down'></i>
					</div>
				</div>
				<div className='Joke-text'>{this.props.joke}</div>
				<div className='Joke-emoji'>
					<i className={this.getEmoji()}></i>
				</div>
			</div>
		);
	}
}
