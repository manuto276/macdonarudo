import React from "react";

export class Icon extends React.Component {
    size;
    color;

    constructor (props) {
        super(props);
        this.size = props.size;
        this.color = props.color;
    }
    
    path = () => null;

    viewBox = () => '0 0 48 48';

    render = () => <svg style={{fill: this.color}} width={this.size} height={this.size} viewBox={this.viewBox()}>{this.path()}</svg>;
}

export class AccountCircle extends Icon {
    path = () => <path d="M11.1 35.25Q14.25 33.05 17.35 31.875Q20.45 30.7 24 30.7Q27.55 30.7 30.675 31.875Q33.8 33.05 36.95 35.25Q39.15 32.55 40.075 29.8Q41 27.05 41 24Q41 16.75 36.125 11.875Q31.25 7 24 7Q16.75 7 11.875 11.875Q7 16.75 7 24Q7 27.05 7.95 29.8Q8.9 32.55 11.1 35.25ZM24 25.5Q21.1 25.5 19.125 23.525Q17.15 21.55 17.15 18.65Q17.15 15.75 19.125 13.775Q21.1 11.8 24 11.8Q26.9 11.8 28.875 13.775Q30.85 15.75 30.85 18.65Q30.85 21.55 28.875 23.525Q26.9 25.5 24 25.5ZM24 44Q19.9 44 16.25 42.425Q12.6 40.85 9.875 38.125Q7.15 35.4 5.575 31.75Q4 28.1 4 24Q4 19.85 5.575 16.225Q7.15 12.6 9.875 9.875Q12.6 7.15 16.25 5.575Q19.9 4 24 4Q28.15 4 31.775 5.575Q35.4 7.15 38.125 9.875Q40.85 12.6 42.425 16.225Q44 19.85 44 24Q44 28.1 42.425 31.75Q40.85 35.4 38.125 38.125Q35.4 40.85 31.775 42.425Q28.15 44 24 44ZM24 41Q26.75 41 29.375 40.2Q32 39.4 34.55 37.4Q32 35.6 29.35 34.65Q26.7 33.7 24 33.7Q21.3 33.7 18.65 34.65Q16 35.6 13.45 37.4Q16 39.4 18.625 40.2Q21.25 41 24 41ZM24 22.5Q25.7 22.5 26.775 21.425Q27.85 20.35 27.85 18.65Q27.85 16.95 26.775 15.875Q25.7 14.8 24 14.8Q22.3 14.8 21.225 15.875Q20.15 16.95 20.15 18.65Q20.15 20.35 21.225 21.425Q22.3 22.5 24 22.5ZM24 18.65Q24 18.65 24 18.65Q24 18.65 24 18.65Q24 18.65 24 18.65Q24 18.65 24 18.65Q24 18.65 24 18.65Q24 18.65 24 18.65Q24 18.65 24 18.65Q24 18.65 24 18.65ZM24 37.35Q24 37.35 24 37.35Q24 37.35 24 37.35Q24 37.35 24 37.35Q24 37.35 24 37.35Q24 37.35 24 37.35Q24 37.35 24 37.35Q24 37.35 24 37.35Q24 37.35 24 37.35Z"/>;
}

export class Search extends Icon {
    path = () => <path d="M39.8 41.95 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L42 39.75ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55Z"/>;
}

export class ShoppingCart extends Icon {
    path = () => <path d="M14.35 43.95Q12.85 43.95 11.8 42.9Q10.75 41.85 10.75 40.35Q10.75 38.85 11.8 37.8Q12.85 36.75 14.35 36.75Q15.8 36.75 16.875 37.8Q17.95 38.85 17.95 40.35Q17.95 41.85 16.9 42.9Q15.85 43.95 14.35 43.95ZM34.35 43.95Q32.85 43.95 31.8 42.9Q30.75 41.85 30.75 40.35Q30.75 38.85 31.8 37.8Q32.85 36.75 34.35 36.75Q35.8 36.75 36.875 37.8Q37.95 38.85 37.95 40.35Q37.95 41.85 36.9 42.9Q35.85 43.95 34.35 43.95ZM11.75 10.95 17.25 22.35H31.65Q31.65 22.35 31.65 22.35Q31.65 22.35 31.65 22.35L37.9 10.95Q37.9 10.95 37.9 10.95Q37.9 10.95 37.9 10.95ZM10.25 7.95H39.7Q41.3 7.95 41.725 8.925Q42.15 9.9 41.45 11.1L34.7 23.25Q34.2 24.1 33.3 24.725Q32.4 25.35 31.35 25.35H16.2L13.4 30.55Q13.4 30.55 13.4 30.55Q13.4 30.55 13.4 30.55H37.95V33.55H13.85Q11.75 33.55 10.825 32.15Q9.9 30.75 10.85 29L14.05 23.1L6.45 7H2.55V4H8.4ZM17.25 22.35H31.65Q31.65 22.35 31.65 22.35Q31.65 22.35 31.65 22.35Z"/>;
}