import React, { Component } from 'react';

import moment from 'moment'

export default class Calendr extends Component {

    render() {
        console.log(moment().format('LLL'))
        return (
            <div>
                date
            </div>
        )
    }
}
//export default Calendr;


