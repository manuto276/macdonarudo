import React from 'react';
import './Link.css';

class Link extends React.Component {
    className;
    onClick;
    children;

    constructor(props) {
        super(props);
        this.className = props.className;
        this.onClick = props.onClick;
        this.children = props.children;
    }

    layout = () => this.children;

    render = () => <div className={'Link ' + this.className} onClick={this.onClick}>{this.layout()}</div>
}

class BoxLink extends Link {
    layout = () => <div className='Box'>{this.children}</div>
}

class UnderlineLink extends Link {
    layout = () => <div className='Underline'>{this.children}</div>
}

export { Link, BoxLink, UnderlineLink }