import React, { Component } from 'react';
import axios from 'axios';

export class Trips extends Component
{
    constructor(props) {
        super(props);

        this.onTripUpdate = this.onTripUpdate.bind(this);
        this.onTripDelete = this.onTripDelete.bind(this);

        this.state = {
            trips: [],
            loading: true,
            failed: false,
            error: ''
        }
    }

    // Send a request to get all the Trips once the UI has been loaded
    componentDidMount(){
        this.populateTripsData();
    }

    onTripUpdate(id) {
        const { history } = this.props;
        history.push('/update/'+id);
    }

    onTripDelete(id) {
        const { history } = this.props;
        history.push('/delete/'+id);
    }

    populateTripsData(){
        // Get data and change the state of Trips to that result
        axios.get("api/Trips/GetTrips").then(result => {
            const response = result.data;
            this.setState({trips : response, loading: false, failed: false, error: ''});
        }).catch(error => {
            this.setState({trips : [], loading: false, failed: true, error: 'Trips could not be loaded'});
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
                                <td>{new Date(trip.dateStarted).toISOString().slice(0, 10)}</td>
                                <td>{trip.dateCompleted ? new Date(trip.dateCompleted).toISOString().slice(0, 10) : '-'}</td>
                                <td>
                                    <div className="form-group">
                                        <button onClick={() => this.onTripUpdate(trip.id)} className="btn btn-success">Update</button>
                                        <button onClick={() => this.onTripDelete(trip.id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
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
        ) : ( this.state.failed ? (
            <div className="text-danger">
                <em>{this.state.error}</em>
            </div>
        ) : (
            this.renderAllTripsTable(this.state.trips))
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