import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DefaultImg from '../assets/default-img.jpg';
import FileBase from 'react-file-base64';

// base api url being used
const API_URL = "http://localhost:9890";

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
            contactType: '',
            profileURL: DefaultImg
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);

    };

    onSubmit = (e) => {
        e.preventDefault();

        const { name, address, city, phone, email, contactType, profileURL } = this.state;

        axios.post('/contacts', { name, address, city, phone, email, contactType, profileURL })
            .then((res) => {
                // alert(this.props.match.params.id);
                this.props.history.push("/")
            });
    };

    setDefaultImage()
    {
        this.setState({
            profileURL: DefaultImg
        });
    }

    // function to capture base64 format of an image
    getBaseFile(files)
    {
        // create a local readable base64 instance of an image
        this.setState({
            profileURL: files.base64
        });

        let imageObj = {
            imageName: "base-image-" + Date.now(),
            imageData: files.base64.toString()
        };

        axios.post('http://localhost:9890/image/uploadbase', imageObj)
            .then((data) => {
                if (data.data.success) {
                    alert("Image has been successfully uploaded using base64 format");
                    // alert(imageObj.imageName);
                    // this.setDefaultImage();
                }
            })
            .catch((err) => {
                alert("Error while uploading image using base64 format");
                this.setDefaultImage();
            });
    }


    render()
    {
        const { name, address, city, phone, email, contactType, profileURL } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD CONTACT
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Contacts List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="image-container">
                                <div className="process">
                                    <br></br>
                                    <h5 /*className="process-heading"*/>Profile Picture</h5>

                                    <div className="process">
                                        <div className="process__upload-btn">
                                            <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
                                        </div>
                                        <img src={this.state.profileURL} alt="upload" className="process__image" />
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="name">Name:</label>
                                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <label for="address">Address:</label>
                                <input type="text" className="form-control" name="address" value={address} onChange={this.onChange} placeholder="Address" />
                            </div>
                            <div className="form-group">
                                <label for="city">City:</label>
                                <input type="text" className="form-control" name="city" value={city} onChange={this.onChange} placeholder="City" />
                            </div>
                            <div className="form-group">
                                <label for="phone">Phone:</label>
                                <input type="text" className="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="Phone Number" />
                            </div>
                            <div className="form-group">
                                <label for="email">Email:</label>
                                <input type="email" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email Address" />
                            </div>
                            <div className="form-group">
                                <label for="contactType">Contact Type:</label>
                                <form>
                                <div className="form-group">
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" className="form-check-input" name="contactType" value="Personal" checked={this.state.contactType === "Personal"} onChange={this.onChange} /> Personal
                                    </label>
                                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" className="form-check-input" name="contactType" value="Work" checked={this.state.contactType === "Work"} onChange={this.onChange} /> Work
                                    </label>
                                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" className="form-check-input" name="contactType" value="School" checked={this.state.contactType === "School"} onChange={this.onChange} /> School
                                    </label>
                                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" className="form-check-input" name="contactType" value="Other" checked={this.state.contactType === "Other"} onChange={this.onChange} /> Other
                                    </label>
                                </div>
                                </form>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;