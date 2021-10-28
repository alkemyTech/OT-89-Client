import React, { Component } from "react";
import Swal from "sweetalert2";


export default class AlertError extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick() {
        Swal.fire({
            title: this.props.title,
            footer: this.props.footer,
            type: this.props.type,
            text: this.props.text,
        });
    }

    render() {
        return (
            <div>
                <button class="btn btn-danger" onClick={this.HandleClick}>
                    Alerta
                </button>
            </div>
        );
    }
}