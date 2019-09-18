import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FileBase from 'react-file-base64';

class Edit extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            contact: {}
        };
    }

    componentDidMount()
    {
        axios.get('/contacts/'+this.props.match.params.id)
            .then(res => {
                this.setState({ contact: res.data });
                console.log(this.state.contact);
            });
    }

    onChange = (e) => {
        const state = this.state.contact;
        state[e.target.name] = e.target.value;
        this.setState({contact:state});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { name, address, city, phone, email, contactType, profileURL } = this.state.contact;

        axios.put('/contacts/'+this.props.match.params.id, { name, address, city, phone, email, contactType, profileURL })
            .then((result) => {
                this.props.history.push("/show/"+this.props.match.params.id)
            });
    };


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
                // this.setDefaultImage();
            });
    }

    render()
    {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT Contact
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/show/${this.state.contact.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Contact List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="image-container">
                                <div className="process">
                                    <br></br>
                                    <h5 /*className="process-heading"*/>Profile Picture</h5>

                                    <div className="process">
                                        <div className="process__upload-btn">
                                            <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
                                        </div>
                                        <img src={this.state.contact.profileURL} alt="upload" className="process__image" />
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" name="name" value={this.state.contact.name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <input type="text" class="form-control" name="address" value={this.state.contact.address} onChange={this.onChange} placeholder="Address" />
                            </div>
                            <div class="form-group">
                                <label for="city">City:</label>
                                <input type="text" class="form-control" name="city" value={this.state.contact.city} onChange={this.onChange} placeholder="City" />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number:</label>
                                <input type="text" class="form-control" name="phone" value={this.state.contact.phone} onChange={this.onChange} placeholder="Phone Number" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" name="email" value={this.state.contact.email} onChange={this.onChange} placeholder="Email Address" />
                            </div>
                            <div class="form-group">
                                <label for="contactType">Contact Type:</label>
                                <form>
                                    <div class="form-group">
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input type="radio" class="form-check-input" name="contactType" value="Personal" checked={this.state.contact.contactType === "Personal"} onChange={this.onChange} /> Personal
                                        </label>
                                        <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input type="radio" class="form-check-input" name="contactType" value="Work" checked={this.state.contact.contactType === "Work"} onChange={this.onChange} /> Work
                                        </label>
                                        <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input type="radio" class="form-check-input" name="contactType" value="School" checked={this.state.contact.contactType === "School"} onChange={this.onChange} /> School
                                        </label>
                                        <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input type="radio" class="form-check-input" name="contactType" value="Other" checked={this.state.contact.contactType === "Other"} onChange={this.onChange} /> Other
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <button type="submit" class="btn btn-default">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;