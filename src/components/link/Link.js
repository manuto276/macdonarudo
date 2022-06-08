import React from 'react';
import './Link.css';

class Link extends React.Component {
    id;
    style;
    className;
    onClick;
    children;
    to;

    constructor(props) {
        super(props);
        this.id = props.id;
        this.style = props.style;
        this.className = props.className;
        this.onClick = props.onClick;
        this.children = props.children;
        this.to = props.to;
    }

    layout = () => this.children;

    render = () => <a href={this.to} id={this.id} style={this.style} className={'Link ' + this.className} onClick={this.onClick}>{this.layout()}</a>
}

class BoxLink extends Link {
    layout = () => <div className='Box'>{this.children}</div>
}

class UnderlineLink extends Link {
    layout = () => <div className='Underline'>{this.children}</div>
}

export { Link, BoxLink, UnderlineLink }