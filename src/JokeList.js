import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../src/css/JokeList.css';
import smiley from '../src/images/smiley.png';

export default class JokeList extends Component {
	static defaultProps = {
		numJokes: 10,
	};
	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(localStorage.getItem('jokes') || '[]'),
			loading: false,
		};
		this.seenJokes = new Set(this.state.jokes.map((j) => j.joke));
		this.generateJokes = this.generateJokes.bind(this);
		this.handleVote = this.handleVote.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleVote(id, delta) {
		this.setState(
			(st) => ({
				jokes: st.jokes.map((j) =>
					j.id === id ? { ...j, votes: j.votes + delta } : j
				),
			}),
			() => localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}

	async generateJokes() {
		try {
			let tempJokes = [];

			while (tempJokes.length < this.props.numJokes) {
				let res = await axios.get('https://icanhazdadjoke.com/', {
					headers: {
						Accept: 'application/json',
					},
				});
				if (!this.seenJokes.has(res.data.joke)) {
					tempJokes.push({
						id: uuidv4(),
						joke: res.data.joke,
						votes: 0,
					});
				} else console.log('Found duplicate');
			}
			this.setState((st) => ({
				loading: false,
				jokes: [...st.jokes, ...tempJokes],
			}));
			localStorage.setItem('jokes', JSON.stringify(tempJokes));
		} catch (e) {
			alert(e);
			this.setState({ loading: false });
		}
	}

	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.generateJokes();
		}
	}

	handleClick() {
		this.setState({ loading: true }, this.generateJokes);
	}

	render() {
		if (this.state.loading) {
			return (
				<div className='JokeList-spinner'>
					<i className='far fa-8x fa-laugh fa-spin'></i>
					<h1 className='JokeList-title'>Loading...</h1>
				</div>
			);
		}
		let sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
		let jokeComponent = sortedJokes.map((j) => {
			return (
				<Joke
					key={j.id}
					joke={j.joke}
					votes={j.votes}
					upvote={() => this.handleVote(j.id, 1)}
					downvote={() => this.handleVote(j.id, -1)}
				/>
			);
		});
		return (
			<section className='JokeList'>
				<div className='JokeList-sidebar'>
					<h1 className='JokeList-title'>Dad Jokes</h1>
					<div className='JokeList-emoji'>
						<img className='Jokelist-img' src={smiley} alt='emoji' />
					</div>
					<button className='Jokelist-btn' onClick={this.handleClick}>
						Get new Jokes
					</button>
				</div>
				<div className='JokeList-list'>{jokeComponent}</div>
			</section>
		);
	}
}
