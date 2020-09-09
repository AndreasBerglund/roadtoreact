import React, { Component } from 'react';

 class InputWithLabelClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            changeMe : 'Touch me',
            changeYou : 'Say that you love me'
        }

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.isFocused && this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }

    render() {

        const inputRef = this.inputRef;
        const { changeMe, changeYou } = this.state;

        const {
            id,
            value,
            type = 'text',
            onInputChange,
            children
        } = this.props;

        return (
            <>
                <label htmlFor={id}>{children}</label>
                <input
                    ref={inputRef}
                    onChange={onInputChange}
                    id={id}
                    type={type}
                    // autoFocus={isFocused}
                    value={value}
                />

                <button type="button" onClick={ () => this.setState({
                    changeMe:  changeYou,
                    changeYou: changeMe
                })}>{ changeMe }</button> 
                    
            </>
        )

    }

}

export default InputWithLabelClass