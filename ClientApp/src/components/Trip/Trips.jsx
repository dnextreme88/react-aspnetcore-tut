import React, { Component } from 'react';
import axios from 'axios';

export class Trips extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            loading: true,
        }
    }

    // Send a request to get all the Trips once the UI has been loaded
    componentDidMount(){
        this.populateTripsData();
    }

    populateTripsData(){
        // Get data and change the state of Trips to that result
        // And to send HTTP requests to our API endpoints (using Axios library)
        // npm install axios --save
        axios.get("api/Trips/GetTrips").then(result => {
            const response = result.data;
            this.setState({trips : response, loading: false});
        });
    }

    renderAllTripsTable(trips) {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date Description</th>
                        <th>Date Started</th>
                        <th>Date Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // map method - to iterate all of the Trips object
                        trips.map(trip => (
                            <tr key={trip.id}>
                                <td>{trip.name}</td>
                                <td>{trip.description}</td>
                                <td>{new Date(trip.dateStarted).toLocaleString()}</td>
                                <td>{trip.dateCompleted ? new Date(trip.dateCompleted).toLocaleString() : '-'}</td>
                                <td> - </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    render() {
        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderAllTripsTable(this.state.trips)
        )

        return (
            <div>
                <h1>All trips</h1>
                <hp>Here you can see all trips</hp>
                {content}
            </div>
        );
    }
}