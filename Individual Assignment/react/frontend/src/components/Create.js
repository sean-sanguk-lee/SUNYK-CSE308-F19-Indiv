import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: '',
            address: '',
            city: '',
            phone: '',
            email: '',
            contactType: ''
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);

    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, address, city, phone, email, contactType } = this.state;

        axios.post('/contacts', { name, address, city, phone, email, contactType })
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render()
    {
        const { name, address, city, phone, email, contactType } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ADD CONTACT
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Contacts List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <input type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="Address" />
                            </div>
                            <div class="form-group">
                                <label for="city">City:</label>
                                <input type="text" class="form-control" name="city" value={city} onChange={this.onChange} placeholder="City" />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone:</label>
                                <input type="text" class="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="Phone Number" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email Address" />
                            </div>
                            <div class="form-group">
                                <label for="contactType">Contact Type:</label>
                                <form>
                                <div class="form-group">
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" class="form-check-input" name="contactType" value="Personal" checked={this.state.contactType === "Personal"} onChange={this.onChange} /> Personal
                                    </label>
                                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" class="form-check-input" name="contactType" value="Work" checked={this.state.contactType === "Work"} onChange={this.onChange} /> Work
                                    </label>
                                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" class="form-check-input" name="contactType" value="School" checked={this.state.contactType === "School"} onChange={this.onChange} /> School
                                    </label>
                                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" class="form-check-input" name="contactType" value="Other" checked={this.state.contactType === "Other"} onChange={this.onChange} /> Other
                                    </label>
                                </div>
                                </form>
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;